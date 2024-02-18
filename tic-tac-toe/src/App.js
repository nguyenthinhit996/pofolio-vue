import "./components/board/style.css";
import "./components/turnTable/style.css";
import "./pages/start/style.css";
import "./pages/about/style.css";
import "./components/cells/style.css";
import "./components/winnerBoard/style.css";
import "./components/navbar/style.css";

import { BrowserRouter } from "react-router-dom";

import Navbar from "./components/navbar";
import { IMAGE } from "./utils/common";
import RouterManagement from "./routes";

function App() {

  return (
    <BrowserRouter>
      <Navbar />
      <img className="title-logo" alt="" src={IMAGE.TitleLogo} />
      <RouterManagement />
    </BrowserRouter>
  );
}

export default App;
