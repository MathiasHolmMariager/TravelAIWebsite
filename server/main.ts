// index.ts - unchanged
import express = require("express");
import { getDuffel } from "./duffel";

const HTTP = require("http-status-codes");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require('dotenv');
dotenv.config();

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
app.use(cors());

app.use((req: any, resp: any, next: any) => {
  resp.header("Access-Control-Allow-Origin", "*");
  resp.header("Access-Control-Allow-Headers", "X-Requested-With, privatekey");
  resp.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  resp.setHeader('content-type', 'application/json; charset=utf-8');
  next();
});

app.post("/duffel", async (req, resp) => {
  const params = req.body; // Retrieve parameters sent from the frontend
  const res = await getDuffel(params); // Pass parameters to the getDuffel function

  return resp.status(HTTP.OK).json({ res: res });
});

app.listen(1337, () => {
  console.log('Backend listening on PORT 1337');
});
