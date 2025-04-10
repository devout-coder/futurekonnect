import { Box, Typography, Divider } from '@mui/material';
import Image from 'next/image';

const TopBar = () => {
  return (
    <Box sx={{ 
      display: 'flex',
      flexDirection: 'column',
      backgroundColor: '#09111B',
      position: 'sticky',
      // top: 0,
    }}>
      <Box sx={{
        display: 'flex',
        justifyContent: 'flex-end',
        alignItems: 'center',
        padding: '34px 100px',
        gap: '16px'
      }}>
        <Typography 
          sx={{
            fontFamily: 'Montserrat',
            fontWeight: 500,
            fontSize: '15px',
            lineHeight: '24px',
            letterSpacing: '0px',
            textAlign: 'right',
            color: '#ffffff'
          }}
        >
         Awesome 
        </Typography>
        <Image
          src="https://picsum.photos/536/354"
          alt="Network"
          width={40}
          height={40}
          style={{ borderRadius: '50%' }}
        />
      </Box>
      <Divider orientation="horizontal" sx={{ bgcolor: 'rgba(255, 255, 255, 0.2)' }} />
    </Box>
  );
};

export default TopBar; 