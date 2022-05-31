import { io } from "socket.io-client";
import { useEffect, useState } from "react";
import Answer from "./components/answer";
import GraphFromAnswers from "./components/graph";

function App() {
  const [connectedSocket, setConnectedSocket] = useState();

  useEffect(() => {
    const socket = io();

    socket.on("connected", () => {
      setConnectedSocket(socket);
    });
  }, []);

  if (!connectedSocket) {
    return <p>Awaiting connection...</p>;
  }

  return (
    <div style={{ padding: 10 }}>
      <h1>Sondaj:</h1>
      <div>Care este marca ta preferata de masini?</div>
      <Answer socket={connectedSocket} />
      <GraphFromAnswers socket={connectedSocket} />
    </div>
  );
}

export default App;
