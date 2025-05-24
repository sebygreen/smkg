"use server";

import { fetchDownload, updateDownload } from "@/utilities/fetch";
import { revalidatePath } from "next/cache";

export async function download(id: string) {
    if (!id || id == "") {
        console.error("Missing required parameter id");
        return { ok: false };
    }
    try {
        const current = await fetchDownload(id);
        await updateDownload(id, current.installs + 1);
        const download = `${process.env.NEXT_PUBLIC_DB_FILES}/${current.collectionId}/${id}/${current.download}`;
        const file = await fetch(new URL(download));
        const blob = await file.blob();
        revalidatePath("/design");
        return { ok: true, blob };
    } catch (e) {
        console.error(e);
        return { ok: false };
    }
}
