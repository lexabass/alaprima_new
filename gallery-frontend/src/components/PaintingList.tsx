import Link from "next/link";
import Image from "next/image";
import { Painting, StrapiDataItem } from "@/lib/types";
import { getStrapiMedia } from "@/lib/media";

interface PaintingListProps {
  paintings: StrapiDataItem<Painting>[];
}

export default function PaintingList({ paintings }: PaintingListProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
      {paintings.map((painting) => {
        const imageUrl = getStrapiMedia(painting.attributes.image.data?.attributes.url);
        const artistName = painting.attributes.artist?.data?.attributes.name || "Unknown Artist";

        return (
          <Link href={`/paintings/${painting.id}`} key={painting.id}>
            <div className="rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300">
              {imageUrl && (
                <Image
                  src={imageUrl}
                  alt={painting.attributes.title}
                  width={500}
                  height={500}
                  className="w-full h-64 object-cover"
                />
              )}
              <div className="p-4 bg-white">
                <h3 className="text-lg font-bold">{painting.attributes.title}</h3>
                <p className="text-gray-600">by {artistName}</p>
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
}
