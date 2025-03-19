import { CardSeries } from "@/components/molecules/CardSeries";

export default function CardPage() {
  return (
    <div className="flex w-screen py-52 justify-center container mx-auto items-center">
      <CardSeries
        title="SAtu"
        slug="satu-slug"
        status="ongoing"
        genre={["genre satu", "genre dua"]}
        uploaded={new Date()}
        image="/banner.jpg"
      />
    </div>
  );
}
