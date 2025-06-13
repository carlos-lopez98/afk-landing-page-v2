import { X } from "lucide-react";
import { motion, AnimatePresence } from 'framer-motion'
import EmailForm from "@/components/EmailForm";

function BasicModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
    if (!isOpen) return null; // don't render anything if not open

    return (
        <AnimatePresence>

            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center">
                    {/* Backdrop - no animation */}
                    <div className="absolute inset-0 bg-black/50" onClick={onClose} />

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 20 }}
                        transition={{ duration: .65, ease: [0.2, 0.4, 0.25, 1] }}
                        className="fixed inset-0 z-50 flex items-center justify-center"
                    >

                        {/* Modal Content */}
                        <div className="relative bg-white rounded-lg shadow-xl max-w-md w-full mx-4 p-6 z-10">
                            {/* Close Button */}
                            <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600">
                                <X className="h-5 w-5" />
                            </button>

                            {/* Form */}
                            <EmailForm onSubmitted={onClose} />
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}

export default BasicModal;
