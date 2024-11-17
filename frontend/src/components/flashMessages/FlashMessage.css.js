/** @jsxImportSource @emotion/react */

import { css } from "@emotion/react";

export const flashMessageStyle = css`
z-index: 10;
position: absolute;
text-align: center;
top: 0px;
left: 50%;
width: 100%;
border: solid 2px rgb(176, 215, 176);
background-color: rgba(176, 215, 176, 0.6);
transform: translateX(-50%);
padding: 10px;
font-size: 15px;
letter-spacing: 1px;
font-weight: 600;
color: #6A6A6A;
`