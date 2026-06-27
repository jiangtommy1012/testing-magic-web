import { createContext, useContext, useMemo, type ReactNode } from 'react';

/** 一個桌面 app 圖示 */
export interface AppIcon {
  name: string;
  icon: string;
}

/**
 * 靜態設定（很少變動）：放在 Context 裡，與 Redux 管的動態狀態分開。
 * 例如密碼長度、壁紙、桌面圖示清單。
 */
export interface Config {
  passcodeLength: number;
  wallpaper: string;
  apps: AppIcon[];
}

// 加上 Vite 的 base 前綴，讓資源路徑在本機（/）與 GitHub Pages（/testing-magic-web/）都正確
const asset = (p: string) => `${import.meta.env.BASE_URL}${p}`;

const defaultConfig: Config = {
  passcodeLength: 4, // 未來改密碼長度只改這裡
  wallpaper: asset('images/wallpaper.jpg'),
  apps: [
    { name: '計算機', icon: asset('images/icon-calculator.png') },
    { name: '照片', icon: asset('images/icon-photos.png') },
    { name: '設定', icon: asset('images/icon-setting.png') },
    { name: 'App Store', icon: asset('images/icon-appstore.png') },
  ],
};

const ConfigContext = createContext<Config>(defaultConfig);

interface ConfigProviderProps {
  children: ReactNode;
  /** 可覆寫部分設定（方便測試或未來擴充） */
  value?: Partial<Config>;
}

export function ConfigProvider({ children, value }: ConfigProviderProps) {
  const merged = useMemo<Config>(() => ({ ...defaultConfig, ...value }), [value]);
  return <ConfigContext.Provider value={merged}>{children}</ConfigContext.Provider>;
}

/** 讀取靜態設定 */
export function useConfig(): Config {
  return useContext(ConfigContext);
}
