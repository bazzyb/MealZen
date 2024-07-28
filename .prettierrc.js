/**
 * @see https://prettier.io/docs/en/configuration.html
 * @type {import("prettier").Config}
 */
module.exports = {
  plugins: [require.resolve("@trivago/prettier-plugin-sort-imports")],
  printWidth: 120,
  arrowParens: "avoid",
  importOrder: ["<THIRD_PARTY_MODULES>", "^@/", "^./"],
  importOrderSeparation: true,
  importOrderSortSpecifiers: true,
  importOrderGroupNamespaceSpecifiers: true,
};
