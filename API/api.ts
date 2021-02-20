import { v4 } from "https://deno.land/std/uuid/mod.ts";

/**
 * Разметка склада
 */
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

/**
 * Класс объекта, который можно поместить на склад
 */
class Object {
    name: string
    size: string
    weight: string
    uuid: string

    constructor(name: string, size: string, weight: string) {
        this.name = name
        this.size = size
        this.weight = weight
        this.uuid = v4.generate()
    }
}

/**
 * Получает разметку склада с сервера кейса
 */
export const GetScheme = async () => {
    const body = await fetch("http://127.0.0.1:5000/scheme")
    return new Scheme(await body.json())
}

/**
 * Превращает строку в объект, который можно поместить на склад
 * @param parsable - строка полученная из файла
 */
export const GetItems = async (parsable: string) => {
    const splitBySemicolon = (elem: string) => elem.split(";")
    const items = parsable.split(parsable.includes("\r") ? "\r\n" : "\n")
        .map(splitBySemicolon).slice(1, -1);

    let scheme: Object[] = []
    items.forEach(element => {
        scheme.push(new Object(element[1], element[2], element[3]))
    });

    return scheme
}
