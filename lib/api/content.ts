import { apiAuthFetch } from './client';


export interface Contact {
  id: number;
  name: string;
  email: string;
  phone: string;
  team: {
    id: number;
  };
}

export interface Team {
  id: number;
  name: string;
  description?: string;
}

export interface Policy {
  id: number;
  title: string;
  description: string;
  [key: string]: any;
}

export interface LearningResource {
  id: number;
  title: string;
  description: string;
  url: string;
  [key: string]: any;
}


export const contentApi = {
  
  getContacts: () => 
    apiAuthFetch<Contact[]>('/api/content/contacts'),

  getContact: (id: number) => 
    apiAuthFetch<Contact>(`/api/content/contacts/${id}`),

  getContactsByTeam: (teamId: number) => 
    apiAuthFetch<Contact[]>(`/api/content/contacts/team/${teamId}`),

  getTeams: () => 
    apiAuthFetch<Team[]>('/api/content/teams'),

  getTeam: (id: number) => 
    apiAuthFetch<Team>(`/api/content/teams/${id}`),

  
  getPolicies: () => 
    apiAuthFetch<Policy[]>('/api/content/policies'),

  getPolicy: (id: number) => 
    apiAuthFetch<Policy>(`/api/content/policies/${id}`),

 
  getLearningResources: () => 
    apiAuthFetch<LearningResource[]>('/api/content/learning-resources'),

  
  getLearningResource: (id: number) => 
    apiAuthFetch<LearningResource>(`/api/content/learning-resources/${id}`),

  
};