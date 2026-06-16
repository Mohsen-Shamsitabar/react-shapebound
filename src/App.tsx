import { BrowserRouter, Route, Routes } from "react-router";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route
            element={<main>HOME</main>}
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
