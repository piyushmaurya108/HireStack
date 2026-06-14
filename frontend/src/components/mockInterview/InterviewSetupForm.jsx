 import React from "react";

import ResumeUploadCard from "./ResumeUploadCard";
import JobDescriptionInput from "./JobDescriptionInput";
import InterviewTypeSelector from "./InterviewTypeSelector";

const InterviewSetupForm = ({
  selectedFile,
  onFileChange,

  jobDescription,
  onJobDescriptionChange,

  interviewType,
  onInterviewTypeChange,

  onSubmit,

  isUploading = false,
  isCreatingInterview = false,
}) => {
  return (
    <form
      onSubmit={onSubmit}
      className="space-y-6"
    >
      <ResumeUploadCard
        file={selectedFile}
        onFileChange={onFileChange}
        isUploading={isUploading}
      />

      <JobDescriptionInput
        value={jobDescription}
        onChange={onJobDescriptionChange}
      />

      <InterviewTypeSelector
        value={interviewType}
        onChange={onInterviewTypeChange}
      />

      <button
        type="submit"
        disabled={
          isUploading || isCreatingInterview
        }
        className="w-full rounded-2xl bg-[#19B8AA] px-6 py-4 font-semibold text-black transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {isCreatingInterview
          ? "Creating Interview..."
          : "Start AI Mock Interview"}
      </button>
    </form>
  );
};

export default InterviewSetupForm;