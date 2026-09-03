import React, { useEffect, useRef } from 'react';
import { useTheme } from '../../context/ThemeContext';

export default function ComplianceShield3D({ size = 280, className = '' }) {
  const canvasRef = useRef(null);
  const { isDark } = useTheme();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    canvas.width = size * 2;
    canvas.height = size * 2;

    let angle = 0;
    const cx = size;
    const cy = size;

    const render = () => {
      angle += 0.015;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.save();
      ctx.scale(2, 2);

      // Blue Palette Rings
      const bluePrimary = isDark ? '#FF3333' : '#DD2A40';
      const blueLight = isDark ? '#E4E7EC' : '#DD2A40';

      ctx.beginPath();
      ctx.arc(cx, cy, 95, 0, Math.PI * 2);
      ctx.strokeStyle = isDark ? 'rgba(255, 51, 51, 0.3)' : 'rgba(221, 42, 64, 0.25)';
      ctx.lineWidth = 2;
      ctx.stroke();

      for (let i = 0; i < 6; i++) {
        const theta = angle + (i * Math.PI) / 3;
        const ox = cx + Math.cos(theta) * 95;
        const oy = cy + Math.sin(theta) * 95;

        ctx.beginPath();
        ctx.arc(ox, oy, i % 2 === 0 ? 3.5 : 2, 0, Math.PI * 2);
        ctx.fillStyle = bluePrimary;
        ctx.fill();
      }

      const tilt = Math.sin(angle * 1.5) * 6;
      ctx.beginPath();
      ctx.moveTo(cx, cy - 65 + tilt);
      ctx.bezierCurveTo(cx + 55, cy - 60 + tilt, cx + 60, cy + 10, cx, cy + 65 - tilt);
      ctx.bezierCurveTo(cx - 60, cy + 10, cx - 55, cy - 60 + tilt, cx, cy - 65 + tilt);
      ctx.closePath();

      const grad = ctx.createLinearGradient(cx - 50, cy - 50, cx + 50, cy + 50);
      grad.addColorStop(0, isDark ? 'rgba(221, 42, 64, 0.95)' : 'rgba(249, 251, 255, 0.95)');
      grad.addColorStop(1, isDark ? 'rgba(18, 6, 8, 0.9)' : 'rgba(255, 241, 242, 0.95)');
      ctx.fillStyle = grad;
      ctx.fill();

      ctx.strokeStyle = bluePrimary;
      ctx.lineWidth = 3;
      ctx.stroke();

      // Checkmark in Center
      ctx.beginPath();
      ctx.moveTo(cx - 18, cy);
      ctx.lineTo(cx - 5, cy + 15);
      ctx.lineTo(cx + 20, cy - 15);
      ctx.strokeStyle = isDark ? '#E4E7EC' : '#DD2A40';
      ctx.lineWidth = 4;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      ctx.stroke();

      ctx.restore();
      animationFrameId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animationFrameId);
  }, [isDark, size]);

  return (
    <div className={'relative flex items-center justify-center ' + className}>
      <canvas
        ref={canvasRef}
        style={{ width: size, height: size }}
        className="filter drop-shadow-2xl"
      />
    </div>
  );
}
