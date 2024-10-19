"use client";

import { toggleLanguage } from "@/lib/features/language/languageSlice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { motion } from "framer-motion";

export default function LanguageToggle() {
  const dispatch = useAppDispatch();
  const isWookiee = useAppSelector((state) => state.language.isWookiee);

  const handleToggle = () => {
    dispatch(toggleLanguage());
  };

  return (
    <div className="flex items-center justify-center">
      <motion.div
        className="relative w-16 h-8 bg-gray-700 rounded-full p-1 cursor-pointer"
        onClick={handleToggle}
        animate={{ backgroundColor: isWookiee ? "#8B4513" : "#4A5568" }}
        transition={{ duration: 0.3 }}
      >
        <motion.div
          className="absolute w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center"
          animate={{
            x: isWookiee ? "1.75rem" : "0rem",
          }}
          transition={{ type: "spring", stiffness: 700, damping: 30 }}
        >
          {isWookiee ? <ChewbaccaIcon className="w-4 h-4" /> : <RebelAllianceIcon className="w-4 h-4" />}
        </motion.div>
      </motion.div>
    </div>
  );
}

function ChewbaccaIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 100 100" fill="currentColor">
      <path d="M50 0C22.4 0 0 22.4 0 50s22.4 50 50 50 50-22.4 50-50S77.6 0 50 0zm0 90c-22.1 0-40-17.9-40-40s17.9-40 40-40 40 17.9 40 40-17.9 40-40 40z" />
      <path d="M65 35c-3.3 0-6 2.7-6 6s2.7 6 6 6 6-2.7 6-6-2.7-6-6-6zm-30 0c-3.3 0-6 2.7-6 6s2.7 6 6 6 6-2.7 6-6-2.7-6-6-6zm15 20c-8.3 0-15 6.7-15 15h30c0-8.3-6.7-15-15-15z" />
    </svg>
  );
}

function RebelAllianceIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 100 100" fill="currentColor">
      <path d="M50 0C22.4 0 0 22.4 0 50s22.4 50 50 50 50-22.4 50-50S77.6 0 50 0zm0 90c-22.1 0-40-17.9-40-40s17.9-40 40-40 40 17.9 40 40-17.9 40-40 40z" />
      <path d="M50 20L35 50l15 30 15-30z" />
      <path d="M20 50l30 15 30-15-30-15z" />
    </svg>
  );
}
