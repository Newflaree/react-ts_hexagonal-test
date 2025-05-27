import type { AuthService } from '../../domain/ports/AuthService';
import { httpClient } from '../api/httpClient';


interface LoginResponse { token: string; }
interface RegisterResponse { token: string; }

export class AuthServiceHttp implements AuthService {
  async login(
    email: string,
    password: string
  ): Promise<string> {
    const response = await httpClient.post<LoginResponse>( '/auth/login', {
      email,
      password
    });
    return response.data.token;
  }

  async register(
    name: string,
    email: string,
    password: string,
    img?: File | string
  ): Promise<string> {
    let payload: any = {
      name,
      email,
      password,
    }

    if ( img ) {
      if ( img instanceof File ) {
        payload.img = await fileToBase64( img );
      } else {
        payload.img = img;
      }
    }

    const response = await httpClient.post<RegisterResponse>( '/auth/register', payload );
    return response.data.token;
  }
}

const fileToBase64 = async ( file: File ): Promise<string> => {
  return new Promise( ( res, rej ) => {
    const reader = new FileReader();
    reader.onload = () => res( reader.result as string );
    reader.onerror = err => rej( err );
    reader.readAsDataURL( file );
  });
}
