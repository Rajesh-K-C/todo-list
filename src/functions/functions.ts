
export function subStr(str: string, length = 20): string {
    return str.length > length ? str.slice(0, length) + "..." : str;
};

export function getLists(): [] {
    return JSON.parse(localStorage.getItem("todo") || "[]");
}