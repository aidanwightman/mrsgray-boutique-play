import { motion } from "framer-motion";
import { useState } from "react";

interface SignaturePhotoProps {
  image: string;
  signature: string;
}

const SignaturePhoto = ({ image, signature }: SignaturePhotoProps) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, delay: 0.3 }}
      className="relative w-full h-full min-h-[500px] cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image with hover effect */}
      <div className="absolute inset-0">
        <img
          src={image}
          alt="Signature"
          className={`w-full h-full object-cover transition-all duration-700 ${
            isHovered ? "grayscale-0 scale-105 brightness-110 saturate-150" : "grayscale"
          }`}
        />
      </div>

      {/* Signature Overlay */}
      <div className="absolute inset-0 flex items-end justify-center pb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="font-script text-6xl md:text-7xl text-foreground"
          style={{ color: "#e2d8cc" }}
        >
          {signature}
        </motion.div>
      </div>
    </motion.div>
  );
};

export default SignaturePhoto;



