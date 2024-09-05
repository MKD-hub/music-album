import '@emotion/react'

declare module '@emotion/react' {
    export interface Theme {
        space: number[],
        fontSize: string[],
        fontFamily: { body: string },
        colors: {
            bg: string,
            primary: string,
            secondary: string
        }
    }
}