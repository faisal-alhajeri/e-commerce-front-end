import React from 'react'
import { useMyAxios } from '../../../hooks/useAxios'

export default function allProductsService() {
    const values = useMyAxios({
        url: 'products/',
        method: 'get'
    })

  return values
}

export function ProductService(id: string) {
  const values = useMyAxios({
      url: `products/${id}/`,
      method: 'get'
  }, {manual: true})

return values
}

export function createProductService() {
  const values = useMyAxios({
      url: `products/create/`,
      method: 'post'
  }, {manual: true})

return values
}


export function updateProductService(id: string) {
  const values = useMyAxios({
      url: `products/${id}/update/`,
      method: 'post'
  }, {manual: true})

return values
}

export function deleteProductService(id: string) {
  const values = useMyAxios({
      url: `products/${id}/delete/`,
      method: 'delete'
  }, {manual: true})

return values
}


export function deleteProductImageService() {
  const [values, refetch] = useMyAxios({
      method: 'delete'
  }, {manual: true})

  function deleteImage(uuid: string){
    return refetch({
      url: `products/image/${uuid}/delete/`,
    })
  }

return {values, deleteImage}
}



