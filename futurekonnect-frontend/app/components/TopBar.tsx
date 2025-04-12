import { Box, Typography, Divider } from '@mui/material';
import Image from 'next/image';
import { useAuth } from '@/app/contexts/AuthContext';

const TopBar = () => {
  const { user } = useAuth();
  const defaultImage = "https://picsum.photos/536/354";

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
          {user?.username || 'User'}
        </Typography>
        <Image
          src={user?.imageUrl || defaultImage}
          alt="Profile"
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