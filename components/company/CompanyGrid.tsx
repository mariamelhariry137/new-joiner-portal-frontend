import TeamCard from "./TeamCard"
import ContactCard from "./ContactCard"
import PolicyCard from "./PolicyCard"
import LearningCard from "./LearningCard"
import {Team, Policy, Contact,LearningResource } from "@/lib/api/content"

function slugify(title: string){
    return title.toLowerCase().replace(/\s+/g, "-")
}

function Section({title, children}:{title:string; children:React.ReactNode}){
    return (
        <section id={slugify(title)} className="scroll-mt-20 flex flex-col gap-4 rounded-lg border border-border bg-card p-6">
            <h2 className="text-lg font-semibold text-foreground border-l-4 border-primary pl-3">{title}</h2>
            <div className="grid grid-cols-1 gap-4 auto-rows-fr sm:grid-cols-2 xl:grid-cols-3">
                {children}
            </div>
        </section>
    )
}

const SECTIONS = ["Teams", "Contacts", "Policies", "Learning Resources"]

function SectionNav(){
    return (
        <nav className="sticky top-0 z-10 -mx-4 flex gap-2 overflow-x-auto border-b border-border bg-background/95 px-4 py-3 backdrop-blur sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
            {SECTIONS.map((title)=>(
                <a
                    key={title}
                    href={`#${slugify(title)}`}
                    className="shrink-0 rounded-full border border-border px-3 py-1.5 text-sm font-medium text-muted-foreground transition-colors hover:border-primary hover:text-primary"
                >
                    {title}
                </a>
            ))}
        </nav>
    )
}

export default function CompanyGrid({
    teams,contacts,policies,learningResources
}:{teams : Team[]; contacts: Contact[]; policies: Policy[]; learningResources: LearningResource[]}){
    return (
<div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
  <SectionNav />
  <div className="grid grid-cols-1 gap-8 pt-8">

    <Section title="Teams">
        {teams.map((team)=>{
            return <TeamCard key={team.id} team={team}/>
        })}
    </Section>

    <Section title="Contacts">
        {contacts.map((contact)=>{
            return <ContactCard key={contact.id} contact={contact}/>
        })}
    </Section>

    <Section title="Policies">
        {policies.map((policy)=>{
            return <PolicyCard key={policy.id} policy={policy}/>
        })}
    </Section>

    <Section title="Learning Resources">
      {learningResources.map((resource)=>{
            return <LearningCard key={resource.id} resource={resource}/>
        })}
    </Section>

  </div>
</div>
    )
}
