// frontend/src/lib/piston.js
export async function executeCode(language, code) {
  try {
    const res = await fetch("/api/execute", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        language,
        code,
        input: "",
      }),
    });

    if (!res.ok) {
      return {
        success: false,
        error: `HTTP error! status: ${res.status}`,
      };
    }

    const data = await res.json();

    const output = data.run.output || "";
    const stderr = data.run.stderr || "";

    if (stderr) {
      return {
        success: false,
        output: output,
        error: stderr,
      };
    }

    return {
      success: true,
      output: output || "No output",
    };
  } catch (error) {
    return {
      success: false,
      error: `Failed to execute code: ${error.message}`,
    };
  }
}