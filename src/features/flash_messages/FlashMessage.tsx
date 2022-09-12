import React from 'react'
import { Alert } from 'react-bootstrap';
import { flashMessegeType } from '../../types/types';

export default function FlashMessage({msgObj}: {msgObj: flashMessegeType}) {
  return (
     <Alert variant={msgObj.type}>{msgObj.messege}</Alert>
  )
}
