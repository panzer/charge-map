import { longestCommonPrefix } from "../string";

describe("longestCommonPrefix", () => {
  it("works for 'abcde' and 'abczyx'", () => {
    expect(longestCommonPrefix("abcde", "abczyx")).toBe(3);
  });
});
