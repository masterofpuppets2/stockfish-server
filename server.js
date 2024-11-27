import express from 'express';
import cors from 'cors';
import { StockfishInstance } from 'node-stockfish';

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Route für KI-Züge
app.post('/calculate', (req, res) => {
    const { position, depth } = req.body;

    // Stockfish-Instanz erstellen
    const engine = StockfishInstance.getInstance();

    // Stelle sicher, dass Stockfish mit der richtigen Position startet
    engine.setBoardstateByFen(position);

    // Starte die Analyse
    engine.startAnalysing({
        lines: 1,  // Analysiere nur den besten Zug
    });

    // Lausche auf Analyse-Daten
    engine.onAnalysisData(analysisData => {
        console.log(`Analyse für Tiefe ${analysisData.depth}:`);
        let bestMove = null;

        // Gehe die analysierten Züge durch und suche den besten Zug
        for (const line of analysisData.lines) {
            console.log(`\t${line.score}: ${line.moves.join(' ')}`);
            if (!bestMove) {
                bestMove = line.moves.join(' ');
            }
        }

        console.log('');

        // Stoppe die Analyse, wenn die gewünschte Tiefe erreicht ist
        if (analysisData.depth >= depth) {
            engine.terminate(); // Stoppe Stockfish
            res.json({ bestMove }); // Antwort mit dem besten Zug
        }
    });
});

app.listen(PORT, () => {
    console.log(`Server läuft auf http://localhost:${PORT}`);
});
