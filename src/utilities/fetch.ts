import PocketBase from "pocketbase";
import { createBranding, createIcon, createInterface, createSite } from "@/utilities/create";
import { BrandingSchema, IconSchema, InterfaceSchema } from "@/utilities/types";

export const fetchSites = async () => {
    const pb = new PocketBase(process.env.DB_HOST);
    try {
        const res = await pb.collection("sites").getFullList({
            fields: "id, collectionId, name, year, archived, building, industry, image, url",
            sort: "-year",
        });
        return res.map((i) => createSite(i));
    } catch (error) {
        throw error;
    }
};

export const fetchIcons = async (): Promise<IconSchema[]> => {
    const pb = new PocketBase(process.env.DB_HOST);
    try {
        const res = await pb.collection("icons").getFullList({
            fields: "id, collectionId, name, year, installs, images, download",
            sort: "-year",
        });
        return res.map((i) => createIcon(i));
    } catch (error: any) {
        throw error;
    }
};

export const fetchInterfaces = async (): Promise<InterfaceSchema[]> => {
    const pb = new PocketBase(process.env.DB_HOST);
    try {
        const res = await pb.collection("interfaces").getFullList({
            fields: "id, collectionId, name, year, images",
            sort: "-year",
        });
        return res.map((i) => createInterface(i));
    } catch (error: any) {
        throw error;
    }
};

export const fetchBranding = async (): Promise<BrandingSchema[]> => {
    const pb = new PocketBase(process.env.DB_HOST);
    try {
        const res = await pb.collection("branding").getFullList({
            fields: "id, collectionId, name, year, preview, images",
            sort: "-year",
        });
        return res.map((i) => createBranding(i));
    } catch (error: any) {
        throw error;
    }
};

export const fetchDownload = async (
    id: string,
): Promise<{
    collectionId: string;
    name: string;
    installs: number;
    download: string;
}> => {
    const pb = new PocketBase(process.env.DB_HOST);
    try {
        return await pb.collection("icons").getOne(id, { fields: "collectionId, name, installs, download" });
    } catch (error: any) {
        throw error;
    }
};

export const updateDownload = async (id: string, value: number): Promise<{ installs: number }> => {
    const pb = new PocketBase(process.env.DB_HOST);
    try {
        return await pb.collection("icons").update(id, { installs: value }, { fields: "installs" });
    } catch (error: any) {
        throw error;
    }
};
