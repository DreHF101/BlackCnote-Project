import { createRoot } from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import App from "./App";
import "./index.css";

// Create QueryClient for API state management
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      retry: 1,
    },
  },
});

// Enhanced BlackCnote Platform Entry Point
function BlackCnotePlatform() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="min-h-screen bg-slate-900">
        <App />
        <Toaster />
      </div>
    </QueryClientProvider>
  );
}

// Mount the application
const container = document.getElementById("root");
if (container) {
  const root = createRoot(container);
  root.render(<BlackCnotePlatform />);
} else {
  console.error("Root container not found");
}