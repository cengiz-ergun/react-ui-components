import { wordShortener } from "./wordShortener"

describe("Word shortener", () => {
    test("Make word shorter", () => {
        const word = "Ghost love score"
        const maxAllowedLength = 5

        const result = wordShortener(word, maxAllowedLength)

        expect(result).toBe("Ghost...")
    })

    test("Do nothing", () => {
        const word = "Sleeping sun"
        const maxAllowedLength = 20

        const result = wordShortener(word, maxAllowedLength)

        expect(result).toBe("Sleeping sun")
    })
})