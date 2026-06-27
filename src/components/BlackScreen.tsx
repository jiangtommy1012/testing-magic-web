import Box from '@mui/material/Box';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { turnScreenOn } from '../features/lock/lockSlice';

/**
 * 全黑覆蓋層（模擬螢幕熄滅）。點手電筒後出現，蓋住所有畫面；
 * 點任一處就淡出、回到原本的畫面。
 */
export default function BlackScreen() {
  const dispatch = useAppDispatch();
  const off = useAppSelector((s) => s.lock.screenOff);

  return (
    <Box
      onClick={() => dispatch(turnScreenOn())}
      sx={{
        position: 'absolute',
        inset: 0,
        bgcolor: '#000',
        opacity: off ? 1 : 0,
        pointerEvents: off ? 'auto' : 'none',
        transition: 'opacity 0.4s ease',
        zIndex: 50,
      }}
    />
  );
}
