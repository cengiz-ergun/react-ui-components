import { getIdFromUrl } from "./getIdFromUrl"

describe("Extract id from url", () => {
    test("test-1", () => {
        const url = "https://swapi.dev/api/people/1/"

        const result = getIdFromUrl(url)

        expect(result).toBe(1)
    })

    test("test-2", () => {
        const url = "https://swapi.dev/api/people/21/"

        const result = getIdFromUrl(url)

        expect(result).toBe(21)
    })
})