import { fetchApi } from "@/lib/api";
import { getStrapiMedia } from "@/lib/media";
import { Painting, StrapiApiResponse } from "@/lib/types";
import Image from "next/image";
import Link from "next/link";

export default async function PaintingPage({ params }: { params: { id: string } }) {
  const paintingResponse: StrapiApiResponse<Painting> = await fetchApi(`/paintings/${params.id}`, { populate: "*" });

  if (!paintingResponse.data) {
    return <div>Painting not found.</div>;
  }

  const { title, description, creation_date, image, artist, categories } = (paintingResponse.data as any).attributes;
  const imageUrl = getStrapiMedia(image.data?.attributes.url);
  const artistData = artist.data;
  const categoriesData = categories.data;

  return (
    <div className="container mx-auto p-4 md:p-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          {imageUrl && (
            <Image
              src={imageUrl}
              alt={title}
              width={800}
              height={800}
              className="rounded-lg shadow-lg w-full"
            />
          )}
        </div>
        <div className="flex flex-col justify-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">{title}</h1>
          {artistData && (
            <Link href={`/artists/${artistData.id}`} className="text-2xl text-gray-700 hover:text-blue-600 transition-colors mb-4">
              by {artistData.attributes.name}
            </Link>
          )}
          {creation_date && <p className="text-lg text-gray-500 mb-6">Created on: {new Date(creation_date).toLocaleDateString()}</p>}
          <div className="prose max-w-none mb-6">
            <p>{description}</p>
          </div>
          {categoriesData && categoriesData.length > 0 && (
            <div>
              <h3 className="text-xl font-semibold mb-2">Categories:</h3>
              <div className="flex flex-wrap gap-2">
                {categoriesData.map((category: any) => (
                  <span key={category.id} className="bg-gray-200 text-gray-800 px-3 py-1 rounded-full text-sm">
                    {category.attributes.name}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
