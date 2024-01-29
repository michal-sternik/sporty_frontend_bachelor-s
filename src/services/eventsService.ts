import zpiApi from '../api';

class EventsService {
  public static async getSingleEvent(eventId: string): Promise<Event> {
    return (await zpiApi.get<Event>(`/Meeting/${eventId}`)).data;
  }

  public static async getMeetingInvitations(): Promise<Event[]> {
    return (await zpiApi.get<Event[]>(`/Meeting/invitations`)).data;
  }

  public static async joinMeeting(eventId: string): Promise<void> {
    return (await zpiApi.post<void>(`/meeting/${eventId}/join`, {})).data;
  }

  public static async rejectInvitation(eventId: string): Promise<void> {
    return (await zpiApi.post<void>(`/meeting/${eventId}/reject`, {})).data;
  }

  // todo
  public static async getJoinedMeetingsList(): Promise<Event[]> {
    const response = await zpiApi.get<{ items: Event[] }>(
      `/Meeting/history?PageNumber=1&PageSize=120&AsOrganizer=false`,
    );
    return response.data.items;
  }

  // todo
  public static async getOrganisedMeetingsList(): Promise<Event[]> {
    return (
      await zpiApi.get<{ items: Event[] }>(
        `/Meeting/history?PageNumber=1&PageSize=120&AsOrganizer=true`,
      )
    ).data.items;
  }

  public static async getJoinedMeetingListForeignUser(
    friendId: string,
  ): Promise<Event[]> {
    const response = await zpiApi.get<Event[]>(
      `/Meeting/recent/${friendId}?AsOrganizer=false`,
    );
    return response.data;
  }

  public static async getOrganisedMeetingsListForeignUser(
    friendId: string,
  ): Promise<Event[]> {
    // const response = await zpiApi.get<Event[]>(
    //   `/Meeting/recent/${friendId}?PageNumber=1&PageSize=120&AsOrganizer=false`,
    // );
    const response = await zpiApi.get<Event[]>(
      `/Meeting/recent/${friendId}?AsOrganizer=true`,
    );
    return response.data;
  }
}
export default EventsService;
