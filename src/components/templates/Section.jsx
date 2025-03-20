import Link from "next/link";
import { Button } from "@/components/atoms/Button";
import { H2 } from "@/components/templates/Typography";

export function Section({ children, className }) {
  return (
    <section
      className={`${className} container mx-auto flex flex-col gap-8 px-[7%] md:px-0 py-5`}
    >
      {children}
    </section>
  );
}

export function SectionHeader({ children }) {
  return (
    <div className="container mx-auto flex justify-between items-center px-[7%] md:px-0">
      {children}
    </div>
  );
}

export function SectionPagination({ href, page, totalPages }) {
  return (
    <div className="container flex justify-center items-center gap-4 mb-20 mx-auto">
      <Link href={`${href}${page - 1}}` || "#"}>
        {page <= 1 ? (
          <Button variant="secondary">Previous</Button>
        ) : (
          <Button>Previous</Button>
        )}
      </Link>
      <p>{page}</p>
      <Link href={`${href}${page + 1}}` || "#"}>
        {page >= totalPages ? (
          <Button variant="secondary">Next</Button>
        ) : (
          <Button>Next</Button>
        )}
      </Link>
    </div>
  );
}

export function SectionTitle({ children }) {
  return (
    <div className="pl-3 border-l-4 border-primary">
      <H2>{children}</H2>
    </div>
  );
}

export function SectionOther({ children, href }) {
  return (
    <Link href={href}>
      <Button variant="outline">{children}</Button>
    </Link>
  );
}

export function SectionContainer({ children }) {
  return <div className="flex flex-wrap justify-between gap-4">{children}</div>;
}
