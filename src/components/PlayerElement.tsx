import type { Player, PlayerData } from "@/classes/Player";
import { motion, useMotionValue } from "motion/react";
import { useEffect, useRef } from "react";

type PlayerProps = {
  player: Player;
};

const PlayerElement = ({ player }: PlayerProps) => {
  const { x: playerX, y: playerY } = player.getPosition();

  const elementRef = useRef<null | HTMLDivElement>(null);

  const elementX = useMotionValue(playerX);
  const elementY = useMotionValue(playerY);
  const elementSize = useMotionValue(player.getSize());

  const updateElement = (newPlayerData: PlayerData) => {
    elementX.set(newPlayerData.position.x);
    elementY.set(newPlayerData.position.y);
    elementSize.set(newPlayerData.size);
  };

  useEffect(() => {
    player.setUpdateElementFn(updateElement);
    player.setElementRef(elementRef.current);

    return () => {
      player.setUpdateElementFn(null);
      player.setElementRef(null);
    };
  }, [player]);

  return (
    <motion.div
      ref={elementRef}
      className="bg-primary absolute aspect-square"
      style={{
        width: elementSize,
        height: elementSize,
        x: elementX,
        y: elementY,
        originX: 0.5,
        originY: 0.5,
      }}
    />
  );
};

export default PlayerElement;
