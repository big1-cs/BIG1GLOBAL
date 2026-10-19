import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { aboutInterlude, aboutStatement, principles } from "@/data/about";
import { company, proofPoints } from "@/data/company";
import { gsap } from "@/lib/gsap";
import { prefersReducedMotion } from "@/lib/motion";
import { Roll } from "@/components/Roll";

export function About() {
  const rootRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const root = rootRef.current;
      if (!root) return;
      const reduced = prefersReducedMotion();
      const words = gsap.utils.toArray<HTMLElement>(".scrub-word", root);
      const rules = gsap.utils.toArray<HTMLElement>(".about-rule", root);
      const lines = gsap.utils.toArray<HTMLElement>(".about-line", root);
      const image = root.querySelector(".interlude-img");
      const phrase = root.querySelector(".interlude-phrase");
      const nums = gsap.utils.toArray<HTMLElement>(".stat-value", root);
      const pills = gsap.utils.toArray<HTMLElement>(".corridor-pill", root);
      const cine = gsap.utils.toArray<HTMLElement>("[data-cine]", root);
      const rail = root.querySelector(".about-rail-fill");

      if (reduced) {
        gsap.set(words, { opacity: 1 });
        gsap.set(lines, { yPercent: 0 });
        gsap.set(rules, { scaleX: 1 });
        gsap.set(pills, { autoAlpha: 1, y: 0 });
        gsap.set(cine, { autoAlpha: 1, y: 0 });
        if (rail) gsap.set(rail, { scaleY: 1 });
        return;
      }

      gsap.set(lines, { y: 0, yPercent: 110 });
      gsap.set(rules, { scaleX: 0, transformOrigin: "left center" });
      gsap.set(pills, { autoAlpha: 0, y: 16 });
      gsap.set(cine, { autoAlpha: 0, y: 36 });

      gsap.to(words, {
        opacity: 1,
        stagger: 0.045,
        ease: "none",
        scrollTrigger: {
          trigger: ".about-statement",
          start: "top 72%",
          end: "bottom 48%",
          scrub: true,
        },
      });

      if (image) {
        gsap.fromTo(
          image,
          { yPercent: -8 },
          {
            yPercent: 8,
            ease: "none",
            scrollTrigger: {
              trigger: ".interlude",
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          },
        );
      }

      if (phrase) {
        gsap.from(phrase, {
          y: 28,
          autoAlpha: 0,
          duration: 1.15,
          ease: "expo.out",
          scrollTrigger: { trigger: ".interlude", start: "top 62%" },
        });
      }

      gsap.to(rules, {
        scaleX: 1,
        duration: 1.3,
        ease: "expo.out",
        stagger: 0.12,
        scrollTrigger: { trigger: ".about-numbers", start: "top 78%" },
      });

      nums.forEach((el) => {
        const target = Number(el.dataset.value || "0");
        const suffix = el.dataset.suffix || "";
        const counter = { value: 0 };
        gsap.to(counter, {
          value: target,
          duration: 1.6,
          ease: "expo.out",
          scrollTrigger: { trigger: el, start: "top 82%", once: true },
          onUpdate: () => {
            el.textContent = `${Math.round(counter.value)}${suffix}`;
          },
        });
      });

      gsap.to(lines, {
        y: 0,
        yPercent: 0,
        duration: 1.1,
        stagger: 0.08,
        ease: "expo.out",
        scrollTrigger: { trigger: ".principles", start: "top 78%" },
      });

      gsap.to(cine, {
        autoAlpha: 1,
        y: 0,
        duration: 1.1,
        stagger: 0.08,
        ease: "expo.out",
        scrollTrigger: { trigger: ".principles", start: "top 72%" },
      });

      gsap.to(pills, {
        autoAlpha: 1,
        y: 0,
        duration: 0.9,
        stagger: 0.08,
        ease: "expo.out",
        scrollTrigger: { trigger: ".corridors", start: "top 82%" },
      });

      const whereBits = gsap.utils.toArray<HTMLElement>("[data-where]", root);
      gsap.from(whereBits, {
        y: 32,
        autoAlpha: 0,
        duration: 1.05,
        stagger: 0.1,
        ease: "expo.out",
        scrollTrigger: { trigger: ".where", start: "top 80%" },
      });

      if (rail) {
        gsap.fromTo(
          rail,
          { scaleY: 0 },
          {
            scaleY: 1,
            ease: "none",
            scrollTrigger: {
              trigger: root,
              start: "top 70%",
              end: "bottom 80%",
              scrub: true,
            },
          },
        );
      }
    },
    { scope: rootRef },
  );

  const dash = aboutStatement.findIndex((word) => word.text === "—");
  const headingWords = dash === -1 ? aboutStatement : aboutStatement.slice(0, dash);
  const bodyWords = dash === -1 ? [] : aboutStatement.slice(dash + 1);

  return (
    <section ref={rootRef} id="about" className="about" aria-label="About">
      <div className="about-rail" aria-hidden="true">
        <span className="about-rail-fill" />
      </div>
      <div className="about-wrap about-statement">
        <h2 className="about-heading">
          {headingWords.map((word, index) => (
            <span
              key={`${word.text}-${index}`}
              className={`scrub-word${word.accent ? " accent serif" : ""}`}
            >
              {word.text}{" "}
            </span>
          ))}
        </h2>
        <p className="about-prose">
          {bodyWords.map((word, index) => (
            <span
              key={`${word.text}-${index}`}
              className={`scrub-word${word.accent ? " accent serif" : ""}`}
            >
              {word.text}{" "}
            </span>
          ))}
        </p>
      </div>

      <div className="interlude">
        <img
          className="interlude-img"
          src="/assets/eagle-earth.png"
          alt=""
          draggable={false}
        />
        <div className="interlude-ribs" aria-hidden="true" />
        <div className="interlude-scrim" aria-hidden="true" />
        <p className="interlude-phrase">
          <span className="serif">{aboutInterlude.lead}</span>{" "}
          <span className="serif accent">{aboutInterlude.accent}</span>
        </p>
      </div>

      <div className="about-wrap about-rest">
        <div className="about-numbers">
          <span className="about-rule" />
          <div className="stat-row">
            {proofPoints.map((point) => (
              <div key={point.label} className="stat">
                <span
                  className="stat-value"
                  data-value={point.value}
                  data-suffix={point.suffix}
                  aria-hidden="true"
                >
                  0{point.suffix}
                </span>
                <span className="sr-only">
                  {point.value}
                  {point.suffix} {point.label}
                </span>
                <span className="stat-label">{point.label}</span>
              </div>
            ))}
          </div>
          <span className="about-rule" />
          <p className="about-note">{company.footnote}</p>
        </div>

        <div className="principles">
          {principles.map((item) => (
            <article key={item.n} className="principle">
              <div className="principle-head">
                <span className="principle-n" data-cine>
                  {item.n}
                </span>
                <h2 className="principle-title">
                  <span className="line-mask">
                    <span className="about-line serif">{item.title}</span>
                  </span>
                </h2>
              </div>
              <div className="principle-body">
                {item.body.map((sentence) => (
                  <p key={sentence} data-cine>
                    {sentence}
                  </p>
                ))}
              </div>
            </article>
          ))}
        </div>

        <div className="where">
          <div className="where-main" data-where>
            <h2 className="where-title">
              Where we <span className="serif">operate</span>
            </h2>
            <p className="where-address">{company.hq.address}</p>
            <p className="where-links">
              <a className="text-link" href={`mailto:${company.hq.email}`}>
                <Roll label={company.hq.email} />
              </a>
              <a className="text-link" href={company.hq.phoneHref}>
                <Roll label={company.hq.phone} />
              </a>
            </p>
          </div>
          <div className="corridors" data-where>
            <p className="where-kicker">Corridors</p>
            <div className="corridor-row">
              {company.corridors.map((corridor) => (
                <span key={corridor} className="corridor-pill">
                  {corridor}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
