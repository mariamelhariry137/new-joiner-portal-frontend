'use client';

import { useEffect, useState } from 'react';
import { contentApi, LearningResource } from "@/lib/api/content";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

export default function learningResourcesCard({resource}:{resource: LearningResource}){
  // const [learningPolicies, setLearningPolicies]=useState<any[]>([]);
  // const [loading, setLoading] = useState(true);
  // const[error,setError]=useState("");

  // useEffect(
  //   ()=>{
  //     async function loadLearningResources(){
  //       try{
  //         const data= await contentApi.getLearningResources();
  //         setLearningPolicies(data);
  //       }catch(err){
  //         setError("Failed to load Learning Resources");
  //       }finally{
  //         setLoading(false);
  //       }
  //     }
  //     loadLearningResources();
  //   },[]);
  //   if(loading){
  //     return <p>Loading Learning Resources...</p>
  //   }
  //   if(error){
  //     return <p>{error}</p>
  //   }
    
    return(
      <Card className="h-full">
        <CardHeader>
        <CardTitle className="text-primary">{resource.title}</CardTitle>
        </CardHeader>
        <CardContent className="flex-1">
          <p className="text-sm text-muted-foreground">{resource.description}</p>
        </CardContent>
        <CardFooter>
          <p className="truncate text-sm text-accent-foreground underline">{resource.url}</p>
        </CardFooter>
      </Card>
    )
}