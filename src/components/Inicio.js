import React, { Fragment } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid } from "@material-ui/core";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import ErrorRoundedIcon from '@material-ui/icons/ErrorRounded';
import WarningRoundedIcon from '@material-ui/icons/WarningRounded';
import { Typography } from "@material-ui/core";
import { orange, red } from '@material-ui/core/colors';

import {
  BrowserRouter as Router,
  Link
} from "react-router-dom";


  const useStyles = makeStyles({
    table: {
      minWidth: 650,
    },
    mainTitle: {
      marginBottom: 20,
      textAlign: 'center'
    },
    inconSize: {
      fontSize: 18,
      textAlign: 'center'
    }
  });
  const storage = localStorage.getItem("usuario")

  // function createData(customer, brand, model, lastDate, nextDate) {
  //   return { customer, brand, model, lastDate, nextDate };
  // }
  
  // const row = [
  //   createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  //   createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  //   createData('Eclair', 262, 16.0, 24, 6.0),
  //   createData('Cupcake', 305, 3.7, 67, 4.3),
  //   createData('Gingerbread', 356, 16.0, 49, 3.9),
  // ];

const Inicio = () => {
  const classes = useStyles();
  const [rows, setCustomer] = React.useState([])

  React.useEffect(() => {
    if(storage !== null){
      fetchData()
    }else{
      window.location.href = "./"
    }
  }, [])

const prueba = (nextDate) => {
  let msDiff = new Date(nextDate).getTime() - new Date().getTime();    //Future date - current date
  let daysTill = Math.floor(msDiff / (1000 * 60 * 60 * 24));
  return daysTill
}

const fetchData = async () => {

    try {
        const data = await fetch('https://back.prolightpty.com/customers')
        const customerData = await data.json()
        let rowsData = {}
        const localArr = []
        customerData.forEach((item) => {
            rowsData = item.exting.map(item2 => {
              const dayStill = prueba(item2.next_recharge)
              localArr.push({
                customer: item.name,
                brand: item2.brand,
                model: item2.model,
                lastDate: item2.last_recharge,
                nextDate: item2.next_recharge,
                warningIcon: dayStill,
              })
            return true
          })
        })
        setCustomer(localArr)
    } catch (error) {
        console.log(error)
    }
}

  if(storage !== null){
    return (
      <Fragment>
        <TableContainer component={Paper}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6} lg={6}>
              <Typography className={classes.mainTitle} variant="h4">Extintores</Typography>
            </Grid>
            <Grid item xs={12} md={6} lg={6} className={classes.inconSize}>
              <ErrorRoundedIcon style={{ color: orange.A200, fontSize: 20 }}/> Alerta recargar pronto <br/>
              <WarningRoundedIcon style={{ color: red[600], fontSize: 20 }}/> Fecha de recarga vencida
            </Grid>
          </Grid>
          <Table className={classes.table} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Propietario</TableCell>
                <TableCell align="center">Marca</TableCell>
                <TableCell align="center">Modelo</TableCell>
                <TableCell align="center">Última Recarga</TableCell>
                <TableCell align="center">Próxima Recarga</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <TableRow key={row.name}>
                  <TableCell component="th" scope="row">
                    {row.customer}&nbsp;
                    {
                    row.warningIcon > '0' && row.warningIcon <= '3' ? <ErrorRoundedIcon style={{ color: orange.A200 }}/>
                     : ''
                    }
                    {
                    row.warningIcon < '0' ? <WarningRoundedIcon style={{ color: red[600] }}/>
                     : ''
                    }
                  </TableCell>
                  <TableCell align="center">{row.brand}</TableCell>
                  <TableCell align="center">{row.model}</TableCell>
                  <TableCell align="center">{row.lastDate}</TableCell>
                  <TableCell align="center">{row.nextDate}</TableCell>
                  <TableCell align="center">
                    <Link to="#">
                      <button className="btn btn-success btn-sm float-right mr-2">
                        Recargar
                      </button>
                    </Link>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Fragment>
    );
  }else{
    return (
      <Fragment>
        
      </Fragment>
    );
  }
}

export default Inicio;

