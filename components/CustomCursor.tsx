'use client';

import React, { useEffect, useState } from 'react';
import { motion, useMotionValue } from 'framer-motion';

export default function CustomCursor() {
  const [isMounted, setIsMounted] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isPointer, setIsPointer] = useState(false);
  
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  useEffect(() => {
    // Small delay to avoid synchronous state update in effect
    const timer = setTimeout(() => {
      setIsMounted(true);
    }, 0);
    document.documentElement.classList.add('custom-cursor-active');
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!isMounted) return;

    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      
      if (!isVisible) setIsVisible(true);
      
      const target = e.target as HTMLElement;
      if (target) {
        const isClickable = 
          window.getComputedStyle(target).cursor === 'pointer' || 
          target.tagName === 'A' || 
          target.tagName === 'BUTTON' ||
          target.closest('button') || 
          target.closest('a');
        
        setIsPointer(!!isClickable);
      }
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener('mousemove', moveCursor);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, [cursorX, cursorY, isVisible, isMounted]);

  if (!isMounted) return null;

  return (
    <motion.div
      className="fixed top-0 left-0 w-4 h-4 bg-white border-2 border-black rounded-full pointer-events-none z-[9999]"
      style={{
        x: cursorX,
        y: cursorY,
        translateX: "-50%",
        translateY: "-50%",
        opacity: isVisible ? 1 : 0,
      }}
      animate={{ 
        scale: isPointer ? 1.5 : 1,
      }}
      transition={{ 
        scale: { type: "spring", damping: 30, stiffness: 800 },
        opacity: { duration: 0.15 }
      }}
    />
  );
}
