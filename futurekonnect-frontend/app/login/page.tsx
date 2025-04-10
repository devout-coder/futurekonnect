'use client';

import { useState } from 'react';
import {
  Typography,
  Card,
  CardContent,
  Box,
} from '@mui/material';
import Image from 'next/image';
import FormField from '@/components/FormField';
import SubmitButton from '@/components/SubmitButton';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    console.log('Login attempt with:', { email, password });
  };

  return (
    <Box sx={{ 
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }}>
      <Card sx={{ 
        maxWidth: 400, 
        width: '100%', 
        m: 2, 
        bgcolor: '#0045851F',
        borderRadius: '16px',
        boxShadow: 'none'
      }}>
        <CardContent sx={{ pt: 10, px: 6 }}>
          <Box sx={{ display: 'flex', justifyContent: 'center', mb: 4 }}>
            <Image
              src="/images/fk_logo.png"
              alt="FutureKonnect Logo"
              width={315}
              height={60}
              priority
            />
          </Box>

          <form onSubmit={handleSubmit}>
            <FormField
              label="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
            />
            <FormField
              label="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
            />
            <Box sx={{ textAlign: 'right', mt: 1.5, mb: 6}}>
              <Typography 
                variant="body2" 
                sx={{ 
                  color: 'white',
                  textDecoration: 'underline',
                  cursor: 'pointer',
                  fontSize: '13px',
                  fontFamily: 'inherit'
                }}
              >
                Forgot Password?
              </Typography>
            </Box>

            <SubmitButton label="LOGIN" />
          </form>
        </CardContent>
      </Card>
    </Box>
  );
}