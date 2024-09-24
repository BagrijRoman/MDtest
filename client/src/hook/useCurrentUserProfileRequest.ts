import { useState, useEffect } from "react";

import { ApiService} from "../services";

interface IUserProfile {
  country: { _id: string },
  user: {
    firstName: string,
    lastName: string,
    middleName: string,
  },
  extraInfo: string,
  address: string,
}

export const useCurrentUserProfileRequest = () => {
  const [userProfile, setUserProfile] = useState<IUserProfile | undefined>();

  useEffect(() => {
    const getUserProfile = async () => {
      const { data } = await ApiService.getCurrentUserProfile();
      setUserProfile(data);
    };

    getUserProfile();
  }, []);

  return { userProfile };
};
