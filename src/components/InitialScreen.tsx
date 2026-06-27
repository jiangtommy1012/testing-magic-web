import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import FlashlightOnRounded from '@mui/icons-material/FlashlightOnRounded';
import PhotoCameraRounded from '@mui/icons-material/PhotoCameraRounded';
import type { PointerEvent } from 'react';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { showPasscode, turnScreenOff } from '../features/lock/lockSlice';
import { useClock } from '../hooks/useClock';
import { useSwipeUp } from '../hooks/useSwipeUp';

/** 初始鎖屏：大時鐘 + 日期 + 角落按鈕 + 上滑提示 */
export default function InitialScreen() {
  const dispatch = useAppDispatch();
  const screen = useAppSelector((s) => s.lock.screen);
  const { time, date } = useClock();
  const swipe = useSwipeUp(() => dispatch(showPasscode()));
  const active = screen === 'initial';

  return (
    <Box
      {...swipe}
      sx={{
        position: 'absolute',
        inset: 0,
        color: '#fff',
        touchAction: 'none',
        // 壁紙是底下的靜態圖層，這層只放前景；離開時前景往上飄並淡出
        transform: active ? 'translateY(0)' : 'translateY(-40px)',
        opacity: active ? 1 : 0,
        pointerEvents: active ? 'auto' : 'none',
        transition: 'transform 0.45s cubic-bezier(0.22,1,0.36,1), opacity 0.4s ease',
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

      {/* 角落：手電筒 / 相機。手電筒點了會熄屏，相機純視覺。
          stopPropagation 避免點按鈕被外層上滑手勢當成點擊而解鎖。 */}
      <Stack
        direction="row"
        justifyContent="space-between"
        sx={{
          position: 'absolute',
          left: 0,
          right: 0,
          bottom: 'calc(env(safe-area-inset-bottom) + 18px)',
          px: '36px',
        }}
      >
        {[
          { Icon: FlashlightOnRounded, onClick: () => dispatch(turnScreenOff()) },
          { Icon: PhotoCameraRounded, onClick: undefined },
        ].map(({ Icon, onClick }, i) => (
          <Box
            key={i}
            onPointerDown={(e: PointerEvent) => e.stopPropagation()}
            onPointerUp={(e: PointerEvent) => e.stopPropagation()}
            onClick={(e) => {
              e.stopPropagation();
              onClick?.();
            }}
            sx={{
              width: 66,
              height: 66,
              borderRadius: '50%',
              bgcolor: 'rgba(255,255,255,0.18)',
              backdropFilter: 'blur(10px)',
              WebkitBackdropFilter: 'blur(10px)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              transition: 'transform 0.1s ease',
              '&:active': { transform: 'scale(0.92)' },
            }}
          >
            <Icon sx={{ fontSize: 30 }} />
          </Box>
        ))}
      </Stack>

      {/* 上滑提示 + home indicator（純視覺，不攔截點擊，否則會擋住角落按鈕） */}
      <Box
        sx={{
          position: 'absolute',
          left: 0,
          right: 0,
          bottom: 'calc(env(safe-area-inset-bottom) + 14px)',
          textAlign: 'center',
          pointerEvents: 'none',
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
