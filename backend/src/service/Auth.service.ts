import { LoginRequest } from 'src/dto/requestDTO/LoginRequestDTO';
import { SignInRequest } from 'src/dto/requestDTO/SignInRequestDTO';

export interface AuthServiceInterface {
  login(request: LoginRequest): Promise<any>;
  signIn(request: SignInRequest): Promise<any>;
  logout(refreshToken: string, userId: number): Promise<void>;

  refreshToken(refreshToken: string): Promise<any>;
}
