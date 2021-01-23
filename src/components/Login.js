import React from 'react'
import { Grid,Paper,Avatar,TextField,Typography } from '@material-ui/core';
import LockIcon from '@material-ui/icons/Lock';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { Button } from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";

import {
  BrowserRouter as Router,
  Link
} from "react-router-dom";

const storage = localStorage.getItem("usuario")


const Login=()=>{

  React.useEffect(() => {
    if(storage !== null){
      localStorage.removeItem("usuario")
    }
  }, [])

  const [correo, setCorreo] = React.useState('')
  const [password, setPassword] = React.useState('')
  const [lista, setLista] = React.useState([])

  const guardarDatos = (e) => {

    e.preventDefault()

    if(!correo.trim()){
        console.log('esta vacio correo')
        return
    }

    if(!password.trim()){
        console.log('esta vacio password')
        return
    }

    setLista([
        ...lista,
        {nombraCorreo: correo, nombrePassword: password}
    ])

    e.target.reset()

    setCorreo('')
    setPassword('')
    fetchData()
  }

  const fetchData = async () => {
    let count = 0;
    let count2 = 0;
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
          if (item.password === password){
            count2 += 1
            localStorage.setItem("usuario", item.name)
            window.location.href = "./dashboard"
          }
        }
      })
    }
    if (count === 0){
      alert('Usted no se encuentra registrado, por favor continue al formulario de registro.')
    }else if(count2 === 0){
      alert('Usuario y/o contraseña incorrectos.')
    }
  }

  const paperStyle={padding :20,height:'70vh',width:270,margin:'20px auto'}
  const avatarStyle={backgroundColor:'#325ed8'}
  const btnstyle={margin:'8px 0'}

    return (
      <Grid >
          <Paper elevation={10} style={paperStyle}>
                <Grid align='center'>
                <Avatar style={avatarStyle}><LockIcon/></Avatar>
                  <h3>Ingresa</h3>

                  <form onSubmit={ guardarDatos } >
                  <TextField label='Correo Electronico' placeholder='Ingresar Correo' onChange={ e => setCorreo(e.target.value) } fullwidth required type="email"/>
                  <TextField label='Password' placeholder='Ingresar Clave' type='Password' onChange={ e => setPassword(e.target.value) }fullwidth required/>


                    <FormControlLabel
                       control={
                         <Checkbox
                          name="checkedB"
                          color="primary"
                        />
                      }
                      label="Recordar usuario"
                    />
                    <Button type='submit'color='primary' variant='contained' style={btnstyle} fullwidth>Iniciar Sesion</Button>

                    </form>

                    {/* <Typography>
                    <Link href="#">
                      RECUPERAR CLAVE
                    </Link>
                    </Typography> */}

                    <Typography>
                    <Link to="signup">
                      REGÍSTRATE
                    </Link>
                    </Typography>


                </Grid>
            </Paper>
        </Grid>

    )
}

export default Login
