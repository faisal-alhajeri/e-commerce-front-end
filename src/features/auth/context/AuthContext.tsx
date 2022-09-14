import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { elementType, messegesTypes, userType } from '../../../types/types';
import { useFlashMesseges } from '../../flash_messages/context/FlashMessegesContext';


type AuthContextValue = {
    user: userType,
    authinticated: () => boolean,
    isAdmin: () => boolean,
    login: ({username, password}: {username: string, password: string}) => void,
    signup: ({username, password1, password2}: {username: string, password1: string, password2: string}) => void,
    logout: () => void,
}

export type loginFormType = {username: string, password: string}

export type RegisterFormType = {username: string, password1: string, password2: string}

const defaultAuthContextValue: AuthContextValue  = {
    user: undefined,
    authinticated: () => false,
    isAdmin: () => false,
    login: () => {},
    logout: () =>{},
    signup: () => {}
}

let context = React.createContext({} as AuthContextValue)

export function useAuth(){
    return useContext(context);
}

export default function AuthContext({children}: elementType) {
    const {addMessege} = useFlashMesseges()
    const navigate = useNavigate()


    const [users, setUsers]  = useState<{[key:string]: string}>({
        'faisal': 'faisal',
        'abdullah': 'abd'
    })

    const [user, setUser] = useState<userType>(undefined)

    // function _setUser()
    
    function login({username, password}: loginFormType) {
       let pass: string|undefined = users[username];
       if (pass && pass === password){
            addMessege(`welcome ${username}`, messegesTypes.SUCCESS)
            setUser({name: username})
            navigate('/')
       } else {
           addMessege('user name or password are wrong', messegesTypes.ERROR)
           setUser(undefined)
       }
    }

    function logout() {
        setUser(undefined)
        addMessege('You loggedout successfully', messegesTypes.SUCCESS)

    }

    function signup({username, password1, password2}: RegisterFormType) {
        let exsits = users[username] != undefined
        if(exsits){
            addMessege('username already exsists', messegesTypes.ERROR)
            return;
        } 

        if(password1 !== password2){
            addMessege('password and confirmation doesnt match', messegesTypes.ERROR)
            return;
        }

        setUsers(oldUsers => {
            return {
                ...oldUsers,
                [username]: password1
                }
        })
        setUser({name: username})
        addMessege(`Account created successfuly, welcome ${username}`, messegesTypes.SUCCESS)
        navigate('/')


    }
    
    
    function authinticated(): boolean {
        return user !== undefined
    }
    
    function isAdmin(): boolean {
        return false
    }


  return (
    <context.Provider value={
        {
            user,
            authinticated,
            login,
            logout,
            signup,
            isAdmin
        }
    }>
        {children}
    </context.Provider>
  )
}
