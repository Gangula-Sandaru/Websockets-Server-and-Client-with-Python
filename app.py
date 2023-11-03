import asyncio
import json

import websockets

from connect4 import Connect4, PLAYER1, PLAYER2


async def handler(websocket):
    # Initialize a Connect Four game.
    game = Connect4()


    for player, column, row in [
        (PLAYER1, 3, 0),
        (PLAYER2, 3, 1),
        (PLAYER1, 4, 0),
        (PLAYER2, 4, 1),
        (PLAYER1, 2, 0),
        (PLAYER2, 1, 0),
        (PLAYER1, 5, 0),
    ]:
        event = {
            "type": "play",
            "player": player,
            "column": column,
            "row": row,
        }
        await websocket.send(json.dumps(event))
        await asyncio.sleep(0.5)
    event = {
        "type": "win",
        "player": PLAYER1,
    }
    await websocket.send(json.dumps(event))


async def main():
    async with websockets.serve(handler, "", 8001):
        await asyncio.Future()  # run forever


if __name__ == "__main__":
    asyncio.run(main())