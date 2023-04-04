import { css } from '@emotion/react';

const GlobalStyles = css`
  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }

  html,
  body {
    margin: 0;
    padding: 0;
    font-family: 'Noto Sans KR', '나눔고딕', 'Nanum Gothic', '맑은고딕',
      'Malgun Gothic', ‘Apple SD Gothic Neo’, '돋움', dotum, '굴림', gulim,
      sans-serif;
    font-size: 16px;
    line-height: 1.5;
  }

  button {
    cursor: pointer;
  }
`;

export default GlobalStyles;
