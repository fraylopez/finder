import { useRef, useState } from "react";
import { motion, PanInfo, useAnimation, useMotionValue, useTransform } from "framer-motion";

interface CardProps {
  id: string;
  index: number;
  title: string;
  imageUrl: string;
  onVote: Function
}

const Card = ({id, index, title, imageUrl, onVote}: CardProps) => {
  
  const cardElem = useRef(null);
  
  const x = useMotionValue(0);
  const controls = useAnimation();

  const [constrained, setConstrained] = useState(true);
  const currentVote = useRef<boolean>();

  const onDrag = (_: any, info: PanInfo) => {
    if (info.offset.x > 200 && info.velocity.x >= 0) {
      currentVote.current = true;
    } else if (info.offset.x < -200 && info.velocity.x <= 0) {
      currentVote.current =false;
    } else {
      currentVote.current =undefined;
    }
  }

  const onDragEnd = () => {

    if (currentVote.current !== undefined) {
      setConstrained(false)
      controls.start({
        x: currentVote.current ? "100vw" : "-100vw"
      }).then(() => onVote(id, currentVote))
    }
  }
  
  const rotateValue = useTransform(x, [-500, 500], [20, -20]);
  
  const opacityValue = useTransform(
    x,
    [-700, -100, 0, 100, 700],
    [0, 1, 1, 1, 0]
  );

  const isFirst = index === 0;

  return (
    <motion.div
      ref={cardElem}
      drag={isFirst}
      dragElastic={1}
      animate={controls}
      dragConstraints={ constrained && {
        right: 0,
        left: 0,
        top: 0,
        bottom: 0,
      }}
      onDrag={onDrag}
      onDragEnd={onDragEnd}
      whileTap={isFirst ? { scale: 1.1 } : {}}
      style={{
        x,
        rotate: rotateValue,
        opacity: opacityValue,
        backgroundImage: `url(${imageUrl})`
      }}
      className="bg-white bg-cover bg-center absolute overflow-hidden shadow-lg rounded-lg flex items-end w-full h-full"
    >
      <div className="w-full px-4 py-4 sm:px-6 pb-24 backdrop-blur-md bg-black/20">
        <div className="leading-6 space-y-1">
          <h3 className="text-white text-3xl font-semibold">{title}</h3>
          <p className="text-red-400 text-lg">{id}</p>
        </div>
      </div>
    </motion.div>
  )

}

export default Card;