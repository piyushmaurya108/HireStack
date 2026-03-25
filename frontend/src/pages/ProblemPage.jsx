import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { PROBLEMS } from "../data/problems";
import Navbar from "../components/Navbar";

// ✅ Alias real components to your names
import { Panel, Group, Separator } from "react-resizable-panels";

import ProblemDescription from "../components/ProblemDescription";
import OutputPanel from "../components/OutputPanel";
import CodeEditorPanel from "../components/CodeEditorPanel";
import { executeCode } from "../lib/piston";

import toast from "react-hot-toast";

function ProblemPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [currentProblemId, setCurrentProblemId] = useState("two-sum");
  const [selectedLanguage, setSelectedLanguage] = useState("javascript");
  const [code, setCode] = useState(PROBLEMS[currentProblemId].starterCode.javascript);
  const [output, setOutput] = useState(null);
  const [isRunning, setIsRunning] = useState(false);

  const currentProblem = PROBLEMS[currentProblemId];

  useEffect(() => {
    if (id && PROBLEMS[id]) {
      setCurrentProblemId(id);
      setCode(PROBLEMS[id].starterCode[selectedLanguage]);
      setOutput(null);
    }
  }, [id, selectedLanguage]);

  const handleLanguageChange = (e) => {
    const newLang = e.target.value;
    setSelectedLanguage(newLang);
    setCode(currentProblem.starterCode[newLang]);
    setOutput(null);
  };

  const handleProblemChange = (newProblemId) => navigate(`/problem/${newProblemId}`);

  const handleRunCode = async () => {
    if (isRunning) return;

    setIsRunning(true);
    setOutput(null);

    const result = await executeCode(selectedLanguage, code);
    setOutput(result);
    setIsRunning(false);

    if (result.success) {
      toast.success("Code executed successfully");
    } else {
      toast.error("Execution failed");
    }
  };

  return (
<div className="h-screen bg-[#05070D] text-white flex flex-col overflow-hidden">      <Navbar />

      <div className="flex-1 p-4 overflow-hidden">
       <Group orientation="horizontal">

          {/* LEFT PANEL */}
          <Panel defaultSize={40} minSize={30}>
            <div className="h-full rounded-xl border border-white/10 bg-white/[0.03] backdrop-blur-sm p-4 overflow-auto">
              <ProblemDescription
                problem={currentProblem}
                currentProblemId={currentProblemId}
                onProblemChange={handleProblemChange}
                allProblems={Object.values(PROBLEMS)}
              />
            </div>
          </Panel>

          {/* VERTICAL RESIZER */}
          <Separator className="w-2 mx-2 bg-white/10 hover:bg-[#19B8AA]/50 transition cursor-col-resize rounded" />

          {/* RIGHT SIDE */}
         
          <Panel defaultSize={60} minSize={30}>
        <Group orientation="vertical">
              {/* CODE EDITOR */}
              <Panel defaultSize={65} minSize={40}>
                <div className="h-full rounded-xl border border-white/10 bg-white/[0.03] backdrop-blur-sm overflow-hidden">
                  <CodeEditorPanel
                    selectedLanguage={selectedLanguage}
                    code={code}
                    isRunning={isRunning}
                    onLanguageChange={handleLanguageChange}
                    onCodeChange={setCode}
                    onRunCode={handleRunCode}
                  />
                </div>
              </Panel>

              {/* HORIZONTAL RESIZER */}
              <Separator className="h-2 my-2 bg-white/10 hover:bg-[#19B8AA]/50 transition cursor-row-resize rounded" />

              {/* OUTPUT PANEL BELOW */}
              <Panel defaultSize={35} minSize={20}>
                <div className="h-full rounded-xl border border-white/10 bg-black/40 backdrop-blur-md p-4 overflow-auto shadow-inner">

                  {/* HEADER */}
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-sm font-semibold text-white/70">
                      Output
                    </h3>
                    <div className="flex gap-1">
                      <div className="w-2 h-2 rounded-full bg-[#19B8AA]"></div>
                      <div className="w-2 h-2 rounded-full bg-[#EF4444]"></div>
                    </div>
                  </div>

                  <OutputPanel output={output} />
                </div>
              </Panel>

            </Group>
          </Panel>
         
        </Group>
      </div >
    </div>
  );
}

export default ProblemPage;