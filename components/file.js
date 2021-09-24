import * as React from 'react';
import {useState,useEffect} from 'react'
import {Container  } from '@mui/material';
import CompareArrowsIcon from '@mui/icons-material/CompareArrows';

export default function Home({data}){
  const [ country,setCountry]=useState(data)
  console.log(data)
  console.log("I am"+data)

  return (
  <>
  <Container style={{marginTop:"10px"}}>
<div style={{width:"700px",boxShadow:"1px 1px 2px 2px #EFEFEF",paddingBottom:"40px"}}>
  <Container>
<div>
  <h3 >=</h3>
  </div>
  <div style={{display:"flex",justifyContent:"space-between",flexWrap:"nowrap"}}>
<div>
  <div>
  <select style={{backgroundColor:"#EFEFEF",width:"290px",height:"33px",border:"1px solid grey"}}>  
{/* <option value = "BMW"> BMW   
</option>  
<option value = "Mercedes"> Mercedes   
</option>  
<option value = "Audi"> Audi  
</option>  
<option value = "Skoda"> Skoda  
</option>   */}
{/* {storedata.map((post,index)=>{
return<>
<h1>{post.rates}</h1></>
})} */}
{/* {
  props.data.map(data=>(
    <div>
      {data.rates}
    </div>
  ))
} */}

</select>  
  </div>
  <div>
    <input style={{backgroundColor:"white",width:"290px",height:"40px",border:"1px solid grey"}}></input>
    </div>
    </div>
    <div>
      <CompareArrowsIcon style={{marginTop:"25px"}} />
    </div>
    <div>
  <div>
  <select style={{backgroundColor:"#EFEFEF",width:"290px",height:"33px",border:"1px solid grey"}}>  
<option value = "BMW"> BMW   
</option>  
<option value = "Mercedes"> Mercedes   
</option>  
<option value = "Audi"> Audi  
</option>  
<option value = "Skoda"> Skoda  
</option>  
</select>  
  </div>
  <div>
    <input style={{backgroundColor:"white",width:"290px",height:"40px",border:"1px solid grey"}}></input>
    </div>
    </div>
</div>
    </Container>
</div>

</Container>
  </>
  )
}

export async function getServerSideProps() {
  const res = await fetch("http://data.fixer.io/api/latest?access_key=537646cfc72f05780c53aab4789fe8f3");
  const postData = await res.json();
  return {
    props: {
      data,
    },
  
  };
}
