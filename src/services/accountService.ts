import zpiApi from '../api';
import { LogInFormInputs, RegisterFormInputs, UserDataInfo } from '../types';
import UserDetailsService from './userDetailsService';

class AccountService {
  public static async registerUser(
    userInput: RegisterFormInputs,
  ): Promise<void> {
    // eslint-disable-next-line no-useless-catch
    try {
      return (await zpiApi.post(`/Account/register`, userInput)).data;
    } catch (err: any) {
      throw err;
    }
  }

  public static async logInUser(
    userInput: LogInFormInputs,
  ): Promise<UserDataInfo> {
    const token = (await zpiApi.post(`/Account/login`, userInput)).data;
    localStorage.setItem('token', token);
    return UserDetailsService.getUserDetails();
  }

  public static async verifyEmail(urlToken: string): Promise<void> {
    // eslint-disable-next-line no-useless-catch
    try {
      return (
        await zpiApi.post(`/Account/verify`, urlToken, {
          headers: {
            'Content-Type': 'application/json',
          },
        })
      ).data;
    } catch (err: any) {
      throw err;
    }
  }

  public static async forgotPassword(email: string): Promise<void> {
    // eslint-disable-next-line no-useless-catch
    try {
      return (
        await zpiApi.post(`/Account/forgot-password`, email, {
          headers: {
            'Content-Type': 'application/json',
          },
        })
      ).data;
    } catch (err: any) {
      throw err;
    }
  }

  public static async resetPassword(
    token: string,
    newPassword: string,
    confirmPassword: string,
  ): Promise<void> {
    // eslint-disable-next-line no-useless-catch
    try {
      return (
        await zpiApi.put(`/Account/reset-password`, {
          token,
          newPassword,
          confirmPassword,
        })
      ).data;
    } catch (err: any) {
      throw err;
    }
  }
}
export default AccountService;
