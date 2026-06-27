import { useEffect } from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import LockRounded from '@mui/icons-material/LockRounded';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { addDigit, clearInput, setLocked, unlock } from '../features/lock/lockSlice';
import { useConfig } from '../context/ConfigContext';
import { copyToClipboard } from '../utils/clipboard';
import PasscodeDots from './PasscodeDots';
import Keypad from './Keypad';

/** 輸入密碼畫面：輸滿最後一位 → 複製到剪貼簿 → 不顯示文字 → 解鎖到假桌面 */
export default function PasscodeScreen() {
  const dispatch = useAppDispatch();
  const screen = useAppSelector((s) => s.lock.screen);
  const input = useAppSelector((s) => s.lock.input);
  const { passcodeLength } = useConfig();

  // 副作用：輸滿最後一位時複製並解鎖
  useEffect(() => {
    if (input.length !== passcodeLength) return;
    dispatch(setLocked(true));
    void copyToClipboard(input);
    const id = setTimeout(() => {
      dispatch(clearInput());
      dispatch(unlock());
    }, 300);
    return () => clearTimeout(id);
  }, [input, passcodeLength, dispatch]);

  const active = screen === 'passcode';

  return (
    <Box
      sx={{
        position: 'absolute',
        inset: 0,
        color: '#fff',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        // 壁紙是底下的靜態圖層；這層只淡入前景，鍵盤略微上升
        opacity: active ? 1 : 0,
        transform: active ? 'translateY(0)' : 'translateY(24px)',
        pointerEvents: active ? 'auto' : 'none',
        transition: 'opacity 0.4s ease, transform 0.45s cubic-bezier(0.22,1,0.36,1)',
        zIndex: 2,
      }}
    >
      {/* 變暗遮罩讓鍵盤更清楚（不用 backdrop-filter，避免 iOS 動畫時閃爍） */}
      <Box
        sx={{
          position: 'absolute',
          inset: 0,
          bgcolor: 'rgba(0,0,0,0.3)',
        }}
      />

      <Stack
        alignItems="center"
        sx={{
          position: 'relative',
          zIndex: 1,
          width: '100%',
          flex: 1,
          mt: 'calc(env(safe-area-inset-top) + 56px)',
        }}
      >
        <LockRounded sx={{ fontSize: 26, mb: '14px' }} />
        <Typography sx={{ fontSize: 17, fontWeight: 500, mb: '22px' }}>輸入密碼</Typography>
        <PasscodeDots length={passcodeLength} filled={input.length} />
        <Keypad onPress={(digit) => dispatch(addDigit({ digit, maxLength: passcodeLength }))} />
      </Stack>

      {/* 底部：緊急 / 取消 */}
      <Stack
        direction="row"
        justifyContent="space-between"
        sx={{
          position: 'relative',
          zIndex: 1,
          width: '100%',
          px: '44px',
          pt: '22px',
          pb: 'calc(env(safe-area-inset-bottom) + 22px)',
          fontSize: 16,
        }}
      >
        <Typography sx={{ cursor: 'pointer', p: '6px' }}>緊急</Typography>
        <Typography sx={{ cursor: 'pointer', p: '6px' }} onClick={() => dispatch(clearInput())}>
          取消
        </Typography>
      </Stack>
    </Box>
  );
}
