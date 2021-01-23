import React, { Fragment } from 'react';
import { Grid,Paper,Avatar,TextField} from '@material-ui/core';
import PermIdentityIcon from '@material-ui/icons/PermIdentity';
import { MakeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import EventIcon from '@material-ui/icons/Event';
import FireplaceIcon from '@material-ui/icons/Fireplace';
import IconButton from '@material-ui/core/IconButton';
import { makeStyles } from '@material-ui/core/styles';
import { Button } from "@material-ui/core";

const storage = localStorage.getItem("usuario")

const FormularioRegistro = () => {

  React.useEffect(() => {
    if(storage !== null){
    }else{
      window.location.href = "./"
    }
  }, [])

const paperStyle={padding :20,height:'80vh',width:900,margin:'20px auto'}
const avatarStyle={backgroundColor:'#325ed8'}
const btnstyle={margin:'8px 0',align:'center'}
const useStyles = makeStyles((theme1) => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme1.spacing(1),
    marginRight: theme1.spacing(1),
    width: 310,
  },
}));

 const classes = useStyles();

    const [nombre, setNombre] = React.useState('')
    const [direccion, setDireccion] = React.useState('')
    const [telefono, setTelefono] = React.useState('')
    const [correo, setCorreo] = React.useState('')
    const [cedula, setCedula] = React.useState('')

    const [marca, setMarca] = React.useState('')
    const [modelo, setModelo] = React.useState('')
    const [serial, setSerial] = React.useState('')
    const [fechaU, setfechaU] = React.useState('')
    const [fechaS, setfechaS] = React.useState('')
    const [lista, setLista] = React.useState([])


    const guardarDatos = (e) => {

        e.preventDefault()

        if(!nombre.trim()){
            console.log('esta vacio nombre')
            return
        }

        if(!direccion.trim()){
            console.log('esta vacio direccion')
            return
        }

        if(!telefono.trim()){
            console.log('esta vacio telefono')
            return
        }

        if(!correo.trim()){
            console.log('esta vacio correo')
            return
        }

        if(!cedula.trim()){
            console.log('esta vacio cedula')
            return
        }

        if(!marca.trim()){
            console.log('esta vacio marca')
            return
        }

        if(!modelo.trim()){
            console.log('esta vacio modelo')
            return
        }

        if(!serial.trim()){
            console.log('esta vacio serial')
            return
        }

        if(!fechaU.trim()){
            console.log('esta vacio fechaU')
            return
        }

        if(!fechaS.trim()){
            console.log('esta vacio serial')
            return
        }

        // console.log('procesando datos...' + nombre +' '+ direccion+' '+ telefono +' '+ correo +' '+ cedula
        //                                     + marca +' '+ modelo+' '+ serial +' '+ fechaU+' '+ fechaS )

        setLista([
            ...lista,
            {nombraNombre: nombre, nombreDireccion: direccion, nombreTelefono: telefono, nombreCorreo: correo, nombreCedula: cedula,
            nombreMarca:marca, nombreModelo: modelo, nombreSerial: serial,nombreFechaU: fechaU, nombreFechaS: fechaS  }
        ])

        e.target.reset()
        setNombre('')
        setDireccion('')
        setTelefono('')
        setCorreo('')
        setCedula('')
        setMarca('')
        setModelo('')
        setSerial('')
        setfechaU('')
        setfechaS('')
        fetchData()
    }

    const fetchData = async () => {
      let count = 0;
      let rowsData = {}
      const localArr = []
      let historyData = {}
      const historyArr = []
      let customerID = ''
      const responseUser = await fetch(`https://back.prolightpty.com/customers`);
      const customerData = await responseUser.json();
      if (customerData.length != 0){
        customerData.forEach((item) => {
          if (item.doc === cedula){
            count += 1
            customerID = item.id
            rowsData = item.exting.map(item2 => {
              historyData = item2.history.map(item3 => {
                if(item3.serial === serial){
                  historyArr.push({
                    id: item3.id,
                    extinguisher: item3.extinguisher,
                    customer: item3.customer,
                    user: item3.user,
                    last_recharge: item3.last_recharge
                  })
                }
              })
              localArr.push({
                  id: item2.id,
                  serial: item2.serial,
                  brand: item2.brand,
                  model: item2.model,
                  last_recharge: item2.last_recharge,
                  next_recharge: item2.next_recharge,
                  // history: historyArr
              })
            })
          }
        })
      }
      if (count === 0){
        createData(historyArr)
        setTimeout(() => {
        console.log('Insertando datos...')
        }, 3000);
        window.location.href = "./dashboard"
      }else{
        updateData(localArr,historyArr,customerID)
        setTimeout(() => {
          console.log('Insertando datos...')
        }, 3000);
        window.location.href = "./dashboard"
      }
    }

    const createData = async (historyArr) => {
      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          name: nombre, 
          address: direccion, 
          phone: telefono,
          doc: cedula,
          exting: [
            {
              serial: serial,
              brand: marca,
              model: modelo,
              last_recharge: fechaU,
              next_recharge: fechaS,
              // history: [
              //   {
              //     extinguisher: serial,
              //     customer: nombre,
              //     user: storage,
              //     last_recharge: fechaU
              //   }
              // ]
            }
          ],
        })
      };
      const response = await fetch('https://back.prolightpty.com/customers',requestOptions);
      const data = await response.json();
      updateExting(data.id, historyArr)
    }

    const updateData = async (localArr,historyArr,id) => {
      localArr.push({
        serial: serial,
        brand: marca,
        model: modelo,
        last_recharge: fechaU,
        next_recharge: fechaS,
        // history: historyArr
      })
      const updateOptions = {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          address: direccion, 
          phone: telefono,
          exting: localArr
        })
      };

      //Customer Update
      const response = await fetch(`https://back.prolightpty.com/customers/${id}`,updateOptions);
      const data = await response.json();
      updateExting(data.id, historyArr)
    }

    // Exting Update
    const updateExting = async (custId, historyArr) => {
      let flag = ''
      historyArr.push({
        extinguisher: serial,
        customer: nombre,
        user: storage,
        last_recharge: fechaS
      })

      const extingBody = {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          history: historyArr
        })
      };

      const responseCust = await fetch(`https://back.prolightpty.com/customers/${custId}`);
      const oneCust = await responseCust.json();
      oneCust.exting.forEach((item) => {
        if(item.serial === serial){
          flag = item.id
        }
      })
      if(flag !== ''){
        const putExting = await fetch(`https://back.prolightpty.com/extings/${flag}`,extingBody);
        const extingData = await putExting.json();
      }
    } 

  if(storage !== null){
    return (
        <div>
            <h2 align='center'>Formulario De Registro</h2>
            <form onSubmit={ guardarDatos } >
              <Grid container spacing={2}>
                <Grid item xs={12} md={6} lg={6}>
                    <Grid align='center'>
                      <Avatar style={avatarStyle}><PermIdentityIcon/></Avatar>
                      <h2>Datos del Cliente</h2>

                      <TextField label='Nombre' placeholder='Ingresar Nombre'
                      onChange={ e => setNombre(e.target.value) }
                      />
                      <ListItemText />

                      <TextField label='Direccion' placeholder='Ingresar Direccion'
                      onChange={ e => setDireccion(e.target.value) }
                      />
                      <ListItemText />
                      <TextField label='Telefono' placeholder='Ingresar Telefono'
                      onChange={ e => setTelefono(e.target.value) }
                      />
                      <ListItemText />
                      <TextField label='Correo' placeholder='Ingresar Correo'
                      onChange={ e => setCorreo(e.target.value) }
                      />
                      <ListItemText />
                      <TextField label='Cedula Cliente' placeholder='Ingresar CC'
                      onChange={ e => setCedula(e.target.value) }
                      />
                      <ListItemText />
                    </Grid>

                </Grid>


                  <Grid item xs={12} md={6} lg={6} >
                          <Grid align='center'>
                            <Avatar style={avatarStyle}><FireplaceIcon/></Avatar>
                              <h2>Datos del Extintor</h2>

                                  <TextField label='Marca' placeholder='Ingresar Marca'
                                  onChange={ e => setMarca(e.target.value) }
                                  />
                                  <ListItemText />

                                  <TextField label='Modelo' placeholder='Ingresar Modelo'
                                  onChange={ e => setModelo(e.target.value) }
                                  />
                                  <ListItemText />
                                  <TextField label='Serial del Extintor' placeholder='Ingresar Serial'
                                  onChange={ e => setSerial(e.target.value) }
                                  />
                                  <ListItemText />
                                  <TextField
                                           id="date" onChange={ e => setfechaU(e.target.value) }
                                           label="Fecha Ultima Recarga"
                                           type="date"
                                           className={classes.textField}
                                           InputLabelProps={{
                                             shrink: true,

                                           }}
                                         />
                                  <ListItemText />

                                  <TextField
                                           id="date" onChange={ e => setfechaS(e.target.value) }
                                           label="Fecha Siguiente Recarga"
                                           type="date"
                                           className={classes.textField}
                                           InputLabelProps={{
                                          shrink: true,
                                           }}
                                         />

                                  <ListItemText />
                              </Grid>

                    </Grid>

            </Grid>

              <Grid align='center'>
                  <Button type='submit'color='primary' variant='contained'  style={btnstyle} fullwidth>Registrar</Button>
              </Grid>
            </form>
        </div>

    )
  }else{
    return (<Fragment></Fragment>);
  }
}

export default FormularioRegistro
