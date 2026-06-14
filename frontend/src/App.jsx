import { Toaster } from "react-hot-toast";

import {
  Navigate,
  Route,
  Routes,
} from "react-router";

import { useUser } from "@clerk/clerk-react";

import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import ProblemsPage from "./pages/ProblemsPage";
import ProblemPage from "./pages/ProblemPage";
import DashboardPage from "./pages/DashboardPage";
import SessionPage from "./pages/SessionPage";

/* AI MOCK INTERVIEW PAGES */
import MockInterviewPage from "./pages/MockInterviewPage";
import CreateInterviewPage from "./pages/CreateInterviewPage";
import InterviewRoomPage from "./pages/InterviewRoomPage";
import InterviewReportPage from "./pages/InterviewReportPage";
import InterviewHistoryPage from "./pages/InterviewHistoryPage";

function App() {
  const { isSignedIn, isLoaded } =
    useUser();

  if (!isLoaded) return null;

  return (
    <>
      <Routes>
        {/* PUBLIC */}
        <Route
          path="/"
          element={
            !isSignedIn ? (
              <HomePage />
            ) : (
              <Navigate
                to="/dashboard"
              />
            )
          }
        />

        {/* PROTECTED */}
        <Route
          path="/dashboard"
          element={
            isSignedIn ? (
              <DashboardPage />
            ) : (
              <Navigate to="/" />
            )
          }
        />

        <Route
          path="/problems"
          element={
            isSignedIn ? (
              <ProblemsPage />
            ) : (
              <Navigate to="/" />
            )
          }
        />

        <Route
          path="/problem/:id"
          element={
            isSignedIn ? (
              <ProblemPage />
            ) : (
              <Navigate to="/" />
            )
          }
        />

        <Route
          path="/session/:id"
          element={
            isSignedIn ? (
              <SessionPage />
            ) : (
              <Navigate to="/" />
            )
          }
        />

        {/* AI MOCK INTERVIEW */}

        <Route
          path="/mock-interview"
          element={
            isSignedIn ? (
              <MockInterviewPage />
            ) : (
              <Navigate to="/" />
            )
          }
        />

        <Route
          path="/mock-interview/create"
          element={
            isSignedIn ? (
              <CreateInterviewPage />
            ) : (
              <Navigate to="/" />
            )
          }
        />

        <Route
          path="/mock-interview/:interviewId"
          element={
            isSignedIn ? (
              <InterviewRoomPage />
            ) : (
              <Navigate to="/" />
            )
          }
        />

        <Route
          path="/mock-interview/report/:interviewId"
          element={
            isSignedIn ? (
              <InterviewReportPage />
            ) : (
              <Navigate to="/" />
            )
          }
        />

        <Route
          path="/mock-interview/history"
          element={
            isSignedIn ? (
              <InterviewHistoryPage />
            ) : (
              <Navigate to="/" />
            )
          }
        />
      </Routes>

      <Toaster
        toastOptions={{
          duration: 3000,
        }}
      />
    </>
  );
}
export default App;
