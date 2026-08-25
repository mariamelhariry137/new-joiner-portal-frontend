'use client'

import CompanyGrid from "@/components/company/CompanyGrid"
import { contentApi, Team, Policy, Contact,LearningResource } from "@/lib/api/content"
import { useEffect, useState } from "react"

export default function CompanyPage(){

    const [teams, setTeams]=useState<Team[]>([])
    const [contacts, setContacts]=useState<Contact[]>([])
    const [policies, setPolicies]=useState<Policy[]>([])
    const [learningResources, setLearningResources]=useState<LearningResource[]>([])


    useEffect(
        ()=>{
            async function loadData(){
                const[teamsData,contactsData,
                    policiesData,learningData]=
                await Promise.all([
                    contentApi.getTeams(),
                    contentApi.getContacts(),
                    contentApi.getPolicies(),
                    contentApi.getLearningResources()
                ])
                setTeams(teamsData);
                setContacts(contactsData);
                setPolicies(policiesData);
                setLearningResources(learningData);
            } 
            loadData();
        }, []);

    return(
        <main className="min-h-screen bg-background">
            <h1 className="mx-auto max-w-7xl px-4 pt-8 text-3xl font-bold text-foreground sm:px-6 lg:px-8">
                Company <span className="text-primary">Hub</span>
            </h1>
            <CompanyGrid teams={teams} contacts={contacts} policies={policies}
            learningResources={learningResources}/>
        </main>
    )
}