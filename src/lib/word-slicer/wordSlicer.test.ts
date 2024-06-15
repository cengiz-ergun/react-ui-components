import { wordSlicer } from "./wordSlicer";

describe("Test wordSlicer function", () => {
  test("Slice word", async () => {
    let word = "cengiz";
    let bolderPart = "x";
    let result = wordSlicer(bolderPart, word);
    expect(result).toStrictEqual(["cengiz"]);

    word = "Cengiz";
    bolderPart = "ce";
    result = wordSlicer(bolderPart, word);
    expect(result).toStrictEqual(["Ce", "ngiz"]);

    bolderPart = "eng";
    result = wordSlicer(bolderPart, word);
    expect(result).toStrictEqual(["C", "eng", "iz"]);

    bolderPart = "iz";
    result = wordSlicer(bolderPart, word);
    expect(result).toStrictEqual(["Ceng", "iz"]);

    word = "Rick Sanchez";
    bolderPart = "ri";
    result = wordSlicer(bolderPart, word);
    expect(result).toStrictEqual(["Ri", "ck Sanchez"]);

    bolderPart = "sa";
    result = wordSlicer(bolderPart, word);
    expect(result).toStrictEqual(["Rick ", "Sa", "nchez"]);
  });
});
