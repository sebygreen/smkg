export const filenameToSize = (filename: any) => {
    let regex = /.+_([0-9]+)x([0-9]+)_.+/g;
    let match = [...filename.matchAll(regex)][0];
    return {
        width: Number(match[1]),
        height: Number(match[2]),
    };
};

export const downloadFile = (blob: Blob, name: string): void => {
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = name;
    document.body.appendChild(link);
    link.click();
    link.remove();
};
