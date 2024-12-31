import { createContext, useState, useEffect } from "react";
import PropTypes from 'prop-types';


export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    const storedRole = sessionStorage.getItem("role");
    setUserRole(storedRole);
  }, []);

  const setRole = (role) => {
    setUserRole(role);
    sessionStorage.setItem("role", role);
    console.log(`this is role in cont ${role}`)
  };

  return (
    <UserContext.Provider value={{ userRole, setRole }}>
      {children}
    </UserContext.Provider>
  );
};

UserProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

// export UserContext;
