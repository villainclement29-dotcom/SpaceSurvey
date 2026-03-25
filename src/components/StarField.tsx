"use client";

import { useEffect, useRef, useState } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import type { ISourceOptions } from "@tsparticles/engine";

const OPTIONS: ISourceOptions = {
  fullScreen: { enable: false },
  background: { color: "transparent" },
  fpsLimit: 60,
  particles: {
    number: {
      value: 200,
      density: { enable: true },
    },
    color: {
      value: ["#f1dac4", "#e8d0b0", "#ffffff", "#d4c4b0"],
    },
    shape: { type: "circle" },
    opacity: {
      value: { min: 0.1, max: 1.0 },
      animation: {
        enable: true,
        speed: 0.8,
        sync: false,
      },
    },
    size: {
      value: { min: 0.5, max: 2.5 },
      animation: {
        enable: true,
        speed: 0.4,
        sync: false,
      },
    },
    move: {
      enable: true,
      speed: 0.12,
      direction: "none",
      random: true,
      straight: false,
      outModes: { default: "out" },
    },
  },
  interactivity: {
    events: {
      onHover: { enable: true, mode: "grab" },
    },
    modes: {
      grab: {
        distance: 120,
        links: { opacity: 0.12, color: "#f1dac4" },
      },
    },
  },
  detectRetina: true,
};

export default function StarField() {
  const [ready, setReady] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => setReady(true));
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (wrapperRef.current) {
        const offset = window.scrollY * 0.25;
        wrapperRef.current.style.transform = `translateY(-${offset}px)`;
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!ready) return null;

  return (
    <div
      ref={wrapperRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        zIndex: -1,
        willChange: "transform",
      }}
    >
      <Particles
        id="tsparticles"
        options={OPTIONS}
        style={{ width: "100%", height: "100%" }}
      />
    </div>
  );
}
