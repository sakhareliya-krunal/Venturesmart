import { TransitionLink } from "@/components/TransitionLink";
import type { LegalSection } from "@/lib/legal-content";

type PolicyDocumentProps = {
  sections: LegalSection[];
  lastUpdated: string;
};

export function PolicyDocument({ sections, lastUpdated }: PolicyDocumentProps) {
  return (
    <div className="policy-document">
      <header className="policy-document-header">
        <p className="policy-document-meta">Last updated: {lastUpdated}</p>
        <nav aria-label="Policy sections" className="policy-document-toc">
          {sections.map((section) => (
            <a href={`#${section.id}`} key={section.id}>
              {section.title}
            </a>
          ))}
        </nav>
      </header>

      <div className="policy-content">
        {sections.map((section) => (
          <section className="policy-block" id={section.id} key={section.id}>
            <h2>{section.title}</h2>
            {section.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </section>
        ))}
      </div>

      <aside className="policy-document-cta">
        <p>Questions about this policy?</p>
        <TransitionLink className="primary-link" href="/contact">
          Contact us
        </TransitionLink>
      </aside>
    </div>
  );
}
