/** @jsxImportSource @emotion/react */

import { css } from "@emotion/react";

export const linkStyle = css`
    font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    text-decoration: none;
    color: black;
    padding: 10px;
    display: inline-block;
    margin: 15px;
    text-align: center;
    font-size: 20px;
    transition-property: border-bottom, font-size;
    transition-duration: 0.7s;

    :hover,
    :active {
        border-bottom: 5px solid #000;
        font-size: 21px;
    }
`