import {playMove,createBoard} from "./connect4.js";

window.addEventListener("DOMContentLoaded", () => {
    const board = document.querySelector(".board");
    createBoard(board);

    const websocket = new WebSocket("ws://localhost:8001/")
    console.log(websocket) // print the incoming connections
    receiveMoves(board, websocket)
    sendMoves(board, websocket);


});

function sendMoves(board, websocket) {
  // When clicking a column, send a "play" event for a move in that column.
  board.addEventListener("click", ({ target }) => {
    const column = target.dataset.column;
    // Ignore clicks outside a column.
    if (column === undefined) {
      return;
    }
    const event = {
      type: "play",
      column: parseInt(column, 10),
    };
    websocket.send(JSON.stringify(event));
  });
}

function showMessage(message){
    window.setTimeout(() => window.alert(message), 50)
}

function receiveMoves(board, websocket){
    websocket.addEventListener("message", ({data}) =>{
       const event = JSON.parse(data);
       switch (event.type){
           case "play":
               playMove(board, event.player, event.column, event.row);
               break;
           case "win":
               showMessage(`player ${event.player} winds!`);
               websocket.close(1000);
               break;
           case "error":
               showMessage(event.message);
               break;
           default:
               throw new Error(`Unsupported event type: ${event.type}`);
       }
    });
}