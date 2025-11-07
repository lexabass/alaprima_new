import { fetchApi } from "@/lib/api";
import { getStrapiMedia } from "@/lib/media";
import { Artist, StrapiApiResponse, Painting } from "@/lib/types";
import Image from "next/image";
import PaintingList from "@/components/PaintingList";

export default async function ArtistPage({ params }: { params: { id: string } }) {
  const artistResponse: StrapiApiResponse<Artist> = await fetchApi(`/artists/${params.id}`, { populate: ["photo", "paintings.image", "paintings.artist"] });

  if (!artistResponse.data) {
    return <div>Artist not found.</div>;
  }

  const { name, bio, birth_date, photo, paintings } = (artistResponse.data as any).attributes;
  const imageUrl = getStrapiMedia(photo.data?.attributes.url);

  return (
    <div className="container mx-auto p-4 md:p-8">
      <div className="flex flex-col md:flex-row items-start gap-8">
        {imageUrl && (
          <div className="md:w-1/3">
            <Image
              src={imageUrl}
              alt={name}
              width={400}
              height={400}
              className="rounded-full shadow-lg mx-auto"
            />
          </div>
        )}
        <div className="md:w-2/3">
          <h1 className="text-4xl md:text-5xl font-bold mb-2">{name}</h1>
          {birth_date && <p className="text-lg text-gray-500 mb-4">Born: {new Date(birth_date).toLocaleDateString()}</p>}
          <div className="prose max-w-none">
            <p>{bio}</p>
          </div>
        </div>
      </div>

      {paintings && paintings.data && paintings.data.length > 0 && (
        <div className="mt-12">
          <h2 className="text-3xl font-bold mb-6 text-center">Works by {name}</h2>
          <PaintingList paintings={paintings.data} />
        </div>
      )}
    </div>
  );
}
