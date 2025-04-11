export type TUser = {
  name: string;
  email: string;
  password: string;
  phone: string;
  address: string;
  profilePicture: string;
};

export type TLogin = {
  email: string;
  password: string;
  profilePicture?: string;
  role?: string;
};
