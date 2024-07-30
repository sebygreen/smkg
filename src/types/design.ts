export interface Project {
    collectionId: string;
    id: string;
    name: string;
    photos?: string[];
    preview: string;
    type: "Logo" | "Interface" | "Icon" | "Other";
    year: number;
}

export interface Photo {
    url: string,
    width: number,
    height: number,
}
