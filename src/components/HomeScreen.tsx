import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { useAppSelector } from '../app/hooks';
import { useConfig } from '../context/ConfigContext';

/** 假桌面：app 圖示網格 + 底部 Dock */
export default function HomeScreen() {
  const screen = useAppSelector((s) => s.lock.screen);
  const { apps } = useConfig();
  const active = screen === 'home';

  return (
    <Box
      sx={{
        position: 'absolute',
        inset: 0,
        color: '#fff',
        // 壁紙是底下的靜態圖層；解鎖時前景（圖示/Dock）從稍微放大淡入，模擬 iOS 進桌面
        transform: active ? 'scale(1)' : 'scale(1.15)',
        opacity: active ? 1 : 0,
        pointerEvents: active ? 'auto' : 'none',
        transition: 'transform 0.45s cubic-bezier(0.22,1,0.36,1), opacity 0.45s ease',
        zIndex: 3,
      }}
    >
      {/* app 網格 */}
      <Box
        sx={{
          position: 'absolute',
          top: 'calc(env(safe-area-inset-top) + 40px)',
          left: 0,
          right: 0,
          px: '26px',
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: '22px 18px',
        }}
      >
        {apps.map((app) => (
          <Stack key={app.name} alignItems="center" spacing={0.75}>
            <Box
              component="img"
              src={app.icon}
              alt={app.name}
              sx={{
                width: 60,
                height: 60,
                borderRadius: '14px',
                boxShadow: '0 4px 10px rgba(0,0,0,0.2)',
                transition: 'transform 0.12s ease',
                '&:active': { transform: 'scale(0.9)' },
              }}
            />
            <Typography sx={{ fontSize: 11, textShadow: '0 1px 3px rgba(0,0,0,0.5)' }}>
              {app.name}
            </Typography>
          </Stack>
        ))}
      </Box>

      {/* Dock */}
      <Stack
        direction="row"
        justifyContent="space-around"
        alignItems="center"
        sx={{
          position: 'absolute',
          left: 14,
          right: 14,
          bottom: 'calc(env(safe-area-inset-bottom) + 16px)',
          height: 92,
          px: '18px',
          borderRadius: '34px',
          bgcolor: 'rgba(255,255,255,0.22)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
        }}
      >
        {apps.map((app) => (
          <Box
            key={app.name}
            component="img"
            src={app.icon}
            alt={app.name}
            sx={{
              width: 60,
              height: 60,
              borderRadius: '14px',
              boxShadow: '0 4px 10px rgba(0,0,0,0.2)',
              transition: 'transform 0.12s ease',
              '&:active': { transform: 'scale(0.9)' },
            }}
          />
        ))}
      </Stack>
    </Box>
  );
}
