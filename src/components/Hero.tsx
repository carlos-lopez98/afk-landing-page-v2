import { motion } from "framer-motion";
import { Circle } from "lucide-react";
import VideoPlayer from "@/components/VideoPlayer"; // adjust path if needed
import ElegantShape from "@/components/background/ElegantShape"; // adjust path if needed
import { useState } from "react"; // you need this for setIsModalOpen
import { Easing } from "framer-motion";

import BasicModal from "./BasicModal";


const fadeUpVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: (i: number) => ({
        opacity: 1,
        y: 0,
        transition: {
            duration: 1,
            delay: 0.5 + i * 0.2,
            ease: [0.25, 0.4, 0.25, 1] as Easing,
        },
    }),
};



function Hero() {
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <div className="relative isolate min-h-screen w-full flex flex-col items-center justify-start overflow-hidden bg-[#F5F3F0]">
            <div className="absolute inset-0 overflow-hidden">
                <ElegantShape
                    zIndex={-10}
                    delay={0.3}
                    width={500}
                    height={140}
                    rotate={12}
                    gradient="from-[#FE654F]/[0.15]"
                    className="left-[-10%] md:left-[-5%] top-[15%] md:top-[20%]"
                />

                <ElegantShape
                    zIndex={-10}
                    delay={0.5}
                    width={500}
                    height={120}
                    rotate={-15}
                    gradient="from-[#8CC7A1]/[0.15]"
                    className="right-[-5%] md:right-[0%] top-[70%] md:top-[75%]"
                />

                <ElegantShape
                    zIndex={-10}
                    delay={0.4}
                    width={300}
                    height={80}
                    rotate={-8}
                    gradient="from-[#85C7F2]/[0.15]"
                    className="left-[5%] md:left-[10%] bottom-[5%] md:bottom-[10%]"
                />

                <ElegantShape
                    zIndex={-10}
                    delay={0.6}
                    width={200}
                    height={60}
                    rotate={20}
                    gradient="from-[#20A4F3]/[0.15]"
                    className="right-[15%] md:right-[20%] top-[10%] md:top-[15%]"
                />
            </div>

            {/* Main content */}
            <main className="w-full">
                {/* Hero section */}
                <div className="container mx-auto px-4 md:px-6 pt-16 md:pt-24 pb-16 md:pb-24">
                    <div className="max-w-4xl mx-auto text-center mb-12">
                        <motion.div
                            custom={0}
                            variants={fadeUpVariants}
                            initial="hidden"
                            animate="visible"
                            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FE654F]/10 border border-[#FE654F]/20 mb-8 md:mb-12"
                        >
                            <Circle className="h-2 w-2 fill-[#FE654F]" />
                            <span className="text-sm text-[#2A4747] tracking-wide font-medium">
                                Launching Soon in Los Angeles
                            </span>
                        </motion.div>

                        <motion.div
                            custom={1}
                            variants={fadeUpVariants}
                            initial="hidden"
                            animate="visible"
                        >
                            <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold mb-6 md:mb-8 tracking-tight text-[#2A4747]">
                                Stop meeting people.
                                <br />
                                Start <span className="text-[#FE654F]">making friends.</span>
                            </h1>
                        </motion.div>

                        <motion.div
                            custom={2}
                            variants={fadeUpVariants}
                            initial="hidden"
                            animate="visible"
                        >
                            <p className="text-base sm:text-lg md:text-xl text-[#2A4747]/80 mb-8 leading-relaxed font-light tracking-wide max-w-2xl mx-auto px-4">
                                Tired of surface-level networking? Join intimate events designed
                                to build genuine, lasting friendships.
                            </p>
                        </motion.div>
                    </div>

                    {/* Video Player Section */}
                    <motion.div
                        custom={3}
                        variants={fadeUpVariants}
                        initial="hidden"
                        animate="visible"
                        className="mb-12 md:mb-16"
                    >
                        <VideoPlayer src="https://videos.pexels.com/video-files/30333849/13003128_2560_1440_25fps.mp4" />
                    </motion.div>

                    {/* CTA Section */}
                    <motion.div
                        custom={4}
                        variants={fadeUpVariants}
                        initial="hidden"
                        animate="visible"
                        className="max-w-2xl mx-auto text-center"
                    >
                        <h2 className="text-3xl font-bold text-[#2A4747] mb-4">
                            Ready to find your people?
                        </h2>
                        <p className="text-lg text-[#2A4747]/80 mb-6">
                            Get exclusive early access and be the first to join the AFK
                            Friends community in LA.
                        </p>
                        <button
                            className="bg-[#FE654F] hover:opacity-80 text-white px-6 py-3 rounded-md text-lg font-medium transition-opacity cursor-pointer"
                            onClick={() => {
                                console.log('Button clicked');
                                setIsModalOpen(true);
                            }}
                            style={{
                                position: 'relative'
                            }}

                        >
                            Join the Waitlist
                        </button>

                        <BasicModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />

                    </motion.div>
                </div>
            </main >
        </div >
    );
};

export default Hero;