import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom'
import axios from "axios";

import Avatar from "../../assets/avatar.svg"
import Arrow from "../../assets/arrow.svg"
import Trash from "../../assets/trash.svg"
import { H1 } from "../../componentes/title/style";
import { ContainerItens } from "../../componentes/containerItens/style";

import {
  Container,
  Image,
  Button,
  User
} from "./style.js"


function Users() {
  const [users, setUsers] = useState([])
 
   const navigate = useNavigate()

 
  useEffect(() =>{
   async function fetchUsers(){

   const {data:newUsers} = await axios.get("http://localhost:3001/users")

      setUsers(newUsers)
   }

   fetchUsers()
    
  }, [])

  async function deleteUser(userId) {
    await axios.delete(`http://localhost:3001/users/${userId}`)
    
    const newUsers = users.filter(user => user.id !== userId)

    setUsers(newUsers)
  }

  
   function goBackPage(){
    navigate('/');
   }
  

  return <Container>
    <Image alt="pessoas-conversando" src={Avatar} />

    <ContainerItens IsBlur={true}>
      <H1>Usuários</H1>

      <ul>
        {users.map(user => (
          <User key={user.id}>
            <p>{user.name}</p>  <p>{user.age}</p>
            <button onClick={() => deleteUser(user.id)}>
              <img src={Trash} alt="lixaira" />

            </button>

          </User>

        ))

        }

      </ul>

      <Button onClick={goBackPage}><img alt="arrow" src={Arrow} />Voltar </Button>

    </ContainerItens>
  </Container>


}


export default Users;