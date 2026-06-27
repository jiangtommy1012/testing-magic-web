import Box from '@mui/material/Box';
import ButtonBase from '@mui/material/ButtonBase';
import Typography from '@mui/material/Typography';

interface KeypadProps {
  onPress: (digit: string) => void;
}

const KEYS: Array<{ num: string; letters: string }> = [
  { num: '1', letters: '' },
  { num: '2', letters: 'ABC' },
  { num: '3', letters: 'DEF' },
  { num: '4', letters: 'GHI' },
  { num: '5', letters: 'JKL' },
  { num: '6', letters: 'MNO' },
  { num: '7', letters: 'PQRS' },
  { num: '8', letters: 'TUV' },
  { num: '9', letters: 'WXYZ' },
  { num: '0', letters: '' },
];

/** 毛玻璃數字鍵盤，3 欄網格、0 置中 */
export default function Keypad({ onPress }: KeypadProps) {
  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: '14px 26px',
        width: 288,
        mx: 'auto',
      }}
    >
      {KEYS.map(({ num, letters }) => (
        <ButtonBase
          key={num}
          onClick={() => onPress(num)}
          sx={{
            gridColumn: num === '0' ? 2 : 'auto',
            width: 78,
            height: 78,
            borderRadius: '50%',
            color: '#fff',
            display: 'flex',
            flexDirection: 'column',
            bgcolor: 'rgba(255,255,255,0.18)',
            backdropFilter: 'blur(14px)',
            WebkitBackdropFilter: 'blur(14px)',
            border: '0.5px solid rgba(255,255,255,0.25)',
            transition: 'background-color 0.12s ease, transform 0.08s ease',
            '&:active': { bgcolor: 'rgba(255,255,255,0.45)', transform: 'scale(0.95)' },
          }}
        >
          <Typography sx={{ fontSize: 34, fontWeight: 400, lineHeight: 1 }}>{num}</Typography>
          <Typography
            sx={{
              fontSize: 10,
              fontWeight: 600,
              letterSpacing: '2px',
              mt: '3px',
              height: 13,
            }}
          >
            {letters}
          </Typography>
        </ButtonBase>
      ))}
    </Box>
  );
}
