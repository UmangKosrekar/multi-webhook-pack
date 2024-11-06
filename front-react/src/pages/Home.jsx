import { useEffect, useState } from "react";
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable";
import List from "@/components/list";
import Details from "@/components/details";
import { toast } from "sonner";
import axios from "axios";

function Home() {
  const [hooks, setHooks] = useState([]);
  const [selectedHook, setSelectedHook] = useState(undefined);
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
      localStorage.setItem("webhookLink", data.data.webhookLink);
      return;
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to generate token. Please try again.");
      return;
    }
  })();

  const fetchData = async () => {
    if (!token) return;

    try {
      const { data } = await axios.get(baseURL + "list", {
        headers: { Authorization: token }
      });
      setHooks(data.data);
      setSelectedHook(data.data[0]);
    } catch (error) {
      const message = error.response?.data?.message || "Failed to fetch data. Please try again.";
      toast.error(message);
    }
  };

  useEffect(() => {
    fetchData();

    const intervalId = setInterval(() => {
      fetchData();
    }, 9000);

    return () => clearInterval(intervalId);
  }, [token]);

  return (
    <ResizablePanelGroup direction="horizontal">
      <ResizablePanel defaultSize={20} collapsible={true} minSize={20} maxSize={45} className="list-card pt-5">
        <List items={hooks} setSelectedHook={setSelectedHook} selectedHook={selectedHook} />
      </ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel>
        <Details selectedHook={selectedHook} />
      </ResizablePanel>
    </ResizablePanelGroup>
  );
}

export default Home;
