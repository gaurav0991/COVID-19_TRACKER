import React,{useState,useEffect} from 'react'
import { Line } from 'react-chartjs-2'
import BASE_URL from './Constants'
import numeral from "numeral"
const options={
    legend:{display:false},
    elements:{
        point:{
            radius:0
        },
    },
    maintainAspectRatio:false,
    tooltips:{
        mode:"index",
        intersect:false,
        callbacks:{
            label:function(tooltipItem,data){
                return numeral(tooltipItem.value).format("+0,0");
            }
        }
    },scales:{
        xAxes:[
            {
                type:"time",
                time:{
                    format:"MM/DD/YY",
                    tooltipformat:"ll"
                }
            }
        ],
        yAxes:[{

            gridLines:false,
            ticks:{
                callback:function (value,index,values){
                    return numeral(value).format("0a")
                }
            }
        }
        ]
    }
}
function LineGraph() {
    const [data,setLineData]=useState({}); 
    const buildData=(data,casesType='cases')=>{
        const chartData=[];
        let last;
    for(let date in data.cases){
            if(last){
                const newPoint={
                    x:date,
                    y:data['cases'][date]-last
                }
                chartData.push(newPoint)
            }
        last=data['cases'][date]

        }
        
        return chartData
    }

    useEffect(()=>{
        const fetchData=async()=>{
        await fetch(`${BASE_URL.BASE_URL}/historical/all?lastdays=120`).then(response=>response.json()).then(data=>{
            const chartData=buildData(data)
            console.log("Data>>>>>>>>>>>>>>>",chartData)
            setLineData(chartData)
        
        })
    }
    fetchData()
    },[])
       return (
        <div style={{maxHeight:"300px"}}>
            <br/>
            <br/>
            <h2>     &nbsp;&nbsp;   In graph</h2>
            <br></br>
           {data?.length>0 && (<Line data={{
                datasets:[{
                    data:data,
                    backgroundColor:"rgba(204,16,52,0.5)",
                    borderColor:"#CC1034"

                }]
            }} options={options}/>)}
            
        </div>
    )
}

export default LineGraph
