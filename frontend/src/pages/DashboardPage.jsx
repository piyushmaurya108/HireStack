import { useNavigate } from "react-router";
import { useUser } from "@clerk/clerk-react";
import { useState } from "react";
import {
  useActiveSessions,
  useCreateSession,
  useMyRecentSessions,
} from "../hooks/useSessions";

import {
  Brain,
  Trophy,
  MessageSquare,
  ArrowRight,
} from "lucide-react";

import Navbar from "../components/Navbar";
import WelcomeSection from "../components/WelcomeSection";
import StatsCards from "../components/StatsCards";
import ActiveSessions from "../components/ActiveSessions";
import RecentSessions from "../components/RecentSession";
import CreateSessionModal from "../components/CreateSessionModal";

import { useInterviewHistory } from "../hooks/mockInterview/useInterviewHistory";

function DashboardPage() {
  const navigate = useNavigate();
  const { user } = useUser();

  const [showCreateModal, setShowCreateModal] =
    useState(false);

  const [roomConfig, setRoomConfig] =
    useState({
      problem: "",
      difficulty: "",
    });

  const createSessionMutation =
    useCreateSession();

  const {
    data: activeSessionsData,
    isLoading: loadingActiveSessions,
  } = useActiveSessions();

  const {
    data: recentSessionsData,
    isLoading: loadingRecentSessions,
  } = useMyRecentSessions();

  const {
    data: interviewHistoryData,
  } = useInterviewHistory();

  const handleCreateRoom = () => {
    if (
      !roomConfig.problem ||
      !roomConfig.difficulty
    )
      return;

    createSessionMutation.mutate(
      {
        problem: roomConfig.problem,
        difficulty:
          roomConfig.difficulty.toLowerCase(),
      },
      {
        onSuccess: (data) => {
          setShowCreateModal(false);

          navigate(
            `/session/${data.session._id}`
          );
        },
      }
    );
  };

  const activeSessions =
    activeSessionsData?.sessions || [];

  const recentSessions =
    recentSessionsData?.sessions || [];

  const interviewHistory =
    interviewHistoryData?.interviews || [];

  const completedInterviews =
    interviewHistory.filter(
      (item) =>
        item.status === "completed"
    );

  const averageScore =
    completedInterviews.length > 0
      ? Math.round(
          completedInterviews.reduce(
            (acc, item) =>
              acc +
              (item.overallScore || 0),
            0
          ) /
            completedInterviews.length
        )
      : 0;

  const latestInterview =
    completedInterviews[0];

  const isUserInSession = (session) => {
    if (!user?.id) return false;

    return (
      session.host?.clerkId === user.id ||
      session.participant?.clerkId ===
        user.id
    );
  };

  return (
    <>
      <div className="min-h-screen bg-[#05070D] text-white">
        <Navbar />

        <div className="max-w-[1400px] mx-auto px-6 pb-20">
          <WelcomeSection
            onCreateSession={() =>
              setShowCreateModal(true)
            }
          />

          {/* EXISTING SECTION */}

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
            <StatsCards
              activeSessionsCount={
                activeSessions.length
              }
              recentSessionsCount={
                recentSessions.length
              }
            />

            <ActiveSessions
              sessions={activeSessions}
              isLoading={
                loadingActiveSessions
              }
              isUserInSession={
                isUserInSession
              }
            />
          </div>

          {/* AI MOCK INTERVIEW SECTION */}

          <div className="mt-10 rounded-3xl border border-white/10 bg-[#0B0F19] p-8 shadow-[0_0_40px_rgba(25,184,170,0.08)]">
            <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <div className="inline-flex items-center gap-2 rounded-full bg-[#19B8AA]/10 px-4 py-2 text-sm font-medium text-[#19B8AA]">
                  <Brain className="h-4 w-4" />
                  AI Mock Interview
                </div>

                <h2 className="mt-4 text-3xl font-bold">
                  Interview Performance
                </h2>

                <p className="mt-2 text-gray-400">
                  Track your AI interview
                  progress and improve your
                  technical skills.
                </p>
              </div>

              <button
                onClick={() =>
                  navigate(
                    "/mock-interview/create"
                  )
                }
                className="inline-flex items-center gap-2 rounded-2xl bg-[#19B8AA] px-6 py-4 font-semibold text-black transition hover:opacity-90"
              >
                Start Interview
                <ArrowRight className="h-5 w-5" />
              </button>
            </div>

            <div className="mt-8 grid gap-6 md:grid-cols-3">
              <div className="rounded-2xl border border-white/10 bg-[#05070D] p-6">
                <Brain className="h-8 w-8 text-[#19B8AA]" />

                <h3 className="mt-4 text-3xl font-bold">
                  {interviewHistory.length}
                </h3>

                <p className="mt-2 text-gray-400">
                  Total Interviews
                </p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-[#05070D] p-6">
                <Trophy className="h-8 w-8 text-[#19B8AA]" />

                <h3 className="mt-4 text-3xl font-bold">
                  {averageScore}
                </h3>

                <p className="mt-2 text-gray-400">
                  Average Score
                </p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-[#05070D] p-6">
                <MessageSquare className="h-8 w-8 text-[#19B8AA]" />

                <h3 className="mt-4 text-3xl font-bold">
                  {
                    completedInterviews.length
                  }
                </h3>

                <p className="mt-2 text-gray-400">
                  Completed Interviews
                </p>
              </div>
            </div>

            {latestInterview && (
              <div className="mt-8 rounded-2xl border border-white/10 bg-[#05070D] p-6">
                <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                  <div>
                    <h3 className="text-xl font-semibold">
                      Latest Interview
                    </h3>

                    <p className="mt-2 text-gray-400 capitalize">
                      {
                        latestInterview.interviewType
                      }
                    </p>
                  </div>

                  <div className="flex items-center gap-6">
                    <div>
                      <p className="text-sm text-gray-400">
                        Score
                      </p>

                      <p className="text-2xl font-bold text-[#19B8AA]">
                        {
                          latestInterview.overallScore
                        }
                      </p>
                    </div>

                    <button
                      onClick={() =>
                        navigate(
                          `/mock-interview/report/${latestInterview._id}`
                        )
                      }
                      className="rounded-xl border border-[#19B8AA]/30 px-4 py-2 text-[#19B8AA] transition hover:bg-[#19B8AA]/10"
                    >
                      View Report
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* EXISTING RECENT SESSIONS */}

          <div className="mt-10">
            <RecentSessions
              sessions={recentSessions}
              isLoading={
                loadingRecentSessions
              }
            />
          </div>
        </div>
      </div>

      <CreateSessionModal
        isOpen={showCreateModal}
        onClose={() =>
          setShowCreateModal(false)
        }
        roomConfig={roomConfig}
        setRoomConfig={setRoomConfig}
        onCreateRoom={handleCreateRoom}
        isCreating={
          createSessionMutation.isPending
        }
      />
    </>
  );
}

export default DashboardPage;