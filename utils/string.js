export const longestCommonPrefix = (string1, string2) => {
  for (let i of [...Array(string1.length).keys()]) {
    if (i + 1 > string2.length || string1[i] != string2[i]) {
      return i;
    }
  }
  return string1.length;
};
