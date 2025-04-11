import { Button } from '@mui/material';

interface SubmitButtonProps {
  label: string;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  loading?: boolean;
}

export default function SubmitButton({ label, onClick, type = 'submit', loading = false }: SubmitButtonProps) {
  return (
    <Button
      type={type}
      fullWidth
      variant="contained"
      onClick={onClick}
      disabled={loading}
      sx={{ 
        background: 'linear-gradient(90deg, rgba(90, 147, 193, 0.64) 0%, rgba(35, 93, 140, 0.64) 94%)',
        textTransform: 'uppercase',
        borderRadius: '8px',
        py: 1.5,
        mb: 8,
        '&:hover': {
          background: 'linear-gradient(90deg, rgba(90, 147, 193, 0.74) 0%, rgba(35, 93, 140, 0.74) 94%)',
        },
        fontFamily: 'Montserrat',
        fontWeight: 600,
        fontSize: '18px',
        lineHeight: '24px',
        letterSpacing: '1px',
        textAlign: 'center',
        verticalAlign: 'middle'
      }}
    >
      {loading ? "Loading..." : label}
    </Button>
  );
} 