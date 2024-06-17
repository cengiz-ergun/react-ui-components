import { availableApiDetailsNames } from "@/setup/multi-select-starter"
import { queryParemeters } from "./query-parameters"

describe("Query string creator", () => {
    test("test-1", () => {
        const page = 1
        const input = "epica"
        const apiDetail: availableApiDetailsNames = "starWarsCharactersApi"

        const result = queryParemeters.queryWithName(1, input, apiDetail)

        expect(result).toBe(`/?page=1&search=epica`)
    })

    test("test-2", () => {
        const page = 1
        const input = "epica"
        const apiDetail: availableApiDetailsNames = "mortyApi"

        const result = queryParemeters.queryWithName(1, input, apiDetail)

        expect(result).toBe(`/?page=1&name=epica`)
    })
})