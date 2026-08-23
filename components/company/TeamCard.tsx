'use client';

import { useEffect, useState } from 'react';
import { contentApi, Team } from "@/lib/api/content";
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function TeamCard({team}:{team:Team}){
  // const [teams, setContacts]=useState<any[]>([]);
  // const [loading, setLoading] = useState(true);
  // const[error,setError]=useState("");

  // useEffect(
  //   ()=>{
  //     async function loadTeams(){
  //       try{
  //         const data= await contentApi.getTeams();
  //         setContacts(data);
  //       }catch(err){
  //         setError("Failed to load teams");
  //       }finally{
  //         setLoading(false);
  //       }
  //     }
  //     loadTeams();
  //   },[]);
  //   if(loading){
  //     return <p>Loading teams...</p>
  //   }
  //   if(error){
  //     return <p>{error}</p>
  //   }
    return(
      <Card className="h-full">
        <CardHeader>
          <CardTitle className="text-primary">{team.name}</CardTitle>
        </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">{team.description}</p>
            </CardContent>
      </Card>
    );
}