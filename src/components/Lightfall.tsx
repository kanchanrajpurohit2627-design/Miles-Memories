/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useRef } from 'react';

interface LightParticle {
  x: number;
  y: number;
  length: number;
  speed: number;
  opacity: number;
  width: number;
}

interface LightfallProps {
  count?: number;
  speed?: number;
  color?: string; // CSS color string or RGB style, e.g. "14, 165, 233" or "56, 189, 248"
  maxOpacity?: number;
  maxWidth?: number;
  minLength?: number;
  maxLength?: number;
}

export default function Lightfall({
  count = 45,
  speed = 1.8,
  color = '56, 189, 248', // Tailwind sky-400 equivalent RGB
  maxOpacity = 0.5,
  maxWidth = 1.5,
  minLength = 40,
  maxLength = 120,
}: LightfallProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let particles: LightParticle[] = [];

    // Setup canvas sizing
    const resizeCanvas = () => {
      const rect = canvas.parentElement?.getBoundingClientRect();
      canvas.width = rect?.width || window.innerWidth;
      canvas.height = rect?.height || 500;
      initParticles();
    };

    // Initialize particles
    const initParticles = () => {
      particles = [];
      for (let i = 0; i < count; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height - canvas.height, // Starts somewhere above/inside
          length: minLength + Math.random() * (maxLength - minLength),
          speed: (0.5 + Math.random() * 1.5) * speed,
          opacity: 0.1 + Math.random() * (maxOpacity - 0.1),
          width: 0.5 + Math.random() * (maxWidth - 0.5),
        });
      }
    };

    // Listen for resize
    const resizeObserver = new ResizeObserver(() => {
      resizeCanvas();
    });
    
    if (canvas.parentElement) {
      resizeObserver.observe(canvas.parentElement);
    }

    resizeCanvas();

    // Loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((p) => {
        // Move particle
        p.y += p.speed;

        // Reset if goes off-screen
        if (p.y > canvas.height) {
          p.y = -p.length;
          p.x = Math.random() * canvas.width;
          p.length = minLength + Math.random() * (maxLength - minLength);
          p.speed = (0.5 + Math.random() * 1.5) * speed;
          p.opacity = 0.1 + Math.random() * (maxOpacity - 0.1);
        }

        // Draw elegant gradient stream
        const gradient = ctx.createLinearGradient(p.x, p.y, p.x, p.y + p.length);
        gradient.addColorStop(0, `rgba(${color}, 0)`); // Tail fades out
        gradient.addColorStop(0.7, `rgba(${color}, ${p.opacity})`); // Glowing body
        gradient.addColorStop(1, `rgba(255, 255, 255, ${p.opacity * 1.3})`); // Bright leading tip

        ctx.beginPath();
        ctx.strokeStyle = gradient;
        ctx.lineWidth = p.width;
        ctx.lineCap = 'round';
        ctx.moveTo(p.x, p.y);
        ctx.lineTo(p.x, p.y + p.length);
        ctx.stroke();
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      resizeObserver.disconnect();
    };
  }, [count, speed, color, maxOpacity, maxWidth, minLength, maxLength]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none select-none z-0"
      id="lightfall-background-canvas"
    />
  );
}
