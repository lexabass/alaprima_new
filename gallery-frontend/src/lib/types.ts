export interface StrapiMedia {
    id: number;
    attributes: {
        name: string;
        alternativeText: string | null;
        caption: string | null;
        width: number;
        height: number;
        formats: {
            thumbnail: { url: string; };
            small: { url: string; };
            medium: { url: string; };
            large: { url: string; };
        };
        url: string;
    };
}

export interface StrapiDataItem<T> {
    id: number;
    attributes: T;
}

export interface StrapiApiResponse<T> {
    data: StrapiDataItem<T>[] | StrapiDataItem<T>;
    meta: {
        pagination: {
            page: number;
            pageSize: number;
            pageCount: number;
            total: number;
        };
    };
}

export interface Artist {
    name: string;
    bio?: string;
    birth_date?: string;
    photo: { data: StrapiDataItem<StrapiMedia> };
    paintings?: { data: StrapiDataItem<Painting>[] };
}

export interface Painting {
    title: string;
    description?: string;
    creation_date?: string;
    image: { data: StrapiDataItem<StrapiMedia> };
    artist?: { data: StrapiDataItem<Artist> };
    categories?: { data: StrapiDataItem<Category>[] };
}

export interface Category {
    name: string;
    paintings?: { data: StrapiDataItem<Painting>[] };
}
