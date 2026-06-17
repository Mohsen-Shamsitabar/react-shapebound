import GameScene from "@/views/GameScene";
import { HashRouter, Route, Routes } from "react-router";

const App = () => {
  return (
    <>
      <HashRouter>
        <Routes>
          <Route
            element={<GameScene />}
            index
          />

          <Route
            path="*"
            element={<main>404</main>}
          />
        </Routes>
      </HashRouter>
    </>
  );
};

export default App;
