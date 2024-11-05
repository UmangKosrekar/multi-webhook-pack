import { useEffect, useState } from "react";
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable";
import List from "@/components/list";
import { toast } from "sonner";
import axios from "axios";

function Home() {
  const [hooks, setHooks] = useState([]);
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const baseURL = "http://localhost:5001/";

  (async () => {
    if (token) return token;

    try {
      const { data } = await axios.get(baseURL + "generate-token");
      toast.success(data.message);
      const newToken = data.data.token;
      setToken(newToken);
      localStorage.setItem("token", newToken);

      console.log("Fetched new token:", newToken);
      return newToken;
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to generate token. Please try again.");
      return null;
    }
  })();

  const fetchData = async () => {
    if (!token) return;

    try {
      const { data } = await axios.get(baseURL + "list", {
        headers: { Authorization: token }
      });
      setHooks(data.data);
      console.log("Fetched data:", data.data);
    } catch (error) {
      const message = error.response?.data?.message || "Failed to fetch data. Please try again.";
      toast.error(message);
    }
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      fetchData();
    }, 3000);

    return () => clearInterval(intervalId);
  }, [token]);

  return (
    <ResizablePanelGroup direction="horizontal">
      <ResizablePanel defaultSize={20} collapsible={true} minSize={20} maxSize={45}>
        <span className="text-3xl flex justify-left ml-5 mb-5 font-light">History</span>
        <List items={hooks} />
      </ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel>Two</ResizablePanel>
    </ResizablePanelGroup>
  );
}

export default Home;
