import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "sonner";

import Home from "./pages/Home";
import MenuArea from "./components/menu-area";

export default function App() {
  return (
    <BrowserRouter>
      <main className="w-full text-align">
        <div className="flex items-center justify-center min-w-screen mt-2 mb-5">
          <div className="text-4xl font-light">Multi-Webhook</div>
        </div>
        <MenuArea />
        <Routes>
          <Route index element={<Home />} />
        </Routes>
        <Toaster position="top-right" />
      </main>
    </BrowserRouter>
  );
}
