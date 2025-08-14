// App.jsx
import { BrowserRouter as Router } from "react-router-dom";
import AnimatedRoutes from "./routes/AnimatedRoutes";

export default function App() {
  return (
    <Router>
      <AnimatedRoutes />
    </Router>
  );
}
