/* eslint-disable no-unused-vars */
import React from 'react';
import { motion } from 'framer-motion';

import curaVexIcon from '../../assets/home/feature1.webp';
import manufacturingIcon from '../../assets/home/feature2.webp';
import zirConIcon from '../../assets/home/feature3.webp';
import "../../pages/HomeNew.css"; // Ensure global CSS is linked

const FeaturesSection = () => {
  const features = [
    {
      title: "CuraVex™",
      subtitle: "Angulated Technology :",
      description: "Developed in-house, our Angulated Screw Technology enables precise control of screw angulation, improving prosthetic accuracy and ensuring consistent restorative performance.",
      icon: manufacturingIcon,
    },
    {
      title: "Precise Manufacturing:",
      subtitle: "",
      description: "Backed by advanced manufacturing and strict quality controls, our precision-driven processes deliver reliable, repeatable, and clinically accurate dental solutions.",
      icon: curaVexIcon,
    },
    {
      title: "ZirCon™",
      subtitle: "Coating Enhances :",
      description: "ZirCon coating enhances surface integrity and durability, ensuring consistent performance and extended service life in clinical applications.",
      icon: zirConIcon,
    }
  ];

  return (
    // Removed outer paddings to let responsive-container handle it
    <section className="bg-white py-16 overflow-hidden">
      
      <div className="responsive-container">
        {/* Header Section */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-4xl mx-auto mb-16"
        >
          <h2 className="text-[34px] md:text-[40px] font-bold text-[#1a2b3b] mb-4">
            Designed, <span className="text-[#f18730]">Manufactured</span>, and Perfected <span className="text-[#f18730]">by Experts</span>
          </h2>
          <p className="text-gray-500 text-[16px] leading-relaxed">
            Innovative Dental Technologies Powered By In-House Engineering And Precision Manufacturing.
          </p>
        </motion.div>

        {/* Cards Grid - Removed mx-auto/max-w-8xl/pl-12 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              /* Added 'smooth-card' for the CSS hover effect we defined earlier */
              className="smooth-card p-8 flex border-2 border-orange-200 rounded-[2rem] flex-col items-start bg-white min-h-[420px]"
            >
              {/* Icon Area */}
              <div className="h-48 w-full flex items-center justify-center mb-6">
                <img 
                  src={feature.icon} 
                  alt={feature.title} 
                  className="max-h-full object-contain"
                />
              </div>

              {/* Content Area */}
              <div className="mt-auto w-full">
                <h4 className="text-[#f18730] font-bold text-[22px] mb-2">
                  {feature.title}
                </h4>
                {feature.subtitle && (
                  <p className="text-[#011632] font-bold text-[14px] uppercase tracking-wide mb-3">
                    {feature.subtitle}
                  </p>
                )}
                <p className="text-[#525b65] text-[15px] leading-[1.7]">
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;