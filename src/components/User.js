import React from 'react'
import {useParams} from 'react-router-dom'

const User = () => {

    console.log(useParams(), 'useParams')
    const {id} = useParams();
    // console.log(id)

    const [usuario, setUsuario] = React.useState({})

    React.useEffect(() => {
        fetchData()
    }, [])

    const fetchData = async () => {
        const data = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`)
        const user = await data.json()
        // console.log(user)
        setUsuario(user)
    }

    return (
        <div>
            <h3>Ficha de Usuario</h3>
            <strong>Nombre: </strong>
            <span>{usuario.name}</span><br/>
            <strong>Alias: </strong>
            <span>{usuario.username}</span><br/>
            <strong>Email: </strong>
            <span>{usuario.email}</span><br/>
            <strong>Telefono: </strong>
            <span>{usuario.phone}</span><br/>
            <strong>Sitio Web: </strong>
            <span>{usuario.website}</span>
        </div>
    )
}

export default User