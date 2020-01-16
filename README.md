# `styled-components-v5-bug`

This works:

```bash
$ yarn
$ yarn start
# visit http://localhost:4200
```

If you update to Styled Components v5 it breaks:


```bash
$ yarn add styled-components@^5.0.0
$ yarn start
# visit http://localhost:4200 - BROWSER FREEZES
```

It looks like its because of `./src/styles.ts`:

```js
export const GlobalStyle = createGlobalStyle`
  ${normalizeCss};
  ${fontAwesomeCss};
`;
```

If you remove the CSS styles it starts working again. Maybe there was a change in the CSS parser from v4 to v5?
