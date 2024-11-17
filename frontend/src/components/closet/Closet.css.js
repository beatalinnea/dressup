/** @jsxImportSource @emotion/react */

import { css } from "@emotion/react";

export const closetStyle = css`
display: flex;
flex-direction:row;
align-items: flex-start;
flex-wrap: wrap;
justify-content: center;
figure {
    display:grid;
    padding: 14px;
    margin: 10px;
    border-radius: 10px;
    background-color: #EDE2f0;
}

img {
    width: 200px;
    max-height: 300px;
    overflow: hidden;
}
`

/*
display: flex;
flex-direction:row;
align-items: flex-start;
flex-wrap: wrap;
justify-content: center;
figure {
    display:grid;
    padding: 14px;
    margin: 10px;
    border-radius: 10px;
    background-color: #EDE2f0;
    height: 350px;
}
Button {
    max-height: 50px;
}
img {
    width: 200px;
    max-height: 300px;
    overflow: hidden;
}
*/