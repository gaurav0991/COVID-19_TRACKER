import { FormControl, MenuItem, Select } from '@material-ui/core';
import React,{useEffect,useState} from 'react';
import './App.css';
import Box from './Box'
import BASE_URL from './Constants' 
import Map from './Map';
import numeral from "numeral";

import SideBar from './SideBar';

function App() {
  const [countries,setCountries]=useState([])
  const [selectedCountry,setSelecetedCountry]=useState('worldwide')
  const [selectedCountryInfo,setSelecetedCountryInfo]=useState('worldwide')
  const [tabledata,settabledata]=useState([])
  const [mapCenter, setMapCenter] = useState({ lat: 34.80746, lng: -40.4796 });
  const [mapZoom, setMapZoom] = useState(3);
  const [mapCountries, setMapCountries] = useState([]);
  const [casesType, setCasesType] = useState("cases");


  useEffect(()=>{
    fetch(`${BASE_URL.BASE_URL}/all`).then(response=>response.json()).then((d)=>setSelecetedCountryInfo(d))
  },[])
  useEffect(()=>{

    const getData=async()=>{
      await fetch(`${BASE_URL.BASE_URL}/countries`).then((response)=>response.json()).then((data)=>{
        const countries=data.map((country)=>({
          
            name:country.country,
            value:country.countryInfo.iso2
          
        }));
        settabledata(data);
        setMapCountries(data);

        setCountries(countries);
        
      })
    }
    getData();
  },[]);
  const onCountryChange=async(event)=>{
    console.log(event.target.value);
    setSelecetedCountry(event.target.value)
    const url=event.target.value=='worldwide'?`${BASE_URL.BASE_URL}/all`:`${BASE_URL.BASE_URL}/countries/${event.target.value}`
    await fetch(url).then(response=>response.json()).then(data=>{
      setSelecetedCountry(event.target.value);
      setSelecetedCountryInfo(data);
      event.target.value==="worldwide"?setMapCenter([34.80746, -40.4796])
      : setMapCenter([data.countryInfo.lat, data.countryInfo.long]);
      setMapZoom(5)
    })
  }
  return (
    <div className="app">
      <div className="app_main">
            <div className="app-header">

      <h1
      style={{
        color:"#fc3c3c"
      }}
      >COVID-19 TRACKER</h1>
        <FormControl>
          <Select variant="outlined" value={selectedCountry}
          onChange={onCountryChange}
          >
            <MenuItem value="worldwide">WorldWide</MenuItem>
    {
      countries.map((country)=>(
      <MenuItem value={country.value}>{country.name}</MenuItem>

      ))
    }
          </Select>
        </FormControl>
        </div>
        <div className="app_box">
        <Box
        isRed
        activeType={casesType==="cases"}
                    onClick={(e) => setCasesType("cases")}

        title="Corona Cases" cases={ selectedCountryInfo.todayCases?`+${numeral(selectedCountryInfo.todayCases).format("0.0a")}`:"+0"} total={selectedCountryInfo.cases}/>
        <Box 
        

                activeType={casesType==="recovered"}

                    onClick={(e) => setCasesType("recovered")}

        
        title="Recovered " cases={selectedCountryInfo.todayRecovered?`+${numeral(selectedCountryInfo.todayRecovered).format("0.0a")}`:"+0"} total={selectedCountryInfo.recovered}/>
        <Box 
        isRed

                activeType={casesType==="deaths"}

                    onClick={(e) => setCasesType("deaths")}

        title="Deaths" cases={selectedCountryInfo.todayDeaths?`+${numeral(selectedCountryInfo.todayDeaths).format("0.0a")}`:"+0"} total={selectedCountryInfo.deaths}/>
        </div>
        <Map
        countries={mapCountries}
        casesType={casesType}
        center={mapCenter}
         zoom={mapZoom}
        />
          </div>
        <div className="app_sidebare">
          <SideBar data={tabledata} />
        </div>
      {/*Header*/}
      </div>
  );
}

export default App;
