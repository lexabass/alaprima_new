import Link from "next/link";
import Image from "next/image";
import { Artist, StrapiDataItem } from "@/lib/types";
import { getStrapiMedia } from "@/lib/media";

interface ArtistListProps {
  artists: StrapiDataItem<Artist>[];
}

export default function ArtistList({ artists }: ArtistListProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
      {artists.map((artist) => {
        const imageUrl = getStrapiMedia(artist.attributes.photo.data?.attributes.formats.thumbnail.url);

        return (
          <Link href={`/artists/${artist.id}`} key={artist.id}>
            <div className="text-center rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300 bg-white">
              {imageUrl ? (
                <Image
                  src={imageUrl}
                  alt={artist.attributes.name}
                  width={300}
                  height={300}
                  className="w-full h-80 object-cover"
                />
              ) : (
                <div className="w-full h-80 bg-gray-200 flex items-center justify-center">
                  <span className="text-gray-500">No Image</span>
                </div>
              )}
              <div className="p-4">
                <h3 className="text-xl font-bold">{artist.attributes.name}</h3>
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
}
