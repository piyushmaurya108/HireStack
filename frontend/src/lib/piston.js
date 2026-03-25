export async function executeCode(language, code) {
  try { 
    if (language === "javascript") {
      let output = "";

      // Capture console.log
      const originalLog = console.log;
      console.log = (...args) => {
        output += args.join(" ") + "\n";
      };

      try {
        eval(code); // run JS code
      } catch (err) {
        return {
          success: false,
          error: err.message,
        };
      }

      console.log = originalLog;

      return {
        success: true,
        output: output || "No output",
      };
    }

    return {
      success: false,
      error: "Only JavaScript supported in free mode",
    };

  } catch (err) {
    return {
      success: false,
      error: err.message,
    };
  }
}