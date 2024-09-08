export interface ImageSchema {
    url: string;
    width: number;
    height: number;
}

export interface SiteSchema {
    id: string;
    collection: string;
    type: "site";
    archived: boolean;
    building: boolean;
    name: string;
    year: number;
    industry: string;
    preview: ImageSchema;
    image: ImageSchema;
    url?: string;
}

export interface IconSchema {
    id: string;
    collection: string;
    type: "icon";
    name: string;
    year: number;
    installs: number;
    preview: ImageSchema;
    images: ImageSchema[];
    download: string;
}

export interface InterfaceSchema {
    id: string;
    collection: string;
    type: "interface";
    name: string;
    year: number;
    preview: ImageSchema;
    images: ImageSchema[];
}

export interface BrandingSchema {
    id: string;
    collection: string;
    type: "branding";
    name: string;
    year: number;
    preview: ImageSchema;
    images: ImageSchema[];
}
