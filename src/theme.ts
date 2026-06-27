import { createTheme } from '@mui/material/styles';

/** 暗色主題，字體貼近 iOS 系統字 */
export const theme = createTheme({
  palette: {
    mode: 'dark',
  },
  typography: {
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"SF Pro Display"',
      '"SF Pro Text"',
      '"Helvetica Neue"',
      'system-ui',
      'sans-serif',
    ].join(','),
  },
});
