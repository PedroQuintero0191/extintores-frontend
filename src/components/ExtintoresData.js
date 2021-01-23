import React from 'react'
import {firebase} from './../fireabase'
import {useParams} from 'react-router-dom'

const ExtintoresData = () => {

    console.log(useParams(), 'useParams')
    const {id} = useParams();
    // console.log(id)

    const [extintor, setExtintor] = React.useState({})

    // Fetch get
    React.useEffect(() => {

        const obtenerDatos = async () => {
            const db = firebase.firestore()
            const docRef = db.collection("extintor").doc(id);
            docRef.get().then(function(doc) {
                if (doc.exists) {
                    setExtintor(doc.data())
                } else {
                    console.log("No hay datos");
                }
            }).catch(function(error) {
                console.log("Error getting document:", error);
            });
        }
        
        obtenerDatos()

    }, [])

    return (
        <div>
            <h3>Ficha de Extintor</h3>
            <strong>Nombre: </strong>
            <span>{extintor.name}</span><br/>
            <strong>Marca: </strong>
            <span>{extintor.brand}</span><br/>
            <strong>Propietario: </strong>
            <span>{extintor.owner}</span><br/>
            <strong>Ultima Recarga: </strong>
            <span>{extintor.lastdate}</span><br/>
        </div>
    )
}

export default ExtintoresData