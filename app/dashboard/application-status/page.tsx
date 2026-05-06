"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { getStudentPlacementEnquiries } from "@/lib/api";

export default function ApplicationStatusIndexPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchLatestApplication = async () => {
      const token = typeof window !== "undefined" 
        ? localStorage.getItem("accessToken") ?? ""
        : "";

      if (!token) {
        setError("No token provided");
        setLoading(false);
        return;
      }

      try {
        // Get student applications to find the latest one
        const applicationsResult = await getStudentPlacementEnquiries(token);
        if (!applicationsResult.success) {
          setError(applicationsResult.error);
          setLoading(false);
          return;
        }

        const applications = applicationsResult.data;
        if (applications && applications.length > 0) {
          // Get the most recent application
          const latestApplication = applications[0]; // Assuming applications are sorted by creation date
          
          // Redirect to the specific application status page
          router.push(`/dashboard/application-status/${latestApplication._id}`);
        } else {
          // No applications found, redirect to applications list
          router.push("/dashboard/applications");
        }
      } catch {
        setError("Failed to load application");
        setLoading(false);
      }
    };

    void fetchLatestApplication();
  }, [router]);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-brand-teal"></div>
          <p className="mt-4 text-sm text-brand-muted">Loading application status...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-center">
          <p className="text-sm text-brand-muted mb-4">{error}</p>
          <Link
            href="/dashboard/applications"
            className="inline-flex items-center gap-1.5 text-sm text-brand-teal transition-colors hover:text-brand-tealDark"
          >
            View All Applications
          </Link>
        </div>
      </div>
    );
  }

  return null;
}
