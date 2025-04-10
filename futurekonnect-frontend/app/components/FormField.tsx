import { Typography, TextField, Box } from '@mui/material';
import { FormFieldProps } from '@/types/form';

export default function FormField({ 
  label, 
  type = 'text', 
  value, 
  onChange, 
  required = true,
  autoComplete
}: FormFieldProps) {
  return (
    <Box>
      <Typography 
        variant="body1" 
        sx={{ 
          mt: 2.5,
		  mb: 1.5,
          color: 'white',
          fontSize: '14px',
          fontFamily: 'inherit'
        }}
      >
        {label}
      </Typography>
      <TextField
        required={required}
        fullWidth
        type={type}
        value={value}
        onChange={onChange}
        autoComplete={autoComplete}
        sx={{
          '& .MuiOutlinedInput-root': {
            bgcolor: '#5A719159',
            height: '40px',
            '& fieldset': {
              borderColor: 'transparent',
            },
            '&:hover fieldset': {
              borderColor: 'transparent',
            },
            '&.Mui-focused fieldset': {
              borderColor: 'transparent',
            },
          },
          '& .MuiOutlinedInput-input': {
            color: 'white',
            fontFamily: 'Montserrat',
            fontWeight: 500,
            fontSize: '13px',
            lineHeight: '24px',
            letterSpacing: '0px',
          },
        }}
      />
    </Box>
  );
} 