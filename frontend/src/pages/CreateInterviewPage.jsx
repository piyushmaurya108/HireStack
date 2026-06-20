import React, { useState } from "react";
import { useNavigate } from "react-router";
import { Brain } from "lucide-react";
import toast from "react-hot-toast";

import InterviewSetupForm from "../components/mockInterview/InterviewSetupForm";

import { useUploadResume } from "../hooks/mockInterview/useUploadResume";
import { useCreateInterview } from "../hooks/mockInterview/useCreateInterview";

const CreateInterviewPage = () => {
  const navigate = useNavigate();

  const [selectedFile, setSelectedFile] =
    useState(null);

  const [jobDescription, setJobDescription] =
    useState("");

  const [interviewType, setInterviewType] =
    useState("frontend");

  const uploadResumeMutation =
    useUploadResume();

  const createInterviewMutation =
    useCreateInterview();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedFile) {
      toast.error(
        "Please upload your resume"
      );
      return;
    }

    if (!jobDescription.trim()) {
      toast.error(
        "Please provide a job description"
      );
      return;
    }

    if (jobDescription.trim().length < 20) {
      toast.error(
        "Job description must be at least 20 characters long"
      );
      return;
    }

    try {
      const formData = new FormData();

      formData.append(
        "resume",
        selectedFile
      );

      const uploadResponse =
        await uploadResumeMutation.mutateAsync(
          formData
        );

      const resumeId =
        uploadResponse?.resume?._id;

      if (!resumeId) {
        throw new Error(
          "Resume upload failed"
        );
      }

      const interviewResponse =
        await createInterviewMutation.mutateAsync(
          {
            interviewType,
            resumeId,
            jobDescription,
          }
        );

      const interviewId =
        interviewResponse?.interview?._id;

      if (!interviewId) {
        throw new Error(
          "Interview creation failed"
        );
      }

      navigate(
        `/mock-interview/${interviewId}`
      );
    } catch (error) {
      console.error("Error creating interview:", error);
      // Only show toast for custom/non-Axios errors, since Axios errors are handled by mutation hooks
      if (!error.isAxiosError && !error.response) {
        toast.error(
          error?.message || "An unexpected error occurred"
        );
      }
    }
  };

  return (
    <div className="min-h-screen bg-[#05070D] text-white">
      <div className="max-w-5xl mx-auto px-6 py-12">
        <div className="mb-10">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#19B8AA]/20 bg-[#19B8AA]/10 px-4 py-2 text-sm font-medium text-[#19B8AA]">
            <Brain className="h-4 w-4" />
            AI Mock Interview
          </div>

          <h1 className="mt-6 text-4xl font-bold">
            Create Interview
          </h1>

          <p className="mt-3 text-gray-400">
            Upload your resume, provide a
            job description and generate a
            personalized AI interview.
          </p>
        </div>

        <InterviewSetupForm
          selectedFile={selectedFile}
          onFileChange={setSelectedFile}
          jobDescription={jobDescription}
          onJobDescriptionChange={
            setJobDescription
          }
          interviewType={interviewType}
          onInterviewTypeChange={
            setInterviewType
          }
          onSubmit={handleSubmit}
          isUploading={
            uploadResumeMutation.isPending
          }
          isCreatingInterview={
            createInterviewMutation.isPending
          }
        />
      </div>
    </div>
  );
};

export default CreateInterviewPage;