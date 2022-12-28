import { extendTheme } from '@chakra-ui/react';

const theme = extendTheme({
  config: { initialColorMode: 'dark', useSystemColorMode: false },
  fonts: {
    heading: `"IBM Plex Sans", sans-serif;`,
    body: `"IBM Plex Sans", sans-serif;`,
  },
  styles: {
    global: {
      '*': {
        // border: '1px yellow dotted',
      },
      html: {
        minHeight: '100vh',
        scrollBehavior: 'smooth',
      },
      body: {
        height: '100%',
        margin: 0,
        padding: 0,
        backgroundColor: '#000',
        color: '#fff',
        fontWeight: 'normal',
        fontSize: '18px',
        scrollbarWidth: 'none',
      },
      'body::-webkit-scrollbar': {
        display: 'none',
      },
      '#root': {
        height: '100%',
      },
      p: { fontSize: '18px' },
      'h1, h2, h3, h4, h5, h6': {
        // background: 'linear-gradient(90deg, #00E5ED 0%, #ff5500 100%);',
        // background: 'linear-gradient(90deg, #00E5ED 0%, #0044FF 100%);',
        // '-webkit-text-fill-color': 'transparent',
        // '-webkit-background-clip': 'text',
        // 'background-clip': 'text',
        color: 'rgba(255, 255, 255, .3);',
        background: 'linear-gradient(90deg, #00E5ED 0%, #ff5500 100%);',
        '-webkit-background-clip': 'text',
        '-webkit-text-fill-color': 'transparent',
        'background-clip': 'text',
      },
    },
  },
});

export default theme;
