import { useState, useEffect } from "react";

import { ApiService } from "../services";
import { IUser } from "../types/IUser";

export default () => {
  const [users, setUsers] = useState<IUser[]>([]);

  useEffect(() => {
    const getAllUsers = async () => {
      const res = await ApiService.getAllUsers();
      setUsers(res.data.data);
    };

    getAllUsers();
  }, []);

  return users;
};
