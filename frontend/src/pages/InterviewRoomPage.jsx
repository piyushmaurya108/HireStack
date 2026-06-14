import React, {
  useEffect,
  useMemo,
  useState,
} 

from "react";
import {
  useNavigate,
  useParams,
} from "react-router" ;
import { Loader2 } from "lucide-react";
import toast from "react-hot-toast";

import QuestionCard from "../components/mockInterview/QuestionCard";
import QuestionProgress from "../components/mockInterview/QuestionProgress";
import VoiceRecorder from "../components/mockInterview/VoiceRecorder";
import SpeechToTextPanel from "../components/mockInterview/SpeechToTextPanel";
import AnswerPreview from "../components/mockInterview/AnswerPreview";

import { useCurrentQuestion } from "../hooks/mockInterview/useCurrentQuestion";
import { useSubmitAnswer } from "../hooks/mockInterview/useSubmitAnswer";
import { useCompleteInterview } from "../hooks/mockInterview/useCompleteInterview";

const SpeechRecognition =
  window.SpeechRecognition ||
  window.webkitSpeechRecognition;

const InterviewRoomPage = () => {
  const { interviewId } = useParams();
  const navigate = useNavigate();

  const [transcript, setTranscript] =
    useState("");

  const [isRecording, setIsRecording] =
    useState(false);

  const [recognition, setRecognition] =
    useState(null);

  const {
    data,
    isLoading,
    refetch,
  } = useCurrentQuestion(interviewId);

  const submitAnswerMutation =
    useSubmitAnswer();

  const completeInterviewMutation =
    useCompleteInterview();

  const question =
  data?.currentQuestion || {};

const currentQuestion =
  (data?.currentQuestionIndex ?? 0) + 1;

const totalQuestions =
  currentQuestion +
  (data?.remainingQuestions ?? 0);
console.log("Interview API Response", data);

console.log("Question", question);

console.log(
  "Current Question Number",
  currentQuestion
);

console.log(
  "Total Questions",
  totalQuestions
);
  useEffect(() => {
    if (!SpeechRecognition) return;

    const recognitionInstance =
      new SpeechRecognition();

    recognitionInstance.continuous = true;
    recognitionInstance.interimResults = true;
    recognitionInstance.lang = "en-US";

    recognitionInstance.onresult = (
      event
    ) => {
      let finalTranscript = "";

      for (
        let i = 0;
        i < event.results.length;
        i++
      ) {
        finalTranscript +=
          event.results[i][0].transcript +
          " ";
      }

      setTranscript(finalTranscript);
    };

    recognitionInstance.onend = () => {
      setIsRecording(false);
    };

    setRecognition(recognitionInstance);
  }, []);

  const startRecording = () => {
    if (!recognition) {
      toast.error(
        "Speech Recognition not supported"
      );
      return;
    }

    setTranscript("");
    setIsRecording(true);

    recognition.start();
  };

  const stopRecording = () => {
    if (!recognition) return;

    recognition.stop();
    setIsRecording(false);
  };

  const handleSubmitAnswer =
    async () => {
      if (!transcript.trim()) {
        toast.error(
          "Please provide an answer"
        );
        return;
      }

      try {
        const result =
          await submitAnswerMutation.mutateAsync(
            {
              interviewId,
              questionId: question._id,
              answer: transcript,
            }
          );

        setTranscript("");

        if (
          result?.interviewCompleted
        ) {
          await completeInterviewMutation.mutateAsync(
            interviewId
          );

          navigate(
            `/mock-interview/report/${interviewId}`
          );

          return;
        }

        refetch();
      } catch (error) {
        console.error(error);
      }
    };

  const submitLoading =
    submitAnswerMutation.isPending ||
    completeInterviewMutation.isPending;

  const answerText = useMemo(
    () => transcript,
    [transcript]
  );

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#05070D]">
        <Loader2 className="h-10 w-10 animate-spin text-[#19B8AA]" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#05070D] text-white">
      <div className="max-w-7xl mx-auto px-6 py-10">
        <div className="grid gap-6">
          <QuestionProgress
            currentQuestion={
              currentQuestion
            }
            totalQuestions={
              totalQuestions
            }
          />

          <QuestionCard
            questionText={
              question.questionText
            }
            currentQuestion={
              currentQuestion
            }
            totalQuestions={
              totalQuestions
            }
            category={
              question.category
            }
            difficulty={
              question.difficulty
            }
          />

          <div className="grid gap-6 lg:grid-cols-2">
            <SpeechToTextPanel
              transcript={transcript}
            />

            <AnswerPreview
              answer={answerText}
            />
          </div>

          <VoiceRecorder
            isRecording={isRecording}
            onStartRecording={
              startRecording
            }
            onStopRecording={
              stopRecording
            }
          />

          <button
            onClick={
              handleSubmitAnswer
            }
            disabled={submitLoading}
            className="w-full rounded-2xl bg-[#19B8AA] px-6 py-4 font-semibold text-black transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {submitLoading
              ? "Processing..."
              : "Submit Answer"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default InterviewRoomPage;