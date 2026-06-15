import React, {
  useEffect,
  useMemo,
  useRef,
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

const getSpeechRecognitionConstructor =
  () => {
    if (
      typeof window === "undefined"
    ) {
      return null;
    }

    return (
      window.SpeechRecognition ||
      window.webkitSpeechRecognition ||
      globalThis.SpeechRecognition ||
      globalThis.webkitSpeechRecognition ||
      null
    );
  };

const InterviewRoomPage = () => {
  const { interviewId } = useParams();
  const navigate = useNavigate();

  const [transcript, setTranscript] =
    useState("");

  const [isRecording, setIsRecording] =
    useState(false);

  const recognitionRef = useRef(null);
  const isStartingRef = useRef(false);

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
    const SpeechRecognition =
      getSpeechRecognitionConstructor();

    if (!SpeechRecognition) return;

    const recognitionInstance =
      new SpeechRecognition();

    recognitionInstance.continuous = true;
    recognitionInstance.interimResults = true;
    recognitionInstance.lang = "en-US";

    recognitionInstance.onstart = () => {
      isStartingRef.current = false;
      setIsRecording(true);
    };

    recognitionInstance.onresult = (
      event
    ) => {
      let nextTranscript = "";

      for (
        let i = event.resultIndex;
        i < event.results.length;
        i++
      ) {
        nextTranscript +=
          event.results[i][0].transcript +
          " ";
      }

      setTranscript((currentTranscript) =>
        `${currentTranscript} ${nextTranscript}`.trim()
      );
    };

    recognitionInstance.onerror = (
      event
    ) => {
      const {
        error,
      } = event;

      if (error !== "aborted") {
        console.error(
          "Speech recognition error:",
          error
        );

        toast.error(
          error === "not-allowed"
            ? "Microphone access was blocked"
            : error === "audio-capture"
              ? "No microphone was found for voice recording"
              : error === "service-not-allowed"
                ? "Speech recognition is blocked in this browser"
                : "Unable to start voice recording"
        );
      }

      isStartingRef.current = false;
      setIsRecording(false);
    };

    recognitionInstance.onend = () => {
      isStartingRef.current = false;
      setIsRecording(false);
    };

    recognitionRef.current =
      recognitionInstance;

    return () => {
      recognitionInstance.onstart = null;
      recognitionInstance.onresult = null;
      recognitionInstance.onerror = null;
      recognitionInstance.onend = null;
      recognitionInstance.abort();

      if (
        recognitionRef.current ===
        recognitionInstance
      ) {
        recognitionRef.current = null;
      }
    };
  }, []);

  const startRecording = async () => {
    if (!window.isSecureContext) {
      toast.error(
        "Voice recording needs HTTPS or localhost"
      );
      return;
    }

    if (
      !navigator.mediaDevices ||
      !navigator.mediaDevices.getUserMedia
    ) {
      toast.error(
        "Your browser cannot access the microphone"
      );
      return;
    }

    if (!recognitionRef.current) {
      toast.error(
        "Speech recognition is only available in supported Chromium browsers"
      );
      return;
    }

    if (
      isRecording ||
      isStartingRef.current
    ) {
      return;
    }

    try {
      isStartingRef.current = true;

      const stream =
        await navigator.mediaDevices.getUserMedia(
          {
            audio: true,
          }
        );

      stream
        .getTracks()
        .forEach((track) =>
          track.stop()
        );

      setTranscript("");
      recognitionRef.current.start();
    } catch (error) {
      console.error(
        "Failed to start speech recognition:",
        error
      );

      isStartingRef.current = false;
      setIsRecording(false);

      const errorName =
        error?.name || error?.error;

      toast.error(
        errorName ===
          "NotAllowedError" ||
          errorName ===
            "SecurityError"
          ? "Microphone permission was denied"
          : errorName ===
              "NotFoundError"
            ? "No microphone was found"
            : errorName ===
                "NotReadableError"
              ? "Microphone is already being used by another app"
              : errorName ===
                  "InvalidStateError"
                ? "Voice recording is already starting. Please try again."
                : "Unable to start voice recording"
      );
    }
  };

  const stopRecording = () => {
    if (!recognitionRef.current) return;

    recognitionRef.current.stop();
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
