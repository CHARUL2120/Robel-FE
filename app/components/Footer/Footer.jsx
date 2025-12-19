'use client';
import React from 'react';
import { motion } from 'framer-motion';
import CallToAction from './CallToAction';
import Contact from './Contact';
import SocieaMedia from './SocieaMedia';

const Footer = () => {
  return (
    <div>
      <div className="container mx-auto mt-36.5">
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
      </div>
    </div>
  );
};

export default Footer;
