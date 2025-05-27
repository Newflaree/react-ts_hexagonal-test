export interface AuthService {
  login( email: string, password: string ): Promise<string>;
  register( name: string, email: string, password: string, img?: File | string ): Promise<string>;
}
