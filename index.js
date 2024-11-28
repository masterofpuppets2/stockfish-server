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

app.get("/", (req, res) => {
  res.send("Stockfish-Server is running");
});

app.post("/", (req, res) => {
  const { position, depth } = req.body;

  const engine = StockfishInstance.getInstance();

  engine.setBoardstateByFen(position);

  engine.startAnalysing({
    lines: 1, //only one move
  });

  engine.onAnalysisData((analysisData) => {
    console.log(`Analyse für Tiefe ${analysisData.depth}:`);
    let bestMove = null;

    for (const line of analysisData.lines) {
      console.log(`\t${line.score}: ${line.moves.join(" ")}`);
      if (!bestMove) {
        bestMove = line.moves.join(" ");
      }
    }

    console.log("");

    if (analysisData.depth >= depth) {
      engine.terminate();
      res.json({ bestMove });
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
