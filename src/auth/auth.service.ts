import { Injectable } from '@nestjs/common';
import axios, { AxiosResponse } from 'axios';
import { ConfigService } from '@nestjs/config';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';



@Injectable()
export class AuthService {
  constructor(private readonly configService: ConfigService) {}


  async register(user: RegisterDto) {

    const adminToken = await this.getAdminToken();

    try {
      const response = await axios.post(
        `${process.env.KEYCLOAK_AUTH_SERVER_URL}/admin/realms/${process.env.KEYCLOAK_REALM}/users`,
        {
          username: user.username,
          email: user.email,
          enabled: true,
          credentials: [
            {
              type: 'password',
              value: user.password,
              temporary: false,
            },
          ],
        },
        {
          headers: {
            Authorization: `Bearer ${adminToken}`,
            'Content-Type': 'application/json',
          },
        },
      );

      return { success: true, message: 'Usuário registrado com sucesso' };
    } catch (error) {
      return {
        success: false,
        message: 'Erro ao registrar usuário',
        error: error.response?.data || error.message,
      };
    }
  }


  async login(credentials: LoginDto) {
    try {
      const response = await axios.post(
        `${process.env.KEYCLOAK_AUTH_SERVER_URL}/realms/${process.env.KEYCLOAK_REALM}/protocol/openid-connect/token`,
        new URLSearchParams({
          client_id: process.env.KEYCLOAK_CLIENT_ID || '',
          client_secret: process.env.KEYCLOAK_SECRET || '',
          grant_type: 'password',
          username: credentials.username,
          password: credentials.password,
        }),
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        },
      );

      return {
        success: true,
        access_token: response.data.access_token,
        refresh_token: response.data.refresh_token,
        expires_in: response.data.expires_in,
      };
    } catch (error) {
      return {
        success: false,
        message: 'Credenciais inválidas',
        error: error.response?.data || error.message,
      };
    }
  }

  async refreshToken(token: string) {
    try {
      const response = await axios.post(
        `${process.env.KEYCLOAK_AUTH_SERVER_URL}/realms/${process.env.KEYCLOAK_REALM}/protocol/openid-connect/token`,
        new URLSearchParams({
          client_id: process.env.KEYCLOAK_CLIENT_ID || '',
          client_secret: process.env.KEYCLOAK_SECRET || '',
          grant_type: 'refresh_token',
          refresh_token: token,
        }),
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        },
      );

      return {
        success: true,
        access_token: response.data.access_token,
        refresh_token: response.data.refresh_token,
        expires_in: response.data.expires_in,
      };
    } catch (error) {
      return {
        success: false,
        message: 'Erro ao atualizar token',
        error: error.response?.data || error.message,
      };
    }
  }

  async logout(token: string) {
    try {
      await axios.post(
        `${process.env.KEYCLOAK_AUTH_SERVER_URL}/realms/${process.env.KEYCLOAK_REALM}/protocol/openid-connect/logout`,
        new URLSearchParams({
          client_id: process.env.KEYCLOAK_CLIENT_ID || '',
          client_secret: process.env.KEYCLOAK_SECRET || '',
          refresh_token: token,
        }),
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          withCredentials: true,
        },
      );

      return { success: true, message: 'Logout realizado com sucesso' };
    } catch (error) {
      return {
        success: false,
        message: 'Erro ao fazer logout',
        error: error.response?.data || error.message,
      };
    }
  }

  private async getAdminToken() {
    try {
      const response = await axios.post(
        `${process.env.KEYCLOAK_AUTH_SERVER_URL}/realms/master/protocol/openid-connect/token`,
        new URLSearchParams({
          client_id: 'admin-cli',
          username: process.env.KEYCLOAK_ADMIN || '',
          password: process.env.KEYCLOAK_ADMIN_PASSWORD || '',
          grant_type: 'password',
        }),
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        },
      );
      console.log(response)

      return response.data.access_token;
    } catch (error) {
      throw new Error(`Erro ao obter token de admin: ${error.message}`);
    }
  }
}
