'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { Skill } from '@/lib/types';

interface CreativeSkillsGraphProps {
    skills: Skill[];
    showAllLabels?: boolean;
}

interface Node extends Skill {
    x: number;
    y: number;
    vx: number;
    vy: number;
    radius: number;
}

export default function CreativeSkillsGraph({ skills, showAllLabels = false }: CreativeSkillsGraphProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [nodes, setNodes] = useState<Node[]>([]);
    const [hoveredNode, setHoveredNode] = useState<Node | null>(null);
    const animationRef = useRef<number>(0);

    // Initialize nodes
    useEffect(() => {
        if (!containerRef.current) return;

        const { width, height } = containerRef.current.getBoundingClientRect();
        const newNodes: Node[] = skills.map((skill) => ({
            ...skill,
            x: Math.random() * width,
            y: Math.random() * height,
            vx: (Math.random() - 0.5) * 0.5,
            vy: (Math.random() - 0.5) * 0.5,
            radius: Math.max(4, (skill.proficiency / 100) * 8), // Size based on proficiency
        }));

        setNodes(newNodes);
    }, [skills]);

    // Animation loop
    useEffect(() => {
        const canvas = canvasRef.current;
        const container = containerRef.current;
        if (!canvas || !container || nodes.length === 0) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const update = () => {
            const { width, height } = container.getBoundingClientRect();
            canvas.width = width;
            canvas.height = height;

            ctx.clearRect(0, 0, width, height);

            // Draw connections
            ctx.strokeStyle = 'rgba(99, 102, 241, 0.15)'; // Indigo-500 with low opacity
            ctx.lineWidth = 1;

            for (let i = 0; i < nodes.length; i++) {
                const nodeA = nodes[i];

                // Update position
                nodeA.x += nodeA.vx;
                nodeA.y += nodeA.vy;

                // Bounce off walls
                if (nodeA.x < 0 || nodeA.x > width) nodeA.vx *= -1;
                if (nodeA.y < 0 || nodeA.y > height) nodeA.vy *= -1;

                // Keep within bounds
                nodeA.x = Math.max(0, Math.min(width, nodeA.x));
                nodeA.y = Math.max(0, Math.min(height, nodeA.y));

                // Draw connections to nearby nodes
                for (let j = i + 1; j < nodes.length; j++) {
                    const nodeB = nodes[j];
                    const dx = nodeA.x - nodeB.x;
                    const dy = nodeA.y - nodeB.y;
                    const distance = Math.sqrt(dx * dx + dy * dy);

                    if (distance < 150) {
                        ctx.beginPath();
                        ctx.moveTo(nodeA.x, nodeA.y);
                        ctx.lineTo(nodeB.x, nodeB.y);
                        ctx.stroke();
                    }
                }
            }

            // Draw nodes and labels
            nodes.forEach((node) => {
                const isHovered = hoveredNode === node;

                // Draw node
                ctx.beginPath();
                ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
                ctx.fillStyle = isHovered ? '#818cf8' : '#4f46e5'; // Indigo-400 hover, Indigo-600 default
                ctx.fill();

                // Glow effect
                const gradient = ctx.createRadialGradient(node.x, node.y, 0, node.x, node.y, node.radius * 3);
                gradient.addColorStop(0, 'rgba(79, 70, 229, 0.3)');
                gradient.addColorStop(1, 'rgba(79, 70, 229, 0)');
                ctx.fillStyle = gradient;
                ctx.beginPath();
                ctx.arc(node.x, node.y, node.radius * 3, 0, Math.PI * 2);
                ctx.fill();

                // Draw Label if showAllLabels is true
                if (showAllLabels) {
                    ctx.font = '12px Inter, sans-serif';
                    ctx.fillStyle = isHovered ? '#ffffff' : 'rgba(255, 255, 255, 0.7)';
                    ctx.textAlign = 'center';
                    ctx.textBaseline = 'bottom';
                    ctx.fillText(node.name, node.x, node.y - node.radius - 5);
                }
            });

            animationRef.current = requestAnimationFrame(update);
        };

        update();

        return () => {
            if (animationRef.current) cancelAnimationFrame(animationRef.current);
        };
    }, [nodes, hoveredNode, showAllLabels]); // Added showAllLabels dependency

    // Handle mouse interaction to find hovered node
    const handleMouseMove = (e: React.MouseEvent) => {
        if (!containerRef.current) return;
        const rect = containerRef.current.getBoundingClientRect();
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;

        const found = nodes.find((node) => {
            const dx = node.x - mouseX;
            const dy = node.y - mouseY;
            return Math.sqrt(dx * dx + dy * dy) < node.radius + 10; // Hit area slightly larger
        });

        setHoveredNode(found || null);
    };

    return (
        <div
            ref={containerRef}
            className="relative h-[400px] w-full overflow-hidden rounded-xl bg-slate-950/50 backdrop-blur-sm border border-white/10"
            onMouseMove={handleMouseMove}
            onMouseLeave={() => setHoveredNode(null)}
        >
            <canvas ref={canvasRef} className="absolute inset-0 block" />

            {/* Tooltip for hovered node (only if labels are NOT shown globally to avoid double text) */}
            {hoveredNode && !showAllLabels && (
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="pointer-events-none absolute z-10 rounded-lg bg-zinc-900/90 px-3 py-2 shadow-xl backdrop-blur-md"
                    style={{
                        left: hoveredNode.x,
                        top: hoveredNode.y - 40,
                        transform: 'translate(-50%, -100%)'
                    }}
                >
                    <p className="text-sm font-bold text-indigo-400">{hoveredNode.name}</p>
                    <p className="text-xs text-zinc-400">{hoveredNode.proficiency}% Proficiency</p>
                </motion.div>
            )}

            {/* If labels are shown, maybe show just proficiency on hover? Or keep full tooltip? 
                Let's keep full tooltip but maybe position it differently or just let it overlap. 
                Actually, user asked to "show all skill names". 
                If we show names on canvas, the tooltip duplicates the name. 
                Let's hide the name in tooltip if showAllLabels is true, or just hide tooltip entirely if we want simple.
                Decision: Hide tooltip if showAllLabels is true, OR show extra info (proficiency) in tooltip.
                Let's show proficiency in tooltip if showAllLabels is true.
            */}
            {hoveredNode && showAllLabels && (
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="pointer-events-none absolute z-10 rounded-lg bg-zinc-900/90 px-2 py-1 shadow-xl backdrop-blur-md"
                    style={{
                        left: hoveredNode.x,
                        top: hoveredNode.y + 20, // Below the node
                        transform: 'translate(-50%, 0)'
                    }}
                >
                    <p className="text-xs text-zinc-400">{hoveredNode.proficiency}%</p>
                </motion.div>
            )}

            <div className="absolute bottom-4 right-4 pointer-events-none">
                <p className="text-xs text-white/30 font-mono">INTERACTIVE NEURAL NETWORK</p>
            </div>
        </div>
    );
}
