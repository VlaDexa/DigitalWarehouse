import { v4 } from "https://deno.land/std/uuid/mod.ts";

export class Scheme {
    "1": string[][]
    "2": string[][]
    "4": string[][]

    constructor(response: {
        size: { size_x: number, size_y: number, size_z: number }, merged: string[][]
    }) {
        let merged = response.merged
        this[1] = []
        this[2] = []
        this[4] = []

        merged.forEach(element => {
            switch (element.length) {
                case 1:
                    this["1"].push(element)
                    break;
                case 2:
                    this["2"].push(element)
                    break;
                case 4:
                    this["4"].push(element)
                    break;
            }
        });
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
