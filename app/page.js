'use client';
import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import LaminatesGrid from './components/LaminateGallary';
import { whyChoose } from './data/whyChoose';
import SpotlightCard from './components/SpotlightCard/SpotlightCard';
import SlidingPanels from './components/SlidingPanels/SlidingPanels';
import { Button } from './components/ui/button';
import CallToAction from './components/Footer/CallToAction';
import Contact from './components/Footer/Contact';
import SocieaMedia from './components/Footer/SocieaMedia';
const Home = () => {
  return (
    <div>
      {/* Hero Section */}
      <div className="container mx-auto px-8">
        <div className="relative w-full h-[calc(100dvh-100px)] flex items-center justify-center">
          <div className="absolute inset-0 -top-8 -z-10 rounded-[20px] bg-center bg-cover bg-no-repeat bg-[url('/assets/images/herobg.png')]">
            <div className="w-full h-full flex flex-col justify-end p-4 sm:p-8 md:p-12">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-10 lg:gap-x-20 gap-y-5 lg:gap-y-10 items-center">
                <motion.div
                  className="p-4"
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
                >
                  <p className="font-eulogy text-white text-5xl sm:text-6xl md:text-8xl">
                    Acrylic Laminates
                  </p>
                </motion.div>

                <motion.div
                  className="p-4"
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.4, ease: 'easeOut' }}
                >
                  <p className="font-urbanist text-xl md:text-2xl font-normal tracking-normal content-center text-white">
                    Transform Your Space with Premium Acrylic Laminates.
                    Durable, Elegant, and Versatile Designs for Every Space
                  </p>

                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6, delay: 0.6 }}
                  >
                    <Button className="text-base lg:text-2xl text-white font-medium m-0 rounded-lg h-auto px-6 py-3 mt-8.5 font-urbanist">
                      Explore Our Range
                    </Button>
                  </motion.div>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* About Section */}
      <motion.section
        className="w-full py-16 md:py-24"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        viewport={{ once: true }}
      >
        <div className="container mx-auto flex flex-col lg:flex-row justify-between gap-8 lg:gap-16">
          {/* Left Image */}
          <motion.div
            className="w-full mt-0 lg:w-1/3 overflow-hidden"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <Image
              src="/assets/images/aboutLeft.png"
              alt="Left Interior"
              height={400}
              width={374}
              className="object-contain rounded-r-2xl"
            />
          </motion.div>

          {/* Center Text */}
          <motion.div
            className="w-full lg:w-1/3 text-center flex flex-col justify-center items-center"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <p className="text-3xl sm:text-5xl md:text-6xl text-center text-primary-foreground font-eulogy font-normal mb-2.5">
              Our Story
            </p>
            <div className="border h-1 w-14 border-primary bg-primary rounded-full" />
            <p className="mt-7.5 text-lg md:text-[22px] sm:text-lg text-primary-foreground leading-6 dark:text-gray-300 mb-6 font-urbanist font-normal">
              At ROBEL, our unwavering commitment to excellence is the
              foundation of our enduring success. We meticulously curate our
              laminates to align with our clients' discerning tastes and
              interior aspirations.
            </p>
            <Button
              variant="link"
              href="#"
              className="font-semibold text-lg md:text-2xl font-urbanist gap-3.5 text-primary inline-flex items-center relative after:absolute after:bottom-0 cursor-pointer after:left-0 after:w-0 after:h-[2px] after:bg-current after:transition-all after:duration-300 hover:after:w-full"
            >
              Read more
              <ArrowRight strokeWidth={3} size={20} />
            </Button>
          </motion.div>

          {/* Right Image */}
          <motion.div
            className="w-full mt-7 lg:mt-36 lg:w-1/3 rounded-l-2xl overflow-hidden flex justify-end"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <Image
              src="/assets/images/aboutRight.png"
              alt="Right Interior"
              height={400}
              width={374}
              className="object-contain rounded-l-2xl"
            />
          </motion.div>
        </div>
      </motion.section>
      {/* Why Choose Our Acrylic Laminates? */}
      <div className="container mx-auto px-8">
        <motion.div
          className="w-full flex justify-center flex-col items-center mb-14.5"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          viewport={{ once: true }}
        >
          <p className="text-3xl sm:text-5xl md:text-6xl text-center text-primary-foreground font-eulogy font-normal mb-2.5">
            Why Choose Our Acrylic Laminates?
          </p>
          <div className="border h-1 w-14 border-primary bg-primary rounded-full" />
        </motion.div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {whyChoose.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.6,
                delay: index * 0.15,
                ease: 'easeOut'
              }}
              viewport={{ once: true }}
            >
              <SpotlightCard
                className="custom-spotlight-card p-6 inset-shadow-sm border h-full items-stretch border-[rgba(197,112,93,0.5)]"
                spotlightColor="rgba(0, 229, 255, 0.2)"
              >
                <div className="flex flex-col items-start gap-4.5">
                  <div className="flex items-center gap-5">
                    <div className="bg-accent w-20 h-20 inset-shadow-sm flex justify-center items-center rounded-[10px]">
                      <Image
                        src={feature.icon}
                        alt={feature.title}
                        height={50}
                        width={50}
                      />
                    </div>
                    <p className="text-xl lg:text-3xl font-urbanist font-semibold text-primary-foreground">
                      {feature.title}
                    </p>
                  </div>
                  <div>
                    <p className="text-lg md:text-[22px] font-normal leading-8 text-[#252525] font-urbanist">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </SpotlightCard>
            </motion.div>
          ))}
        </div>
      </div>
      <div className="container mx-auto px-8 mt-36.5 mb-20" id='services'>
        <motion.div
          className="w-full flex justify-center flex-col items-center mb-14.5"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          viewport={{ once: true }}
        >
          <p className="text-s3xl sm:text-5xl md:text-6xl text-center text-primary-foreground font-eulogy font-normal mb-2.5">
            Explore Our Popular Categories
          </p>
          <div className="border h-1 w-14 border-primary bg-primary rounded-full" />
        </motion.div>
        <SlidingPanels />
      </div>
      <div className="container mx-auto px-8 mt-36.5 mb-20">
        <motion.div
          className="w-full mb-14.5"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          viewport={{ once: true }}
        >
          <LaminatesGrid />
        </motion.div>
        {/*<div className="container mx-auto mt-36.5">
          <motion.div
            className="w-full mb-14.5"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            viewport={{ once: true }}
          >
            <CallToAction />
          </motion.div>
        </div>
        <div className="container mx-auto mt-10">
          <motion.div
            className="w-full mb-14.5"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            viewport={{ once: true }}
          >
            <Contact />
          </motion.div>
        </div>
        <div className="container mx-auto mt-10">
          <motion.div
            className="w-full mb-14.5"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            viewport={{ once: true }}
          >
            <SocieaMedia />
          </motion.div>
        </div>*/}
      </div>
    </div>
  );
};

export default Home;
