import { BrowserRouter, Routes, Route } from "react-router-dom";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { Separator } from "@/components/ui/separator";

import Home from "./pages/Home";

export default function App() {
  return (
    <BrowserRouter>
      <Separator />
      <div>
        <SidebarProvider>
          <AppSidebar />
          <main className="w-full text-align">
            <div className="flex items-center justify-center min-w-screen mt-2 mb-10">
              <div className="text-4xl font-bold text-gray-800">Multi-Webhook</div>
            </div>
            <Routes>
              <Route index element={<Home />} />
            </Routes>
          </main>
        </SidebarProvider>
      </div>
    </BrowserRouter>
  );
}
