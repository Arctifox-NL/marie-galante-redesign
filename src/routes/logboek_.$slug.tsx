import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import SiteLayout from "@/components/SiteLayout";
import { posts, type LogPost } from "@/data/logbook";

export const Route = createFileRoute("/logboek_/$slug")({
  component: PostPage,
  loader: ({ params }) => {
    const post = posts.find((p) => p.slug === params.slug);
    if (!post) throw notFound();
    return { post: post as LogPost };
  },
  notFoundComponent: () => (
    <SiteLayout>
      <div className="mx-auto max-w-2xl px-6 py-40 text-center md:px-10">
        <div className="eyebrow">404</div>
        <NotFoundInner />
      </div>
    </SiteLayout>
  ),
  errorComponent: ({ reset }) => (
    <SiteLayout>
      <div className="mx-auto max-w-2xl px-6 py-40 text-center md:px-10">
        <ErrorInner reset={reset} />
      </div>
    </SiteLayout>
  ),
  head: ({ loaderData }) => {
    const p = loaderData?.post;
    if (!p) return { meta: [{ title: "Logboek · Marie Galante" }] };
    return {
      meta: [
        { title: `${p.title} · Logboek · Marie Galante` },
        { name: "description", content: p.excerpt },
        { property: "og:title", content: p.title },
        { property: "og:description", content: p.excerpt },
        ...(p.cover ? [{ property: "og:image", content: p.cover }] : []),
        ...(p.cover ? [{ name: "twitter:image", content: p.cover }] : []),
      ],
    };
  },
});

function NotFoundInner() {
  const { t } = useTranslation();
  return (
    <>
      <h1 className="mt-4 font-display text-5xl text-primary">{t("log.notFound")}</h1>
      <p className="mt-6 text-foreground/70">{t("log.notFoundBody")}</p>
      <Link
        to="/logboek"
        className="mt-8 inline-block border-b border-accent pb-1 text-xs uppercase tracking-[0.25em] text-primary hover:text-accent"
      >
        {t("log.backLog")}
      </Link>
    </>
  );
}

function ErrorInner({ reset }: { reset: () => void }) {
  const { t } = useTranslation();
  return (
    <>
      <h1 className="font-display text-4xl text-primary">{t("log.errorTitle")}</h1>
      <button
        onClick={() => reset()}
        className="mt-6 border-b border-accent pb-1 text-xs uppercase tracking-[0.25em] text-primary hover:text-accent"
      >
        {t("log.retry")}
      </button>
    </>
  );
}

function PostPage() {
  const { t } = useTranslation();
  const { post } = Route.useLoaderData() as { post: LogPost };
  const idx = posts.findIndex((p) => p.slug === post.slug);
  const prev = idx < posts.length - 1 ? posts[idx + 1] : null;
  const next = idx > 0 ? posts[idx - 1] : null;

  return (
    <SiteLayout>
      {post.cover ? (
        <section className="relative h-[60vh] min-h-[420px] w-full overflow-hidden">
          <img src={post.cover} alt="" className="absolute inset-0 h-full w-full object-cover" />
          <div className="absolute inset-0 bg-primary/55" />
          <div className="relative z-10 mx-auto flex h-full max-w-4xl flex-col justify-end px-6 pb-16 md:px-10 md:pb-24">
            <div className="eyebrow text-background/70">{post.dateLong} · {post.coords}</div>
            <h1 className="mt-3 font-display text-4xl text-background md:text-6xl">{post.title}</h1>
          </div>
        </section>
      ) : (
        <section className="bg-secondary pb-16 pt-40 md:pt-48">
          <div className="mx-auto max-w-4xl px-6 md:px-10">
            <div className="eyebrow">{post.dateLong} · {post.coords}</div>
            <h1 className="mt-4 font-display text-4xl text-primary md:text-6xl">{post.title}</h1>
          </div>
        </section>
      )}

      <article className="mx-auto max-w-3xl px-6 py-20 md:px-10 md:py-28">
        <div className="space-y-8">
          {post.body.map((block, i) =>
            typeof block === "string" ? (
              <p key={i} className="text-lg leading-relaxed text-foreground/85">
                {block}
              </p>
            ) : (
              <div
                key={i}
                className={`grid gap-3 ${
                  block.images.length === 1
                    ? "grid-cols-1"
                    : block.images.length === 2
                    ? "grid-cols-1 sm:grid-cols-2"
                    : "grid-cols-2 md:grid-cols-3"
                }`}
              >
                {block.images.map((src) => (
                  <img
                    key={src}
                    src={src}
                    alt=""
                    loading="lazy"
                    className="h-full w-full object-cover"
                  />
                ))}
              </div>
            ),
          )}
        </div>

        <div className="mt-20 border-t border-border pt-8">
          <Link
            to="/logboek"
            className="text-xs uppercase tracking-[0.25em] text-primary hover:text-accent"
          >
            {t("log.backLog")}
          </Link>
        </div>
      </article>

      {(prev || next) && (
        <section className="border-t border-border bg-secondary/50">
          <div className="mx-auto grid max-w-4xl gap-10 px-6 py-16 md:grid-cols-2 md:px-10">
            {prev ? (
              <Link
                to="/logboek/$slug"
                params={{ slug: prev.slug }}
                className="group block"
              >
                <div className="eyebrow">{t("log.prev")}</div>
                <div className="mt-3 font-display text-2xl text-primary group-hover:text-accent">
                  {prev.title}
                </div>
                <div className="mt-1 text-xs uppercase tracking-[0.2em] text-foreground/60">
                  {prev.date}
                </div>
              </Link>
            ) : <span />}
            {next ? (
              <Link
                to="/logboek/$slug"
                params={{ slug: next.slug }}
                className="group block md:text-right"
              >
                <div className="eyebrow">{t("log.next")}</div>
                <div className="mt-3 font-display text-2xl text-primary group-hover:text-accent">
                  {next.title}
                </div>
                <div className="mt-1 text-xs uppercase tracking-[0.2em] text-foreground/60">
                  {next.date}
                </div>
              </Link>
            ) : <span />}
          </div>
        </section>
      )}
    </SiteLayout>
  );
}