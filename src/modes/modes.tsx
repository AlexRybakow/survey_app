// @ts-nocheck

import { createGlobalStyle } from 'styled-components'

export const light = {
    body: '#20B2AA',
    fontColor: '#000',
}

export const dark = {
    body: '#2F4F4F',
    fontColor: '#fff',
}

export const GlobalStyles = createGlobalStyle`

body { 
    background-color: ${(props) => props.theme.body}
}

`

