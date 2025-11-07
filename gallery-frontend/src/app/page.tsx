import { fetchApi } from "@/lib/api";
import { Painting, StrapiApiResponse, StrapiDataItem } from "@/lib/types";
import PaintingList from "@/components/PaintingList";

export default async function Home() {
  const paintingsResponse: StrapiApiResponse<Painting> = await fetchApi("/paintings", { populate: "*" });

  // Ensure paintingsResponse.data is always an array
  const paintings = Array.isArray(paintingsResponse.data)
    ? paintingsResponse.data
    : (paintingsResponse.data ? [paintingsResponse.data] : []);

  return (
    <main className="container mx-auto p-4">
      <h1 className="text-4xl font-bold text-center my-8">Art Gallery</h1>
      <PaintingList paintings={paintings} />
    </main>
  );
}
