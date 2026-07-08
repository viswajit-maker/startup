import React, { useRef, useState, useEffect } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { MousePointerClick } from 'lucide-react';

type Line = {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  color: string;
  lengthLabel: string;
};

export default function DraftingToolPanel() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();
  
  const [lines, setLines] = useState<Line[]>([]);
  const [isDrawing, setIsDrawing] = useState(false);
  const [currentLine, setCurrentLine] = useState<Line | null>(null);

  const colors = [
    '#3D6B9E', // blue
    '#D96C3F', // orange
    '#C43D3D', // red
  ];

  const handlePointerDown = (e: React.PointerEvent<HTMLCanvasElement>) => {
    e.currentTarget.setPointerCapture(e.pointerId);
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    setIsDrawing(true);
    setCurrentLine({
      x1: x,
      y1: y,
      x2: x,
      y2: y,
      color: colors[Math.floor(Math.random() * colors.length)],
      lengthLabel: ''
    });
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!isDrawing || !currentLine) return;
    
    const rect = e.currentTarget.getBoundingClientRect();
    const currentX = e.clientX - rect.left;
    const currentY = e.clientY - rect.top;
    
    // Magnetic Snap
    const dx = currentX - currentLine.x1;
    const dy = currentY - currentLine.y1;
    let angle = Math.atan2(dy, dx);
    const dist = Math.sqrt(dx * dx + dy * dy);
    
    // Snap to 45 degree increments if within 10 degrees
    const snapAngle = Math.PI / 4;
    const tolerance = (10 * Math.PI) / 180;
    
    const snappedAngle = Math.round(angle / snapAngle) * snapAngle;
    if (Math.abs(angle - snappedAngle) < tolerance) {
      angle = snappedAngle;
    }
    
    const x2 = currentLine.x1 + Math.cos(angle) * dist;
    const y2 = currentLine.y1 + Math.sin(angle) * dist;
    
    setCurrentLine({
      ...currentLine,
      x2,
      y2,
      lengthLabel: `${Math.round(dist)} units`
    });
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!isDrawing || !currentLine) return;
    e.currentTarget.releasePointerCapture(e.pointerId);
    setIsDrawing(false);
    
    const dx = currentLine.x2 - currentLine.x1;
    const dy = currentLine.y2 - currentLine.y1;
    const dist = Math.sqrt(dx * dx + dy * dy);
    
    if (dist > 5) {
      setLines([...lines, currentLine]);
    }
    setCurrentLine(null);
  };

  // Canvas drawing effect
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    const dpr = window.devicePixelRatio || 1;
    
    // Set actual canvas resolution based on container
    if (containerRef.current) {
      const { clientWidth, clientHeight } = containerRef.current;
      canvas.width = clientWidth * dpr;
      canvas.height = clientHeight * dpr;
      ctx.scale(dpr, dpr);
    }
    
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Draw grid background for the tool
    const gridSize = 20;
    ctx.strokeStyle = 'rgba(221, 216, 204, 0.3)'; // --color-line
    ctx.lineWidth = 1;
    ctx.beginPath();
    for (let x = 0; x <= canvas.width / dpr; x += gridSize) {
      ctx.moveTo(x, 0);
      ctx.lineTo(x, canvas.height / dpr);
    }
    for (let y = 0; y <= canvas.height / dpr; y += gridSize) {
      ctx.moveTo(0, y);
      ctx.lineTo(canvas.width / dpr, y);
    }
    ctx.stroke();

    // Helper to draw a line with dimension label
    const drawLineWithLabel = (l: Line, isCurrent: boolean) => {
      ctx.beginPath();
      ctx.strokeStyle = l.color;
      ctx.lineWidth = 2.5;
      ctx.lineCap = 'round';
      ctx.moveTo(l.x1, l.y1);
      ctx.lineTo(l.x2, l.y2);
      ctx.stroke();
      
      const dx = l.x2 - l.x1;
      const dy = l.y2 - l.y1;
      const dist = Math.sqrt(dx * dx + dy * dy);
      
      if (dist > 30) {
        ctx.save();
        const midX = (l.x1 + l.x2) / 2;
        const midY = (l.y1 + l.y2) / 2;
        let angle = Math.atan2(dy, dx);
        
        // Keep text upright
        if (angle > Math.PI / 2 || angle < -Math.PI / 2) {
          angle += Math.PI;
        }
        
        ctx.translate(midX, midY);
        ctx.rotate(angle);
        
        // Draw dimension background
        ctx.fillStyle = 'var(--color-surface)';
        const textWidth = ctx.measureText(l.lengthLabel).width;
        ctx.fillRect(-textWidth/2 - 4, -18, textWidth + 8, 14);
        
        // Draw text
        ctx.fillStyle = 'var(--color-ink)';
        ctx.font = '500 10px Inter, sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText(l.lengthLabel, 0, -8);
        
        ctx.restore();
      }
    };
    
    lines.forEach(l => drawLineWithLabel(l, false));
    if (currentLine) {
      drawLineWithLabel(currentLine, true);
    }
    
  }, [lines, currentLine]);

  return (
    <div className="flex flex-col items-start space-y-3">
      <div className="flex items-center space-x-2 text-[var(--color-ink)] opacity-70">
        <motion.div
          animate={shouldReduceMotion ? {} : { y: [0, -3, 0] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
        >
          <MousePointerClick size={16} />
        </motion.div>
        <span className="font-mono text-[var(--text-caption)] font-medium uppercase tracking-wider">
          Try our drafting tool
        </span>
      </div>
      
      <div 
        ref={containerRef}
        className="relative w-full max-w-[320px] h-[320px] sm:max-w-[400px] sm:h-[400px] bg-[var(--color-surface)] border border-[var(--color-line)] shadow-sm touch-none"
      >
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full cursor-crosshair"
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerLeave={handlePointerUp}
          style={{ width: '100%', height: '100%' }}
        />
        
        {/* Clear Button */}
        {lines.length > 0 && (
          <button 
            onClick={() => setLines([])}
            className="absolute bottom-3 right-3 bg-[var(--color-surface)] border border-[var(--color-line)] text-[var(--color-ink)] px-3 py-1 text-xs font-mono font-medium transition-colors z-10 hover:bg-[var(--color-base)]"
          >
            CLEAR
          </button>
        )}
      </div>
    </div>
  );
}
