import { useState, useEffect } from "react";

import { ApiService } from "../services";
import { IUser } from "../types/IUser";

export default (id: string | undefined) => {
  const [user, setUser] = useState<IUser | null>(null);

  useEffect(() => {
    const getAllUsers = async () => {
      if (id) {
        const res = await ApiService.getUser(id);
        setUser(res.data.data);
      }
    };

    getAllUsers();
  }, []);

  return user;
};
