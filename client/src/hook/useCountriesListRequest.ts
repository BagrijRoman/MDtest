import { useEffect, useState } from "react";

import { ApiService } from "../services";

export const useCountriesListRequest = () => {
  const [countriesList, setCountriesList] = useState<{_id: string, name: string}[]>([]);

  useEffect(() => {
    const getCountriesList = async () => {
      const { data } = await ApiService.getCountriesList();

      setCountriesList(data);
    };

    getCountriesList();
  }, []);

  return { countriesList };
};