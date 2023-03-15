import Game from "./game1.js"
import Pawn from "./pawn.js"

let game = new Game();

for(let i = 0; i < 4; i++){
    for(let j = 0; j < 4; j++)
        game.addPawn(game.colors[i], new Pawn(game.colors[i], j));
}
game.begin();