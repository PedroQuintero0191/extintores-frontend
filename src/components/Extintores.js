import React, { Fragment } from 'react'
import {firebase} from './../fireabase'
import { Link } from "react-router-dom";

const Extintores = () => {

    const [extintores, setExtintores] = React.useState([])
    const [extintor, setExtintor] = React.useState('')
    const [marca, setMarca] = React.useState('')
    const [propietario, setPropietario] = React.useState('')
    const [ultimaRecarga, setUltimaRecarga] = React.useState('')
    const [editId, setId] = React.useState()
    const [modoEdicion, setModoEdicion] = React.useState(false)
    const [modoRecarga, setModoRecarga] = React.useState(false)

    // Fetch get
    React.useEffect(() => {

        const obtenerDatos = async () => {
            const db = firebase.firestore()
            try {
                const data = await db.collection('extintor').get()
                const arrayData = data.docs.map(doc => ({id: doc.id, ...doc.data()}))
                setExtintores(arrayData)     
            } catch (error) {
                console.log(error)
            }
        }
        
        obtenerDatos()

    }, [])

    // Fetch post
    const agregarDatos = async (e) => {
        e.preventDefault()
        if(!extintor.trim()){
            console.log('sin texto')
            return
        }
        console.log(extintor)
        
        try {
            const db = firebase.firestore()
            const nuevoExtintor = {
                name: extintor,
                brand: marca,
                owner: propietario,
                lastdate: ultimaRecarga,
            }
            const data = await db.collection('extintor').add({
                name: extintor,
                brand: marca,
                owner: propietario,
                lastdate: ultimaRecarga,
            })
            setExtintores([
                ...extintores,
                {id: data.id, ...nuevoExtintor }
            ])
            setExtintor('')
            setMarca('')
            setPropietario('')
            setUltimaRecarga('')
        } catch (error) {
            console.log(error)
        }
    }

    const activarEdicion = (item) => {
        setModoEdicion(true)
        setModoRecarga(false)
        setExtintor(item.name)
        setMarca(item.brand)
        setPropietario(item.owner)
        setUltimaRecarga(item.lastdate)
        setId(item.id)
    }

    // Fetch put
    const editarDatos = async (e) => {
        e.preventDefault()
        if(!extintor.trim()){
          console.log('vacio')
          return
        }
        try {
          const db = firebase.firestore()
          await db.collection('extintor').doc(editId).update({
            name: extintor,
            brand: marca,
            owner: propietario,
            lastdate: ultimaRecarga
          })
          const arrayEditado = extintores.map(item => (
            item.id === editId ? {id: item.id, lastdate: ultimaRecarga, name: extintor, brand: marca, owner: propietario} : item
          ))
          setExtintores(arrayEditado)
          setModoEdicion(false)
          setId('')
          setExtintor('')
          setMarca('')
          setPropietario('')
          setUltimaRecarga('')
        } catch (error) {
          console.log(error)
        }
    }

    const activarRecarga = (item) => {
        setModoRecarga(true)
        setModoEdicion(false)
        setUltimaRecarga(item.lastdate)
        setId(item.id)
    }

    // Fetch put
    const Recargar = async (e) => {
        e.preventDefault()
        if(!ultimaRecarga.trim()){
          console.log('vacio')
          return
        }
        try {
          const db = firebase.firestore()
          await db.collection('extintor').doc(editId).update({
            lastdate: ultimaRecarga
          })
          const arrayEditado = extintores.map(item => (
            item.id === editId ? {id: item.id, lastdate: ultimaRecarga, name: item.name, brand: item.brand, owner: item.owner} : item
          ))
          setExtintores(arrayEditado)
          setModoRecarga(false)
          setId('')
          setUltimaRecarga('')
        } catch (error) {
          console.log(error)
        }
    }

    return(
        <div className="container mb-2">
            <div className="row">
                <div className="col-md-6">
                    <h3>Extintores</h3>
                    <ul className="list-group">
                    {
                        extintores.map(item => (
                        <li className="list-group-item" key={item.id}>
                            <Link to={`/extintor/${item.id}`}>{item.name}</Link>
                            <button 
                                className="btn btn-success btn-sm float-right"
                                onClick={() => activarRecarga(item)}
                            >
                                Recargar
                            </button>
                            <button 
                                className="btn btn-warning btn-sm float-right mr-2"
                                onClick={() => activarEdicion(item)}
                            >
                                Editar
                            </button>
                        </li>
                        ))
                    }
                    </ul>
                </div>
                <div className="col-md-6">
                    {
                        modoRecarga ? (
                            <Fragment>
                                <h3>Recargar Extintor</h3>
                                <form onSubmit={Recargar}>
                                    <input 
                                        type="text" 
                                        className="form-control mb-2"
                                        placeholder='Ingrese fecha de recarga'
                                        value={ultimaRecarga}
                                        onChange={e => setUltimaRecarga(e.target.value)}
                                    />
                                    <button type='submit' className='btn btn-success btn-block btn-sm'>
                                        Recargar
                                    </button>
                                </form>
                            </Fragment>
                        ) : (
                            <Fragment>
                                <h3>
                                    {
                                        modoEdicion ? 'Editar Extintor' : 'Agregar Extintor'
                                    }
                                </h3>
                                <form onSubmit={modoEdicion ? editarDatos : agregarDatos}>
                                    <input 
                                        type="text" 
                                        className="form-control mb-2"
                                        placeholder='Ingrese Extintor'
                                        value={extintor}
                                        onChange={e => setExtintor(e.target.value)}
                                    />
                                    <input 
                                        type="text" 
                                        className="form-control mb-2"
                                        placeholder='Ingrese Marca'
                                        value={marca}
                                        onChange={e => setMarca(e.target.value)}
                                    />
                                    <input 
                                        type="text" 
                                        className="form-control mb-2"
                                        placeholder='Ingrese Propietario'
                                        value={propietario}
                                        onChange={e => setPropietario(e.target.value)}
                                    />
                                    <input 
                                        type="text" 
                                        className="form-control mb-2"
                                        placeholder='Ingrese última recarga'
                                        value={ultimaRecarga}
                                        onChange={e => setUltimaRecarga(e.target.value)}
                                    />
                                    <button 
                                        type='submit'
                                        className={
                                        modoEdicion ? 'btn btn-warning btn-block btn-sm' : 
                                        'btn btn-dark btn-block btn-sm'
                                        }
                                    >
                                        {
                                        modoEdicion ? 'Editar' : 'Agregar'
                                        }
                                    </button>
                                </form>
                            </Fragment>
                        )
                    }
                </div>
            </div>
        </div>
    )
}

export default Extintores;