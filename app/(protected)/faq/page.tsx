"use client";

import {
  useEffect,
  useState,
  type FormEvent,
} from "react";

import {
  askQuestion,
  getFaqs,
  getMyQuestions,
  type Faq,
  type UserQuestion,
} from "@/lib/api/faq";


export default function FaqPage() {
  /* ========================================= */
  /* STATE                                     */
  /* ========================================= */

  const [faqs, setFaqs] = useState<Faq[]>([]);
  const [myQuestions, setMyQuestions] =
    useState<UserQuestion[]>([]);

  const [loading, setLoading] = useState(true);

  const [question, setQuestion] = useState("");
  const [submitting, setSubmitting] =
    useState(false);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");


  /* ========================================= */
  /* LOAD FAQS + MY QUESTIONS                  */
  /* ========================================= */

  useEffect(() => {
    async function loadData() {
      try {
        setLoading(true);
        setError("");

        const [
          faqData,
          questionData,
        ] = await Promise.all([
          getFaqs(),
          getMyQuestions(),
        ]);

        setFaqs(faqData);
        setMyQuestions(questionData);
      } catch (err) {
        console.error(err);

        setError(
          "We couldn't load the FAQ information."
        );
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, []);


  /* ========================================= */
  /* SUBMIT QUESTION                           */
  /* ========================================= */

  async function handleAskQuestion(
    event: FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    const trimmedQuestion =
      question.trim();

    if (!trimmedQuestion) {
      setError(
        "Please enter your question before submitting."
      );

      return;
    }

    setSubmitting(true);
    setError("");
    setSuccess("");

    try {
      const createdQuestion =
        await askQuestion(
          trimmedQuestion
        );

      /*
       * Add the newly submitted question
       * immediately to My Questions.
       */
      setMyQuestions((current) => [
        createdQuestion,
        ...current,
      ]);

      setQuestion("");

      setSuccess(
        "Your question has been sent successfully."
      );
    } catch (err) {
      console.error(err);

      setError(
        "We couldn't submit your question. Please try again."
      );
    } finally {
      setSubmitting(false);
    }
  }


  /* ========================================= */
  /* UI                                        */
  /* ========================================= */

  return (
    <main className="min-h-screen bg-gray-50">

      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">

        {/* =================================== */}
        {/* HEADER                              */}
        {/* =================================== */}

        <div className="mb-8">

          <p className="mb-2 text-sm font-bold uppercase tracking-[0.15em] text-[#E60000]">
            Need help?
          </p>

          <h1 className="text-3xl font-bold text-[#25282B]">
            Frequently Asked Questions
          </h1>

          <p className="mt-3 text-sm text-gray-600">
            Find answers to common questions about
            your onboarding journey.
          </p>

        </div>


        {/* =================================== */}
        {/* ERROR MESSAGE                       */}
        {/* =================================== */}

        {error && (
          <div
            role="alert"
            className="mb-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
          >
            {error}
          </div>
        )}


        {/* =================================== */}
        {/* SUCCESS MESSAGE                     */}
        {/* =================================== */}

        {success && (
          <div className="mb-6 rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700">
            {success}
          </div>
        )}


        {/* =================================== */}
        {/* FAQ SECTION                         */}
        {/* =================================== */}

        <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8">

          <h2 className="mb-5 text-xl font-bold text-[#25282B]">
            Common questions
          </h2>


          {/* Loading */}

          {loading && (
            <div className="rounded-xl border border-gray-200 bg-gray-50 p-6">

              <p className="text-sm text-gray-500">
                Loading frequently asked questions...
              </p>

            </div>
          )}


          {/* Empty state */}

          {!loading &&
            faqs.length === 0 && (
              <div className="rounded-xl border border-dashed border-gray-300 bg-gray-50 px-6 py-10 text-center">

                <p className="font-semibold text-gray-700">
                  No frequently asked questions are available yet.
                </p>

                <p className="mt-1 text-sm text-gray-500">
                  You can submit your question below.
                </p>

              </div>
            )}


          {/* FAQ list */}

          {!loading &&
            faqs.length > 0 && (
              <div className="space-y-3">

                {faqs.map((faq) => (

                  <details
                    key={faq.id}
                    className="group rounded-xl border border-gray-200 bg-white"
                  >

                    {/* Question */}

                    <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-4">

                      <div>

                        {faq.category && (
                          <span className="mb-2 inline-block rounded-full bg-red-50 px-2.5 py-1 text-xs font-semibold text-[#E60000]">
                            {faq.category}
                          </span>
                        )}

                        <p className="font-semibold text-[#25282B]">
                          {faq.question}
                        </p>

                      </div>


                      <span className="text-xl font-bold text-[#E60000] transition-transform group-open:rotate-45">
                        +
                      </span>

                    </summary>


                    {/* Answer */}

                    <div className="border-t border-gray-100 px-5 py-4">

                      <p className="text-sm leading-7 text-gray-600">
                        {faq.answer}
                      </p>

                    </div>

                  </details>

                ))}

              </div>
            )}

        </section>


        {/* =================================== */}
        {/* ASK QUESTION SECTION                */}
        {/* =================================== */}

        <section className="mt-8 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8">

          <div className="mb-5">

            <h2 className="text-xl font-bold text-[#25282B]">
              Can&apos;t find what you&apos;re looking for?
            </h2>

            <p className="mt-1 text-sm leading-6 text-gray-500">
              Send your question to the administration.
              Their response will be visible only in
              your account.
            </p>

          </div>


          <form
            onSubmit={handleAskQuestion}
            className="space-y-4"
          >

            {/* Question textarea */}

            <div>

              <label
                htmlFor="question"
                className="mb-2 block text-sm font-semibold text-[#25282B]"
              >
                Your question
              </label>


              <textarea
                id="question"
                value={question}
                onChange={(event) =>
                  setQuestion(
                    event.target.value
                  )
                }
                placeholder="Type your question here..."
                maxLength={2000}
                rows={5}
                className="w-full resize-none rounded-xl border border-gray-300 bg-white px-4 py-3 text-[#25282B] outline-none transition placeholder:text-gray-400 hover:border-gray-400 focus:border-[#E60000] focus:ring-2 focus:ring-[#E60000]/15"
              />


              {/* Helper + character count */}

              <div className="mt-2 flex items-center justify-between gap-3">

                <p className="text-xs text-gray-500">
                  Your question is linked automatically
                  to your account.
                </p>

                <p className="text-xs text-gray-400">
                  {question.length}/2000
                </p>

              </div>

            </div>


            {/* Submit */}

            <button
              type="submit"
              disabled={
                submitting ||
                !question.trim()
              }
              className="rounded-xl bg-[#E60000] px-6 py-3 font-bold text-white transition hover:bg-[#C80000] focus:outline-none focus:ring-4 focus:ring-[#E60000]/20 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {submitting
                ? "Sending question..."
                : "Submit question"}
            </button>

          </form>

        </section>


        {/* =================================== */}
        {/* MY QUESTIONS SECTION                */}
        {/* =================================== */}

        <section className="mt-8 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8">

          <div className="mb-6">

            <h2 className="text-xl font-bold text-[#25282B]">
              My Questions
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              Track your submitted questions and
              responses from the administration.
            </p>

          </div>


          {/* No questions */}

          {!loading &&
            myQuestions.length === 0 && (

              <div className="rounded-xl border border-dashed border-gray-300 bg-gray-50 px-6 py-10 text-center">

                <p className="font-semibold text-gray-700">
                  You haven&apos;t submitted any questions yet.
                </p>

                <p className="mt-1 text-sm text-gray-500">
                  Your questions will appear here after
                  you submit them.
                </p>

              </div>

            )}


          {/* Questions */}

          {!loading &&
            myQuestions.length > 0 && (

              <div className="space-y-4">

                {myQuestions.map(
                  (userQuestion) => (

                    <div
                      key={userQuestion.id}
                      className="rounded-xl border border-gray-200 p-5"
                    >

                      {/* Question + status */}

                      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">

                        <p className="font-semibold leading-6 text-[#25282B]">
                          {userQuestion.question}
                        </p>


                        {userQuestion.status ===
                        "ANSWERED" ? (

                          <span className="w-fit shrink-0 rounded-full bg-green-100 px-3 py-1 text-xs font-bold text-green-700">
                            Answered
                          </span>

                        ) : (

                          <span className="w-fit shrink-0 rounded-full bg-yellow-100 px-3 py-1 text-xs font-bold text-yellow-700">
                            Pending
                          </span>

                        )}

                      </div>


                      {/* Submitted date */}

                      <p className="mt-3 text-xs text-gray-400">
                        Submitted{" "}
                        {new Date(
                          userQuestion.createdAt
                        ).toLocaleString()}
                      </p>


                      {/* Admin response */}

                      {userQuestion.status ===
                        "ANSWERED" &&
                        userQuestion.adminResponse && (

                          <div className="mt-5 rounded-xl border-l-4 border-[#E60000] bg-gray-50 px-4 py-4">

                            <p className="mb-2 text-xs font-bold uppercase tracking-wider text-[#E60000]">
                              Admin response
                            </p>

                            <p className="text-sm leading-6 text-gray-700">
                              {userQuestion.adminResponse}
                            </p>


                            {userQuestion.answeredAt && (

                              <p className="mt-3 text-xs text-gray-400">
                                Answered{" "}
                                {new Date(
                                  userQuestion.answeredAt
                                ).toLocaleString()}
                              </p>

                            )}

                          </div>

                        )}

                    </div>

                  )
                )}

              </div>

            )}

        </section>

      </div>

    </main>
  );
}