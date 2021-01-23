import React from 'react'
import { Grid,Paper,Avatar,TextField} from '@material-ui/core';
import LockIcon from '@material-ui/icons/Lock';
import Checkbox from '@material-ui/core/Checkbox';
import { Button } from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import { useHistory } from "react-router-dom";


const Registro=()=>{

  const [name, setname] = React.useState('')
  const [correo, setCorreo] = React.useState('')
  const [password, setPassword] = React.useState('')
  const [lista, setLista] = React.useState([])
  const history = useHistory()

  const guardarDatos = (e) => {

      e.preventDefault()

      if(!name.trim()){
          console.log('esta vacio nombre')
          return
      }

      if(!correo.trim()){
          console.log('esta vacio correo')
          return
      }

      if(!password.trim()){
          console.log('esta vacio password')
          return
      }

// console.log('procesando datos...' + nombre +' '+ correo+' '+ password )

setLista([
    ...lista,
    {nombraNombre: name, nombreDireccion: correo, nombreTelefono: password }
])

e.target.reset()
setname('')
setCorreo('')
setPassword('')
fetchData()

}
  const fetchData = async () => {
    let count = 0;
    let BreakException= {};
    const requestUser = {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' }
    };
    const responseUser = await fetch('https://back.prolightpty.com/users');
    const userData = await responseUser.json();
    if (userData.length != 0){
      userData.forEach((item) => {
        if (item.login === correo){
          count += 1
          alert('Usted ya esta registrado, por favor ingrese con su cuenta')
          throw BreakException;
        }
      })
    }
    if (count === 0){
      createUser()
      localStorage.setItem("usuario", name)
      alert("Su registro ha sido exitoso!")
      window.location.href = "./dashboard"
      // setTimeout(() => {
        
      //   console.log('Esperando...', 'Esperando...')
      // }, 1500);
    }
  }

const createUser = async () => {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name: name, login: correo, password: password })
  };
  const response = await fetch('https://back.prolightpty.com/users',requestOptions);
  const data = await response.json();
  // this.setState({ postId: data.id });
}


const paperStyle={padding :20,height:'70vh',width:270,margin:'20px auto'}
const avatarStyle={backgroundColor:'#325ed8'}
const btnstyle={margin:'8px 0'}

    return (
      <Grid >
          <Paper elevation={10} style={paperStyle}>

                <Grid align='center'>
                <Avatar style={avatarStyle}><LockIcon/></Avatar>
                  <h3>Nueva Cuenta</h3>

                  <form onSubmit={ guardarDatos } >
                  <TextField label='Nombre' placeholder='Ingresar Nombre' onChange={ e => setname(e.target.value) }fullwidth required/>
                  <TextField label='Correo Electronico' placeholder='Ingresar Correo'  onChange={ e => setCorreo(e.target.value) }  fullwidth required type="email"/>
                  <TextField label='Password' placeholder='Ingresar Clave' type='Password'   onChange={ e => setPassword(e.target.value) } fullwidth required/>


                    <Button type='submit'color='primary' variant='contained' style={btnstyle} fullwidth>Registrar</Button>

                  </form>



                </Grid>
            </Paper>
        </Grid>

    )
}

export default Registro
