import { CardSerise } from "@/components/molecules/CardSeries";

export default function CardPage() {
  return (
    <div className="flex w-screen py-52 justify-center container mx-auto items-center">
      <CardSerise
        title="SAtu"
        slug="satu-slug"
        genre={["genre satu", "genre dua"]}
        uploaded={new Date()}
        image="/banner.jpg"
      />
    </div>
  );
}
