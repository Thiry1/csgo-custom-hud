import * as http from "http";
import * as url from "url";
import * as fs from "fs";
import * as path from "path";

declare const communication: any;
const port = 3000;
const host = "127.0.0.1";
const server = http.createServer((req, res) => {
    if (req.method === "POST") {
        console.log("Handling POST request...");
        res.writeHead(200, { "Content-Type": "text/html" });

        let body = "";
        req.on("data", (data) => {
            body += data;
        });
        req.on("end", () => {
            console.log("POST payload: " + body);
            try {
                communication.store.dispatch(communication.setGsiResponse(JSON.parse(body)));
            } catch (error) {
                console.error("INVALID GSI RESPONSE.", body, error);
            }

            res.end("");
        });
    } else {
        const request = url.parse(req.url, false);
        const fileName = request.pathname;
        fs.readFile(path.join(__dirname, "../", "./build/", fileName), (error: Error, data: any) => {
            if (error) {
                res.writeHead(404);
                res.end();
            }
            res.writeHead(200, { "Content-Type": "image/png" });
            res.end(data, "binary");
        });
    }

});

server.listen(port, host);
console.log("Listening at http://" + host + ":" + port);
