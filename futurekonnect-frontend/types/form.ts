export interface FormFieldProps {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  fullWidth?: boolean;
  multiline?: boolean;
  rows?: number;
  value?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  error?: boolean;
  helperText?: string;
  autoComplete?: string;
} 