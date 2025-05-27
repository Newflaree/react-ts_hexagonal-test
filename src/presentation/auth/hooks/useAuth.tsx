import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAuthStore } from '../../..//application/state/authStore';
import { useNavigate, Link } from 'react-router-dom';


const loginSchema = z.object({
  email: z.string().min(1, 'El email es requerido').email('Formato de email inválido'),
  password: z.string().min(6, 'La contraseña debe tener al menos 6 caracteres')
});

type LoginFormData = z.infer<typeof loginSchema>

export const useAuth = () => {
  const {
    register,
    handleSubmit,
    formState: {
      errors,
      isSubmitting
    }
  } = useForm<LoginFormData>({
    resolver: zodResolver( loginSchema )
  });
  const login = useAuthStore( ( state ) => state.login );
  //const navigate = useNavigate();
  const [ errorMessage, setErrorMessage ] = useState<string | null>(null);

  const onSubmit = async ( data: LoginFormData ) => {
    setErrorMessage( null );

    try {
      await login( data.email, data.password );
      // TODO: Impletatite routing
      //navigate('/dashboard');

    } catch ( error: any ) {
      console.log( error );
      setErrorMessage( 'Credenciales incorrectas. Por favor, intentar de nuevo' );
    }
  }

  return {
    register,
    handleSubmit,
    errors,
    isSubmitting,
    errorMessage,
    onSubmit
  }
}
