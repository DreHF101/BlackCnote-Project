import { createRoot } from "react-dom/client";

console.log("Main.tsx is loading...");

// Test component without any imports
function TestComponent() {
  console.log("TestComponent is rendering...");
  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#0f172a',
      color: 'white',
      padding: '20px',
      fontFamily: 'Arial, sans-serif'
    }}>
      <h1>BlackCnote Test</h1>
      <p>If you see this, React is working!</p>
    </div>
  );
}

const rootElement = document.getElementById("root");
console.log("Root element:", rootElement);

if (rootElement) {
  console.log("Creating React root...");
  const root = createRoot(rootElement);
  console.log("Rendering component...");
  root.render(<TestComponent />);
} else {
  console.error("Root element not found");
}
