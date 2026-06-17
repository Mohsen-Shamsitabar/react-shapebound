import type {
  PlayerContainer,
  PlayerContainerData,
} from "@/classes/PlayerContainer";
import { motion, useMotionValue } from "motion/react";
import { useEffect, useRef } from "react";

type Props = {
  children: React.ReactNode;
  playerContainer: PlayerContainer;
};

const PlayerContainerElement = (props: Props) => {
  const { children, playerContainer } = props;

  const elementRef = useRef<null | HTMLDivElement>(null);

  const size = useMotionValue(512);

  const updateElement = (newPlayerContainerData: PlayerContainerData) => {
    size.set(newPlayerContainerData.size);
  };

  useEffect(() => {
    playerContainer.setUpdateElementFn(updateElement);
    playerContainer.setElementRef(elementRef.current);

    return () => {
      playerContainer.setUpdateElementFn(null);
      playerContainer.setElementRef(null);
    };
  }, [playerContainer]);

  return (
    <motion.div
      ref={elementRef}
      className="border-secondary relative aspect-square overflow-hidden border-2"
      style={{ width: size, height: size }}
    >
      {children}
    </motion.div>
  );
};

export default PlayerContainerElement;
