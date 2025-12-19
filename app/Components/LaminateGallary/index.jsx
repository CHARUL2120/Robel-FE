'use client';
import { MoveRight } from 'lucide-react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useRef, useState } from 'react';
import { Button } from '../ui/button';
import { Card, CardContent } from '../ui/card';

const columns = [
  [
    { src: '/assets/images/Laminates1.png', height: 'h-[300px]' },
    { src: '/assets/images/Laminates2.png', height: 'h-[300px]' }
  ],
  [{ src: '/assets/images/Laminates3.png', height: 'h-[436px]' }],
  [
    { src: '/assets/images/Laminates4.png', height: 'h-[300px]' },
    { src: '/assets/images/Laminates5.png', height: 'h-[300px]' }
  ],
  [{ src: '/assets/images/Laminates6.png', height: 'h-[436px]' }],
  [
    { src: '/assets/images/Laminates1.png', height: 'h-[300px]' },
    { src: '/assets/images/Laminates2.png', height: 'h-[300px]' }
  ]
];

const LaminatesGrid = () => {
  const containerRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const handleMouseDown = (e) => {
    if (!containerRef.current) return;
    setIsDragging(true);
    setStartX(e.pageX - containerRef.current.offsetLeft);
    setScrollLeft(containerRef.current.scrollLeft);
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (e) => {
    if (!isDragging || !containerRef.current) return;
    e.preventDefault();
    const x = e.pageX - containerRef.current.offsetLeft;
    const walk = (x - startX) * 1; // multiplier to control speed
    containerRef.current.scrollLeft = scrollLeft - walk;
  };

  return (
    <section className="h-full pt-12 w-full">
      <div className="container flex-wrap flex px-6 md:px-16 item-center justify-between">
        <p className="text-3xl sm:text-5xl md:text-6xl text-primary-foreground font-eulogy font-normal mb-2.5">
          See Our <br /> Laminates in Action
        </p>
        <Button className="text-base lg:text-2xl text-white font-medium m-0 rounded-lg px-6 py-3 mt-8.5 font-urbanist flex gap-2.5">
          View All Photos
          <MoveRight size={24} strokeWidth={3} />
        </Button>
      </div>
      <div
        ref={containerRef}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseLeave}
        onMouseMove={handleMouseMove}
        className={`overflow-x-auto overflow-y-hidden no-scrollbar h-[620px] no-scrollbar cursor-${
          isDragging ? 'grabbing' : 'grab'
        } px-6 pt-10`}
      >
        <motion.div
          className="flex space-x-6 items-center"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: {
              transition: {
                staggerChildren: 0.15
              }
            }
          }}
        >
          {columns.map((column, colIndex) => (
            <motion.div
              key={colIndex}
              className="flex flex-col items-center gap-4"
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: { opacity: 1, y: 0 }
              }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
            >
              {column.map((img, imgIndex) => (
                <Card
                  key={imgIndex}
                  className={`w-[316px] ${img.height} rounded-[20px] p-0`}
                >
                  <CardContent className="p-0 h-full">
                    <Image
                      src={img.src}
                      alt={`image-${colIndex}-${imgIndex}`}
                      width={1080}
                      height={1080}
                      className="w-full h-full object-cover object-center"
                    />
                  </CardContent>
                </Card>
              ))}
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default LaminatesGrid;
