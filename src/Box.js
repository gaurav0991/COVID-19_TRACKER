import { Card, CardContent, Typography } from '@material-ui/core'
import React from 'react'
import './Box.css'
function Box(props) {
    return (
        <div className="box">
            <Card
            className={`
            box__major
            ${props.activeType && "selected"}
            ${props.isRed && "red_seleced"}
            
            `}
            onClick={props.onClick}
            >
                <CardContent>
                    <Typography color="textSecondary">
                        {props.title}
                    </Typography>
    <h2 className={`box_cases ${!props.isRed && "textgreen"}`}>{props.cases}</h2>
    <Typography color="textSecondary">
                        {props.total} TOTAL
                        
                    </Typography>
                </CardContent>
            </Card>
        </div>
    )
}

export default Box
