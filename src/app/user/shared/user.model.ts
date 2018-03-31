export interface User {
  uid: string;
  email: string;
  rootFolder?: string;
  password?: string;
  username?: string;
  firstName?: string;
  middleName?: string;
  lastName?: string;
  img?: boolean;
  profileImgUrl?: string;
}
