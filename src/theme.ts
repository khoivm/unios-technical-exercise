import { Theme } from '@theme-ui/css';
export const BLUE_SCALE = {
    10: '#D9E5F8',
    20: '#9BBCF7',
    30: '#789FF6',
    40: '#5680F6',
    50: '#335EF5',
    60: '#1139F5', //Primary
    70: '#0023D9',
    80: '#001CBD',
    90: '#0015A1',
    100: '#000F85',
};

export const NAVYBLUE_SCALE = {
    10: '#E7ECF7',
    20: '#BBC7E2',
    30: '#94A5CC',
    40: '#7287B6',
    50: '#546BA0',
    60: '#3A538A',
    70: '#253E74',
    80: '#142C5F',
    90: '#081D49',
    100: '#051433', //Secondary
};

export const GREY_SCALE = {
    20: '#F7F7F7',
    30: '#E5E5E5', //Light grey
    40: '#C8C8C8',
    50: '#A0A0A0',
    60: '#757575',
    70: '#4D4D4D', //Dark grey
    80: '#323232',
    90: '#222222',
};

export const RED_SCALE = {
    10: '#FADEDC',
    20: '#FAC7C2',
    30: '#FAAAA1',
    40: '#FA887B',
    50: '#FA604D',
    60: '#FA3419',
    70: '#CD2610',
    80: '#A11906',
    90: '#740E01',
    100: '#470800',
};

export const WHITE_TINT = {
    10: 'rgb(255,255,255,0.1)',
    20: 'rgb(255,255,255,0.2)',
    30: 'rgb(255,255,255,0.3)',
    40: 'rgb(255,255,255,0.4)',
    50: 'rgb(255,255,255,0.5)',
    60: 'rgb(255,255,255,0.6)',
    70: 'rgb(255,255,255,0.7)',
    80: 'rgb(255,255,255,0.8)',
    90: 'rgb(255,255,255,0.9)',
};

export const BLACK_TINT = {
    10: 'rgb(0,0,0,0.1)',
    20: 'rgb(0,0,0,0.2)',
    30: 'rgb(0,0,0,0.3)',
    40: 'rgb(0,0,0,0.4)',
    50: 'rgb(0,0,0,0.5)',
    60: 'rgb(0,0,0,0.6)',
    70: 'rgb(0,0,0,0.7)',
    80: 'rgb(0,0,0,0.8)',
    90: 'rgb(0,0,0,0.9)',
};

export const PRIMARY = BLUE_SCALE[60];
export const SECONDARY = NAVYBLUE_SCALE[100];
export const RED_ERROR = RED_SCALE[60];
export const MUTED = GREY_SCALE[20];
export const OFF_BLACK = BLACK_TINT[70];
export const THEME: Theme = {
    colors: {
        text: 'white',
        background: SECONDARY,
        primary: PRIMARY,
        secondary: BLUE_SCALE[80],
        muted: '#191919',
        highlight: '#29112c',
        gray: '#999',
        purple: '#c0f',
    },
    fonts: {
        body: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", sans-serif',
        heading: 'inherit',
        monospace: 'Menlo, monospace',
    },
    space: [0, 4, 8, 12, 16, 20, 32, 40, 64, 96, 128, 160, 256, 512],
    fontSizes: [12, 14, 16, 20, 24, 32, 48, 64, 72],
    fontWeights: {
        body: 400,
        heading: 700,
        display: 900,
    },
    lineHeights: {
        body: 1.5,
        heading: 1.25,
    },
    text: {
        heading: {
            fontFamily: 'heading',
            fontWeight: 'heading',
            lineHeight: 'heading',
        },
        display: {
            variant: 'text.heading',
            fontSize: [5, 6],
            fontWeight: 'display',
            letterSpacing: '-0.03em',
            mt: 3,
        },
    },

    buttons: {
        primary: {
            color: 'white',
            bg: 'primary',
            transition: 'all .1s',
            cursor: 'pointer',
            '&:hover': {
                bg: 'secondary',
            },
        },
        secondary: {
            color: 'background',
            bg: 'secondary',
        },
    },

    styles: {
        Container: {
            p: 3,
            maxWidth: 1024,
        },
        root: {
            fontFamily: 'body',
            lineHeight: 'body',
            fontWeight: 'body',
        },
        h1: {
            variant: 'text.display',
        },
        h2: {
            variant: 'text.heading',
            fontSize: 5,
        },
        h3: {
            variant: 'text.heading',
            fontSize: 4,
        },
        h4: {
            variant: 'text.heading',
            fontSize: 3,
        },
        h5: {
            variant: 'text.heading',
            fontSize: 2,
        },
        h6: {
            variant: 'text.heading',
            fontSize: 1,
        },
        a: {
            color: 'primary',
            '&:hover': {
                color: 'secondary',
            },
        },
        pre: {
            variant: 'prism',
            fontFamily: 'monospace',
            fontSize: 1,
            p: 3,
            color: 'text',
            bg: 'muted',
            overflow: 'auto',
            code: {
                color: 'inherit',
            },
        },
        code: {
            fontFamily: 'monospace',
            color: 'secondary',
            fontSize: 1,
        },
        inlineCode: {
            fontFamily: 'monospace',
            color: 'secondary',
            bg: 'muted',
        },
        table: {
            width: '100%',
            my: 4,
            borderCollapse: 'separate',
            borderSpacing: 0,
            'th,td': {
                textAlign: 'left',
                py: '4px',
                pr: '4px',
                pl: 0,
                borderColor: 'muted',
                borderBottomStyle: 'solid',
            },
        },
        th: {
            verticalAlign: 'bottom',
            borderBottomWidth: '2px',
        },
        td: {
            verticalAlign: 'top',
            borderBottomWidth: '1px',
        },
        hr: {
            border: 0,
            borderBottom: '1px solid',
            borderColor: 'muted',
        },
        img: {
            maxWidth: '100%',
        },
    },
};
