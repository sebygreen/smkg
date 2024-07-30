import "server-only";

import PocketBase from "pocketbase";
import { cache } from "react";
import { Project as WebProject } from "@/types/web";
import { Project as DesignProject } from "@/types/design";

const pb = new PocketBase(process.env.DB_HOST);

export const web = cache(async (): Promise<WebProject[]> => {
    return await pb.collection("web").getFullList({
        requestKey: "web",
        fields: "id, collectionId, archived, building, industry, link, name, screenshot, year",
        sort: "-year",
    });
});

export const design = cache(async (): Promise<DesignProject[]> => {
    return await pb.collection("design").getFullList({
        requestKey: "design",
        fields: "id, collectionId, name, year, type, preview, photos",
        sort: "type, -year",
    });
});
