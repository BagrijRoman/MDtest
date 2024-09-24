import React, { useCallback, useEffect, useState } from "react";

import { EditProfile } from "./EditProfile";
import { useCountriesListRequest, useCurrentUserProfileRequest } from "../../hook";
import { ApiService } from "../../services";

export interface IFormData {
  countryId?: string;
  firstName?: string;
  middleName?: string;
  lastName?: string;
  address?: string;
  extraInfo?: string;
}

export const EditProfileContainer = () => {
  const { countriesList } = useCountriesListRequest();
  const { userProfile } = useCurrentUserProfileRequest();

  const [formData, setFormData] = useState<IFormData>({
    countryId: "",
    firstName: "",
    middleName: "",
    lastName: "",
    address: "",
    extraInfo: "",
  });
  const [updateProfileLoading, setUpdateProfileLoading] = useState<boolean>(false);

  useEffect(() => {
    setFormData({
      countryId: userProfile ? userProfile.country._id : "" ,
      firstName: userProfile ? userProfile.user.firstName : "",
      middleName: userProfile ? userProfile.user.middleName : "",
      lastName: userProfile ? userProfile.user.lastName : "",
      address: userProfile ? userProfile.address : "",
      extraInfo: userProfile ? userProfile.extraInfo : "",
    });
  }, [userProfile]);

  const onInputChange = useCallback((
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  }, [formData]);

  const onFormSubmit = useCallback(async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      setUpdateProfileLoading(true);await ApiService.updateCurrentUserProfile(formData);
    } catch (err) {
      console.log("err ", err);
    } finally {
      setUpdateProfileLoading(false);
    }
  }, [formData]);

  return (
    <EditProfile
      {...{
        onFormSubmit,
        formData,
        onInputChange,
        countries: countriesList,
        disabled: updateProfileLoading,
      }}
    />
  );
};