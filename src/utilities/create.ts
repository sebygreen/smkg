import { BrandingSchema, IconSchema, ImageSchema, InterfaceSchema, SiteSchema } from "@/utilities/types";
import { v4 } from "uuid";

export const createThumbnail = (
    filename: string,
    collection: string,
    id: string,
    thumbnail: "128x128" | "720x512t",
): ImageSchema => {
    const url = `${process.env.NEXT_PUBLIC_DB_FILES}/${collection}/${id}/${filename}?thumb=${thumbnail}`;
    const regex = /([0-9]+)x([0-9]+)/g;
    const match = [...thumbnail.matchAll(regex)][0];
    return {
        url: url,
        width: Number(match[1]),
        height: Number(match[2]),
    };
};

export const createImage = (filename: string, collection: string, id: string): ImageSchema => {
    const url = `${process.env.NEXT_PUBLIC_DB_FILES}/${collection}/${id}/${filename}`;
    const regex = /.+_([0-9]+)x([0-9]+)_.+/g;
    const match = [...filename.matchAll(regex)][0];
    return {
        url: url,
        width: Number(match[1]),
        height: Number(match[2]),
    };
};

export const createToast = (type: "error" | "success" | "warning", message: string) => {
    return {
        id: v4(),
        type: type,
        message: message,
        expired: false,
    };
};

export const createSite = (data: any): SiteSchema => {
    return {
        id: data.id,
        collection: data.collectionId,
        type: "site",
        archived: data.archived,
        building: data.building,
        name: data.name,
        year: data.year,
        industry: data.industry,
        preview: createThumbnail(data.image, data.collectionId, data.id, "720x512t"),
        image: createImage(data.image, data.collectionId, data.id),
        url: data.url,
    };
};

export const createIcon = (data: any): IconSchema => {
    return {
        id: data.id,
        collection: data.collectionId,
        type: "icon",
        name: data.name,
        year: data.year,
        installs: data.installs,
        preview: createThumbnail(data.images[0], data.collectionId, data.id, "128x128"),
        images: data.images.map((i: string) => createImage(i, data.collectionId, data.id)),
        download: data.download,
    };
};

export const createInterface = (data: any): InterfaceSchema => {
    return {
        id: data.id,
        collection: data.collectionId,
        type: "interface",
        name: data.name,
        year: data.year,
        preview: createThumbnail(data.images[0], data.collectionId, data.id, "720x512t"),
        images: data.images.map((i: string) => createImage(i, data.collectionId, data.id)),
    };
};

export const createBranding = (data: any): BrandingSchema => {
    return {
        id: data.id,
        collection: data.collectionId,
        type: "branding",
        name: data.name,
        year: data.year,
        preview: createImage(data.preview, data.collectionId, data.id),
        images: data.images.map((i: string) => createImage(i, data.collectionId, data.id)),
    };
};
