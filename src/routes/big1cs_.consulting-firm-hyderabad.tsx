import { createFileRoute } from "@tanstack/react-router";
import { SeoArticle } from "@/components/seo/SeoArticle";
import { canonical, seoPages } from "@/data/seoPages";

const page = seoPages.hyderabad;

export const Route = createFileRoute("/big1cs_/consulting-firm-hyderabad")({
  head: () => ({
    meta: [
      { title: page.title },
      { name: "description", content: page.description },
      { property: "og:title", content: page.title },
      { property: "og:description", content: page.description },
      { property: "og:url", content: canonical(page.path) },
    ],
    links: [{ rel: "canonical", href: canonical(page.path) }],
  }),
  component: function Page() {
    return <SeoArticle page={page} />;
  },
});
