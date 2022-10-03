import useAxios from "axios-hooks";

export function refreshTokenService(){
    const [refreshTokenValues, _refetch] = useAxios({
        url: 'token/refresh/',
        method: 'post',
    }, {manual:true})


    async function fetchToken(refreshToken: string){
        let data =  _refetch({data: {refresh: refreshToken}})        
        return data
    }

    return {refreshTokenValues, fetchToken}
}