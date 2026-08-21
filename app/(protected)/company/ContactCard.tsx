'use client';

import { useEffect, useState } from 'react';
import { contentApi } from "@/lib/api/content";
import { Card, CardContent, CardTitle } from '@/components/ui/card';

export default function CompanyPage(){
  const [contacts, setContacts]=useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const[error,setError]=useState("");

  useEffect(
    ()=>{
      async function loadContacts(){
        try{
          const data= await contentApi.getContacts();
          setContacts(data);
        }catch(err){
          setError("Failed to load contacts");
        }finally{
          setLoading(false);
        }
      }
      loadContacts();
    },[]);
    if(loading){
      return <p>Loading contacts...</p>
    }
    if(error){
      return <p>{error}</p>
    }
    
    return(
      <Card>
        <CardTitle>Contacts</CardTitle>
        {
          contacts.map((contact)=>(
            <CardContent key={contact.id}>
              <h2>Name : {contact.name}</h2>
              <p>Email : {contact.email}</p>
              <p>Phone : {contact.phone}</p>
              <p>Team Id {contact.team.id}</p>

            </CardContent>
          ))
        }
      </Card>
    )
}