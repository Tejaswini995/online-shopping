import { useState } from "react";
import Explore from "./Explore";
import Home from "./Home";

export default function App() {
  const [page, setPage] = useState("home");

  if (page === "explore") {
    return <Explore onBack={() => setPage("home")} />;
  }

  return <Home onExplore={() => setPage("explore")} />;
}
