// import express from "express";
// import cors from "cors";
// import { StockfishInstance } from "node-stockfish";
// import dotenv from "dotenv";

// dotenv.config();

// const app = express();
// const PORT = process.env.PORT;

// // Middleware, um die Content-Security-Policy korrekt zu setzen
// app.use((req, res, next) => {
//   // Setzen einer sicheren Content-Security-Policy
//   res.setHeader(
//     "Content-Security-Policy",
//     "default-src 'none';" + // Standardmäßig alles blockieren
//       "script-src 'self' https://vercel.live;" + // Erlaube Skripte von 'self' und 'vercel.live'
//       "img-src 'self' https://stockfish-server-xi.vercel.app;" + // Erlaube Bilder von 'self' und 'stockfish-server-xi.vercel.app'
//       "connect-src 'self';" + // Erlaube Verbindungen nur zu 'self'
//       "style-src 'self' 'unsafe-inline';" + // Erlaube Styles von 'self' und 'unsafe-inline' für inline Styles
//       "font-src 'self';" // Erlaube Fonts nur von 'self'
//   );
//   next();
// });
// // Middleware
// app.use(cors());
// app.use(express.json());

// app.get("/", (req, res) => {
//   res.send("Express on Vercel");
// });

// // Route für KI-Züge
// // app.post("/", (req, res) => {
// //   const { position, depth } = req.body;

// //   // Stockfish-Instanz erstellen
// //   const engine = StockfishInstance.getInstance();

// //   // Stelle sicher, dass Stockfish mit der richtigen Position startet
// //   engine.setBoardstateByFen(position);

// //   // Starte die Analyse
// //   engine.startAnalysing({
// //     lines: 1, // Analysiere nur den besten Zug
// //   });

// //   // Lausche auf Analyse-Daten
// //   engine.onAnalysisData((analysisData) => {
// //     console.log(`Analyse für Tiefe ${analysisData.depth}:`);
// //     let bestMove = null;

// //     // Gehe die analysierten Züge durch und suche den besten Zug
// //     for (const line of analysisData.lines) {
// //       console.log(`\t${line.score}: ${line.moves.join(" ")}`);
// //       if (!bestMove) {
// //         bestMove = line.moves.join(" ");
// //       }
// //     }

// //     console.log("");

// //     // Stoppe die Analyse, wenn die gewünschte Tiefe erreicht ist
// //     if (analysisData.depth >= depth) {
// //       engine.terminate(); // Stoppe Stockfish
// //       res.json({ bestMove }); // Antwort mit dem besten Zug
// //     }
// //   });
// // });

// // Wenn lokal ausgeführt, lausche auf PORT
// if (process.env.NODE_ENV !== "prod") {
//   app.listen(PORT, () => {
//     console.log(`Server läuft lokal auf http://localhost:${PORT}`);
//   });
// }

// // Default-Export für Vercel
// export default function handler(req, res) {
//   // Übergabe der Anfrage an die Express-App
//   app(req, res);
// }

//// Exportiere den Express-Server für Vercel
// export default app;
// export default (req, res) => {
//   app(req, res); // Weiterleitung an Express-Handler
// };

const express = require("express");
const cors = require("cors");

const app = express();

const corsConfig = {
  origin: "",
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE"],
};
app.use(cors(corsConfig));
app.options("", cors(corsConfig));

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Express on Vercel");
});

module.exports = app;
