import { useEffect, useState } from "react";
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable";
import List from "@/components/list";
import Details from "@/components/details";
import { toast } from "sonner";
import axios from "axios";
import socketIo from "socket.io-client";

function Home() {
  const [hooks, setHooks] = useState([]);
  const [selectedHook, setSelectedHook] = useState(undefined);
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const baseURL = "http://192.168.1.20:5001/";

  useEffect(() => {
    const fetchToken = async () => {
      if (token) return token;

      try {
        const { data } = await axios.get(baseURL + "generate-token");
        toast.success(data.message);

        setToken(data.data.token);
        localStorage.setItem("token", data.data.token);
        localStorage.setItem("webhookLink", data.data.webhookLink);
        return;
      } catch (error) {
        toast.error(error.response?.data?.message || "Failed to generate token. Please try again.");
        return;
      }
    };

    const fetchData = async () => {
      if (!token) {
        await fetchToken();
      }

      try {
        const { data } = await axios.get(baseURL + "list", { headers: { Authorization: token } });
        setHooks(data.data);
        setSelectedHook(data.data[0]);
      } catch (error) {
        const message = error.response?.data?.message || "Failed to fetch data. Please try again.";
        toast.error(message);
      }
    };

    const socketSetup = () => {
      const socket = socketIo(`${baseURL}?authorization=${token}`, {
        transports: ["websocket"],
        reconnection: true,
        reconnectionAttempts: 5,
        reconnectionDelay: 1000
      });

      // // generic type
      // socket.on("connect", () => {
      //   console.info("connected", socket.id);
      // });
      // socket.on("connection_error", (error) => {
      //   console.info("connection_error", error);
      // });
      // socket.on("disconnect", (reason) => {
      //   console.info("Disconnected from server", reason);
      // });

      // custom listeners
      // socket.on("broadcast", (data) => {
      //   console.log("broadcast", data);
      // });

      socket.on("hook", (data) => {
        setHooks((prev) => [data, ...prev]);
      });
    };

    fetchData();
    socketSetup();
  }, [token]);

  useEffect(() => {
    const setViewAPI = async () => {
      await axios
        .put(baseURL + "view/" + selectedHook.id, undefined, { headers: { Authorization: token } })
        .then(({ data }) => {
          setHooks(data.data);
        })
        .catch(() => {
          toast.error("Error while connecting server...");
        });
    };

    if (selectedHook?.id) {
      setViewAPI();
    }
  }, [selectedHook]);

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
