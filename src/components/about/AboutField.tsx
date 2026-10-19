export function AboutField() {
  return (
    <div className="apage-field" aria-label="How BIG1 Global holds a mandate">
      <p className="apage-kicker">One brief. Two wings.</p>
      <div className="wing-spine">
        <span>THALMUX</span>
        <small>Reads the brief and names the wing that holds it.</small>
      </div>
      <div className="wing-pair">
        <article>
          <em>Domestic</em>
          <strong>BIG1CS</strong>
          <span>Bharat</span>
          <p>Indian startups, MSMEs and enterprises. Compliance, tax, governance and scale.</p>
        </article>
        <article>
          <em>International</em>
          <strong>BIG1GC</strong>
          <span>The world</span>
          <p>Overseas founders and corporations. Structure, entry, reporting and cross-border work.</p>
        </article>
      </div>
      <ul className="wing-nets">
        <li>CAN finds the mandate</li>
        <li>PEN executes it</li>
        <li>BEN keeps the leaders</li>
      </ul>
    </div>
  );
}
