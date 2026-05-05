"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import { Mic, Search, SendHorizontal } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  getConversationMessages,
  getStudentProfile,
  getUserConversations,
} from "@/lib/api";
import { socketManager, type ChatMessage } from "@/lib/socket";
import type {
  ConversationMessage,
  ConversationParticipant,
  ConversationSummary,
} from "@/lib/types";

type UiMessage = {
  id: string;
  sender: "me" | "other";
  text: string;
  time: string;
};

type UiConversation = {
  id: string;
  name: string;
  preview: string;
  avatar: string;
};

function getParticipantId(participant?: ConversationParticipant | string | null) {
  if (!participant) return "";
  if (typeof participant === "string") return participant;
  return participant._id || participant.id || "";
}

function getParticipantName(participant?: ConversationParticipant | null) {
  if (!participant) return "Conversation";
  return (
    participant.fullName ||
    participant.name ||
    [participant.firstName, participant.lastName].filter(Boolean).join(" ").trim() ||
    participant.email ||
    "Conversation"
  );
}

function formatMessageTime(value?: string) {
  if (!value) {
    return new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  }

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;

  return date.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
}

function isOwnMessage(
  messageSender: ConversationMessage["senderId"] | ChatMessage["senderId"],
  currentUserId: string,
) {
  if (!messageSender || !currentUserId) return false;
  if (typeof messageSender === "string") return messageSender === currentUserId;
  return messageSender._id === currentUserId || messageSender.id === currentUserId;
}

function mapConversation(
  conversation: ConversationSummary,
  currentUserId: string,
): UiConversation {
  const id = conversation._id || conversation.id || conversation.conversationId || "";
  const otherParticipant =
    conversation.participants?.find(
      (participant) => getParticipantId(participant) !== currentUserId,
    ) || conversation.participants?.[0];

  return {
    id,
    name: conversation.title || conversation.name || getParticipantName(otherParticipant),
    preview: conversation.lastMessage?.content || "No messages yet.",
    avatar: otherParticipant?.avatar || otherParticipant?.profileImage || "/images/avatar.png",
  };
}

function mapMessage(message: ConversationMessage, currentUserId: string): UiMessage {
  return {
    id: message._id || message.id || `message-${Date.now()}`,
    sender: isOwnMessage(message.senderId, currentUserId) ? "me" : "other",
    text: message.content || "",
    time: formatMessageTime(message.createdAt),
  };
}

export default function MessagesPage() {
  const [conversations, setConversations] = useState<UiConversation[]>([]);
  const [messagesByConversation, setMessagesByConversation] =
    useState<Record<string, UiMessage[]>>({});
  const [activeConversationId, setActiveConversationId] = useState("");
  const activeConversationRef = useRef("");
  const tokenRef = useRef("");
  const currentUserIdRef = useRef("");
  const [search, setSearch] = useState("");
  const [message, setMessage] = useState("");
  const [showChatOnMobile, setShowChatOnMobile] = useState(false);
  const [connectionState, setConnectionState] = useState<
    "connecting" | "connected" | "disconnected"
  >("connecting");
  const [loadingConversations, setLoadingConversations] = useState(true);
  const [loadingMessages, setLoadingMessages] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    activeConversationRef.current = activeConversationId;
  }, [activeConversationId]);

  useEffect(() => {
    const token =
      typeof window !== "undefined"
        ? localStorage.getItem("accessToken") ?? ""
        : "";
    tokenRef.current = token;

    if (!token) {
      setLoadingConversations(false);
      setConnectionState("disconnected");
      setError("You need to log in before using real-time messaging.");
      return;
    }

    const loadInitialData = async () => {
      setLoadingConversations(true);

      const [profileResult, conversationsResult] = await Promise.all([
        getStudentProfile(token),
        getUserConversations(token),
      ]);

      if (profileResult.success) {
        const profile = profileResult.data;
        currentUserIdRef.current =
          profile.id ||
          (typeof profile.userId === "string"
            ? profile.userId
            : profile.userId?._id || "") ||
          "";
      }

      if (!conversationsResult.success) {
        setError(conversationsResult.error);
        setLoadingConversations(false);
        return;
      }

      const mappedConversations = conversationsResult.data
        .map((conversation) => mapConversation(conversation, currentUserIdRef.current))
        .filter((conversation) => conversation.id);

      setConversations(mappedConversations);
      setActiveConversationId((current) => current || mappedConversations[0]?.id || "");
      setLoadingConversations(false);
    };

    void loadInitialData();

    const socket = socketManager.connect(token);

    if (!socket) {
      setConnectionState("disconnected");
      setError("Socket connection could not be created.");
      return;
    }

    setConnectionState(socket.connected ? "connected" : "connecting");

    const cleanup = [
      socketManager.onConnect(() => {
        setConnectionState("connected");
        setError(null);
      }),
      socketManager.onDisconnect(() => {
        setConnectionState("disconnected");
      }),
      socketManager.onConnectError((connectError) => {
        setConnectionState("disconnected");
        setError(connectError.message || "Unable to connect to the messaging server.");
      }),
      socketManager.onAuthError((authError) => {
        setConnectionState("disconnected");
        setError(authError.message || "Authentication error");
      }),
      socketManager.onNewMessage((incomingMessage: ChatMessage) => {
        const conversationId = incomingMessage.conversationId;
        const content = incomingMessage.content?.trim();

        if (!conversationId || !content) return;

        setMessagesByConversation((prev) => {
          const existing = prev[conversationId] ?? [];
          const incomingId =
            incomingMessage.id || incomingMessage._id || `${conversationId}-${Date.now()}`;

          if (existing.some((item) => item.id === incomingId)) {
            return prev;
          }

          return {
            ...prev,
            [conversationId]: [
              ...existing,
              {
                id: incomingId,
                sender: isOwnMessage(incomingMessage.senderId, currentUserIdRef.current)
                  ? "me"
                  : "other",
                text: content,
                time: formatMessageTime(incomingMessage.createdAt),
              },
            ],
          };
        });

        setConversations((prev) => {
          const exists = prev.some((conversation) => conversation.id === conversationId);
          if (exists) {
            return prev.map((conversation) =>
              conversation.id === conversationId
                ? { ...conversation, preview: content }
                : conversation,
            );
          }

          return [
            {
              id: conversationId,
              name: "New Conversation",
              preview: content,
              avatar: "/images/avatar.png",
            },
            ...prev,
          ];
        });
      }),
    ];

    return () => {
      cleanup.forEach((dispose) => dispose?.());
      socketManager.leaveConversation(activeConversationRef.current);
      socketManager.disconnect();
    };
  }, []);

  useEffect(() => {
    if (!activeConversationId) return;

    const loadMessages = async () => {
      const token = tokenRef.current;
      if (!token) return;

      setLoadingMessages(true);
      const result = await getConversationMessages(activeConversationId, token);

      if (!result.success) {
        setError(result.error);
        setLoadingMessages(false);
        return;
      }

      setMessagesByConversation((prev) => ({
        ...prev,
        [activeConversationId]: result.data.map((item) =>
          mapMessage(item, currentUserIdRef.current),
        ),
      }));
      setLoadingMessages(false);
    };

    void loadMessages();
    socketManager.joinConversation(activeConversationId);
    socketManager.markAsRead(activeConversationId);

    return () => {
      socketManager.leaveConversation(activeConversationId);
    };
  }, [activeConversationId]);

  const activeConversation = conversations.find(
    (conversation) => conversation.id === activeConversationId
  );

  const filteredConversations = conversations.filter((conversation) =>
    conversation.name.toLowerCase().includes(search.toLowerCase())
  );
  const activeMessages = useMemo(
    () => messagesByConversation[activeConversationId] ?? [],
    [activeConversationId, messagesByConversation],
  );

  const handleSendMessage = () => {
    const trimmed = message.trim();

    if (!trimmed || !activeConversationId) return;

    setMessagesByConversation((prev) => ({
      ...prev,
      [activeConversationId]: [
        ...(prev[activeConversationId] ?? []),
        {
          id: `local-${Date.now()}`,
          sender: "me",
          text: trimmed,
          time: formatMessageTime(),
        },
      ],
    }));

    setConversations((prev) =>
      prev.map((conversation) =>
        conversation.id === activeConversationId
          ? { ...conversation, preview: trimmed }
          : conversation,
      ),
    );

    socketManager.sendMessage(activeConversationId, trimmed);
    setMessage("");
  };

  return (
    <div className="mx-auto flex h-auto min-h-[calc(100vh-10rem)] w-full max-w-[1120px] flex-col gap-4 lg:h-[calc(100vh-10rem)] lg:flex-row">
      <section
        className={cn(
          "flex flex-col rounded-[22px] bg-white p-4 shadow-soft lg:w-[320px] lg:flex-shrink-0",
          showChatOnMobile ? "hidden lg:flex" : "flex"
        )}
      >
        <div className="mb-4">
          <div className="relative">
            <Search
              size={14}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-[#b1b8be]"
            />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search Name, ..."
              className="h-11 w-full rounded-[14px] bg-[#fafafa] pl-10 pr-4 text-sm text-brand-navy outline-none placeholder:text-[#b1b8be] focus:ring-2 focus:ring-brand-teal/20"
            />
          </div>
          <div className="mt-3 flex items-center justify-between px-1">
            <p className="text-xs text-brand-muted">
              {connectionState === "connected"
                ? "Connected"
                : connectionState === "connecting"
                  ? "Connecting..."
                  : "Offline"}
            </p>
            {error ? (
              <p className="max-w-[180px] truncate text-right text-xs text-red-500">
                {error}
              </p>
            ) : null}
          </div>
        </div>

        <div className="flex-1 space-y-3 overflow-y-auto pr-1">
          {loadingConversations ? (
            <div className="flex h-full items-center justify-center text-sm text-brand-muted">
              Loading conversations...
            </div>
          ) : null}
          {filteredConversations.map((conversation) => {
            const isActive = conversation.id === activeConversationId;

            return (
              <button
                key={conversation.id}
                onClick={() => {
                  setActiveConversationId(conversation.id);
                  setShowChatOnMobile(true);
                }}
                className={cn(
                  "flex w-full items-start gap-3 rounded-[12px] border bg-white px-3 py-2.5 text-left transition-all",
                  isActive
                    ? "border-brand-teal/60 shadow-[0_0_0_1px_rgba(42,191,191,0.08)]"
                    : "border-transparent hover:border-[#edf0f2] hover:bg-[#fcfcfc]"
                )}
              >
                <div className="relative flex h-10 w-10 flex-shrink-0 items-center justify-center overflow-hidden rounded-full bg-brand-gray">
                  <Image
                    src={conversation.avatar}
                    alt={conversation.name}
                    fill
                    className="object-cover"
                  />
                  <span className="absolute text-xs font-semibold text-brand-navy">
                    {conversation.name.charAt(0)}
                  </span>
                </div>

                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold text-[#3b4349]">
                    {conversation.name}
                  </p>
                  <p className="mt-1 truncate text-xs text-[#b1b7bd]">
                    {conversation.preview}
                  </p>
                </div>
              </button>
            );
          })}
          {!loadingConversations && filteredConversations.length === 0 ? (
            <div className="flex h-full items-center justify-center text-sm text-brand-muted">
              No conversations found.
            </div>
          ) : null}
        </div>
      </section>

      <section
        className={cn(
          "min-w-0 flex-1 flex-col rounded-[22px] bg-white px-3 py-4 shadow-soft sm:px-4 md:px-5",
          showChatOnMobile ? "flex" : "hidden lg:flex"
        )}
      >
        {activeConversation && (
          <div className="flex items-center gap-3 border-b border-[#eef2f4] px-1 pb-4 sm:px-2">
            <button
              onClick={() => setShowChatOnMobile(false)}
              className="rounded-full px-2 py-1 text-xs font-medium text-brand-slate hover:bg-[#f5f7f8] lg:hidden"
            >
              Back
            </button>
            <div className="relative flex h-10 w-10 items-center justify-center overflow-hidden rounded-full bg-brand-gray">
              <Image
                src={activeConversation.avatar}
                alt={activeConversation.name}
                fill
                className="object-cover"
              />
              <span className="absolute text-xs font-semibold text-brand-navy">
                {activeConversation.name.charAt(0)}
              </span>
            </div>
            <p className="text-sm font-semibold text-[#3b4349]">
              {activeConversation.name}
            </p>
          </div>
        )}

        <div className="flex-1 space-y-4 overflow-y-auto px-1 py-4 sm:space-y-6 sm:px-2 sm:py-5">
          {loadingMessages ? (
            <div className="flex h-full items-center justify-center text-sm text-brand-muted">
              Loading messages...
            </div>
          ) : null}
          {activeMessages.map((item) => (
            <div
              key={item.id}
              className={cn(
                "flex items-start gap-3",
                item.sender === "me" ? "justify-end" : "justify-start"
              )}
            >
              {item.sender === "other" && (
                <div className="relative flex h-9 w-9 flex-shrink-0 items-center justify-center overflow-hidden rounded-full bg-brand-gray">
                  <Image
                    src="/images/avatar.png"
                    alt="Ahmed Rahmin"
                    fill
                    className="object-cover"
                  />
                  <span className="absolute text-[10px] font-semibold text-brand-navy">
                    A
                  </span>
                </div>
              )}

              <div
                className={cn(
                  "max-w-[85%] rounded-[10px] px-3 py-3 text-sm leading-[1.6] sm:max-w-[360px] sm:px-4",
                  item.sender === "me"
                    ? "bg-[#163f3a] text-white"
                    : "bg-[#2f2f2f] text-white"
                )}
              >
                <p>{item.text}</p>
                <p className="mt-2 text-right text-[11px] text-white/70">{item.time}</p>
              </div>

              {item.sender === "me" && (
                <div className="relative flex h-9 w-9 flex-shrink-0 items-center justify-center overflow-hidden rounded-full bg-brand-gray">
                  <Image
                    src="/images/avatar.png"
                    alt="John Smith"
                    fill
                    className="object-cover"
                  />
                  <span className="absolute text-[10px] font-semibold text-brand-navy">
                    J
                  </span>
                </div>
              )}
            </div>
          ))}
          {!loadingMessages && activeMessages.length === 0 ? (
            <div className="flex h-full items-center justify-center text-sm text-brand-muted">
              No messages yet in this conversation.
            </div>
          ) : null}
        </div>

        <div className="border-t border-[#eef2f4] px-1 pt-4 sm:px-2">
          <div className="flex items-center gap-2 rounded-[14px] bg-[#fafafa] px-3 py-3 sm:gap-3 sm:px-4">
            <input
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Asked Anythings"
              className="flex-1 bg-transparent text-sm text-brand-navy outline-none placeholder:text-[#b1b7bd]"
            />
            <button className="hidden text-[#7c858d] transition-colors hover:text-brand-navy sm:block">
              <Mic size={16} />
            </button>
            <button
              onClick={handleSendMessage}
              className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-teal text-white transition-all hover:bg-brand-tealDark"
            >
              <SendHorizontal size={16} />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
