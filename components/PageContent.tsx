import type { ReactNode } from "react";

type PageContentProps = {
  children: ReactNode;
  id?: string;
};

export function PageContent({ children, id = "page-content" }: PageContentProps) {
  return (
    <section className="section page-content-section" id={id}>
      <div className="page-content-panel">{children}</div>
    </section>
  );
}
