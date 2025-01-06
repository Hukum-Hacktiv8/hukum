type CredentialType = {
  education: string[];
  certification: string;
};

type ProfileType = {
  address: string;
  birth: string;
};

export type UserType = {
  _id: string;
  name: string;
  email: string;
  role: string;
  profile: ProfileType;
  credentials?: CredentialType;
  createdAt: string;
  updatedAt: string;
};
