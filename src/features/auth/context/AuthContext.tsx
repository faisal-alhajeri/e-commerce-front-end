import { UseAxiosResult } from "axios-hooks";
import jwtDecode from "jwt-decode";
import React, { useContext, useState } from "react";
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

export type loginFormType = { email: string; password: string };

export type RegisterFormType = {
  email: string;
  password1: string;
  password2: string;
};

type AuthContextValue = {
  user: userType;
  tokens: tokenstype,
  authinticated: () => boolean;
  isAdmin: () => boolean;
  login: (data: any) => void;
  signup: ({ email, password1, password2 }: RegisterFormType) => void;
  logout: () => void;
  loginRequired: () => void;
};

const defaultAuthContextValue: AuthContextValue = {
  user: undefined,
  tokens: {} as tokenstype,
  authinticated: () => false,
  isAdmin: () => false,
  login: () => {},
  logout: () => {},
  signup: () => {},
  loginRequired: () => {},
};

let context = React.createContext({} as AuthContextValue);

export function useAuth() {
  return useContext(context);
}

export default function AuthContext({ children }: elementType) {
  const { addMessege, addSuccessMessege, addErrorMessege } = useFlashMesseges();
  const navigate = useNavigate();

  const [tokens, setTokens] = useState<tokenstype>({} as tokenstype);

  const [user, setUser] = useState<userType>(undefined);
  const [cookies, setCookie, removeCookie] = useCookies([]);

  function login(data: any) {
    setTokens(data);
    setCookie("access" as never, data.access);
    setCookie("refresh" as never, data.refresh);
    setUser(jwtDecode(data.access));
    addMessege("logged in successufly", messegesTypes.SUCCESS);
    console.log(cookies);
    navigate("/");
  }

  function logout() {
    setUser(undefined);
    removeCookie("access" as never);
    removeCookie("refresh" as never);

    addMessege("You loggedout successfully", messegesTypes.SUCCESS);
  }

  function loginRequired() {
    console.log(!authinticated());

    if (!authinticated()) {
      navigate("/login", { replace: true });
      addErrorMessege("you must be authinticated to access this page");
    }
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
    return false;
  }

  return (
    <context.Provider
      value={{
        user,
        tokens,
        authinticated,
        login,
        logout,
        signup,
        isAdmin,
        loginRequired,
      }}
    >
      {children}
    </context.Provider>
  );
}
