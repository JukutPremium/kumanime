import { CardSeries } from "@/components/molecules/CardSeries";

export default function CardPage() {
  return (
    <div className="flex w-screen py-52 justify-center container mx-auto items-center">
      <CardSeries
        title="Ore dake Level Up na Ken (Solo Leveling)"
        slug="solo-leveling-slug"
        status="ongoing"
        genre={["Action", "Adventure", "Fantasy"]}
        uploaded={new Date()}
        image="/banner.jpg"
      />
    </div>
  );
}
