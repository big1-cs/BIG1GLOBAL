import { createFileRoute } from "@tanstack/react-router";
import { AppStateProvider, useAppState } from "@/context/AppState";
import { SmoothScroll } from "@/components/SmoothScroll";
import { Cursor } from "@/components/Cursor";
import { Preloader } from "@/components/Preloader";
import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { FlightMap } from "@/components/FlightMap";
import { Mandate } from "@/components/Mandate";
import { PortalsIndex } from "@/components/PortalsIndex";
import { SiteFooter } from "@/components/SiteFooter";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "BIG1 Global | Sovereign Consulting Conglomerate — BIG1CS India and BIG1GC" },
      {
        name: "description",
        content:
          "BIG1 Global is a sovereign consulting conglomerate. BIG1CS advises Indian startups, MSMEs and enterprises. BIG1GC advises international businesses. THALMUX routes every mandate.",
      },
      { property: "og:title", content: "BIG1 Global | Sovereign Consulting Conglomerate" },
      {
        property: "og:description",
        content:
          "One ecosystem. BIG1CS for India. BIG1GC for international mandates. Headquartered in Lucknow.",
      },
      { property: "og:url", content: "https://www.big1global.com/" },
    ],
    links: [
      { rel: "canonical", href: "https://www.big1global.com/" },
      { rel: "alternate", hrefLang: "en-in", href: "https://www.big1global.com/big1cs" },
      { rel: "alternate", hrefLang: "en", href: "https://www.big1global.com/big1gc" },
      { rel: "alternate", hrefLang: "x-default", href: "https://www.big1global.com/" },
    ],
  }),
  component: Home,
});

function Home() {
  return (
    <AppStateProvider>
      <Experience />
    </AppStateProvider>
  );
}

function Experience() {
  const { revealed } = useAppState();
  return (
    <SmoothScroll>
      <Cursor />
      <Preloader />
      <main>
        <Hero revealed={revealed} />
        <About />
        <FlightMap />
        <PortalsIndex />
        <Mandate />
        <SiteFooter />
      </main>
    </SmoothScroll>
  );
}
