import  { AxiosRequestConfig, AxiosResponse } from "axios";
import useAxios, { UseAxiosResult, Options } from "axios-hooks";
import React from "react";
import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { configure } from 'axios-hooks'
import Axios from 'axios'
import { useFlashMesseges } from "../features/flash_messages/context/FlashMessegesContext";
import { useAuth } from "../features/auth/context/AuthContext";

export const BASE_URL = 'http://127.0.0.1:8000/'

export const myAxios = Axios.create({
  baseURL: BASE_URL+'api/',
  withCredentials: true,

})

configure({ axios: myAxios })

export function useMyAxios(
  config: AxiosRequestConfig<any>,
  options?: Options | undefined
): UseAxiosResult {

    const {addErrorMessege} = useFlashMesseges()
    const navigator = useNavigate()
    const {authinticated, user, tokens} = useAuth()
    
    if(authinticated()){
      const authHeader = {'Authorization': `Bearer ${tokens.access}`} 
      if (config.headers){
        config.headers = {...config.headers, ...authHeader}

      } else {
        config.headers = {...authHeader}

      }
    }

    
    

    const [{ data, loading, error, response }, refetch, c] = useAxios(
        
      config,
        options
    );
        
    // if(error?.response?.status === 401){
    //   navigator('/login')
    //   addErrorMessege('you need to be logged in')
    // }  


    // if(error?.status === '404') navigator('/about') 

    return [{ data, loading, error, response }, refetch, c];
}
