import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { store } from './app/store';
import { ConfigProvider } from './context/ConfigContext';
import { theme } from './theme';
import App from './App';
import './index.css';

// 全螢幕 Web App 在手機上：把壁紙鋪到最底層的 <html> 和 <body>，
// 這樣即使 iOS 底部安全區（home indicator）沒被內容蓋住，露出來的也是壁紙而非黑色。
// 注意：一定要連 <body> 一起設，否則 body 的深色底會蓋住 html 的壁紙。
// 用 inline style 確保蓋過 index.css 與 MUI CssBaseline 的底色。只在手機尺寸套用。
if (window.matchMedia('(max-width: 459px)').matches) {
  const backstop = `#000 url(${import.meta.env.BASE_URL}images/wallpaper.jpg) center / cover no-repeat`;
  document.documentElement.style.background = backstop;
  document.body.style.background = backstop;
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <ConfigProvider>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <App />
        </ThemeProvider>
      </ConfigProvider>
    </Provider>
  </StrictMode>,
);
