import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { StockfishInstance } from "node-stockfish";
import { Chess } from "chess.js";

dotenv.config();

const formatChessMoves = (variantMoves, position) => {
  const variationGame = new Chess(position);
  const movesArray = variantMoves.split(" ");
  const formattedMoves = [];

  for (const move of movesArray) {
    const sanMove = variationGame.move({
      from: move.slice(0, 2),
      to: move.slice(2, 4),
    });

    if (sanMove) {
      formattedMoves.push(sanMove.san);
    }
  }

  return formattedMoves.join(" ");
};

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
    // analysisData.lines.forEach((line) => {
    //   console.log(`\t${line.score}: ${line.moves.join(" ")}`);
    // });

    // Ergebnisse nur bei Erreichen der gewünschten Tiefe zurückgeben
    if (analysisData.depth >= depth) {
      analysisData.lines.forEach((line) => {
        const formattedMoves = formatChessMoves(line.moves.join(" "), position);
        analysisResults.push({
          score: line.score.score,
          moves: formattedMoves,
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
