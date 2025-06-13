"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { Easing, motion } from "framer-motion";
import {
  ArrowRight,
  Brain,
  CheckCircle,
  Circle,
  Mail,
  MessageCircle,
  Target,
  Users,
  X,
} from "lucide-react";
import React, { useRef, useState } from "react";

// Custom shape component for visual interest
function ElegantShape({
  className,
  delay = 0,
  width = 400,
  height = 100,
  rotate = 0,
  gradient = "from-white/[0.08]",
  zIndex,
}: {
  className?: string;
  delay?: number;
  width?: number;
  height?: number;
  rotate?: number;
  gradient?: string;
  zIndex?: number;
}) {
  return (
    <motion.div
      initial={{
        opacity: 0,
        y: -150,
        rotate: rotate - 15,
      }}
      animate={{
        opacity: 1,
        y: 0,
        rotate: rotate,
      }}
      transition={{
        duration: 2.4,
        delay,
        ease: [0.23, 0.86, 0.39, 0.96],
        opacity: { duration: 1.2 },
      }}
      className={cn("absolute", className)}
      style={{ zIndex }}
    >
      <motion.div
        animate={{
          y: [0, 15, 0],
        }}
        transition={{
          duration: 12,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
        style={{
          width,
          height,
        }}
        className="relative"
      >
        <div
          className={cn(
            "absolute inset-0 rounded-full",
            "bg-gradient-to-r to-transparent",
            gradient,
            "backdrop-blur-[2px] border-2 border-white/[0.15]",
            "shadow-[0_8px_32px_0_rgba(255,255,255,0.1)]",
            "after:absolute after:inset-0 after:rounded-full",
            "after:bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.2),transparent_70%)]"
          )}
        />
      </motion.div>
    </motion.div>
  );
}

// Video player component
const VideoPlayer = ({ src }: { src: string }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <motion.div
      className="relative w-full max-w-4xl mx-auto rounded-xl overflow-hidden shadow-[0_0_20px_rgba(0,0,0,0.2)]"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <video
        ref={videoRef}
        className="w-full cursor-pointer"
        onClick={togglePlay}
        src={src}
        poster="/video-poster.jpg" // Replace with your actual poster image
        loop
        muted
        playsInline
      />
      <div className="absolute inset-0 flex items-center justify-center bg-black/20 transition-opacity duration-300 opacity-100 hover:opacity-0">
        {!isPlaying && (
          <Button
            onClick={togglePlay}
            className="bg-[#FE654F] hover:bg-[#FE654F]/90 text-white rounded-full w-20 h-20 flex items-center justify-center"
          >
            <ArrowRight className="h-8 w-8" />
          </Button>
        )}
      </div>
    </motion.div>
  );
};

const EmailForm = ({ onSubmitted }: { onSubmitted?: () => void }) => {
  const [email, setEmail] = useState("");
  const [location, setLocation] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  const laCountyCities = [
    "Los Angeles",
    "San Francisco Bay Area",
    "New York City",
    "Chicago",
    "Seattle",
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setMessage("");

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));

    if (email && location) {
      // Simulate success
      setStatus("success");
      setMessage("You're on the list! Check your email for a confirmation.");
      if (onSubmitted) {
        setTimeout(onSubmitted, 2000); // Close modal after 2 seconds
      }
    } else {
      // Simulate error
      setStatus("error");
      setMessage("Please fill out all fields.");
    }
  };

  if (status === "success") {
    return (
      <div className="text-center p-4 rounded-lg bg-[#8CC7A1]/20 text-[#2A4747]">
        <CheckCircle className="mx-auto h-12 w-12 text-[#8CC7A1]" />
        <h3 className="mt-2 text-xl font-semibold">Success!</h3>
        <p>{message}</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-semibold text-[#2A4747] text-center">
        Join the Waitlist
      </h2>
      <p className="text-[#2A4747]/70 text-center">
        Be the first to know when we launch in LA.
      </p>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="relative">
          <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#2A4747]/40 h-5 w-5" />
          <Input
            type="email"
            placeholder="Enter your email"
            className="pl-10 border-[#2A4747]/20 focus-visible:ring-[#20A4F3]"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <select
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            required
            className="flex h-10 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <option value="" disabled>
              Select your city
            </option>
            {laCountyCities.map((city) => (
              <option key={city} value={city}>
                {city}
              </option>
            ))}
            <option value="Other">Other</option>
          </select>
        </div>
        <Button
          type="submit"
          className="w-full bg-[#FE654F] hover:bg-[#FE654F]/90 text-white"
          disabled={status === "loading"}
        >
          {status === "loading" ? "Joining..." : "Join the Waitlist"}
        </Button>
        {status === "error" && (
          <p className="text-sm text-red-500">{message}</p>
        )}
        <p className="text-xs text-center text-gray-500 pt-2">
          By joining, you agree to our{" "}
          <a href="#" className="underline">
            Terms
          </a>{" "}
          &{" "}
          <a href="#" className="underline">
            Privacy Policy
          </a>
          .
        </p>
      </form>
    </div>
  );
};

const HowWeDifferSection = () => {
  const differences = [
    {
      icon: <Users size={32} className="text-[#20A4F3]" />,
      title: "Small Groups Only",
      description: "Max 25 people per event - real conversations, not crowds",
    },
    {
      icon: <Brain size={32} className="text-[#20A4F3]" />,
      title: "AI Friendship Coach",
      description: "Get personalized tips for messaging and event planning",
    },
    {
      icon: <Target size={32} className="text-[#20A4F3]" />,
      title: "Relationship Tracking",
      description: "Build lasting connections with our network management tools",
    },
    {
      icon: <MessageCircle size={32} className="text-[#20A4F3]" />,
      title: "Integrated Messaging",
      description: "No need to switch apps - everything in one place",
    },
  ];

  return (
    <section className="w-full py-16 md:py-24 bg-white border-t border-gray-200">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-[#2A4747]">
          How We're Different
        </h2>
        <p className="text-lg md:text-xl text-[#2A4747]/80 max-w-3xl mx-auto mb-12">
          Unlike Meetup or Eventbrite, we're designed specifically to help you
          build genuine, lasting friendships.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {differences.map((item, index) => (
            <div key={index} className="flex flex-col items-center">
              <div className="w-20 h-20 mb-4 rounded-full flex items-center justify-center bg-[#85C7F2]/20">
                {item.icon}
              </div>
              <h3 className="text-xl font-semibold text-[#2A4747] mb-2">
                {item.title}
              </h3>
              <p className="text-[#2A4747]/70">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Main landing page component
const LandingPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const fadeUpVariants = {
    hidden: { opacity: 0, y: 30 },
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

  return (
    <div className="relative isolate min-h-screen w-full flex flex-col items-center justify-start overflow-hidden bg-[#F5F3F0]">
      {/* Background shapes */}
      <div className="absolute inset-0 overflow-hidden">
        <ElegantShape
          zIndex={-10}
          delay={0.3}
          width={600}
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
              className="bg-[#FE654F] hover:bg-[#FE654F]/90 text-white px-6 py-3 rounded-md text-lg font-medium transition-colors"
              onClick={() => setIsModalOpen(true)}
            >
              Join the Waitlist
            </button>
          </motion.div>
        </div>

        {/* How We're Different Section */}
        <HowWeDifferSection />

        {/* Footer */}
        <footer className="w-full py-8 bg-[#2A4747] text-white">
          <div className="container mx-auto px-4 text-center">
            <p className="text-sm opacity-80">
              © {new Date().getFullYear()} AFK Friends. All rights reserved.
            </p>
            <div className="mt-2 space-x-4 text-sm opacity-60">
              <a href="#" className="hover:underline">
                Privacy Policy
              </a>
              <a href="#" className="hover:underline">
                Terms of Service
              </a>
            </div>
          </div>
        </footer>
      </main>

      {/* Basic Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setIsModalOpen(false)}
          />

          {/* Modal Content */}
          <div className="relative bg-white rounded-lg shadow-xl max-w-md w-full mx-4 p-6">
            {/* Close Button */}
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
            >
              <X className="h-5 w-5" />
            </button>

            {/* Form */}
            <EmailForm onSubmitted={() => setIsModalOpen(false)} />
          </div>
        </div>
      )}
    </div>
  );
};

export default LandingPage;