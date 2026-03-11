import React, { useEffect, useState } from "react";
import { getMedicines } from "../api/api";
import { PieChart, Pie, Cell } from "recharts";

function Dashboard(){

const [data,setData]=useState([]);

useEffect(()=>{

const fetchData = async ()=>{
const res = await getMedicines();

if(res.success){

let taken=0;
let missed=0;

res.medicines.forEach(m=>{
taken+=m.takenCount;
missed+=m.missedCount;
});

setData([
{name:"Taken",value:taken},
{name:"Missed",value:missed}
]);

}

}

fetchData();

},[]);

return(

<div>

<h1>
This shows the stats of my medicines and their names in a graph for missed/rescheduled doses
</h1>

<PieChart width={400} height={400}>
<Pie
data={data}
dataKey="value"
outerRadius={150}
label
/>
</PieChart>

</div>

)

}

export default Dashboard