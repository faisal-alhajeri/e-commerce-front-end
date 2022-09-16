import React, { ElementType, useState } from "react";
import { Input, InputWithLabel } from "../components/forms/Input";
import MyButton from "../components/forms/MyButton";
import { useAuth } from "../features/auth/context/AuthContext";
import LoginRequired from "../features/auth/LoginRequired";
import { useFlashMesseges } from "../features/flash_messages/context/FlashMessegesContext";
import { messegesTypes } from "../types/types";

export default function Home() {
  const [currentMessege, setCurrentMessege] = useState<string>('')
  const {addMessege} = useFlashMesseges()
  const {user} = useAuth()
  
  // loginRequired()

  return (
  <LoginRequired>
    
    <div>
      {JSON.stringify(user)}
      <InputWithLabel  label="messege" onChange={(e:any) => setCurrentMessege(e.target.value)} />
      <MyButton className="p-3 m-3" variant='outline-info' onClick={() => addMessege(currentMessege, messegesTypes.ERROR, 10000)}> add new message </MyButton>  
      <Input />
    </div>
  </LoginRequired>
  )
}
