import { fetchApi } from "@/lib/api";
import { Artist, StrapiApiResponse } from "@/lib/types";
import ArtistList from "@/components/ArtistList";

export default async function ArtistsPage() {
  const artistsResponse: StrapiApiResponse<Artist> = await fetchApi("/artists", { populate: "photo" });

  const artists = Array.isArray(artistsResponse.data)
    ? artistsResponse.data
    : (artistsResponse.data ? [artistsResponse.data] : []);

  return (
    <main className="container mx-auto p-4">
      <h1 className="text-4xl font-bold text-center my-8">Artists</h1>
      <ArtistList artists={artists} />
    </main>
  );
}
