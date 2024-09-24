import React, { useCallback, useState } from 'react';

import { EditProfile } from './EditProfile';

export interface IFormData {
  countryId: string;
  firstName: string;
  middleName: string;
  lastName: string;
  address: string;
  extraInfo: string;
}

export const EditProfileContainer = () => {
  const [formData, setFormData] = useState<IFormData>({
    countryId: "",
    firstName: "",
    middleName: "",
    lastName: "",
    address: "",
    extraInfo: "",
  });
  const [countriesList, setCountriesList] = useState([]);
  const [updateProfileLoading, setUpdateProfileLoading] = useState<boolean>(false);

  const countries = [
    { code: "US", name: "United States" },
    { code: "CA", name: "Canada" },
    { code: "GB", name: "United Kingdom" },
    { code: "AU", name: "Australia" },
    // Add more countries as needed
  ];

  const onInputChange = useCallback((
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  }, [formData]);

  const onFormSubmit = useCallback((event: React.FormEvent) => {
    event.preventDefault();
    console.log(formData);
  }, [formData]);



  return (
    <EditProfile
      {...{
        onFormSubmit,
        formData,
        onInputChange,
        countries,
      }}
    />
  );
}