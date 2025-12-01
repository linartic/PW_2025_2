// components/forms/FormInput.tsx
// Componente reutilizable para inputs de formulario

import type { ChangeEvent } from 'react';

/**
 * Props del componente FormInput
 */
interface FormInputProps {
  label: string;
  type: string;
  name: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
}

/**
 * Componente de input de formulario con label y estilos básicos
 */
const FormInput = ({
  label,
  type,
  name,
  value,
  onChange,
  placeholder,
  required = false,
  disabled = false,
}: FormInputProps) => {
  return (
    <div className="mb-3">
      <label htmlFor={name} className="form-label">
        {label}
        {required && <span className="text-danger"> *</span>}
      </label>
      <input
        type={type}
        className="form-control"
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        disabled={disabled}
      />
    </div>
  );
};

export default FormInput;
