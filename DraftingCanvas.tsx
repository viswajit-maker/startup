import React, { useRef, useEffect } from 'react';
import { useReducedMotion } from 'motion/react';

// Types
type Point = { x: number; y: number; age: number; colorStr: string };
type Ping = { x: number; y: number; radius: number; maxRadius: number; age: number; color: string; maxAge: number };
type Dimension = { x: number; y: number; angle: number; age: number; label: string };

export default function DraftingCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const shouldReduceMotion = useReducedMotion();
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let points: Point[] = [];
    let pings: Ping[] = [];
    let dimensions: Dimension[] = [];
    
    const dpr = window.devicePixelRatio || 1;
    
    // Handle resize
    const resizeCanvas = () => {
      const { innerWidth, innerHeight } = window;
      canvas.width = innerWidth * dpr;
      canvas.height = innerHeight * dpr;
      canvas.style.width = `${innerWidth}px`;
      canvas.style.height = `${innerHeight}px`;
      ctx.scale(dpr, dpr);
    };
    
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    // Interaction state
    let lastX = -1;
    let lastY = -1;
    let lastTime = 0;
    let distanceSinceLastDim = 0;

    const addPoint = (x: number, y: number) => {
      if (shouldReduceMotion) return;
      const now = performance.now();
      let colorStr = '61, 107, 158'; // Default blue

      if (lastX !== -1 && lastY !== -1) {
        const dx = x - lastX;
        const dy = y - lastY;
        const dist = Math.sqrt(dx * dx + dy * dy);
        distanceSinceLastDim += dist;
        
        const dt = Math.max(now - lastTime, 1);
        const speed = dist / dt;

        if (speed > 2.5) {
          colorStr = '196, 61, 61'; // red for fast
        } else if (speed > 0.8) {
          colorStr = '217, 108, 63'; // orange for medium
        }

        // Occasional dimension mark
        if (distanceSinceLastDim > 250 && Math.random() > 0.3) {
          distanceSinceLastDim = 0;
          dimensions.push({
            x, y,
            angle: Math.atan2(dy, dx),
            age: 0,
            label: (Math.random() * 8 + 2).toFixed(2) + 'cm'
          });
        }
      }

      points.push({ x, y, age: 0, colorStr });
      lastX = x;
      lastY = y;
      lastTime = now;
    };

    const handlePointerMove = (e: PointerEvent) => {
      // Respond to mouse or touch drag
      addPoint(e.clientX, e.clientY);
    };
    
    const handlePointerLeave = () => {
      lastX = -1;
      lastY = -1;
    };

    const handleClick = (e: MouseEvent) => {
      if (shouldReduceMotion) return;
      
      pings.push({
        x: e.clientX,
        y: e.clientY,
        radius: 0,
        maxRadius: 35 + Math.random() * 25,
        age: 0,
        color: '196, 61, 61', // only red for click ping
        maxAge: 45 // shorter frames, roughly ~750ms at 60fps
      });
      
      // Add dimension ticks at the ping
      dimensions.push({
        x: e.clientX + 30, 
        y: e.clientY - 20,
        angle: 0,
        age: 0,
        label: 'REF: ' + Math.floor(Math.random() * 999)
      });
    };

    window.addEventListener('pointermove', handlePointerMove);
    window.addEventListener('pointerleave', handlePointerLeave);
    window.addEventListener('pointerup', handlePointerLeave);
    window.addEventListener('click', handleClick);

    const drawGrid = () => {
      const gridSize = 40;
      // Faint blueprint grid tinted with --color-blue (RGB: 61, 107, 158)
      ctx.strokeStyle = 'rgba(61, 107, 158, 0.08)';
      ctx.lineWidth = 1;
      
      const w = canvas.width / dpr;
      const h = canvas.height / dpr;

      ctx.beginPath();
      for (let x = 0; x <= w; x += gridSize) {
        ctx.moveTo(x, 0);
        ctx.lineTo(x, h);
      }
      for (let y = 0; y <= h; y += gridSize) {
        ctx.moveTo(0, y);
        ctx.lineTo(w, y);
      }
      ctx.stroke();
    };

    const render = () => {
      const w = canvas.width / dpr;
      const h = canvas.height / dpr;
      
      ctx.clearRect(0, 0, w, h);
      
      drawGrid();

      if (!shouldReduceMotion) {
        // Draw trailing points
        if (points.length > 1) {
          ctx.lineCap = 'round';
          ctx.lineJoin = 'round';
          
          for (let i = 0; i < points.length - 1; i++) {
            const p1 = points[i];
            const p2 = points[i + 1];
            
            const maxAge = 90; // ~1.5s fade
            if (p1.age < maxAge) {
              const alpha = (1 - p1.age / maxAge) * 0.45; 
              ctx.strokeStyle = `rgba(${p2.colorStr}, ${alpha})`;
              ctx.lineWidth = 1.5;
              ctx.beginPath();
              ctx.moveTo(p1.x, p1.y);
              ctx.lineTo(p2.x, p2.y);
              ctx.stroke();
            }
          }
        }

        // Update point ages
        points.forEach(p => p.age++);
        points = points.filter(p => p.age < 90);

        // Draw dimension lines
        dimensions.forEach(dim => {
          if (dim.age < 120) {
            const alpha = (1 - dim.age / 120) * 0.6;
            ctx.save();
            ctx.translate(dim.x, dim.y);
            ctx.rotate(dim.angle);
            
            // --color-ink: #1C2321 (RGB: 28, 35, 33)
            ctx.strokeStyle = `rgba(28, 35, 33, ${alpha})`;
            ctx.fillStyle = `rgba(28, 35, 33, ${alpha})`;
            ctx.lineWidth = 1;
            
            // Draw dimension baseline
            ctx.beginPath();
            ctx.moveTo(-25, -15);
            ctx.lineTo(25, -15);
            ctx.stroke();
            
            // Draw ticks at ends
            ctx.beginPath();
            ctx.moveTo(-25, -20);
            ctx.lineTo(-25, -10);
            ctx.moveTo(25, -20);
            ctx.lineTo(25, -10);
            ctx.stroke();
            
            // Label
            ctx.font = '11px Inter, sans-serif';
            ctx.textAlign = 'center';
            ctx.fillText(dim.label, 0, -22);
            
            ctx.restore();
          }
          dim.age++;
        });
        dimensions = dimensions.filter(dim => dim.age < 120);

        // Draw measurement pings
        pings.forEach(ping => {
          if (ping.age < ping.maxAge) {
            const progress = ping.age / ping.maxAge;
            // easeOutQuad
            const easeProgress = 1 - (1 - progress) * (1 - progress);
            
            ping.radius = ping.maxRadius * easeProgress;
            const alpha = (1 - progress) * 0.7;
            
            ctx.beginPath();
            ctx.arc(ping.x, ping.y, ping.radius, 0, Math.PI * 2);
            ctx.strokeStyle = `rgba(${ping.color}, ${alpha})`;
            ctx.lineWidth = 1.5;
            ctx.stroke();
            
            // Central crosshair
            ctx.beginPath();
            const cs = 6; // cross size
            ctx.moveTo(ping.x - cs, ping.y);
            ctx.lineTo(ping.x + cs, ping.y);
            ctx.moveTo(ping.x, ping.y - cs);
            ctx.lineTo(ping.x, ping.y + cs);
            ctx.strokeStyle = `rgba(28, 35, 33, ${alpha * 0.6})`;
            ctx.lineWidth = 1;
            ctx.stroke();
          }
          ping.age++;
        });
        pings = pings.filter(ping => ping.age < ping.maxAge);
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerleave', handlePointerLeave);
      window.removeEventListener('pointerup', handlePointerLeave);
      window.removeEventListener('click', handleClick);
      cancelAnimationFrame(animationFrameId);
    };
  }, [shouldReduceMotion]);

  return (
    <canvas 
      ref={canvasRef}
      className="block w-full h-full"
      style={{ touchAction: 'none' }}
    />
  );
}
