import Link from "next/link";
import { ArrowLeft, Calendar } from "lucide-react";
import { notFound } from "next/navigation";
import { getBlogPostBySlug } from "@/lib/api";
import type { Metadata } from "next";

interface BlogDetailsPageProps {
  params: {
    slug: string;
  };
}

export async function generateMetadata({ params }: BlogDetailsPageProps): Promise<Metadata> {
  const result = await getBlogPostBySlug(params.slug);

  if (!result.success) {
    return { title: "Article | LumieraMed" };
  }

  return {
    title: `${result.data.title} | LumieraMed`,
    description: result.data.title,
    alternates: { canonical: `/blog/${params.slug}` },
  };
}

function formatDate(value?: string) {
  if (!value) return null;
  const date = new Date(value);
  return Number.isNaN(date.getTime())
    ? null
    : new Intl.DateTimeFormat("en-GB", {
        day: "numeric",
        month: "long",
        year: "numeric",
      }).format(date);
}

export default async function BlogDetailsPage({ params }: BlogDetailsPageProps) {
  const result = await getBlogPostBySlug(params.slug);

  if (!result.success) notFound();

  const post = result.data;
  const date = formatDate(post.createdAt ?? post.updatedAt);

  return (
    <main className="min-h-screen bg-white pt-16">
      <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 md:py-12">
        <Link
          href="/blog"
          className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-brand-slate transition-colors hover:text-brand-teal"
        >
          <ArrowLeft size={16} />
          Back to blog
        </Link>

        <article>
          <header className="mx-auto max-w-3xl">
            {date && (
              <p className="mb-4 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-brand-teal">
                <Calendar size={14} />
                {date}
              </p>
            )}
            <h1 className="font-display text-3xl font-bold leading-tight text-brand-navy md:text-5xl">
              {post.title}
            </h1>
          </header>

          <div className="mx-auto mt-8 aspect-[16/8] max-w-4xl overflow-hidden rounded-2xl bg-brand-gray shadow-soft">
            <div
              role="img"
              aria-label={post.title}
              className="h-full w-full bg-cover bg-center"
              style={{ backgroundImage: `url(${post.image})` }}
            />
          </div>

          <div
            className="blog-content mx-auto mt-10 max-w-3xl text-base leading-8 text-brand-slate md:text-lg"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        </article>
      </div>
    </main>
  );
}
