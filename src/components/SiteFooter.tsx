import { company } from "@/data/company";
import { navLinks } from "@/data/nav";

export function SiteFooter() {
  const year = new Date().getFullYear();
  return (
    <footer id="footer" className="site-footer">
      <div className="about-wrap">
        <div className="footer-brand">
          <img className="footer-mark" src="/assets/big1-global-logo.png" alt="" />
          <div>
            <p className="footer-name">{company.name}</p>
            <p className="footer-legal">BIG1 GLOBAL PVT. LTD.</p>
          </div>
        </div>

        <div className="footer-grid">
          <div>
            <p className="block-kicker">Visit</p>
            <p>{company.hq.address}</p>
          </div>
          <div>
            <p className="block-kicker">Speak</p>
            <p>
              <a href={`mailto:${company.hq.email}`}>{company.hq.email}</a>
            </p>
            <p>
              <a href={company.hq.phoneHref}>{company.hq.phone}</a>
            </p>
          </div>
          <div>
            <p className="block-kicker">Corridors</p>
            <ul>
              {company.corridors.map((corridor) => (
                <li key={corridor}>{corridor}</li>
              ))}
            </ul>
          </div>
          <div>
            <p className="block-kicker">On this site</p>
            <ul>
              {navLinks.map((link) => (
                <li key={link.id}>
                  <a href={link.href}>{link.label}</a>
                </li>
              ))}
              <li>
                <a href="/big1cs">corporate consulting firm in India BIG1CS</a>
              </li>
              <li>
                <a href="/big1gc">global consulting firm BIG1GC</a>
              </li>
              <li>
                <a href="/thalmux">THALMUX intelligence engine</a>
              </li>
            </ul>
          </div>
        </div>

        <div id="join" className="footer-join">
          <p>
            Introducers and partners enter through <a href="https://can.big1cs.com">CAN</a>. Professionals enter through{" "}
            <a href="https://pen.big1cs.com">PEN</a>.
          </p>
          <ul className="footer-socials">
            {company.socials.map((social) => (
              <li key={social.id}>
                <a href={social.href} target="_blank" rel="noopener noreferrer">
                  {social.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="footer-base">
          <p>
            © {year} BIG1 GLOBAL PVT. LTD.
          </p>
          <p>{company.footnote}</p>
        </div>
      </div>
    </footer>
  );
}
