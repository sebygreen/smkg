export interface ImageSchema {
    url: string;
    width: number;
    height: number;
}

export interface ProjectBase {
    id: string;
    collection: string;
    name: string;
    year: number;
}

export interface ProjectSite extends ProjectBase {
    type: "site";
    archived: boolean;
    building: boolean;
    industry: "Music Festival" | "Finance" | "Videography" | "Social Networking" | "Education";
    preview: ImageSchema;
    images: ImageSchema[];
    url?: string;
}

export interface ProjectIcon extends ProjectBase {
    type: "icon";
    installs: number;
    preview: ImageSchema;
    images: ImageSchema[];
    download: string;
}

export interface ProjectInterface extends ProjectBase {
    type: "interface";
    preview: ImageSchema;
    images: ImageSchema[];
}

export interface ProjectBranding extends ProjectBase {
    type: "branding";
    preview: ImageSchema;
    images: ImageSchema[];
}
