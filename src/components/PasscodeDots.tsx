import Box from '@mui/material/Box';

interface PasscodeDotsProps {
  length: number;
  filled: number;
}

/** 密碼圓點指示：length 個圓，前 filled 個填白 */
export default function PasscodeDots({ length, filled }: PasscodeDotsProps) {
  return (
    <Box sx={{ display: 'flex', gap: '22px', height: 14, mb: '42px' }}>
      {Array.from({ length }).map((_, i) => (
        <Box
          key={i}
          sx={{
            width: 13,
            height: 13,
            borderRadius: '50%',
            border: '1.5px solid #fff',
            bgcolor: i < filled ? '#fff' : 'transparent',
            transform: i < filled ? 'scale(1.05)' : 'none',
            transition: 'background-color 0.15s ease, transform 0.15s ease',
          }}
        />
      ))}
    </Box>
  );
}
