import Link from "next/link";
import Image from "next/image";

export function CardOld() {
  return (
    <Link
      href={`/series/${seris.slug}`}
      key={index}
      className="flex-shrink-0 relative w-40 sm:w-48 md:w-56 lg:w-64 snap-center"
    >
      <Image
        src={seris.banner}
        width={800}
        height={800}
        alt="image"
        className="aspect-[3/4] rounded-2xl object-cover"
      />
      <div className="pt-4 pb-1">
        {/* Status & Genre Wrapper */}
        <div className="flex flex-wrap gap-2 items-center">
          <div className="flex gap-1 flex-wrap">
            {/* Status */}
            <span
              className={`inline-block px-2 py-1 rounded-2xl text-xs font-bold ${seris.status === "ongoing" ? "bg-orange-600" : "bg-purple-500"
                }`}
            >
              {seris.status.charAt(0).toUpperCase() + seris.status.slice(1)}
            </span>

            {/* Genre */}
            {seris.genre.map((genre, idx) => {
              const pastelColors = [
                "bg-red-200 text-red-800",
                "bg-blue-200 text-blue-800",
                "bg-green-200 text-green-800",
                "bg-yellow-200 text-yellow-800",
                "bg-purple-200 text-purple-800",
                "bg-pink-200 text-pink-800",
                "bg-indigo-200 text-indigo-800",
                "bg-teal-200 text-teal-800",
              ];

              const bgColor = pastelColors[idx % pastelColors.length];

              return (
                <span
                  key={idx}
                  className={`inline-block px-2 py-1 rounded-2xl text-xs font-bold ${bgColor}`}
                >
                  {genre}
                </span>
              );
            })}
          </div>
        </div>
      </div>
      <div className="">
        <p className=" text-white text-base sm:text-lg md:text-xl font-semibold">
          {seris.title}
        </p>
        <p className="text-gray-400 text-xs sm:text-sm">
          Uploaded: {formatDate(seris.updatedOn)}
        </p>
      </div>
    </Link>
  );
}

export function CardSeries({ title, slug, badge, updated, image }) {
  return (
    <Link href={`/series/${slug}`}>
      <Image
        src={image}
        width={300}
        height={400}
        alt={`Picture of the ${title}`}
      />
    </Link>
  );
}
