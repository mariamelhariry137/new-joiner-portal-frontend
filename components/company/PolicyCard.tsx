'use client';

import { useEffect, useState } from 'react';
import { contentApi, Policy } from "@/lib/api/content";
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function PolicyCard({policy}:{policy:Policy}){
  // const [policy, setPolicy]=useState<any[]>([]);
  // const [loading, setLoading] = useState(true);
  // const[error,setError]=useState("");

  // useEffect(
  //   ()=>{
  //     async function loadPolicy(){
  //       try{
  //         const data= await contentApi.getPolicies();
  //         setPolicy(data);
  //       }catch(err){
  //         setError("Failed to load contacts");
  //       }finally{
  //         setLoading(false);
  //       }
  //     }
  //     loadPolicy();
  //   },[]);
  //   if(loading){
  //     return <p>Loading policies...</p>
  //   }
  //   if(error){
  //     return <p>{error}</p>
  //   }
    
    return(
      <Card>
        <CardHeader>
          <CardTitle>{policy.title}</CardTitle>
        </CardHeader>
        <CardContent>
          <p>{policy.description}</p>
        </CardContent>
      </Card>
    )
}