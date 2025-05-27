import {
  type UseFormRegister,
  type UseFormHandleSubmit,
  type FieldErrors,
} from 'react-hook-form';
import { z } from 'zod';


const loginSchema = z.object({
  email: z.string().min(1, 'El email es requerido').email('Formato de email inválido'),
  password: z.string().min(6, 'La contraseña debe tener al menos 6 caracteres')
});

type LoginFormData = z.infer<typeof loginSchema>

interface Props {
  handleSubmit: UseFormHandleSubmit<{ email: string, password: string }, { email: string, password: string }>;
  onSubmit: ( data: LoginFormData ) => Promise<void>;
  errorMessage: string | null;
  register: UseFormRegister<{ email: string, password: string }>;
  errors: FieldErrors<{ email: string, password: string }>;
  isSubmitting: boolean;
}


export const LoginView: React.FC<Props> = ({
  handleSubmit,
  onSubmit,
  errorMessage,
  register,
  errors,
  isSubmitting
}) => {
  return (
    <div className='flex items-center justify-center min-h-screen bg-gray-200'>
      <form
        onSubmit={ handleSubmit( onSubmit ) }
        className='bg-white p-6 rounded- shadow-md w-80'
      >
        <h1 className='text-xl font-bold mb-4 text-center'>
          Iniciar Sesión
        </h1>

        { 
          errorMessage && <p className='text-red-600 mb-2'>
            { errorMessage }
          </p>
        }

          <div className='mb-4'>
            <label className='block text-sm font-medium mb-1'>
              Email
            </label>
            <input
              type='email'
              { ...register('email') }
              className='w-full border boder-gray-300 rounded px-3 py-2'
              placeholder='tu-email@dominio.com'
            />
            { errors.email && <p className='text-red-500 text-sx mt-1'>{ errors.email.message }</p> }
          </div>

          <div className='mb-4'>
            <label className='block text-sm font-medium mb-1'>
              Contraseña
            </label>
            <input
              type='password'
              { ...register('password') }
              className='w-full border boder-gray-300 rounded px-3 py-2'
              placeholder='Contraseña'
            />
            { errors.password && <p className='text-red-500 text-sx mt-1'>{ errors.password.message }</p> }
          </div>

          <button
            type='submit'
            disabled={ isSubmitting }
            className='w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 disabled:opacity-50'
          >
            { isSubmitting ? 'Enviando...' : 'Entrar' }
          </button>

          <p className='text-sm mt-4 text-center'>
            ¿No tienes cuenta? {/*TODO: Implementate Link after rouing config*/}<span className='text-blue-600 hover:underline'>Regístrate</span>
          </p>
      </form>
    </div>
  );
}
