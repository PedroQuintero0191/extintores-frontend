import React from 'react'
import {firebase} from './../fireabase'

const Firebase = () => {

    const [tareas, setTareas] = React.useState([])
    const [tarea, setTarea] = React.useState('')
    const [editId, setId] = React.useState()
    const [modoEdicion, setModoEdicion] = React.useState(false)

    // Fetch get
    React.useEffect(() => {

        const obtenerDatos = async () => {
            const db = firebase.firestore()
            try {
                const data = await db.collection('tarea').get()
                const arrayData = data.docs.map(doc => ({id: doc.id, ...doc.data()}))
                console.log(arrayData) 
                setTareas(arrayData)     
            } catch (error) {
                console.log(error)
            }
        }
        
        obtenerDatos()

    }, [])

    // Fetch post
    const agregarDatos = async (e) => {
        e.preventDefault()
        if(!tarea.trim()){
            console.log('sin texto')
            return
        }
        console.log(tarea)
        
        try {
            const db = firebase.firestore()
            const nuevaTarea = {
                name: tarea,
                fecha: Date.now()
            }
            const data = await db.collection('tarea').add({
                name: tarea,
                fecha: Date.now()
            })
            setTareas([
                ...tareas,
                {id: data.id, ...nuevaTarea }
            ])
            setTarea('')
        } catch (error) {
            console.log(error)
        }
    }

    // Fetch delete
    const eliminarDatos = async (id) => {
        try {
          const db = firebase.firestore()
          await db.collection('tarea').doc(id).delete()
          const arrayFiltrado = tareas.filter(item => item.id !== id)
          setTareas(arrayFiltrado)
        } catch (error) {
          console.log(error)
        }
    }

    const activarEdicion = (item) => {
        setModoEdicion(true)
        setTarea(item.name)
        setId(item.id)
    }

    // Fetch put
    const editarDatos = async (e) => {
        e.preventDefault()
        if(!tarea.trim()){
          console.log('vacio')
          return
        }
        try {
          const db = firebase.firestore()
          await db.collection('tarea').doc(editId).update({
            name: tarea
          })
          const arrayEditado = tareas.map(item => (
            item.id === editId ? {id: item.id, fecha: item.fecha, name: tarea} : item
          ))
          setTareas(arrayEditado)
          setModoEdicion(false)
          setId('')
          setTarea('')
        } catch (error) {
          console.log(error)
        }
    }

    return(
        <div className="container mb-2">
            <div className="row">
                <div className="col-md-6">
                    <h3>Lista de Tareas</h3>
                    <ul className="list-group">
                    {
                        tareas.map(item => (
                        <li className="list-group-item" key={item.id}>
                            <span>{item.name}</span>
                            <button 
                                className="btn btn-danger btn-sm float-right"
                                onClick={() => eliminarDatos(item.id)}
                            >
                                Eliminar
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
                <h3>
                    {
                        modoEdicion ? 'Editar Tarea' : 'Agregar Tarea'
                    }
                </h3>
                <form onSubmit={modoEdicion ? editarDatos : agregarDatos}>
                    <input 
                        type="text" 
                        className="form-control mb-2"
                        placeholder='Ingrese Tarea'
                        value={tarea}
                        onChange={e => setTarea(e.target.value)}
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
                </div>
            </div>
        </div>
    )
}

export default Firebase;