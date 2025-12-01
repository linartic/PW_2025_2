// components/forms/SubmitButton.tsx
// Componente reutilizable para botones de submit

import type { FormEvent } from 'react';

/**
 * Props del componente SubmitButton
 */
interface SubmitButtonProps {
  text: string;
  loading?: boolean;
  disabled?: boolean;
  onClick?: (e: FormEvent) => void;
}

/**
 * Botón de submit con estado de carga
 */
const SubmitButton = ({
  text,
  loading = false,
  disabled = false,
  onClick,
}: SubmitButtonProps) => {
  return (
    <button
      type="submit"
      className="btn btn-primary w-100"
      disabled={disabled || loading}
      onClick={onClick}
    >
      {loading ? (
        <>
          <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
          Cargando...
        </>
      ) : (
        text
      )}
    </button>
  );
};

export default SubmitButton;
