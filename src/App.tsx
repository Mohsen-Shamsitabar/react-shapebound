import GameScene from "@/views/GameScene";
import { BrowserRouter, Route, Routes } from "react-router";

const App = () => {
  return (
    <>
      <BrowserRouter>
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
      </BrowserRouter>
    </>
  );
};

export default App;
