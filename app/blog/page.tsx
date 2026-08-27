import Link from "next/link";
import { ArrowRight, BookOpen } from "lucide-react";
import { getBlogPosts } from "@/lib/api";
import type { BlogPost } from "@/lib/types";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Medical Electives in China Blog & Guides | LumieraMed",
  description:
    "Explore expert guides on medical electives in China, including placements, specialties, costs, visas, applications and practical advice for medical students.",
  alternates: { canonical: "/blog" },
};

function getPostId(post: BlogPost) {
  return post.slug ?? post._id ?? post.id;
}

function formatDate(value?: string) {
  if (!value) return null;
  const date = new Date(value);
  return Number.isNaN(date.getTime())
    ? null
    : new Intl.DateTimeFormat("en-GB", {
        day: "numeric",
        month: "short",
        year: "numeric",
      }).format(date);
}

export default async function BlogPage() {
  const result = await getBlogPosts();
  console.log(result)
  const posts = result.success ? result.data : [];

  return (
    <main className="min-h-screen bg-white pt-16">
      <section className="border-b border-brand-border bg-brand-light px-4 py-16 md:py-24">
        <div className="mx-auto max-w-5xl">
          <div className="max-w-2xl animate-fade-up">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-brand-border bg-white px-3 py-1.5 text-xs font-medium uppercase tracking-[0.16em] text-brand-teal">
              <BookOpen size={14} />
              LumieraMed Journal
            </div>
            <h1 className="font-display text-4xl font-bold leading-tight text-brand-navy md:text-6xl">
              Perspectives for your <span className="text-brand-teal">clinical journey</span>
            </h1>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-brand-slate md:text-lg">
              Guidance, stories, and practical insights to help you make the most of your medical elective in China.
            </p>
          </div>
        </div>
      </section>

      <section className="px-4 py-14 md:py-20">
        <div className="mx-auto max-w-5xl">
          <div className="mb-8 flex items-end justify-between gap-4">
            <div>
              <p className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-brand-teal">Latest articles</p>
              <h2 className="font-display text-2xl font-bold text-brand-navy md:text-3xl">From the LumieraMed team</h2>
            </div>
            <span className="hidden text-sm text-brand-muted sm:block">{posts.length} {posts.length === 1 ? "article" : "articles"}</span>
          </div>

          {posts.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-brand-border bg-brand-light px-6 py-16 text-center">
              <BookOpen className="mx-auto mb-4 text-brand-teal" size={28} />
              <h2 className="font-display text-xl font-semibold text-brand-navy">New articles are on their way</h2>
              <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-brand-slate">
                Check back soon for advice and stories about clinical electives, life in China, and global medical education.
              </p>
            </div>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {posts.map((post, index) => {
                const postId = getPostId(post);
                if (!postId) return null;
                return (
                  <article
                    key={postId}
                    className="group overflow-hidden rounded-2xl border border-brand-border bg-white shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-cardHover"
                    style={{ animationDelay: `${index * 80}ms` }}
                  >
                    <Link href={`/blog/${postId}`} className="block h-full">
                      <div className="aspect-[16/10] overflow-hidden bg-brand-gray">
                        <div
                          role="img"
                          aria-label={post.title}
                          className="h-full w-full bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                          style={{ backgroundImage: `url(${post.image})` }}
                        />
                      </div>
                      <div className="flex min-h-[190px] flex-col p-6">
                        {formatDate(post.createdAt ?? post.updatedAt) && (
                          <p className="mb-3 text-xs font-medium uppercase tracking-[0.14em] text-brand-muted">
                            {formatDate(post.createdAt ?? post.updatedAt)}
                          </p>
                        )}
                        <h2 className="font-display text-xl font-semibold leading-snug text-brand-navy transition-colors group-hover:text-brand-teal">
                          {post.title}
                        </h2>
                        <span className="mt-auto flex items-center gap-2 pt-6 text-sm font-semibold text-brand-teal">
                          Read article <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" />
                        </span>
                      </div>
                    </Link>
                  </article>
                );
              })}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}