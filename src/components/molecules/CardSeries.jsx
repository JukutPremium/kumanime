import Link from "next/link";
import Image from "next/image";
import { Badge } from "@/components/atoms/Badge";

import { formatDate } from "@/utils/formatDate";
import { cn } from "@/utils/cn";

export function CardSeries({ title, slug, status, genre, uploaded, image }) {
  return (
    <Link
      href={`/series/${slug}`}
      className={cn(
        "flex flex-col gap-4 relative",
        "w-40 sm:w-48 md:w-56 lg:w-64",
        "transition-all duration-300 ease-in-out",
        "hover:text-primary",
      )}
    >
      <Image
        src={image}
        width={300}
        height={400}
        alt={title}
        className={cn(
          "aspect-[3/4] rounded-2xl object-cover w-full",
          "transition-all duration-300 ease-in-out",
          "hover:shadow-lg hover:shadow-blur hover:shadow-blue-500/50 dark:hover:shadow-primary/50",
        )}
      />
      <div className="flex flex-wrap gap-2">
        <Badge>{status === "ongoing" ? "Ongoing" : "Completed"}</Badge>
        {genre.map((name, index) => (
          <Badge key={index} variant="secondary">
            {name.charAt(0).toUpperCase() + name.slice(1)}
          </Badge>
        ))}
      </div>
      <div>
        <p
          className={cn(
            "text-base sm:text-lg md:text-xl font-semibold",
            "line-clamp-2",
            "visited:text-primary transition-colors duration-300",
          )}
        >
          {title}
        </p>
        <p className="text-forground/80 text-xs sm:text-sm">
          Uploaded: {formatDate(uploaded)}
        </p>
      </div>
    </Link>
  );
}
