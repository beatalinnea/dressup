/** @jsxImportSource @emotion/react */

import { css } from "@emotion/react";

export const looksStyle = css`
display: flex;
flex-direction:row;
align-items: flex-start;
flex-wrap: wrap;
figure {
    height: min-content;
}
img {
    width: 100px;
    max-height: 200px;
    overflow: hidden;
}
`