import { useLog } from "../contexts/UseLog";

export default function Log() {
  const { log } = useLog();

  if (!log.message) return null;

  const styles = {
    success: "bg-green-100 border border-green-400 text-green-700",
    error: "bg-red-100 border border-red-400 text-red-700",
    warning: "bg-yellow-100 border border-yellow-400 text-yellow-700",
    info: "bg-blue-100 border border-blue-400 text-blue-700",
  };

  return (
    <div
      className={`fixed top-4 left-1/2 -translate-x-1/2 px-4 py-2 rounded mb-4 font-medium shadow-lg ${
        styles[log.type] || ""
      }`}
      role="alert"
    >
      {log.message}
    </div>
  );
}
