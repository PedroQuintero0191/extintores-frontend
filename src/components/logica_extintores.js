import React, { Fragment } from 'react';
import { DataGrid } from '@material-ui/data-grid';

const Inicio = (props) => {

    const [rows, setCustomer] = React.useState([])
    const columns = [
        // { field: 'id', headerName: 'ID', width: 70 },
        { field: 'customer', headerName: 'Propietario', width: 230 },
        { field: 'brand', headerName: 'Marca', width: 190 },
        { field: 'model', headerName: 'Modelo', width: 190 },
        { field: 'lastDate', headerName: 'Última Recarga', width: 230 },
        { field: 'nextDate', headerName: 'Próxima Recarga', width: 230 },
        { field: 'icon', headerName: '', width: 90 }
      ];

    React.useEffect(() => {
        fetchData()
    }, [])

    const fetchData = async () => {
        try {
            const data = await fetch('https://back.prolightpty.com/customers')
            const customerData = await data.json()
            let rowsData = {}
            const localArr = []
            customerData.forEach((item) => {
                rowsData = item.exting.map(item2 => {
                    localArr.push({
                        id: item2.id,
                        brand: item2.brand,
                        model: item2.model,
                        lastDate: item2.last_recharge,
                        nextDate: item2.next_recharge,
                        customer: item.name
                    })
                    return true
                })
            })
            setCustomer(localArr)
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <Fragment>
            <div style={{ height: 500, width: '100%' }}>
                <DataGrid rows={rows} columns={columns} pageSize={8} />
            </div>
        </Fragment>
    );
}
 
export default Inicio;