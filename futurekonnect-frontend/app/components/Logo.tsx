import { Box } from '@mui/material';
import Image from 'next/image';

interface FutureKonnectLogoProps {
  width?: number;
  height?: number;
  marginBottom?: number;
}

export default function FutureKonnectLogo({ 
  width = 315, 
  height = 60, 
  marginBottom = 4 
}: FutureKonnectLogoProps) {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', mb: marginBottom }}>
      <Image
        src="/images/fk_logo.png"
        alt="FutureKonnect Logo"
        width={width}
        height={height}
        priority
      />
    </Box>
  );
} 