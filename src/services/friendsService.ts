import zpiApi from '../api';
import { FriendInvitationItem, FriendItem, OtherUserInfo } from '../types';
import { convertError } from '../utils/errorHandleUtils';

class FriendsService {
  public static async getFriendsList(): Promise<FriendItem[]> {
    return (await zpiApi.get<FriendItem[]>(`/Friends`)).data;
  }

  public static async getFriendsInvitations(): Promise<FriendInvitationItem[]> {
    return (await zpiApi.get<FriendInvitationItem[]>(`/Friends/invitations`))
      .data;
  }

  public static async getOtherUserDetails(id: string): Promise<OtherUserInfo> {
    return (await zpiApi.get<OtherUserInfo>(`/Friends/${id}`)).data;
  }

  public static async getUsersBySearchPhrase(
    searchPhrase: string,
  ): Promise<FriendItem[]> {
    const apiResponse = await zpiApi.get<any[]>(
      `/Friends/search/${searchPhrase}`,
    );
    const responseData = apiResponse.data;

    const friendItems: FriendItem[] = responseData.map((apiData) => ({
      id: apiData.id,
      friendUsername: apiData.username,
      image: apiData.image,
    }));

    return friendItems;
  }

  public static async inviteUserToFriends(inviteeId: string): Promise<void> {
    return (
      await zpiApi.post(`/Friends/invite`, {
        inviteeId,
      })
    ).data;
  }

  // eslint-disable-next-line consistent-return
  public static async acceptUserToFriends(inviterId: string): Promise<void> {
    try {
      return (
        await zpiApi.post(`/Friends/accept`, {
          inviterId,
        })
      ).data;
    } catch (err: any) {
      convertError(err);
    }
  }

  // eslint-disable-next-line consistent-return
  public static async rejectUserInvitation(inviterId: string): Promise<void> {
    try {
      return (
        await zpiApi.post(`/Friends/reject`, {
          inviterId,
        })
      ).data;
    } catch (err: any) {
      convertError(err);
    }
  }

  public static async removeUserFromFriends(
    friendToRemoveId: string,
  ): Promise<void> {
    return (
      await zpiApi.post(`/Friends/remove`, {
        friendToRemoveId,
      })
    ).data;
  }

  public static async blockUser(userToBlockId: string): Promise<void> {
    return (
      await zpiApi.post(`/Friends/block`, {
        userToBlockId,
      })
    ).data;
  }

  public static async unblockUser(userToUnlockId: string): Promise<void> {
    return (
      await zpiApi.post(`/Friends/unlock`, {
        userToUnlockId,
      })
    ).data;
  }
}
export default FriendsService;
