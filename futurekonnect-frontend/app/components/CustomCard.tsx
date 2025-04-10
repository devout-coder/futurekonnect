import { Card, CardContent, Box } from '@mui/material';
import { ReactNode } from 'react';

interface CustomCardProps {
  children: ReactNode;
  maxWidth?: number;
  width?: string;
  margin?: number;
  paddingTop?: number;
  paddingX?: number;
}

export default function CustomCard({ 
  children, 
  maxWidth = 400, 
  width = '100%', 
  margin = 2,
  paddingTop = 10,
  paddingX = 6
}: CustomCardProps) {
  return (
    <Card sx={{ 
      maxWidth, 
      width, 
      m: margin, 
      bgcolor: '#0045851F',
      borderRadius: '16px',
      boxShadow: 'none'
    }}>
      <CardContent sx={{ pt: paddingTop, px: paddingX }}>
        {children}
      </CardContent>
    </Card>
  );
} 