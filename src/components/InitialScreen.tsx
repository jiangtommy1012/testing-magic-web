import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import FlashlightOnRounded from '@mui/icons-material/FlashlightOnRounded';
import PhotoCameraRounded from '@mui/icons-material/PhotoCameraRounded';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { showPasscode } from '../features/lock/lockSlice';
import { useConfig } from '../context/ConfigContext';
import { useClock } from '../hooks/useClock';
import { useSwipeUp } from '../hooks/useSwipeUp';

/** 初始鎖屏：大時鐘 + 日期 + 角落按鈕 + 上滑提示 */
export default function InitialScreen() {
  const dispatch = useAppDispatch();
  const screen = useAppSelector((s) => s.lock.screen);
  const { wallpaper } = useConfig();
  const { time, date } = useClock();
  const swipe = useSwipeUp(() => dispatch(showPasscode()));

  return (
    <Box
      {...swipe}
      sx={{
        position: 'absolute',
        inset: 0,
        backgroundImage: `url(${wallpaper})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        color: '#fff',
        touchAction: 'none',
        // 初始畫面在 'initial' 時可見，切走後往上滑出
        transform: screen === 'initial' ? 'translateY(0)' : 'translateY(-100%)',
        opacity: screen === 'initial' ? 1 : 0,
        transition: 'transform 0.45s cubic-bezier(0.22,1,0.36,1), opacity 0.45s ease',
        zIndex: 1,
      }}
    >
      {/* 大時鐘（不自繪頂部狀態列，留白給 iOS 系統列） */}
      <Box
        sx={{
          position: 'absolute',
          top: 'calc(env(safe-area-inset-top) + 24px)',
          left: 0,
          right: 0,
          textAlign: 'center',
          textShadow: '0 2px 14px rgba(0,0,0,0.25)',
        }}
      >
        <Typography sx={{ fontSize: 18, fontWeight: 600, opacity: 0.95 }}>{date}</Typography>
        <Typography sx={{ fontSize: 84, fontWeight: 600, lineHeight: 1, letterSpacing: '-1px' }}>
          {time}
        </Typography>
      </Box>

      {/* 角落：手電筒 / 相機（純視覺） */}
      <Stack
        direction="row"
        justifyContent="space-between"
        sx={{
          position: 'absolute',
          left: 0,
          right: 0,
          bottom: 'calc(env(safe-area-inset-bottom) + 54px)',
          px: '38px',
        }}
      >
        {[FlashlightOnRounded, PhotoCameraRounded].map((Icon, i) => (
          <Box
            key={i}
            sx={{
              width: 48,
              height: 48,
              borderRadius: '50%',
              bgcolor: 'rgba(0,0,0,0.28)',
              backdropFilter: 'blur(8px)',
              WebkitBackdropFilter: 'blur(8px)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Icon sx={{ fontSize: 22 }} />
          </Box>
        ))}
      </Stack>

      {/* 上滑提示 + home indicator */}
      <Box
        sx={{
          position: 'absolute',
          left: 0,
          right: 0,
          bottom: 'calc(env(safe-area-inset-bottom) + 14px)',
          textAlign: 'center',
        }}
      >
        <Typography sx={{ fontSize: 12, opacity: 0.7, mb: '14px', letterSpacing: '0.4px' }}>
          向上滑動以解鎖
        </Typography>
        <Box sx={{ width: 134, height: 5, borderRadius: '3px', bgcolor: '#fff', opacity: 0.9, mx: 'auto' }} />
      </Box>
    </Box>
  );
}
