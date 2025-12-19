//'use client';
//import { Button } from '@/components/ui/button';
//import { motion, useAnimation } from 'framer-motion';
//import { MoveRight } from 'lucide-react';
//import Image from 'next/image';
//import { useState } from 'react';

//const panels = [
//  { title: 'Glowing Mirror', image: '/assets/images/Categories1.png' },
//  { title: 'Amazing Solid', image: '/assets/images/Categories2.png' },
//  { title: 'Modern Matt', image: '/assets/images/Categories3.png' },
//  {
//    title: 'Brilliance Marble',
//    image: '/assets/images/Categories4.png',
//    description:
//      'Modern Matte laminates offer subtle elegance with a soft, non-reflective surface, perfect for sleek, contemporary designs.'
//  },
//  { title: 'Charming Metallic', image: '/assets/images/Categories5.png' },
//  { title: 'Index & Technical sp.', image: '/assets/images/Categories6.png' }
//];

//const SlidingPanels = () => {
//  return (
//    <div className="flex h-[470px] overflow-hidden rounded-xl">
//      {panels.map((panel, index) => (
//        <HoverPanel key={index} panel={panel} />
//      ))}
//    </div>
//  );
//};

//const HoverPanel = ({ panel }) => {
//  const controls = useAnimation();
//  const [hovered, setHovered] = useState(false);

//  const handleMouseEnter = () => {
//    setHovered(true);
//    controls.start({
//      opacity: 1,
//      y: 0,
//      transition: { delay: 0.5, duration: 0.4 }
//    });
//  };

//  const handleMouseLeave = () => {
//    setHovered(false);
//    controls.start({
//      opacity: 0,
//      y: 20,
//      transition: { duration: 0.2 }
//    });
//  };

//  return (
//    <motion.div
//      onMouseEnter={handleMouseEnter}
//      onMouseLeave={handleMouseLeave}
//      className="relative group border border-white/50 flex-1 min-w-0 transition-all duration-500 ease-in-out hover:flex-[2] overflow-hidden"
//    >
//      <div className="relative w-full h-full">
//        {/* Background Image */}
//        <Image
//          src={panel.image}
//          alt={panel.title}
//          fill
//          className="object-cover z-0"
//        />

//        {/* Overlay */}
//        <div className="absolute inset-0 bg-black/50 z-10 pointer-events-none transition duration-300 group-hover:bg-black/40" />

//        {/* Vertical title */}
//        <motion.div
//          animate={{
//            rotate: hovered ? 0 : -90,
//            opacity: hovered ? 0 : 1,
//            x: '-50%',
//            y: '-50%'
//          }}
//          transition={{ duration: 0.4 }}
//          className="absolute flex items-start gap-5 z-20 top-1/2 left-1/2 font-semibold origin-center text-white text-4xl whitespace-nowrap  pointer-events-none"
//        >
//          <motion.span
//            animate={{
//              scale: hovered ? 0 : 1,
//              opacity: hovered ? 0 : 1
//            }}
//            transition={{ duration: 0.3, ease: 'easeInOut' }}
//          >
//            <MoveRight className="rotate-90" />
//          </motion.span>
//          {panel.title}
//        </motion.div>

//        {/* Description content */}
//        {panel.description && (
//          <motion.div
//            animate={controls}
//            initial={{ opacity: 0, y: 20 }}
//            className="absolute z-20 w-[80%] top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white"
//          >
//            <p className="text-5xl font-semibold font-dark leading-[100%] text-white">
//              {panel.title}
//            </p>
//            <p className="mt-5 font-urbanist font-normal text-xl leading-8 text-white">
//              {panel.description}
//            </p>
//            <Button
//              variant="default"
//              className="bg-primary mt-10 text-2xl text-white font-urbanist font-medium px-6 !py-3"
//            >
//              Explore More
//            </Button>
//          </motion.div>
//        )}
//      </div>
//    </motion.div>
//  );
//};

//export default SlidingPanels;

'use client';
import { motion, useAnimation } from 'framer-motion';
import { MoveRight } from 'lucide-react';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { Button } from '../ui/button';

const panels = [
  { title: 'Glowing Mirror', image: '/assets/images/Categories1.png' },
  { title: 'Amazing Solid', image: '/assets/images/Categories2.png' },
  { title: 'Modern Matt', image: '/assets/images/Categories3.png' },
  {
    title: 'Brilliance Marble',
    image: '/assets/images/Categories4.png',
    description:
      'Modern Matte laminates offer subtle elegance with a soft, non-reflective surface, perfect for sleek, contemporary designs.'
  },
  { title: 'Charming Metallic', image: '/assets/images/Categories5.png' },
  { title: 'Index & Technical sp.', image: '/assets/images/Categories6.png' }
];

const SlidingPanels = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [activeIndex, setActiveIndex] = useState(null);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 1024); // lg breakpoint
    };

    handleResize(); // Check on load
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div
      className={`flex ${
        isMobile ? 'flex-col h-auto' : 'flex-row h-[470px]'
      } overflow-hidden rounded-xl`}
    >
      {panels.map((panel, index) => (
        <HoverPanel
          key={index}
          panel={panel}
          isMobile={isMobile}
          isActive={activeIndex === index}
          onClick={() => setActiveIndex(index === activeIndex ? null : index)}
        />
      ))}
    </div>
  );
};

const HoverPanel = ({ panel, isMobile, isActive, onClick }) => {
  const controls = useAnimation();
  const [hovered, setHovered] = useState(false);

  const handleEnter = () => {
    if (!isMobile) {
      setHovered(true);
      controls.start({
        opacity: 1,
        y: 0,
        transition: { delay: 0.5, duration: 0.4 }
      });
    }
  };

  const handleLeave = () => {
    if (!isMobile) {
      setHovered(false);
      controls.start({
        opacity: 0,
        y: 20,
        transition: { duration: 0.2 }
      });
    }
  };

  useEffect(() => {
    if (isMobile && isActive) {
      controls.start({ opacity: 1, y: 0, transition: { duration: 0.3 } });
    } else if (isMobile) {
      controls.start({ opacity: 0, y: 20, transition: { duration: 0.2 } });
    }
  }, [isMobile, isActive, controls]);

  return (
    <motion.div
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      onClick={isMobile ? onClick : undefined}
      className={`relative group border border-white/50 overflow-hidden transition-all duration-500 ease-in-out ${
        isMobile
          ? `w-full ${isActive ? 'h-[450px]' : 'h-[100px]'}`
          : 'flex-1 min-w-0 hover:flex-[2]'
      }`}
    >
      <div className="relative w-full h-full">
        <Image
          src={panel.image}
          alt={panel.title}
          fill
          className="object-cover z-0"
        />

        <div className="absolute inset-0 bg-black/50 z-10 pointer-events-none transition duration-300 group-hover:bg-black/40" />

        {/* Vertical title (only if not expanded in mobile) */}
        <motion.div
          animate={{
            rotate: !isMobile && hovered ? 0 : -90,
            opacity: !isMobile && hovered ? 0 : 1,
            x: '-50%',
            y: '-50%'
          }}
          transition={{ duration: 0.4 }}
          className="absolute flex items-start gap-5 z-20 top-1/2 left-1/2 font-semibold origin-center text-white text-4xl whitespace-nowrap  pointer-events-none"
        >
          <motion.span
            animate={{
              scale: !isMobile && hovered ? 0 : 1,
              opacity: !isMobile && hovered ? 0 : 1
            }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
          >
            <MoveRight className="rotate-90" />
          </motion.span>
          {panel.title}
        </motion.div>

        {/* Description */}
        {panel.description && (
          <motion.div
            animate={controls}
            initial={{ opacity: 0, y: 20 }}
            className="absolute z-20 w-[80%] top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white"
          >
            <p className="text-4xl font-semibold leading-[100%]">
              {panel.title}
            </p>
            <p className="mt-5 text-lg leading-7">{panel.description}</p>
            <Button className="bg-primary text-white mt-6 text-lg px-5 py-2">
              Explore More
            </Button>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default SlidingPanels;
