"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState, useCallback, useRef } from "react";

interface LightningBolt {
  id: number;
  x: number;
  path: string;
  width: number;
  duration: number;
  intensity: number;
}

// Generate more realistic jagged lightning path with multiple branches
const generateLightningPath = (
  startX: number,
  startY: number,
  endY: number,
  complexity = 1,
): string => {
  let path = `M${startX} ${startY}`;
  let currentX = startX;
  let currentY = startY;
  const segments = Math.floor(Math.random() * 8 + 12) * complexity;
  const segmentHeight = (endY - startY) / segments;

  for (let i = 0; i < segments; i++) {
    const offsetX = (Math.random() - 0.5) * 120 * (1 + Math.random() * 0.5);
    currentX += offsetX;
    currentY += segmentHeight + (Math.random() - 0.5) * 10;
    path += ` L${currentX} ${currentY}`;

    if (Math.random() > 0.5 && i > 1 && i < segments - 1) {
      const branchLength = Math.random() * 100 + 50;
      const branchAngle = (Math.random() - 0.5) * Math.PI * 0.8;
      const branchEndX = currentX + Math.cos(branchAngle) * branchLength;
      const branchEndY =
        currentY + Math.abs(Math.sin(branchAngle)) * branchLength * 0.5 + 30;
      path += ` M${currentX} ${currentY} L${branchEndX} ${branchEndY}`;

      if (Math.random() > 0.6) {
        const subBranchLength = Math.random() * 40 + 20;
        const subBranchAngle = branchAngle + (Math.random() - 0.5) * 0.5;
        const subBranchEndX =
          branchEndX + Math.cos(subBranchAngle) * subBranchLength;
        const subBranchEndY =
          branchEndY +
          Math.abs(Math.sin(subBranchAngle)) * subBranchLength * 0.3 +
          15;
        path += ` L${subBranchEndX} ${subBranchEndY}`;
      }

      path += ` M${currentX} ${currentY}`;
    }
  }

  return path;
};

const LightningStrike = ({
  bolt,
  onComplete,
}: {
  bolt: LightningBolt;
  onComplete: () => void;
}) => {
  return (
    <motion.svg
      className="pointer-events-none absolute top-0"
      style={{ left: `${bolt.x}%`, transform: "translateX(-50%)" }}
      width={bolt.width}
      height="100%"
      viewBox={`0 0 ${bolt.width} 800`}
      initial={{ opacity: 0 }}
      animate={{ opacity: [0, 1, 0.9, 1, 0.7, 1, 0.8, 0] }}
      exit={{ opacity: 0 }}
      transition={{ duration: bolt.duration, ease: "easeOut" }}
      onAnimationComplete={onComplete}
    >
      <defs>
        <filter
          id={`lightning-glow-${bolt.id}`}
          x="-200%"
          y="-200%"
          width="500%"
          height="500%"
        >
          <feGaussianBlur stdDeviation="15" result="blur1" />
          <feGaussianBlur stdDeviation="8" result="blur2" />
          <feGaussianBlur stdDeviation="4" result="blur3" />
          <feGaussianBlur stdDeviation="2" result="blur4" />
          <feMerge>
            <feMergeNode in="blur1" />
            <feMergeNode in="blur2" />
            <feMergeNode in="blur3" />
            <feMergeNode in="blur4" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <filter
          id={`lightning-intense-${bolt.id}`}
          x="-100%"
          y="-100%"
          width="300%"
          height="300%"
        >
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <linearGradient
          id={`lightning-gradient-${bolt.id}`}
          x1="0%"
          y1="0%"
          x2="0%"
          y2="100%"
        >
          <stop offset="0%" stopColor="hsl(200, 100%, 98%)" />
          <stop offset="30%" stopColor="hsl(200, 100%, 85%)" />
          <stop offset="60%" stopColor="hsl(210, 100%, 70%)" />
          <stop offset="100%" stopColor="hsl(220, 90%, 55%)" />
        </linearGradient>
      </defs>

      <motion.path
        d={bolt.path}
        stroke="hsl(220, 90%, 60%)"
        strokeWidth={20 * bolt.intensity}
        fill="none"
        opacity={0.2 * bolt.intensity}
        filter={`url(#lightning-glow-${bolt.id})`}
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 0.08, ease: "easeOut" }}
      />

      <motion.path
        d={bolt.path}
        stroke="hsl(210, 100%, 65%)"
        strokeWidth={14 * bolt.intensity}
        fill="none"
        opacity={0.4 * bolt.intensity}
        filter={`url(#lightning-glow-${bolt.id})`}
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 0.1, ease: "easeOut" }}
      />

      <motion.path
        d={bolt.path}
        stroke="hsl(205, 100%, 75%)"
        strokeWidth={8 * bolt.intensity}
        fill="none"
        opacity={0.6 * bolt.intensity}
        filter={`url(#lightning-intense-${bolt.id})`}
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 0.08, ease: "easeOut" }}
      />

      <motion.path
        d={bolt.path}
        stroke={`url(#lightning-gradient-${bolt.id})`}
        strokeWidth={4 * bolt.intensity}
        fill="none"
        strokeLinecap="round"
        filter={`url(#lightning-intense-${bolt.id})`}
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 0.06, ease: "easeOut" }}
      />

      <motion.path
        d={bolt.path}
        stroke="hsl(200, 100%, 98%)"
        strokeWidth={2 * bolt.intensity}
        fill="none"
        initial={{ pathLength: 0, opacity: 1 }}
        animate={{ pathLength: 1, opacity: [1, 0.9, 1, 0.8, 0] }}
        transition={{ duration: 0.15, ease: "easeOut" }}
      />

      <motion.path
        d={bolt.path}
        stroke="white"
        strokeWidth={1}
        fill="none"
        initial={{ pathLength: 0, opacity: 1 }}
        animate={{ pathLength: 1, opacity: [1, 0] }}
        transition={{ duration: 0.1, ease: "easeOut" }}
      />
    </motion.svg>
  );
};

const ThunderFlash = ({
  intensity,
  onComplete,
}: {
  intensity: number;
  onComplete: () => void;
}) => {
  useEffect(() => {
    const timer = setTimeout(onComplete, 400);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <motion.div
      className="pointer-events-none fixed inset-0 z-50"
      initial={{ opacity: 0 }}
      animate={{
        opacity: [
          0,
          intensity * 0.4,
          0,
          intensity * 0.2,
          0,
          intensity * 0.15,
          0,
        ],
      }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      style={{
        background:
          "radial-gradient(ellipse at 50% 30%, hsl(200, 100%, 95%) 0%, hsl(210, 100%, 70%, 0.5) 30%, transparent 70%)",
      }}
    />
  );
};

const LightningEffect = () => {
  const [bolts, setBolts] = useState<LightningBolt[]>([]);
  const [flashes, setFlashes] = useState<{ id: number; intensity: number }[]>(
    [],
  );
  const [flashOpacity, setFlashOpacity] = useState(0);
  const [screenShake, setScreenShake] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const createLightning = useCallback(
    (intensity = 1) => {
      // Don't create lightning if page is not visible
      if (!isVisible) return;

      const id = Date.now() + Math.random();
      const x = Math.random() * 70 + 15;
      const width = 300;
      const path = generateLightningPath(width / 2, 0, 800, intensity);

      const newBolt: LightningBolt = {
        id,
        x,
        path,
        width,
        duration: 0.2 + Math.random() * 0.15,
        intensity,
      };

      setBolts((prev) => [...prev, newBolt]);
      setFlashes((prev) => [...prev, { id, intensity }]);

      const flashIntensity = 0.25 * intensity;
      setFlashOpacity(flashIntensity);
      setTimeout(() => setFlashOpacity(flashIntensity * 0.3), 30);
      setTimeout(() => setFlashOpacity(flashIntensity * 0.6), 60);
      setTimeout(() => setFlashOpacity(flashIntensity * 0.2), 100);
      setTimeout(() => setFlashOpacity(flashIntensity * 0.4), 130);
      setTimeout(() => setFlashOpacity(0), 200);

      if (intensity > 0.7) {
        const shakeIntensity = intensity * 3;
        setScreenShake({
          x: (Math.random() - 0.5) * shakeIntensity,
          y: (Math.random() - 0.5) * shakeIntensity,
        });
        setTimeout(
          () =>
            setScreenShake({
              x: (Math.random() - 0.5) * shakeIntensity * 0.5,
              y: (Math.random() - 0.5) * shakeIntensity * 0.5,
            }),
          50,
        );
        setTimeout(() => setScreenShake({ x: 0, y: 0 }), 100);
      }
    },
    [isVisible],
  );

  const removeBolt = useCallback((id: number) => {
    setBolts((prev) => prev.filter((b) => b.id !== id));
  }, []);

  const removeFlash = useCallback((id: number) => {
    setFlashes((prev) => prev.filter((f) => f.id !== id));
  }, []);

  // Handle visibility change - clear all effects and stop creating new ones
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden) {
        setIsVisible(false);
        // Clear all existing effects when page becomes hidden
        setBolts([]);
        setFlashes([]);
        setFlashOpacity(0);
        setScreenShake({ x: 0, y: 0 });
        // Clear the interval
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
          intervalRef.current = null;
        }
      } else {
        setIsVisible(true);
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () =>
      document.removeEventListener("visibilitychange", handleVisibilityChange);
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    // Initial lightning
    const initialTimeout = setTimeout(() => {
      createLightning(1.2);
    }, 800);

    const createRandomLightning = () => {
      if (!isVisible) return;

      const mainIntensity = 0.7 + Math.random() * 0.5;
      createLightning(mainIntensity);

      if (Math.random() > 0.4) {
        setTimeout(
          () => isVisible && createLightning(0.5 + Math.random() * 0.3),
          50 + Math.random() * 100,
        );
      }
      if (Math.random() > 0.5) {
        setTimeout(
          () => isVisible && createLightning(0.6 + Math.random() * 0.4),
          80 + Math.random() * 150,
        );
      }
      if (Math.random() > 0.7) {
        setTimeout(
          () => isVisible && createLightning(0.4 + Math.random() * 0.3),
          150 + Math.random() * 200,
        );
      }
      if (Math.random() > 0.85) {
        setTimeout(
          () => isVisible && createLightning(1.3),
          200 + Math.random() * 100,
        );
      }
    };

    intervalRef.current = setInterval(
      () => {
        if (Math.random() > 0.2 && isVisible) {
          createRandomLightning();
        }
      },
      1500 + Math.random() * 1500,
    );

    return () => {
      clearTimeout(initialTimeout);
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [createLightning, isVisible]);

  return (
    <div
      ref={containerRef}
      className="pointer-events-none absolute inset-0 overflow-hidden"
      style={{
        transform: `translate(${screenShake.x}px, ${screenShake.y}px)`,
        transition: "transform 0.05s ease-out",
      }}
    >
      <AnimatePresence>
        {flashes.map((flash) => (
          <ThunderFlash
            key={flash.id}
            intensity={flash.intensity}
            onComplete={() => removeFlash(flash.id)}
          />
        ))}
      </AnimatePresence>

      <motion.div
        className="absolute inset-0"
        animate={{ opacity: flashOpacity }}
        transition={{ duration: 0.05 }}
        style={{
          background:
            "radial-gradient(ellipse at 50% 20%, hsl(200, 100%, 90%, 0.8) 0%, hsl(210, 100%, 60%, 0.4) 40%, transparent 70%)",
        }}
      />

      <div
        className="absolute top-0 right-0 left-0 h-60 opacity-50"
        style={{
          background:
            "linear-gradient(180deg, hsl(215, 90%, 35%, 0.6) 0%, hsl(220, 80%, 20%, 0.3) 50%, transparent 100%)",
        }}
      />

      <motion.div
        className="absolute top-0 right-0 left-0 h-80"
        animate={{
          opacity: [0.3, 0.4, 0.3, 0.45, 0.35],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          repeatType: "reverse",
        }}
        style={{
          background:
            "radial-gradient(ellipse at 30% -20%, hsl(220, 60%, 25%, 0.5) 0%, transparent 60%), radial-gradient(ellipse at 70% -10%, hsl(215, 50%, 20%, 0.4) 0%, transparent 50%)",
        }}
      />

      <AnimatePresence>
        {bolts.map((bolt) => (
          <LightningStrike
            key={bolt.id}
            bolt={bolt}
            onComplete={() => removeBolt(bolt.id)}
          />
        ))}
      </AnimatePresence>

      <motion.div
        className="absolute inset-0"
        animate={{
          opacity: [0, 0.05, 0, 0.03, 0, 0.08, 0, 0.02, 0],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          repeatType: "loop",
        }}
        style={{
          background:
            "radial-gradient(ellipse at 25% 0%, hsl(210, 100%, 70%, 0.5) 0%, transparent 45%)",
        }}
      />

      <motion.div
        className="absolute inset-0"
        animate={{
          opacity: [0, 0.06, 0, 0.04, 0, 0.07, 0],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          repeatType: "loop",
          delay: 2,
        }}
        style={{
          background:
            "radial-gradient(ellipse at 75% 0%, hsl(205, 100%, 65%, 0.5) 0%, transparent 45%)",
        }}
      />

      <motion.div
        className="absolute inset-0"
        animate={{
          opacity: [0, 0.04, 0, 0.06, 0],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          repeatType: "loop",
          delay: 1,
        }}
        style={{
          background:
            "radial-gradient(ellipse at 50% 10%, hsl(200, 100%, 80%, 0.4) 0%, transparent 40%)",
        }}
      />
    </div>
  );
};

export default LightningEffect;
