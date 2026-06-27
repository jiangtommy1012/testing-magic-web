import Box from '@mui/material/Box';
import type { ReactNode } from 'react';

/**
 * 手機容器：
 * - 手機（< 460px）：position fixed inset 0 鋪滿整個視窗，全螢幕無黑邊
 * - 桌面（>= 460px）：置中的圓角機身 mockup
 */
export default function PhoneFrame({ children }: { children: ReactNode }) {
  return (
    <Box
      sx={{
        position: 'fixed',
        inset: 0,
        overflow: 'hidden',
        bgcolor: '#000',
        '@media (min-width:460px)': {
          position: 'relative',
          inset: 'auto',
          width: '100%',
          maxWidth: 430,
          height: '90vh',
          maxHeight: 900,
          mx: 'auto',
          my: '5vh',
          borderRadius: '48px',
          boxShadow: '0 0 0 12px #1a1a1a, 0 20px 60px rgba(0,0,0,0.6)',
        },
      }}
    >
      {children}
    </Box>
  );
}
