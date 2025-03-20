import { AlarmClock } from "lucide-react";
import { Button } from "@/components/atoms/Button";

export default function ButtonPage() {
  return (
    <div className="flex w-screen py-52 flex-wrap justify-between container mx-auto items-center">
      {/* Default Variant */}
      <div className="flex flex-col items-center gap-4">
        <Button variant="default" size="default">
          Default
        </Button>
        <Button variant="default" size="sm">
          Default - Small
        </Button>
        <Button variant="default" size="lg">
          Default - Large
        </Button>
        <Button variant="default" size="icon">
          <AlarmClock />
        </Button>
      </div>

      {/* Destructive Variant */}
      <div className="flex flex-col items-center gap-4">
        <Button variant="destructive" size="default">
          Destructive
        </Button>
        <Button variant="destructive" size="sm">
          Destructive - Small
        </Button>
        <Button variant="destructive" size="lg">
          Destructive - Large
        </Button>
        <Button variant="destructive" size="icon">
          <AlarmClock />
        </Button>
      </div>

      {/* Outline Variant */}
      <div className="flex flex-col items-center gap-4">
        <Button variant="outline" size="default">
          Outline
        </Button>
        <Button variant="outline" size="sm">
          Outline - Small
        </Button>
        <Button variant="outline" size="lg">
          Outline - Large
        </Button>
        <Button variant="outline" size="icon">
          <AlarmClock />
        </Button>
      </div>

      {/* Secondary Variant */}
      <div className="flex flex-col items-center gap-4">
        <Button variant="secondary" size="default">
          Secondary
        </Button>
        <Button variant="secondary" size="sm">
          Secondary - Small
        </Button>
        <Button variant="secondary" size="lg">
          Secondary - Large
        </Button>
        <Button variant="secondary" size="icon">
          <AlarmClock />
        </Button>
      </div>

      {/* Ghost Variant */}
      <div className="flex flex-col items-center gap-4">
        <Button variant="ghost" size="default">
          Ghost
        </Button>
        <Button variant="ghost" size="sm">
          Ghost - Small
        </Button>
        <Button variant="ghost" size="lg">
          Ghost - Large
        </Button>
        <Button variant="ghost" size="icon">
          <AlarmClock />
        </Button>
      </div>

      {/* Link Variant */}
      <div className="flex flex-col items-center gap-4">
        <Button variant="link" size="default">
          Link
        </Button>
        <Button variant="link" size="sm">
          Link - Small
        </Button>
        <Button variant="link" size="lg">
          Link - Large
        </Button>
        <Button variant="link" size="icon">
          <AlarmClock />
        </Button>
      </div>
    </div>
  );
}
