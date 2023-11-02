import {playMove,createBoard} from "./connect4";

window.addEventListener("DOMContentLoad", () => {
    const board = doucment.querySelector(".board");
    createBoard(board);
});