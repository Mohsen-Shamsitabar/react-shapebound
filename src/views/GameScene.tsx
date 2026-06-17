/* eslint-disable react-hooks/refs */
import { Player } from "@/classes/Player";
import { PlayerContainer } from "@/classes/PlayerContainer";
import PlayerContainerElement from "@/components/PlayerContainerElement";
import PlayerElement from "@/components/PlayerElement";
import KEYBINDS from "@/constants/keybinds";
import useKeyboard from "@/hooks/useKeyboard";
import { useAnimationFrame } from "motion/react";
import { useRef } from "react";

const GameScene = () => {
  const pressedKeys = useKeyboard();

  const { current: player } = useRef<Player>(new Player(0, 0));
  const { current: playerContainer } = useRef<PlayerContainer>(
    new PlayerContainer(),
  );

  const handlePlayerMovement = () => {
    player.stopMovement();

    if (pressedKeys.has(KEYBINDS.moveUp)) {
      player.moveUp();
    }

    if (pressedKeys.has(KEYBINDS.moveDown)) {
      player.moveDown();
    }

    if (pressedKeys.has(KEYBINDS.moveRight)) {
      player.moveRight();
    }

    if (pressedKeys.has(KEYBINDS.moveLeft)) {
      player.moveLeft();
    }
  };

  const handlePlayerClamping = () => {
    const containerBounds = playerContainer.getBounds();
    const playerBounds = player.getBounds();

    if (!containerBounds || !playerBounds) return;

    const {
      top: playerTop,
      right: playerRight,
      bottom: playerBottom,
      left: playerLeft,
    } = playerBounds;

    const {
      top: containerTop,
      right: containerRight,
      bottom: containerBottom,
      left: containerLeft,
      x: containerX,
      y: containerY,
    } = containerBounds;

    if (playerTop <= containerTop) {
      player.clampTop(containerTop - containerY);
    }

    if (playerRight >= containerRight) {
      player.clampRight(containerRight - containerX);
    }

    if (playerBottom >= containerBottom) {
      player.clampBottom(containerBottom - containerY);
    }

    if (playerLeft <= containerLeft) {
      player.clampLeft(containerLeft - containerX);
    }
  };

  const gameLoop = (_elapsed: number, delta: number) => {
    const normalizedDelta = delta * 0.016; // normalize to ~60fps

    handlePlayerMovement();
    handlePlayerClamping();
    player.update(normalizedDelta);
  };

  useAnimationFrame(gameLoop);

  return (
    <main className="relative flex size-full items-center justify-center overflow-hidden">
      <PlayerContainerElement playerContainer={playerContainer}>
        <PlayerElement player={player} />
      </PlayerContainerElement>

      {/* DEBUG MENU */}
      <div className="absolute top-0 left-0 flex flex-col gap-y-2">
        {/* DEBUG PLAYER SIZE */}
        <div className="flex w-full flex-row items-center justify-between">
          <span className="me-2">Player Size:</span>

          <div className="flex flex-row items-center justify-center gap-x-2">
            <button
              className="bg-accent aspect-square w-8 cursor-pointer active:brightness-50"
              onClick={() => {
                player.increaseSize(5);
              }}
            >
              +
            </button>

            <button
              className="bg-accent aspect-square w-8 cursor-pointer active:brightness-50"
              onClick={() => {
                player.decreaseSize(5);
              }}
            >
              -
            </button>
          </div>
        </div>

        {/* DEBUG CONTAINER SIZE */}
        <div className="flex w-full flex-row items-center justify-between">
          <span className="me-2">Container Size:</span>

          <div className="flex flex-row items-center justify-center gap-x-2">
            <button
              className="bg-accent aspect-square w-8 cursor-pointer active:brightness-50"
              onClick={() => {
                playerContainer.increaseSize(5);
              }}
            >
              +
            </button>

            <button
              className="bg-accent aspect-square w-8 cursor-pointer active:brightness-50"
              onClick={() => {
                playerContainer.decreaseSize(5);
              }}
            >
              -
            </button>
          </div>
        </div>
      </div>

      {/* ENEMIES */}
      {/* UI */}
    </main>
  );
};

export default GameScene;
