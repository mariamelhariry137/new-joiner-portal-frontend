import { apiAuthFetch } from "@/lib/api/client";


/* ========================================= */
/* TYPES                                     */
/* ========================================= */

export type Faq = {
  id: number;
  question: string;
  answer: string;
  category: string | null;
};


export type QuestionStatus =
  | "PENDING"
  | "ANSWERED";


export type UserQuestion = {
  id: number;
  question: string;
  status: QuestionStatus;
  adminResponse: string | null;
  createdAt: string;
  answeredAt: string | null;
};


/* ========================================= */
/* GET FAQs                                  */
/* ========================================= */

export async function getFaqs(): Promise<Faq[]> {
  return apiAuthFetch<Faq[]>(
    "/api/content/faqs"
  );
}


/* ========================================= */
/* GET MY QUESTIONS                          */
/* ========================================= */

export async function getMyQuestions(): Promise<
  UserQuestion[]
> {
  return apiAuthFetch<UserQuestion[]>(
    "/api/content/questions/me"
  );
}


/* ========================================= */
/* ASK QUESTION                              */
/* ========================================= */

export async function askQuestion(
  question: string
): Promise<UserQuestion> {
  return apiAuthFetch<UserQuestion>(
    "/api/content/questions",
    {
      method: "POST",
      body: {
        question,
      },
    }
  );
}