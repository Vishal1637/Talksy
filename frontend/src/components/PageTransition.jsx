import { AnimatePresence } from "framer-motion";
import { useLocation } from "react-router";

const PageTransition = ({ children }) => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait" initial={false}>
      <div
        key={location.pathname}
        className="w-full h-full"
      >
        {children}
      </div>
    </AnimatePresence>
  );
};

export default PageTransition;
