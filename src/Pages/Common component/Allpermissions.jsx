import React, { useState, useEffect } from "react";
import { rolesWisePermissions } from "../../Api/ApiDipak";
import axios from "axios";

const Allpermissions = ({ onFetchPermissions }) => {
  const [permissions, setPermissions] = useState([]);

  const loadPermissions = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(rolesWisePermissions, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      const fetchedPermissions = response.data.data.map((perm) => perm.name);
      setPermissions(fetchedPermissions);
      onFetchPermissions(fetchedPermissions); 
    } catch (error) {
      console.error("Error fetching permissions:", error);
    }
  };

  useEffect(() => {
    loadPermissions();
  }, []);

  return <></>; // No need to return anything visual
};

export default Allpermissions;
