import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react";
import { useRef, useState } from "react";

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

export default VideoPlayer;