import { motion } from "framer-motion";

export const ViewEnterAnimation = ({ children, duration = 0.5 }) => {
  return <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration }}
  >{children}</motion.div>;
};