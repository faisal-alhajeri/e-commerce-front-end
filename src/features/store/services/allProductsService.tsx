import React from 'react'
import { useMyAxios } from '../../../hooks/useAxios'

export default function allProductsService() {
    const values = useMyAxios({
        url: 'products/',
        method: 'get'
    })

  return values
}

export function ProductsService(id: string) {
  const values = useMyAxios({
      url: `products/${id}/`,
      method: 'get'
  }, {manual: true})

return values
}
