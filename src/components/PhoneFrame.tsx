import Box from '@mui/material/Box';
import type { ReactNode } from 'react';
import Background from './Background';

/**
 * 手機容器：
 * - 手機（< 460px）：固定鋪滿整個視窗（用 100dvh，含安全區），全螢幕無黑邊
 * - 桌面（>= 460px）：置中的圓角機身 mockup
 * 內含單一靜態壁紙圖層 <Background />，三個畫面疊在它上面只動前景。
 */
export default function PhoneFrame({ children }: { children: ReactNode }) {
  return (
    <Box
      sx={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        height: '100dvh',
        overflow: 'hidden',
        bgcolor: '#000',
        '@media (min-width:460px)': {
          position: 'relative',
          top: 'auto',
          height: '90dvh',
          maxHeight: 900,
          width: '100%',
          maxWidth: 430,
          mx: 'auto',
          my: '5dvh',
          borderRadius: '48px',
          boxShadow: '0 0 0 12px #1a1a1a, 0 20px 60px rgba(0,0,0,0.6)',
        },
      }}
    >
      <Background />
      {children}
    </Box>
  );
}
