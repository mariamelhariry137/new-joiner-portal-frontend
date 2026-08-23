'use client';

import { useEffect, useState } from 'react';
import { Contact, contentApi } from "@/lib/api/content";
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function ContactCard({contact}:{contact: Contact}){
  // const [contacts, setContacts]=useState<any[]>([]);
  // const [loading, setLoading] = useState(true);
  // const[error,setError]=useState("");

  // useEffect(
  //   ()=>{
  //     async function loadContacts(){
  //       try{
  //         const data= await contentApi.getContacts();
  //         setContacts(data);
  //       }catch(err){
  //         setError("Failed to load contacts");
  //       }finally{
  //         setLoading(false);
  //       }
  //     }
  //     loadContacts();
  //   },[]);
  //   if(loading){
  //     return <p>Loading contacts...</p>
  //   }
  //   if(error){
  //     return <p>{error}</p>
  //   }
    
    return(
      <Card className="h-full">
        <CardHeader>
          <CardTitle className="text-primary">{contact.name}</CardTitle>
        </CardHeader>

        <CardContent className="flex flex-col gap-1 text-sm text-muted-foreground">
          <p>Email: <span className="text-foreground">{contact.email}</span></p>
          <p>Phone: <span className="text-foreground">{contact.phone}</span></p>
          <p>Team Id: <span className="text-foreground">{contact.team?.id}</span></p>
        </CardContent>
      </Card>
    )
}