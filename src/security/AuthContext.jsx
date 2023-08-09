import { createContext, useContext, useState } from "react";
import { loginJwtAuthenticationService } from "../api/AuthenticationApiService";
import { apiClient } from "../api/apiClient";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

function AuthenticationContext({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [authInfo, setAuthInfo] = useState({
    username: undefined,
    password: undefined,
  });

  const [token, setToken] = useState("");

  const onLoginSuccessHandler = async (username, password) => {
    try {
      const response = await loginJwtAuthenticationService(username, password);
      const jwtToken = "Bearer " + response.data.token;
      if (response.status === 200) {
        setIsLoggedIn(true);
        setToken(jwtToken);
        setAuthInfo((previous) => ({
          ...previous,
          username,
          password,
        }));

        apiClient.interceptors.request.use((config) => {
          // console.log("intercepter has commenced");
          config.headers.Authorization = jwtToken;
          // console.log(config.headers.getAuthorization());
          return config;
        });
        return true;
      } else {
        onLoginSuccessHandler();
      }
    } catch (error) {
      setIsLoggedIn(true);
      setAuthInfo({});
      return false;
    }
  };

  const onLogoutSuccessHandler = () => {
    setIsLoggedIn(false);
    setAuthInfo({});
    setToken({});
  };
  // const onLoginSuccessHandler = async (username, password) => {
  //   try {
  //     const producedToken = "Basic " + btoa(username + ":" + password);
  //     await login(producedToken);
  //     setToken(producedToken);
  //     setIsLoggedIn(true);
  //     setAuthInfo((previous) => ({
  //       ...previous,
  //       username,
  //       password,
  //     }));

  //     apiClient.interceptors.request.use((config) => {
  //       console.log("intercepter has commenced");
  //       config.headers.Authorization = producedToken;
  //       return config;
  //     });

  //     return true;
  //   } catch (error) {
  //     setIsLoggedIn(true);
  //     setAuthInfo({});
  //     return false;
  //   }
  // };
  // const onLoginSuccessHandler = (username, password) => {
  //   if (username === "resul" && password === "dummy") {
  //     setIsLoggedIn(true);
  //     setAuthInfo({
  //       ...authInfo,
  //       username,
  //       password,
  //     });
  //     return true;
  //   } else {
  //     return false;
  //   }
  // };

  const sharedValuesAndMethods = {
    isLoggedIn,
    setIsLoggedIn,
    onLoginSuccessHandler,
    authInfo,
    token,
    onLogoutSuccessHandler,
  };

  return (
    <AuthContext.Provider value={sharedValuesAndMethods}>
      {children}
    </AuthContext.Provider>
  );
}

export { AuthenticationContext };
export default AuthContext;
