import { useUser } from "@clerk/clerk-react";
import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router";
import {
  useEndSession,
  useJoinSession,
  useSessionById,
} from "../hooks/useSessions";
import { PROBLEMS } from "../data/problems";
import { executeCode } from "../lib/piston";
import Navbar from "../components/Navbar";
import { Panel, Group, Separator } from "react-resizable-panels";
import { getDifficultyBadgeClass } from "../lib/utils";
import { Loader2Icon, LogOutIcon } from "lucide-react";
import CodeEditorPanel from "../components/CodeEditorPanel";
import OutputPanel from "../components/OutputPanel";

import useStreamClient from "../hooks/useStreamClient";
import { StreamCall, StreamVideo } from "@stream-io/video-react-sdk";
import VideoCallUI from "../components/VideoCallUI";
import { createSessionSocket } from "../lib/socket";

function SessionPage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { user } = useUser();

  const [output, setOutput] = useState(null);
  const [isRunning, setIsRunning] = useState(false);

  const { data: sessionData, isLoading: loadingSession, refetch } =
    useSessionById(id);

  const joinSessionMutation = useJoinSession();
  const endSessionMutation = useEndSession();

  const session = sessionData?.session;
  const isHost = session?.host?.clerkId === user?.id;
  const isParticipant = session?.participant?.clerkId === user?.id;
  const isCandidate = isParticipant && !isHost;

  const { call, channel, chatClient, isInitializingCall, streamClient } =
    useStreamClient(session, loadingSession, isHost, isParticipant);

  const problemData = session?.problem
    ? Object.values(PROBLEMS).find((p) => p.title === session.problem)
    : null;

  const socketRef = useRef(null);
  const debounceTimeoutRef = useRef(null);
  const skipNextEmitRef = useRef(false);
  const [selectedLanguage, setSelectedLanguage] = useState("javascript");
  const [code, setCode] = useState("");

  useEffect(() => {
    if (!session || !user || loadingSession) return;
    if (isHost || isParticipant) return;

    joinSessionMutation.mutate(id, { onSuccess: refetch });
  }, [session, user, loadingSession, isHost, isParticipant, id]);

  useEffect(() => {
    if (!session || loadingSession) return;
    if (session.status === "completed") navigate("/dashboard");
  }, [session, loadingSession]);

  useEffect(() => {
    if (problemData?.starterCode?.[selectedLanguage]) {
      setCode(problemData.starterCode[selectedLanguage]);
    }
  }, [problemData, selectedLanguage]);

  useEffect(() => {
    if (!session?._id || (!isHost && !isParticipant)) return;

    const socket = createSessionSocket();
    socketRef.current = socket;

    socket.on("connect", () => {
      socket.emit("join-session", { sessionId: session._id });
    });

    socket.on("code-update", ({ code: nextCode }) => {
      if (typeof nextCode !== "string") return;

      skipNextEmitRef.current = true;
      setCode(nextCode);
    });

    return () => {
      clearTimeout(debounceTimeoutRef.current);
      socket.disconnect();
      if (socketRef.current === socket) {
        socketRef.current = null;
      }
    };
  }, [session?._id, isHost, isParticipant]);

  useEffect(() => {
    if (!isCandidate || !session?._id) return;

    if (skipNextEmitRef.current) {
      skipNextEmitRef.current = false;
      return;
    }

    clearTimeout(debounceTimeoutRef.current);
    debounceTimeoutRef.current = setTimeout(() => {
      socketRef.current?.emit("code-change", {
        sessionId: session._id,
        code,
      });
    }, 300);

    return () => clearTimeout(debounceTimeoutRef.current);
  }, [code, isCandidate, session?._id]);

  const handleLanguageChange = (e) => {
    const newLang = e.target.value;
    setSelectedLanguage(newLang);
    setCode(problemData?.starterCode?.[newLang] || "");
    setOutput(null);
  };

  const handleRunCode = async () => {
    setIsRunning(true);
    setOutput(null);

    const result = await executeCode(selectedLanguage, code);
    setOutput(result);
    setIsRunning(false);
  };

  const handleEndSession = () => {
    if (confirm("End session?")) {
      endSessionMutation.mutate(id, {
        onSuccess: () => navigate("/dashboard"),
      });
    }
  };

  return (
    <div className="h-screen bg-[#05070D] text-white flex flex-col overflow-hidden">
      <Navbar />

      <div className="flex-1 p-4 overflow-hidden">
        <Group orientation="horizontal">

          {/* LEFT SIDE */}
          <Panel defaultSize={50} minSize={30}>
            <Group orientation="vertical">

              {/* DESCRIPTION */}
              <Panel defaultSize={40} minSize={20}>
                <div className="h-full overflow-auto rounded-xl border border-white/10 bg-white/[0.03] p-5">

                  <div className="flex justify-between mb-4">
                    <div>
                      <h1 className="text-2xl font-bold">
                        {session?.problem}
                      </h1>
                      <p className="text-white/60 text-sm">
                        {problemData?.category}
                      </p>
                    </div>

                    <div className="flex items-center gap-3">
                      <span
  className={`text-xs px-2.5 py-1 rounded-md font-medium ${
    session?.difficulty?.toLowerCase() === "easy"
      ? "bg-green-500/10 text-green-400 border border-green-500/20"
      : session?.difficulty?.toLowerCase() === "medium"
      ? "bg-yellow-500/10 text-yellow-400 border border-yellow-500/20"
      : session?.difficulty?.toLowerCase() === "hard"
      ? "bg-red-500/10 text-red-400 border border-red-500/20"
      : "bg-white/10 text-white/60 border border-white/10"
  }`}
>
  {session?.difficulty}
</span>

                      {isHost && (
                        <button
                          onClick={handleEndSession}
                          className="px-3 py-1.5 bg-red-500 text-white rounded-lg text-sm flex items-center gap-1"
                        >
                          <LogOutIcon size={14} />
                          End
                        </button>
                      )}
                    </div>
                  </div>

                  <p className="text-white/80 text-sm leading-relaxed">
                    {problemData?.description?.text}
                  </p>

                </div>
              </Panel>

              <Separator className="h-1.5 my-2 bg-white/10 hover:bg-[#19B8AA]/50 cursor-row-resize rounded-full" />

              {/* EDITOR + OUTPUT */}
              <Panel defaultSize={60} minSize={30}>
                <Group orientation="vertical">

                  {/* EDITOR */}
                  <Panel defaultSize={70} minSize={40}>
                    <div className="h-full rounded-xl border border-white/10 bg-[#0B0F19] overflow-hidden">
                      <CodeEditorPanel
                        selectedLanguage={selectedLanguage}
                        code={code}
                        isCandidate={isCandidate}
                        isRunning={isRunning}
                        onLanguageChange={handleLanguageChange}
                        onCodeChange={setCode}
                        onRunCode={handleRunCode}
                      />
                    </div>
                  </Panel>

                  <Separator className="h-1.5 my-2 bg-white/10 hover:bg-[#19B8AA]/50 cursor-row-resize rounded-full" />

                  {/* OUTPUT */}
                  <Panel defaultSize={30} minSize={20}>
                    <div className="h-full rounded-xl border border-white/10 bg-black/60 p-4 overflow-auto">

                      <div className="flex justify-between mb-2">
                        <span className="text-sm text-white/60">Output</span>
                      </div>

                      <OutputPanel output={output} />
                    </div>
                  </Panel>

                </Group>
              </Panel>

            </Group>
          </Panel>

          {/* RESIZER */}
          <Separator className="w-1.5 mx-2 bg-white/10 hover:bg-[#19B8AA]/50 cursor-col-resize rounded-full" />

          {/* RIGHT SIDE */}
          <Panel defaultSize={50} minSize={30}>
            <div className="h-full rounded-xl border border-white/10 bg-[#0B0F19] p-3 overflow-hidden">

              {isInitializingCall ? (
                <div className="h-full flex items-center justify-center">
                  <Loader2Icon className="w-10 h-10 animate-spin text-[#19B8AA]" />
                </div>
              ) : !streamClient || !call ? (
                <div className="h-full flex items-center justify-center text-white/60">
                  Failed to connect
                </div>
              ) : (
                <StreamVideo client={streamClient}>
                  <StreamCall call={call}>
                    <VideoCallUI
                      chatClient={chatClient}
                      channel={channel}
                    />
                  </StreamCall>
                </StreamVideo>
              )}

            </div>
          </Panel>

        </Group>
      </div>
    </div>
  );
}

export default SessionPage;
