const STRAPI_API_URL = process.env.STRAPI_API_URL || "http://localhost:1337";

export function getStrapiMedia(url: string | null | undefined): string | null {
    if (url == null) {
        return null;
    }

    if (url.startsWith("http") || url.startsWith("//")) {
        return url;
    }

    return `${STRAPI_API_URL}${url}`;
}
