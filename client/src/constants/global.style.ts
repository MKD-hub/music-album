const commonProperties = {

    space: [0, 4, 8, 16, 32, 64],
    fontSize: [
        '0.875rem',  // 13.5px ≈ 16 * 0.84375
        '1.125rem',  // 18px ≈ 16 * 1.125
        '1.5rem',   // 24px ≈ 16 * 1.5
        '1.875rem', // 30px ≈ 16 * 1.1875
        '2.25rem',  // 36px ≈ 16 * 1.4375
        '2.8125rem' // 45px ≈ 16 * 1.71875
      ],  
      fontFamily: {
        body: 'Open Sans, sans-serif'
    },
}

const lightTheme = {
    ...commonProperties,
    colors: {
        bg: '#ffffff',
        text: '#000000',
        primary: '#3498db',
        secondary: '#f1c40f'
    }
};

const darkTheme = {
    ...commonProperties,
    colors: {
        bg: '#12121212',
        text: '#ffffff',
        primary: '#66d9ef',
        secondary: '#ffd700'
    }
};

export const themes: Record<string, any> = {
    // Used 'any' because common properties is used by both light and dark themes and any kind of data could be in there.
    light: lightTheme,
    dark: darkTheme
}

export function getCurrentTheme(mode: string) {
    return themes[mode] || themes.light;
}
