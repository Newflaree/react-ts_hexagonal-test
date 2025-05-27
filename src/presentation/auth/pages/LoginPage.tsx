import { useAuth } from '../hooks/useAuth';
import { LoginView } from '../views/LoginView';


const LoginPage: React.FC = () => {
  const {
    handleSubmit,
    onSubmit,
    errorMessage,
    register,
    errors,
    isSubmitting,
  } = useAuth();

  return <LoginView
    handleSubmit={ handleSubmit }
    onSubmit={ onSubmit }
    errorMessage={ errorMessage }
    register={ register }
    errors={ errors }
    isSubmitting={ isSubmitting }
  />
}

export default LoginPage;
