import React from 'react'
import { useMyAxios } from '../../../hooks/useAxios'

export default function allProductsService() {
    const values = useMyAxios({
        url: 'products/',
        method: 'get'
    })

  return values
}
