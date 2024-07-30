export function filenameToSize(filename: any) {
    let regex = /.+_([0-9]+)x([0-9]+)_.+/g;
    let match = [...filename.matchAll(regex)][0];
    return {
        width: Number(match[1]),
        height: Number(match[2]),
    };
}
