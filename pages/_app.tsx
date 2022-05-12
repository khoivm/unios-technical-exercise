import React from 'react';
import type { AppProps } from 'next/app';
import { ThemeProvider } from 'theme-ui';
import { THEME } from 'src/theme';

const App = ({ Component, pageProps }: AppProps): JSX.Element => {
    return (
        <ThemeProvider theme={THEME}>
            <Component {...pageProps} />
        </ThemeProvider>
    );
};

export default App;
