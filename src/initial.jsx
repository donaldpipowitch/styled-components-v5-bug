import React from 'react';
import { renderToString } from 'react-dom/server';
import { ServerStyleSheet } from 'styled-components';
import { GlobalStyle } from './styles';
import { Text } from './components/text';

const sheet = new ServerStyleSheet();

export const html = renderToString(
  sheet.collectStyles(
    <>
      <GlobalStyle />
      <Text>Loading...</Text>
    </>
  )
);
export const styleTags = sheet.getStyleTags();
