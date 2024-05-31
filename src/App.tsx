import { Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import StoreList from "./pages/StoryList";

import DefaultLayout from "./layouts/Default";
import ProtectedLayout from "./layouts/Protected";

function App() {
  return (
    <main>
        <Routes>
          <Route element={<DefaultLayout />}>
            <Route path="/login" element={<Login />} />
          </Route>
          <Route element={<ProtectedLayout />}>
            <Route path="/" element={<StoreList />} />
          </Route>
        </Routes>
    </main>
  );
}

export default App;
