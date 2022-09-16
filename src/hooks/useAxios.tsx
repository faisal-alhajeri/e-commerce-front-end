import  { AxiosRequestConfig, AxiosResponse } from "axios";
import useAxios, { UseAxiosResult, Options } from "axios-hooks";
import React from "react";
import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { configure } from 'axios-hooks'
import Axios from 'axios'

export const BASE_URL = 'http://127.0.0.1:8000/'

export const myAxios = Axios.create({
  baseURL: BASE_URL,
  withCredentials: true,

})

configure({ axios: myAxios })

export function useMyAxios(
  config: string | AxiosRequestConfig<any>,
  options?: Options | undefined
): UseAxiosResult {
    const navigator = useNavigate()

    const [{ data, loading, error, response }, refetch, c] = useAxios(
        config,
        options
    );
        
    // if(error?.response?.status === 404) navigator('/not-found', {replace: false}) 
    // if(error?.status === '404') navigator('/about') 

    return [{ data, loading, error, response }, refetch, c];
}
