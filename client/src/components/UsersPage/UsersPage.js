import React, { useState, useContext, useEffect, useCallback } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useHttp } from "../../hooks/http.hook";
import { UsersList } from "./UsersList";
import { Loader } from "../Loader";

export const UsersPage = () => {
  const [users, setUsers] = useState([]);
  const { loading, request } = useHttp();
  const { token } = useContext(AuthContext);

  const fetchUsers = useCallback(async () => {
    try {
      const fetched = await request("/api/users", "GET", null, {
        Authorization: `Bearer ${token}`
      });

      setUsers(fetched);
    } catch (e) {}
  }, [token, request]);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  if (loading) {
    return <Loader />;
  }

  return <>{!loading && <UsersList users={users} />}</>;
};
