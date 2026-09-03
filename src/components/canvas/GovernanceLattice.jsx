import React, { useEffect, useRef } from 'react';
import { useTheme } from '../../context/ThemeContext';
import { useData } from '../../context/DataContext';

export default function GovernanceLattice({ className = '', interactive = true }) {
  const canvasRef = useRef(null);
  const { isDark } = useTheme();
  const { experienceConfig } = useData();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    let width = (canvas.width = canvas.parentElement?.clientWidth || window.innerWidth);
    let height = (canvas.height = canvas.parentElement?.clientHeight || 600);

    const handleResize = () => {
      if (!canvas || !canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth || window.innerWidth;
      height = canvas.height = canvas.parentElement.clientHeight || 600;
    };
    window.addEventListener('resize', handleResize);

    const numNodes = experienceConfig?.latticeNodes || 55;
    const maxDist = experienceConfig?.connectionDistance || 140;
    const speedMultiplier = experienceConfig?.motionSpeed || 1.0;

    const nodes = [];
    for (let i = 0; i < numNodes; i++) {
      nodes.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.7 * speedMultiplier,
        vy: (Math.random() - 0.5) * 0.7 * speedMultiplier,
        radius: Math.random() * 2.2 + 1.2,
        baseAlpha: Math.random() * 0.6 + 0.3,
        pulseSpeed: Math.random() * 0.03 + 0.01,
        pulseOffset: Math.random() * Math.PI * 2,
        isAnchor: i % 6 === 0
      });
    }

    const mouse = { x: -1000, y: -1000, radius: 180 };

    const handleMouseMove = (e) => {
      if (!interactive || !canvas) return;
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };

    const handleMouseLeave = () => {
      mouse.x = -1000;
      mouse.y = -1000;
    };

    if (interactive) {
      window.addEventListener('mousemove', handleMouseMove);
      canvas.addEventListener('mouseleave', handleMouseLeave);
    }

    let tick = 0;

    const render = () => {
      tick++;
      ctx.clearRect(0, 0, width, height);

      // New Palette Colors: #DD2A40, #FF3333, #E4E7EC
      const nodeColorPrimary = isDark ? '#FF3333' : '#DD2A40';
      const nodeColorAnchor = isDark ? '#E4E7EC' : '#DD2A40';
      const lineColor = isDark ? 'rgba(255, 51, 51,' : 'rgba(221, 42, 64,';

      for (let i = 0; i < nodes.length; i++) {
        const n = nodes[i];
        n.x += n.vx;
        n.y += n.vy;

        if (n.x < 0 || n.x > width) n.vx *= -1;
        if (n.y < 0 || n.y > height) n.vy *= -1;

        const dx = mouse.x - n.x;
        const dy = mouse.y - n.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < mouse.radius) {
          const force = (1 - dist / mouse.radius) * 1.5;
          n.x -= (dx / dist) * force;
          n.y -= (dy / dist) * force;
        }

        const pulse = Math.sin(tick * n.pulseSpeed + n.pulseOffset);
        const alpha = Math.max(0.25, Math.min(1, n.baseAlpha + pulse * 0.25));

        ctx.beginPath();
        ctx.arc(n.x, n.y, n.isAnchor ? n.radius * 2 : n.radius, 0, Math.PI * 2);
        ctx.fillStyle = n.isAnchor ? nodeColorAnchor : (isDark ? 'rgba(254, 205, 211, ' + alpha + ')' : 'rgba(221, 42, 64, ' + alpha + ')');
        ctx.fill();

        if (n.isAnchor) {
          ctx.beginPath();
          ctx.arc(n.x, n.y, n.radius * 3.5 + pulse * 2, 0, Math.PI * 2);
          ctx.strokeStyle = isDark ? 'rgba(255, 51, 51, 0.4)' : 'rgba(221, 42, 64, 0.3)';
          ctx.lineWidth = 1.2;
          ctx.stroke();
        }
      }

      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const n1 = nodes[i];
          const n2 = nodes[j];
          const dx = n1.x - n2.x;
          const dy = n1.y - n2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < maxDist) {
            const edgeAlpha = (1 - dist / maxDist) * (isDark ? 0.38 : 0.25);
            ctx.beginPath();
            ctx.moveTo(n1.x, n1.y);
            ctx.lineTo(n2.x, n2.y);
            ctx.strokeStyle = lineColor + edgeAlpha + ')';
            ctx.lineWidth = dist < maxDist * 0.4 ? 1.4 : 0.8;
            ctx.stroke();
          }
        }
      }

      if (mouse.x > 0 && mouse.y > 0) {
        for (let i = 0; i < nodes.length; i++) {
          const n = nodes[i];
          const dx = mouse.x - n.x;
          const dy = mouse.y - n.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < mouse.radius) {
            const alpha = (1 - dist / mouse.radius) * 0.7;
            ctx.beginPath();
            ctx.moveTo(mouse.x, mouse.y);
            ctx.lineTo(n.x, n.y);
            ctx.strokeStyle = isDark ? 'rgba(254, 205, 211, ' + alpha + ')' : 'rgba(221, 42, 64, ' + alpha + ')';
            ctx.lineWidth = 1.5;
            ctx.stroke();
          }
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      if (interactive) {
        window.removeEventListener('mousemove', handleMouseMove);
        canvas.removeEventListener('mouseleave', handleMouseLeave);
      }
      cancelAnimationFrame(animationFrameId);
    };
  }, [isDark, interactive, experienceConfig]);

  return (
    <canvas
      ref={canvasRef}
      className={'absolute inset-0 pointer-events-auto transition-opacity duration-700 ' + className}
      style={{ opacity: isDark ? 0.9 : 0.75 }}
    />
  );
}
