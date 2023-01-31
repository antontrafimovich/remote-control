import { httpServer } from "./src/http_server";
import { wsServer } from "./src/ws_server";

const WS_PORT = 8080;
wsServer.listen(WS_PORT);

const HTTP_PORT = 8181;
console.log(`Start static http server on the ${HTTP_PORT} port!`);
httpServer.listen(HTTP_PORT);

process.on("SIGINT", () => {
  wsServer.close();
  httpServer.close();
});
