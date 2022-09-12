import React from 'react'
import { useMyAxios } from '../useAxios'

export function getSaudi() {
  return useMyAxios('saudi')
}

export function getByName(name: string) {
  return useMyAxios(name)
}

