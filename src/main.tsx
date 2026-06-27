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

// 全螢幕 Web App 在手機上：把壁紙鋪到最底層的 <html>，
// 這樣即使 iOS 底部安全區（home indicator）沒被內容蓋住，露出來的也是壁紙而非黑色。
// 只在手機尺寸套用，桌面維持乾淨的黑底機身外觀。
if (window.matchMedia('(max-width: 459px)').matches) {
  document.documentElement.style.background = `#000 url(${import.meta.env.BASE_URL}images/wallpaper.jpg) center / cover no-repeat`;
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
