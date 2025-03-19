import Link from "next/link";
import Image from "next/image";
import { Badge } from "@/components/atoms/Badge";

import formatDate from "@/utils/formatDate";

export function CardSeries({ title, slug, status, badge, uploaded, image }) {
  return (
    <Link
      href={`/series/${slug}`}
      className="flex-shrink-0 relative w-40 sm:w-48 md:w-56 lg:w-64 snap-center"
    >
      <Image
        src={image}
        width={300}
        height={400}
        alt="image"
        className="aspect-[3/4] rounded-2xl object-cover"
      />
      <div className="pt-4 pb-1">
        {status === "ongoing" ? (
          <Badge> Ongoing </Badge>
        ) : (
          <Badge> Completed </Badge>
        )}
      </div>
      <div>
        <p className=" text-white text-base sm:text-lg md:text-xl font-semibold">
          {title}
        </p>
        <p className="text-gray-400 text-xs sm:text-sm">
          Uploaded: {formatDate(uploaded)}
        </p>
      </div>
    </Link>
  );
}
