import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { StockfishInstance } from "node-stockfish";

dotenv.config();

const app = express();

const corsConfig = {
  origin: "",
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE"],
};
app.use(cors(corsConfig));
app.options("", cors(corsConfig));

app.use(express.json());

app.get("/", (res) => {
  res.send("Stockfish-Server is running");
});

app.post("/", (req, res) => {
  const { position, depth, lines } = req.body;

  const engine = StockfishInstance.getInstance();

  engine.setBoardstateByFen(position);

  engine.startAnalysing({ lines: lines });

  const analysisResults = [];

  engine.onAnalysisData((analysisData) => {
    console.log(`Analyse für Tiefe ${analysisData.depth}:`);

    // Varianten für alle Tiefen in der Console ausgeben
    analysisData.lines.forEach((line) => {
      console.log(`\t${line.score}: ${line.moves.join(" ")}`);
    });

    // Ergebnisse nur bei Erreichen der gewünschten Tiefe zurückgeben
    if (analysisData.depth >= depth) {
      analysisData.lines.forEach((line) => {
        analysisResults.push({
          score: line.score.score,
          moves: line.moves.join(" "),
        });
      });

      // Engine beenden und Ergebnisse zurückgeben
      engine.terminate();
      res.json({
        // depth: analysisData.depth,
        variants: analysisResults,
      });
    }
  });
});

if (process.env.NODE_ENV !== "prod") {
  const PORT = process.env.PORT;
  app.listen(PORT, () => {
    console.log(`Server läuft lokal auf http://localhost:${PORT}`);
  });
}

export default app;
