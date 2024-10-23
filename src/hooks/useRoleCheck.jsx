/* eslint-disable react-hooks/exhaustive-deps */

import { useEffect, useState } from "react";

export const useRoleCheck = (email) => {
  const [role, setRole] = useState("");
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setLoading(true);
    fetch(`http://localhost:5000/users?email=${email}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setRole(data.role);
        setLoading(false);
      })
      .catch((error) => {
        console.error("There was a problem with the fetch operation:", error);
        setLoading(false);
      });
  }, []);

  return [role, loading];
};
