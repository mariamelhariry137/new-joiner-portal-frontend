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
      <Card>
        <CardHeader>
          <CardTitle> {contact.name}</CardTitle>
        </CardHeader>

        <CardContent>
          <p>Email : {contact.email}</p>
          <p>Phone : {contact.phone}</p>
          <p>Team Id {contact.team?.id}</p>
        </CardContent>
      </Card>
    )
}