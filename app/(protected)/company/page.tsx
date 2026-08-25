'use client'

import CompanyGrid from "@/components/company/CompanyGrid"
import { contentApi, Team, Policy, Contact,LearningResource } from "@/lib/api/content"
import { useEffect, useRef, useState } from "react"

import { Button } from "@base-ui/react"
import { ArrowUpIcon } from "lucide-react"

export default function CompanyPage(){

    const [teams, setTeams]=useState<Team[]>([])
    const [contacts, setContacts]=useState<Contact[]>([])
    const [policies, setPolicies]=useState<Policy[]>([])
    const [learningResources, setLearningResources]=useState<LearningResource[]>([])


    const hasFetched = useRef(false);

    useEffect(
        ()=>{
            if (hasFetched.current) return;
            hasFetched.current = true;

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
            <div className="fixed bottom-6 right-6 z-50 flex w-fit items-center justify-center rounded-full border-2 border-accent bg-background p-2 shadow-md" 
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
                <Button
                    variant="outline"
                    size="icon"
                    aria-label="Scroll to top"
                >
                <ArrowUpIcon/>
                </Button>
            </div>
        </main>
    )
}