import { motion } from "framer-motion";
import Navigation from "@/components/Navigation";
import SignaturePhoto from "@/components/SignaturePhoto";
import michaelaPhoto from "@/assets/Michaela.jpg";

const About = () => {
  return (
    <>
      <Navigation />
      
      <main className="min-h-screen bg-background pt-24">
        <div className="max-w-7xl mx-auto px-6">
          {/* Two Column Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 min-h-[80vh]">
            {/* Left Column - Text */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="flex flex-col justify-center space-y-8 py-12"
            >
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="font-heading text-5xl md:text-6xl lg:text-7xl text-foreground tracking-tight"
              >
                About
              </motion.h1>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="space-y-6 text-foreground/80 font-sans text-base md:text-lg leading-relaxed"
              >
                <p>
                  We are all about keeping things simple. Mrs Gray is a female-focused, boutique football agency redefining the landscape of women's football.
                </p>
                
                <p>
                  Founded by former footballer <span className="text-foreground italic">Michaela Gooden</span>, 
                  the agency blends real experience with purpose, representing a carefully selected group of athletes.
                </p>
                
                <p>
                  As a boutique agency, we thrive on intention—prioritising time, trust, and tailored support.
                </p>
                
                <p className="text-foreground font-script text-2xl md:text-3xl italic pt-4">
                  We celebrate the woman behind the athlete.
                </p>
              </motion.div>

              {/* Contact Footer */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="pt-12 border-t border-foreground/20 grid grid-cols-1 md:grid-cols-3 gap-8 text-sm"
              >
                <div>
                  <p className="text-foreground/60 font-sans uppercase tracking-wider text-xs mb-2">Location</p>
                  <p className="text-foreground font-sans">London, UK</p>
                </div>
                <div>
                  <p className="text-foreground/60 font-sans uppercase tracking-wider text-xs mb-2">Email</p>
                  <a href="mailto:info@mrsgrayagency.com" className="text-foreground font-sans hover:opacity-80 transition-opacity">
                    info@mrsgrayagency.com
                  </a>
                </div>
                <div>
                  <p className="text-foreground/60 font-sans uppercase tracking-wider text-xs mb-2">Socials</p>
                  <a 
                    href="https://www.instagram.com/mrsgrayagency/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-foreground font-sans hover:opacity-80 transition-opacity"
                  >
                    @mrsgrayagency
                  </a>
                </div>
              </motion.div>
            </motion.div>

            {/* Right Column - Signature Photo */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="flex items-center justify-center"
            >
              <SignaturePhoto
                image={michaelaPhoto}
                signature="Mrs Gray"
              />
            </motion.div>
          </div>
        </div>
      </main>
    </>
  );
};

export default About;
