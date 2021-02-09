import { v4 } from "https://deno.land/std/uuid/mod.ts";

class Scheme {
    size: {
        size_x: number,
        size_y: number,
        size_z: number
    }
    merged: string[][]

    constructor(response: {
        size: { size_x: number, size_y: number, size_z: number }, merged: any[][]
    }) {
        // Ни диструктаризировать, ни просто присвоить this. Придёться наслаждаться этой красотой
        this.size = response.size
        this.merged = response.merged
    }
}

export const GetScheme = async () => {
    const body = await fetch("http://127.0.0.1:5000/scheme")
    return new Scheme(await body.json())
}

export const GetItems = async (parsable:string) => {
    const splitBySemicolon = (elem: string) => elem.split(";")
    const items = parsable.split(parsable.includes("\r") ? "\r\n" : "\n")
        .map(splitBySemicolon).slice(1, -1);

    let scheme: { name: string, size: string, weight: string, uuid: string }[] = []
    items.forEach(element => {
        scheme.push({ name: element[1], size: element[2], weight: element[3], uuid: v4.generate() })
    });

    return scheme
}
