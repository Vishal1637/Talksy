import { useEffect, useState } from "react";
import Confetti from "react-confetti";
import { AnimatePresence } from "framer-motion";

const ConfettiCelebration = ({ trigger, onComplete }) => {
  const [showConfetti, setShowConfetti] = useState(false);
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (trigger) {
      setShowConfetti(true);
      const timer = setTimeout(() => {
        setShowConfetti(false);
        onComplete?.();
      }, 4000); // Show confetti for 4 seconds

      return () => clearTimeout(timer);
    }
  }, [trigger, onComplete]);

  return (
    <AnimatePresence>
      {showConfetti && (
        <div className="fixed inset-0 pointer-events-none z-50">
          <Confetti
            width={windowSize.width}
            height={windowSize.height}
            recycle={false}
            numberOfPieces={200}
            gravity={0.1}
            colors={["#9333ea", "#ec4899", "#3b82f6", "#10b981", "#f59e0b", "#ef4444"]}
            tweenDuration={4000}
          />

          {/* Success message overlay */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <div className="bg-base-100/90 backdrop-blur-lg rounded-2xl p-6 shadow-2xl border border-primary/20">
              <div className="text-center">
                <div className="text-6xl mb-4">🎉</div>
                <h3 className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                  Success!
                </h3>
                <p className="text-base-content/70 mt-2">Action completed successfully!</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default ConfettiCelebration;
