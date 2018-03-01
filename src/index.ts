import * as http from "http";
import { createStore } from "./redux/store";
import { rootSaga } from "./redux/modules";
import {initializeClient, setGsiResponse} from "./redux/modules/actions";

const port = 3000;
const host = "127.0.0.1";

const store = createStore();
store.runSaga(rootSaga);
store.dispatch(initializeClient());

const server = http.createServer( (req, res) => {

    if (req.method === "POST") {
        console.log("Handling POST request...");
        res.writeHead(200, {"Content-Type": "text/html"});

        let body = "";
        req.on("data", (data) => {
            body += data;
        });
        req.on("end", () => {
            console.log("POST payload: " + body);
            try {
                store.dispatch(setGsiResponse(JSON.parse(body)));
            } catch (error) {
                console.error("INVALID GSI RESPONSE.", body, error);
            }

            res.end( "" );
        });
    } else {
        console.log("Not expecting other request types...");
        res.writeHead(200, {"Content-Type": "text/html"});
        const html = "<html><body>HTTP Server at http://" + host + ":" + port + "</body></html>";
        res.end(html);
    }

});

server.listen(port, host);
console.log("Listening at http://" + host + ":" + port);
