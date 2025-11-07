import qs from 'qs';

const STRAPI_API_URL = process.env.STRAPI_API_URL || "http://localhost:1337";
const STRAPI_API_TOKEN = process.env.STRAPI_API_TOKEN;

export async function fetchApi(path: string, urlParamsObject = {}, options = {}) {
    try {
        const mergedOptions = {
            headers: {
                "Content-Type": "application/json",
                ...(STRAPI_API_TOKEN && {
                    Authorization: `Bearer ${STRAPI_API_TOKEN}`,
                }),
            },
            ...options,
        };

        const queryString = qs.stringify(urlParamsObject);
        const requestUrl = `${STRAPI_API_URL}/api${path}${queryString ? `?${queryString}` : ''}`;

        const response = await fetch(requestUrl, mergedOptions);
        const data = await response.json();
        return data;

    } catch (error) {
        console.error("Failed to fetch API:", error);
        throw new Error(`Failed to fetch API: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
}
