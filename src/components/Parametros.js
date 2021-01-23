import React, { Fragment } from 'react';
import { Link } from "react-router-dom";

const Parametros = () => {

    const [usuarios, setUsuarios] = React.useState([])

    React.useEffect(() => {
        fetchData()
    }, [])

    const fetchData = async () => {
        const data = await fetch('https://jsonplaceholder.typicode.com/users')
        const users = await data.json()
        // console.log(users)
        setUsuarios(users)
    }

    return (
        <div>
            <ul>
                {
                    usuarios.map(item => (
                        <li key={item.id}>
                            <Link to={`/users/${item.id}`}>{item.name}</Link>
                        </li>
                    ))
                }
            </ul>
        </div>
    );
}
 
export default Parametros;