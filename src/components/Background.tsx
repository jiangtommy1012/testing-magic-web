import Box from '@mui/material/Box';
import { useConfig } from '../context/ConfigContext';

/**
 * 單一靜態壁紙圖層，所有畫面共用。
 * 之前每個畫面各自帶一張壁紙、整屏滑動，導致兩張壁紙交錯閃一下，
 * 而且滑動的壁紙在 iOS 上蓋不滿底部安全區（露出黑邊）。
 * 改成這層固定不動、鋪滿整個視窗，畫面只動前景內容即可。
 */
export default function Background() {
  const { wallpaper } = useConfig();
  return (
    <Box
      aria-hidden
      sx={{
        position: 'absolute',
        inset: 0,
        minHeight: '100dvh',
        backgroundImage: `url(${wallpaper})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        zIndex: 0,
      }}
    />
  );
}
