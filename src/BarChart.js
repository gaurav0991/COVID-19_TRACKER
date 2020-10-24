import React, { useEffect, useState } from "react";
import { Radar } from "react-chartjs-2";

function BarChart() {
  const [data, setdata] = useState([]);
  const [cont, setcont] = useState([]);

  useEffect(() => {
    let arr = [];
    let contName = [];
    const fetchData = async () => {
      const data = await fetch(`https://disease.sh/v3/covid-19/continents`);
      const d = await data.json();
      console.log(d);
      for (let i = 0; i < d.length; i++) {
        arr.push(d[i]["cases"]);
        contName.push(d[i]["continent"]);
      }
      console.log(arr);
      setcont(contName);
      setdata(arr);
    };
    fetchData();
  }, []);
  return (
    <div style={{ marginTop: "100px" }}>
      <h3>Continent Wise data</h3>
      {data.length > 0 ? (
        <Radar
          data={{
            labels: cont,
            datasets: [
              {
                data: data,
                backgroundColor: "rgba(204,16,52,0.5)",
                borderColor: "#CC1034",
              },
            ],
          }}
        />
      ) : (
        <h4></h4>
      )}
    </div>
  );
}

export default BarChart;
