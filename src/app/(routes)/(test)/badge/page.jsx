import { Badge } from "@/components/atoms/Badge";

export default function BadgePage() {
  return (
    <div className="flex w-screen py-52 gap-4 flex-col flex-wrap justify-between container mx-auto items-center">
      {/* Default Variant */}
      <Badge variant="default">Default</Badge>

      {/* Secondary Variant */}
      <Badge variant="secondary">Secondary</Badge>

      {/* Destructive Variant */}
      <Badge variant="destructive">Destructive</Badge>

      {/* Outline Variant */}
      <Badge variant="outline">Outline</Badge>
    </div>
  );
}
