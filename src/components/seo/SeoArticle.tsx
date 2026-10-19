import { company } from "@/data/company";
import { canonical, cornerstone, type SeoPage } from "@/data/seoPages";

const mapHref = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(company.hq.address)}`;

export function SeoArticle({ page }: { page: SeoPage }) {
  const localSchema = page.local
    ? {
        "@context": "https://schema.org",
        "@type": "ProfessionalService",
        name: "BIG1CS (Big1 Consultancy Services)",
        url: canonical(page.path),
        parentOrganization: { "@id": "https://www.big1global.com/#organization" },
        telephone: company.hq.phone,
        email: company.hq.email,
        image: "https://www.big1global.com/assets/big1-global-logo.png",
        address: {
          "@type": "PostalAddress",
          streetAddress: "2nd Floor, J2/30, Sector-J, Sushant Golf City, Amar Shaheed Path",
          addressLocality: "Lucknow",
          addressRegion: "Uttar Pradesh",
          postalCode: "226030",
          addressCountry: "IN",
        },
        geo: { "@type": "GeoCoordinates", latitude: "26.8467", longitude: "80.9462" },
        areaServed: { "@type": "City", name: page.local.city },
      }
    : null;

  return (
    <main className="apage">
      {localSchema ? (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localSchema) }} />
      ) : null}
      <header className="apage-bar">
        <a className="apage-brand" href="/">
          BIG1 GLOBAL
        </a>
        <nav aria-label="Cornerstone">
          {cornerstone.map((link) => (
            <a key={link.href} href={link.href}>
              {link.label}
            </a>
          ))}
        </nav>
      </header>

      <article className="apage-section">
        <p className="apage-kicker">{page.kicker}</p>
        <h1>{page.h1}</h1>
        <p className="apage-lead">{page.answer}</p>

        {page.blocks.map((block) => (
          <section key={block.heading}>
            <h2>{block.heading}</h2>
            <p className="apage-lead">{block.answer}</p>
            {block.paragraphs?.map((paragraph) => (
              <p key={paragraph} className="apage-lead">
                {paragraph}
              </p>
            ))}
            {block.list ? (
              <ul className="apage-points">
                {block.list.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            ) : null}
          </section>
        ))}

        {page.table ? (
          <div className="apage-table-wrap">
            <table className="apage-table">
              <caption className="apage-kicker">{page.table.caption}</caption>
              <thead>
                <tr>
                  {page.table.headers.map((header) => (
                    <th key={header}>{header}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {page.table.rows.map((row) => (
                  <tr key={row[0]}>
                    {row.map((cell) => (
                      <td key={cell}>{cell.startsWith("http") ? <a href={cell}>{cell.replace("https://", "")}</a> : cell}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : null}

        {page.local ? (
          <section className="apage-card" style={{ marginTop: 36 }}>
            <h2>Name, address, phone</h2>
            <p className="apage-lead">
              {company.name}. {company.legal}. One headquarters, used for every city this page serves.
            </p>
            <p>{company.hq.address}</p>
            <p>
              <a href={company.hq.phoneHref}>{company.hq.phone}</a>
              {" · "}
              <a href={`mailto:${company.hq.email}`}>{company.hq.email}</a>
            </p>
            <p>Markets named on this page: {page.local.neighborhoods.join(", ")}.</p>
            {page.map ? (
              <p>
                <a href={mapHref}>Open the Lucknow headquarters on Google Maps</a>
              </p>
            ) : (
              <p>There is no separate office in {page.local.city}. The map pin is the Lucknow headquarters.</p>
            )}
          </section>
        ) : null}

        <nav className="apage-actions" aria-label="Related">
          {cornerstone.map((link) => (
            <a key={link.href} href={link.href}>
              <span>Cornerstone</span>
              {link.label}
            </a>
          ))}
        </nav>
      </article>
    </main>
  );
}
