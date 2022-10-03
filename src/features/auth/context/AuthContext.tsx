import { UseAxiosResult } from "axios-hooks";
import jwtDecode from "jwt-decode";
import React, { useContext, useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { myAxios, useMyAxios } from "../../../hooks/useAxios";
import { requester } from "../../../services/requister";
import {
  elementType,
  messegesTypes,
  tokenstype,
  userType,
} from "../../../types/types";
import { useFlashMesseges } from "../../flash_messages/context/FlashMessegesContext";
import { refreshTokenService } from "../services/AuthServices";

export type loginFormType = { email: string; password: string };

export type RegisterFormType = {
  email: string;
  password1: string;
  password2: string;
};

type AuthContextValue = {
  user: userType;
  tokens: tokenstype;
  siteIsLoading: boolean;
  siteResponse: any
  authinticated: () => boolean;
  isAdmin: () => boolean;
  login: (data: any) => void;
  signup: ({ email, password1, password2 }: RegisterFormType) => void;
  logout: () => void;
};

// const defaultAuthContextValue: AuthContextValue = {
//   user: undefined,
//   tokens: {} as tokenstype,
//   authinticated: () => false,
//   isAdmin: () => false,
//   login: () => {},
//   logout: () => {},
//   signup: () => {},
// };

let context = React.createContext({} as AuthContextValue);

export function useAuth() {
  return useContext(context);
}

export default function AuthProvider({ children }: elementType) {
  const { addMessege, addSuccessMessege, addErrorMessege } = useFlashMesseges();
  const navigate = useNavigate();

  const [tokens, setTokens] = useState<tokenstype>({} as tokenstype);

  const [user, setUser] = useState<userType>(undefined);
  const [cookies, setCookie, removeCookie] = useCookies();
  const { refreshTokenValues: visitSiteAuthValues, fetchToken } = refreshTokenService();
  const {  fetchToken: fetchTokenEveryMin } = refreshTokenService();
  
  // refresh tokens when visitng server
  useEffect(() => {
    if (cookies.refresh) {
      fetchToken(cookies.refresh).then((res) => _setAuthData(res.data));
    }
  }, []);

  // refresh access token every 1 min
  useEffect(() => {
    if (authinticated()) {
      let i = setInterval(() => {
        fetchTokenEveryMin(cookies.refresh).then((res) => {
          setTokens(res.data);
          setCookie("access" as never, res.data.access);
          setCookie("refresh" as never, res.data.refresh);
        });
      }, 60 * 1000);

      return () => clearInterval(i)
    }
  }, [user]);

  function _setAuthData(data: any) {
    setTokens(data);
    setCookie("access" as never, data.access);
    setCookie("refresh" as never, data.refresh);
    setUser(jwtDecode(data.access));
  }

  function login(data: any) {
    const userData = jwtDecode(data.access) as userType;

    _setAuthData(data)

    addMessege("logged in successufly", messegesTypes.SUCCESS);
    if (userData?.admin) {
      navigate("/admin");
    } else {
      navigate("/");
    }
  }

  function logout() {
    setUser(undefined);
    removeCookie("access" as never);
    removeCookie("refresh" as never);

    addMessege("You loggedout successfully", messegesTypes.SUCCESS);
  }

  function signup(data: any) {
    // setUser(jwtDecode(data.access))
    addMessege(
      `Account created successfuly, welcome ${data.username}`,
      messegesTypes.SUCCESS
    );
    navigate("/login");
  }

  function authinticated(): boolean {
    return user !== undefined;
  }

  function isAdmin(): boolean {
    return user?.admin ?? false;
  }

  return (
    <context.Provider
      value={{
        user,
        tokens,
        siteIsLoading: visitSiteAuthValues.loading,
        siteResponse: visitSiteAuthValues.response,
        authinticated,
        login,
        logout,
        signup,
        isAdmin,
        
      }}
    >
      {!visitSiteAuthValues.loading && children}
    </context.Provider>
  );
}
