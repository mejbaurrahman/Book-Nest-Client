/* eslint-disable react-hooks/exhaustive-deps */

import { useEffect, useState } from "react";

export const useRoleCheck = (email) => {
  // const [role, setRole] = useState("");
  // const [name, setName] = useState("");
  const [loggedUser, setLoggedUser] = useState({});
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setLoading(true);
    fetch(`https://book-nest-server-eight.vercel.app/users?email=${email}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        // setName(data.name);
        // setRole(data.role);
        setLoggedUser(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("There was a problem with the fetch operation:", error);
        setLoading(false);
      });
  }, []);

  return [loggedUser, loading];
};
