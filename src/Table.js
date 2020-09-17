import React from 'react'
import './sidebar.css'

function Table({contries}) {
    const sortedTable=(contries)=>{
        const sortedData=[...contries];
        sortedData.sort((a,b)=>{
            if(a.cases>b.cases){
                return -1;
            }else{
                return 1;
            }
        });
        return sortedData;
    }
    return (
        <div className="table">
                            <h2>Live Cases By Country</h2>
                            <br/>

            {
                sortedTable(contries).map(country=>(
                    <tr>
                        <td>{country.country}</td>
                        <td>
                <strong>{country.cases}</strong>
                        </td>
                    </tr>
                ))
            }
            
        </div>
    )
}

export default Table
