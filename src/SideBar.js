import { Card } from '@material-ui/core'
import React from 'react'
import LineGraph from './LineGraph'
import Table from './Table'
function SideBar(props) {
    return (
        <div className="sidebar">
            <Card>
                <Table contries={props.data} />
                <LineGraph/>
            </Card>
        </div>
    )
}

export default SideBar
