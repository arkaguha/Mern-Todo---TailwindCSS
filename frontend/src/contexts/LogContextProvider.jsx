import { useState } from "react";

import { LogContext } from "./UseLog";

export default function LogProvider({ children }) {
  const [log, setLog] = useState({ type: "", message: "" });

  const showLog = (type, message, duration = 3000) => {
    setLog({ type, message });

    if (duration > 0) {
      setTimeout(() => setLog({ type: "", message: "" }), duration);
    }
  };

  return (
    <LogContext.Provider value={{ log, showLog }}>
      {children}
    </LogContext.Provider>
  );
}
