export interface Rating {
    simplicity: number;
    performance: number;
    scalability: number;
    cost: number;
    limitations: number;
    customisation: number;
}

export interface Offering {
    title: "Builder" | "Classic" | "Hybrid" | "Dynamic";
    description: string;
    rating: Rating;
}

export interface Project {
    archived: boolean;
    building: boolean;
    collectionId: string;
    id: string;
    industry: string;
    link: string;
    name: string;
    screenshot: string;
    year: number;
}
