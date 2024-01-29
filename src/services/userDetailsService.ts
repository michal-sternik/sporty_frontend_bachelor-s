import { AxiosResponse } from 'axios';
import zpiApi from '../api';
import { UserDataInfo } from '../types';

class UserDetailsService {
  public static async getUserDetails(): Promise<UserDataInfo> {
    const token = localStorage.getItem('token');
    return (
      await zpiApi.get<UserDataInfo>(`/UserDetails`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
    ).data;
  }

  public static async changeUserDetails(
    userDataInfo: UserDataInfo,
  ): Promise<void> {
    // eslint-disable-next-line no-useless-catch
    try {
      return (await zpiApi.put<void>(`/UserDetails`, userDataInfo)).data;
    } catch (err: any) {
      throw err;
    }
  }

  public static async changePassword(
    oldPassword: string,
    newPassword: string,
    confirmPassword: string,
  ): Promise<void> {
    // eslint-disable-next-line no-useless-catch
    try {
      const json = { oldPassword, newPassword, confirmPassword };
      return (await zpiApi.put<void>(`/UserDetails/change-password`, json))
        .data;
    } catch (err: any) {
      throw err;
    }
  }

  public static async deleteProfilePic(publicId: string): Promise<void> {
    // eslint-disable-next-line no-useless-catch
    try {
      const response: AxiosResponse<void> = await zpiApi.delete(
        '/UserDetails/image',
        {
          data: {
            publicId,
          },
        },
      );
      return response.data;
    } catch (err: any) {
      throw err;
    }
  }
}

export default UserDetailsService;
