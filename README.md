node server.js
http://localhost:3000

curl -X POST http://localhost:3000 -H "Content-Type: application/json" -d '{"position":"r1bqkb1r/pp2pppp/2n2n2/6B1/2pP4/2N5/PP3PPP/R2QKBNR w KQkq - 0 7","depth":15}'

curl -X POST https://stockfish-server-xi.vercel.app -H "Content-Type: application/json" -d '{"position":"r1bqkb1r/pp2pppp/2n2n2/6B1/2pP4/2N5/PP3PPP/R2QKBNR w KQkq - 0 7","depth":15}'

curl -X POST https://stockfish-server-xi.vercel.app/api/server -H "Content-Type: application/json" -d '{"position":"r1bqkb1r/pp2pppp/2n2n2/6B1/2pP4/2N5/PP3PPP/R2QKBNR w KQkq - 0 7","depth":15}'


Output:
{"bestMove":"d4d5 c6e5 g1f3 e5f3 d1f3 h7h6 g5f4 c8g4 f3g3 a8c8 f4e5 g4d7 f1e2 g7g6 g3e3 f8g7 e3a7 b7b5 a2a3 h6h5 e1g1 e8g8 a1d1 f8e8 a7e3"}

@vercel/node
