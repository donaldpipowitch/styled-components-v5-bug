import { createGlobalStyle } from 'styled-components';
import normalizeCss from '!raw-loader!normalize.css';
import '!file-loader?name=fonts/fontawesome-webfont.woff!font-awesome/fonts/fontawesome-webfont.woff';
import '!file-loader?name=fonts/fontawesome-webfont.woff2!font-awesome/fonts/fontawesome-webfont.woff2';
import fontAwesomeCss from '!raw-loader!font-awesome/css/font-awesome.min.css';

export const GlobalStyle = createGlobalStyle`
  ${normalizeCss};
  ${fontAwesomeCss};
`;
