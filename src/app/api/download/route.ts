import { fetchDownload, updateDownload } from "@/utilities/fetch";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams;
    const id = searchParams.get("id")!;
    try {
        const current = await fetchDownload(id);
        await updateDownload(id, current.installs + 1);
        const download = `${process.env.NEXT_PUBLIC_DB_FILES}/${current.collectionId}/${id}/${current.download}`;
        const file = await fetch(new URL(download));
        const blob = await file.blob();
        return new NextResponse(blob, {
            headers: {
                "Content-Type": "image/icns",
            },
        });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ type: "error", label: "An unexpected error has occurred." });
    }
}
