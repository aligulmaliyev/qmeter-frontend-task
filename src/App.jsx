import { Navigate, Route, Routes } from "react-router-dom";
import Campaigns from "./pages/campaigns";
import Threads from "./pages/threads";

function App() {
  return (
    <Routes>
      <Route index path="/" element={<Navigate to="/campaigns" />} />
      <Route path="/campaigns" element={<Campaigns />} />
      <Route path="/new-thread" element={<Threads />} />
      <Route path="/campaign-edit/:id" element={<Threads />} />
    </Routes>
  );
}

export default App;
