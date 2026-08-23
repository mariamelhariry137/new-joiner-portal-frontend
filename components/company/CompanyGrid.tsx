import TeamCard from "./TeamCard"
import ContactCard from "./ContactCard"
import PolicyCard from "./PolicyCard"
import LearningCard from "./LearningCard"
import {Team, Policy, Contact,LearningResource } from "@/lib/api/content"

export default function CompanyGrid({
    teams,contacts,policies,learningResources
}:{teams : Team[]; contacts: Contact[]; policies: Policy[]; learningResources: LearningResource[]}){
    return (
<div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
  <div className="grid grid-cols-1 gap-8 md:grid-cols-2">

    <div className="flex items-start gap-4 rounded-lg border border-gray-200 p-6 dark:border-gray-700">
        //Teams card
        {teams.map((team)=>{
            return <TeamCard key={team.id} team={team}/>
        })}
    </div>

//contacts div
    <div className="flex items-start gap-4 rounded-lg border border-gray-200 p-6 dark:border-gray-700">
        //contacts card
        {contacts.map((contact)=>{
            return <ContactCard key={contact.id} contact={contact}/>
        })}
    </div>

//policy div
    <div className="flex items-start gap-4 rounded-lg border border-gray-200 p-6 dark:border-gray-700">
        //policy card
        {policies.map((policy)=>{
            return <PolicyCard key={policy.id} policy={policy}/>
        })}
    </div>

//Resources div
    <div className="flex items-start gap-4 rounded-lg border border-gray-200 p-6 dark:border-gray-700">
      //learning card
      {learningResources.map((resource)=>{
            return <LearningCard key={resource.id} resource={resource}/>
        })}
    </div>

  </div>
</div>
    )
}