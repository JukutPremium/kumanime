import { CardSeries } from "@/components/molecules/CardSeries";
import {
  Section,
  SectionHeader,
  SectionContainer,
  SectionTitle,
  SectionOther,
  SectionPagination,
} from "@/components/templates/Section";

export default function SectionPage() {
  return (
    <>
      <Section className="mt-20">
        <SectionHeader>
          <SectionTitle>Series Page</SectionTitle>
          <SectionOther href="/">Other</SectionOther>
        </SectionHeader>

        <SectionContainer>
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((_, index) => (
            <CardSeries
              key={index}
              title="Ore dake Level Up na Ken (Solo Leveling)"
              slug="solo-leveling-slug"
              status="ongoing"
              genre={["Action", "Adventure", "Fantasy"]}
              uploaded={new Date()}
              image="/banner.jpg"
            />
          ))}
        </SectionContainer>

      </Section>

      <Section>
        <SectionHeader>
          <SectionTitle>Series Page</SectionTitle>
          <SectionOther href="/">Other</SectionOther>
        </SectionHeader>

        <SectionContainer>
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((_, index) => (
            <CardSeries
              key={index}
              title="Ore dake Level Up na Ken (Solo Leveling)"
              slug="solo-leveling-slug"
              status="ongoing"
              genre={["Action", "Adventure", "Fantasy"]}
              uploaded={new Date()}
              image="/banner.jpg"
            />
          ))}
        </SectionContainer>

        <SectionPagination href="/search?page=" page="1" totalPages="2" />
      </Section>
    </>
  );
}
