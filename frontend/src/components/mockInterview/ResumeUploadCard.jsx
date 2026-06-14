import React, { useRef } from "react";
import { Upload, FileText } from "lucide-react";

const ResumeUploadCard = ({
  file,
  onFileChange,
  isUploading = false,
}) => {
  const inputRef = useRef(null);

  return (
    <div className="rounded-3xl border border-white/10 bg-[#05070D] p-6 shadow-[0_0_40px_rgba(25,184,170,0.08)]">
      <div className="mb-4 flex items-center gap-3">
        <FileText className="h-6 w-6 text-[#19B8AA]" />
        <h3 className="text-lg font-semibold text-white">
          Upload Resume
        </h3>
      </div>

      <div
        onClick={() => inputRef.current?.click()}
        className="cursor-pointer rounded-2xl border-2 border-dashed border-[#19B8AA]/30 p-8 text-center transition hover:border-[#19B8AA]"
      >
        <Upload className="mx-auto mb-3 h-10 w-10 text-[#19B8AA]" />

        <p className="text-white font-medium">
          Click to upload Resume
        </p>

        <p className="mt-2 text-sm text-gray-400">
          PDF or DOCX Supported
        </p>

        {file && (
          <p className="mt-4 text-sm text-[#19B8AA]">
            {file.name}
          </p>
        )}
      </div>

      <input
        ref={inputRef}
        type="file"
        accept=".pdf,.docx"
        className="hidden"
        onChange={(e) =>
          onFileChange?.(e.target.files?.[0])
        }
      />

      {isUploading && (
        <p className="mt-4 text-sm text-[#19B8AA]">
          Uploading...
        </p>
      )}
    </div>
  );
};

export default ResumeUploadCard;