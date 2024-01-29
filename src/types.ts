import { Dayjs } from 'dayjs';
import { BBox } from 'geojson';

export interface EventShort {
  id: string;
  title: string;
  created: string;
  latitude: number;
  longitude: number;
  startDateTimeUtc: string;
  endDateTimeUtc: string;
  sportsDiscipline: number;
  difficulty: number;
  maxParticipantsQuantity: number;
  currentParticipantsQuantity: number;
  minParticipantsAge: number;
  organizerUsername: string;
  visibility: number;
}

export interface Event {
  id: string;
  title: string;
  description: string;
  created: string;
  latitude: number;
  longitude: number;
  startDateTimeUtc: string;
  endDateTimeUtc: string;
  visibility: number;
  sportsDiscipline: number;
  difficulty: number;
  maxParticipantsQuantity: number;
  currentParticipantsQuantity: number;
  minParticipantsAge: number;
  isOrganizer: boolean;
  organizer: {
    id: string;
    username: string;
  };
  meetingParticipants: [
    {
      id: string;
      username: string;
      status: number;
    },
  ];
}

export interface PostsList {
  items: Post[];
  totalPages: number;
  itemFrom: number;
  itemsTo: number;
  totalItemsCount: number;
}

export interface Post {
  id: string;
  title: string;
  description: string;
  text: string;
  created: string;
  author: {
    id: string;
    username: string;
    image: {
      publicId: string;
      url: string;
    };
  };
}

export interface CreatedEventData {
  title: string;
  description: string;
  latitude: number;
  longitude: number;
  startDateTimeUtc: string;
  endDateTimeUtc: string;
  sportsDiscipline: number;
  difficulty: number;
  visibility: number;
  maxParticipantsQuantity: number;
  minParticipantsAge: number;
}

export interface EditedEventData {
  id: string;
  title: string;
  description: string;
  latitude: number;
  longitude: number;
  startDateTimeUtc: string;
  endDateTimeUtc: string;
  sportsDiscipline: number;
  difficulty: number;
  visibility: number;
  maxParticipantsQuantity: number;
  minParticipantsAge: number;
}

export interface SearchedUserInfo {
  id: string;
  username: string;
  image: {
    publicId: string;
    url: string;
  };
}

export interface EventsState {
  events: EventShort[];
  disciplineSelection: number;
  difficultySelection: number;
  maxParticipantsQuantitySelection: number | string;
  currentParticipantsQuantitySelection: number | string;
  currentParticipantsQuantityToSelection: number | string;
  minParticipantsAgeFromSelection: number | string;
  minParticipantsAgeToSelection: number | string;
  areIncomingMeetingChosen: boolean;
  asOrganizerSelection: boolean;
  meetingVisibilitySelection: boolean;
  startTimeSelection: Dayjs | null;
  endTimeSelection: Dayjs | null;
  sortBySelection: string;
  sortDirectionSelection: number;
  desiredBounds: BBox;
  recentEvent: Event | null;
}

interface UserDetailsEvent {
  id: string;
  title: string;
  latitude: number;
  longitude: number;
  startDateTimeUtc: string;
  endDateTimeUtc: string;
  sportsDiscipline: number;
  organizerUsername: string;
}
export interface UserState {
  token: string;
  loading: boolean;
  firstName: string;
  lastName: string;
  gender: number;
  emailAddress: string;
  age: number;
  userName: string;
  image: Image | null;
  recentMeetings: UserDetailsEvent[];
  error: string | null;
  hasAdminRole: boolean;
}

export interface EventsListItemProps {
  event: EventShort;
}

export interface DifficultyIndicatorProps {
  difficulty: number;
}

export interface MapState {
  isEventCreationOn: boolean;
  isMapVisible: boolean;
  isChatOpen: boolean;
  eventCreationCoordinates: number[];
}

export interface Message {
  sentAtUtc: string;
  userId: string;
  username: string;
  value: string;
}

export interface ChatState {
  messages: Message[];
}

export interface EventsFetchParameters {
  bounds: BBox;
  disciplineSelection: number;
  difficultySelection: number;
  sortBySelection: string;
  sortDirectionSelection: number;
}
export interface FriendItem {
  id: string;
  firstName?: string;
  lastName?: string;
  friendUsername: string;
  image: Image | null;
}
export interface FriendInvitationItem {
  inviterId: string;
  inviterUsername: string;
  invitationDateTimeUtc: string;
  image: Image | null;
}
export interface RegisterFormInputs {
  firstName: string;
  lastname: string;
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
  dateOfBirth: string;
  gender: number;
}
export interface LogInFormInputs {
  email: string;
  password: string;
}
export interface UserDataInfo {
  firstName: string;
  lastName: string;
  username: string;
  age: number;
  email: string;
  gender: number;
  image: Image;
  recentMeetings: UserDetailsEvent[];
  hasAdminRole: boolean;
}
export interface NotificationState {
  loading: boolean;
  posts: Post[];
  currentPost: Post | null;
  friendInvitationList: FriendInvitationItem[];
  // check and fix
  meetingInvitationList: any[];
  error: string | null;
}
export interface Image {
  publicId: string;
  url: string;
}
export interface OtherUserInfo {
  id: string;
  username: string;
  firstName: string;
  lastName: string;
  age: number;
  gender: number;
  image: Image;
  recentMeetings: EventShort[];
  friendshipStatusDto: FriendshipStatus;
}
interface FriendshipStatus {
  status: 0 | 1 | 2 | 3;
  isOriginated: boolean;
}
export interface SearchedUserByPhrase {
  id: string;
  username: string;
}

export interface SignalRContextType {
  connection: null | signalR.HubConnection;
}

export interface EventCreationPanelProps {
  isEditing: boolean;
  titleProp?: string;
  descriptionProp?: string;
  maxPlayersProp?: number;
  difficultyProp?: number;
  disciplineProp?: number;
  startTimeProp?: string;
  endTimeProp?: string;
  isPrivateProp?: boolean;
}

export interface PostCreationProps {
  isEditing: boolean;
}
export interface AchievementList {
  category: string;
  achievements: AchievementType[];
}
export interface AchievementType {
  id?: string;
  description?: string;
  obtained?: string | null;
}
interface FavouriteSportsDiscipline {
  sportDiscipline: string;
  count: number;
}
interface FavouriteParticipant {
  userIdentityDto: SearchedUserInfo;
  count: number;
}
export interface Statistics {
  meetingsOrganized: number;
  meetingsParticipated: number;
  totalMinutesInMeetings: number;
  favoriteSportDiscipline: FavouriteSportsDiscipline;
  avgParticipantsAge: number;
  favoriteParticipant: FavouriteParticipant;
}
