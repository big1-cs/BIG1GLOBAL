import { useState, type FormEvent } from "react";
import { audiences } from "@/data/audiences";
import { company } from "@/data/company";

const INBOX = "big1globalofficial@gmail.com";

const steps = [
  { n: "01", title: "Brief", text: "Who you are, and the work that needs a home." },
  { n: "02", title: "Route", text: "The brief is read and sent to the right wing." },
  { n: "03", title: "Centre", text: "A centre holds the mandate. A person stays accountable." },
];

export function Mandate() {
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const name = String(data.get("name") || "").trim();
    const organisation = String(data.get("organisation") || "").trim();
    const email = String(data.get("email") || "").trim();
    const phone = String(data.get("phone") || "").trim();
    const who = String(data.get("who") || "").trim();
    const corridor = String(data.get("corridor") || "").trim();
    const brief = String(data.get("brief") || "").trim();

    setSending(true);
    setError("");

    try {
      const response = await fetch(`https://formsubmit.co/ajax/${INBOX}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          organisation: organisation || "—",
          phone: phone || "—",
          who,
          corridor: corridor || "No preference",
          message: brief,
          _subject: `Mandate brief — ${name}`,
          _template: "table",
          _captcha: "false",
          _replyto: email,
        }),
      });
      if (!response.ok) throw new Error("send failed");
      setSent(true);
      form.reset();
    } catch {
      setError("The brief could not be sent. Please try again, or write to us directly.");
    } finally {
      setSending(false);
    }
  };

  return (
    <section id="route" className="site-block" aria-labelledby="mandate-title">
      <div className="about-wrap mandate-grid">
        <div>
          <h2 id="mandate-title">
            Initiate a <em className="serif">mandate</em>.
          </h2>
          <p className="block-lead">
            A short brief is enough. Tell us who you are and what the work is. BIG1 GLOBAL routes it to the centre that should hold it.
          </p>
          <ol className="mandate-steps">
            {steps.map((step) => (
              <li key={step.n}>
                <span>{step.n}</span>
                <strong>{step.title}</strong>
                <p>{step.text}</p>
              </li>
            ))}
          </ol>
          <p className="block-note">
            Prefer to write directly?{" "}
            <a href={`mailto:${company.hq.email}`}>{company.hq.email}</a>
            {" · "}
            <a href={company.hq.phoneHref}>{company.hq.phone}</a>
          </p>
        </div>

        {sent ? (
          <div className="mandate-sent" role="status">
            <p className="block-kicker">Brief received</p>
            <h3>Your mandate brief has been sent.</h3>
            <p>BIG1 GLOBAL has it. Someone will reply to the email address you entered.</p>
            <button type="button" className="pill" onClick={() => setSent(false)}>
              Send another brief
            </button>
          </div>
        ) : (
          <form className="mandate-form" onSubmit={onSubmit}>
            <label>
              Name
              <input name="name" type="text" autoComplete="name" required />
            </label>
            <label>
              Organisation
              <input name="organisation" type="text" autoComplete="organization" />
            </label>
            <label>
              Email
              <input name="email" type="email" autoComplete="email" required />
            </label>
            <label>
              Phone
              <input name="phone" type="tel" autoComplete="tel" />
            </label>
            <label>
              I am a
              <select name="who" required defaultValue="">
                <option value="" disabled>
                  Choose one
                </option>
                {audiences.map((item) => (
                  <option key={item.id} value={item.label}>
                    {item.label}
                  </option>
                ))}
              </select>
            </label>
            <label>
              Corridor
              <select name="corridor" defaultValue="">
                <option value="">No preference</option>
                {company.corridors.map((corridor) => (
                  <option key={corridor} value={corridor}>
                    {corridor}
                  </option>
                ))}
              </select>
            </label>
            <label className="is-wide">
              The work
              <textarea name="brief" rows={5} required placeholder="What needs to be done, and by when." />
            </label>
            {error ? <p className="form-error is-wide">{error}</p> : null}
            <button className="pill pill-gold is-wide" type="submit" disabled={sending}>
              {sending ? "Sending…" : "Send the brief"}
            </button>
          </form>
        )}
      </div>
    </section>
  );
}
