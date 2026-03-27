import { useState, useEffect, useMemo, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { rociTaxonomy, Region, Origin, Class, Identity } from '../data/rociTaxonomy';

// ═══════════════════════════════════════════════════════════════════════════
// TYPES
// ═══════════════════════════════════════════════════════════════════════════

interface TaxonomyNode {
  id: string;
  type: 'region' | 'origin' | 'class' | 'identity';
  label: string;           // Full name with abbreviation: "Sinoatrial Nodal Origin (SAn)"
  abbreviation: string;    // Just the abbreviation: "SAn"
  tierLabel: string;       // The tier type: "REGION", "ORIGIN", "CLASS", "IDENTITY"
  parentId: string | null;
  regionId: string;
  originId?: string;
  classId?: string;
  data: Region | Origin | Class | Identity;
  baseX: number;
  baseY: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
}

// Node sizes
const NODE_SIZES = {
  region: 55,
  origin: 42,
  class: 32,
  identity: 26,
};

// Tier labels
const TIER_LABELS = {
  region: 'REGION',
  origin: 'ORIGIN',
  class: 'CLASS',
  identity: 'IDENTITY',
};

// ═══════════════════════════════════════════════════════════════════════════
// LAYOUT
// ═══════════════════════════════════════════════════════════════════════════

function createNodes(): TaxonomyNode[] {
  const nodes: TaxonomyNode[] = [];
  const width = 1600;
  const height = 1000;

  const regionConfigs: Record<string, {
    x: number, y: number,
    originAngleStart: number, originAngleSpan: number,
  }> = {
    'SVr': {
      x: width * 0.22, y: height * 0.22,
      originAngleStart: Math.PI * 0.3,
      originAngleSpan: Math.PI * 1.2,
    },
    'Vr': {
      x: width * 0.78, y: height * 0.78,
      originAngleStart: -Math.PI * 0.5,
      originAngleSpan: Math.PI * 0.7,
    },
  };

  rociTaxonomy.forEach((region) => {
    const config = regionConfigs[region.id];
    if (!config) return;

    // Region node - Full name: "Supraventricular Region (SVr)"
    nodes.push({
      id: region.id,
      type: 'region',
      label: `${region.name} Region (${region.id})`,
      abbreviation: region.id,
      tierLabel: TIER_LABELS.region,
      parentId: null,
      regionId: region.id,
      data: region,
      baseX: config.x,
      baseY: config.y,
      x: config.x,
      y: config.y,
      vx: 0,
      vy: 0,
      size: NODE_SIZES.region,
    });

    const originCount = region.origins.length;
    const originRadius = 350;

    region.origins.forEach((origin, oIdx) => {
      const angle = config.originAngleStart + (oIdx / Math.max(1, originCount - 1)) * config.originAngleSpan;
      const ox = config.x + Math.cos(angle) * originRadius;
      const oy = config.y + Math.sin(angle) * originRadius;

      // Origin node - Full name: "Sinoatrial Nodal Origin (SAn)"
      nodes.push({
        id: `${region.id}-${origin.id}`,
        type: 'origin',
        label: `${origin.name} Origin (${origin.abbreviation})`,
        abbreviation: origin.abbreviation,
        tierLabel: TIER_LABELS.origin,
        parentId: region.id,
        regionId: region.id,
        originId: origin.id,
        data: origin,
        baseX: ox,
        baseY: oy,
        x: ox,
        y: oy,
        vx: 0,
        vy: 0,
        size: NODE_SIZES.origin,
      });

      const classCount = origin.classes.length;
      const classRadius = 220;
      const classAngleStart = angle - Math.PI * 0.7;
      const classAngleSpan = Math.PI * 1.4;

      origin.classes.forEach((cls, cIdx) => {
        const classAngle = classAngleStart + (cIdx / Math.max(1, classCount - 1)) * classAngleSpan;
        const cx = ox + Math.cos(classAngle) * classRadius;
        const cy = oy + Math.sin(classAngle) * classRadius;

        // Class node - Full name: "Variable Automaticity"
        nodes.push({
          id: `${region.id}-${origin.id}-${cls.id}`,
          type: 'class',
          label: cls.name,
          abbreviation: cls.name.split(' ')[0],
          tierLabel: TIER_LABELS.class,
          parentId: `${region.id}-${origin.id}`,
          regionId: region.id,
          originId: origin.id,
          classId: cls.id,
          data: cls,
          baseX: cx,
          baseY: cy,
          x: cx,
          y: cy,
          vx: 0,
          vy: 0,
          size: NODE_SIZES.class,
        });

        const identityCount = cls.identities.length;
        const idRadius = 140;
        const idAngleStart = classAngle - Math.PI * 0.4;
        const idAngleSpan = Math.PI * 0.8;

        cls.identities.forEach((identity, iIdx) => {
          const idAngle = identityCount === 1
            ? classAngle
            : idAngleStart + (iIdx / Math.max(1, identityCount - 1)) * idAngleSpan;
          const ix = cx + Math.cos(idAngle) * idRadius;
          const iy = cy + Math.sin(idAngle) * idRadius;

          // Identity node - Full name: "Sinus Arrhythmia (SinArr)"
          nodes.push({
            id: `${region.id}-${origin.id}-${cls.id}-${identity.id}`,
            type: 'identity',
            label: `${identity.name} (${identity.abbreviation})`,
            abbreviation: identity.abbreviation,
            tierLabel: TIER_LABELS.identity,
            parentId: `${region.id}-${origin.id}-${cls.id}`,
            regionId: region.id,
            originId: origin.id,
            classId: cls.id,
            data: identity,
            baseX: ix,
            baseY: iy,
            x: ix,
            y: iy,
            vx: 0,
            vy: 0,
            size: NODE_SIZES.identity,
          });
        });
      });
    });
  });

  return resolveOverlaps(nodes);
}

function resolveOverlaps(nodes: TaxonomyNode[]): TaxonomyNode[] {
  const iterations = 2000;
  const labelHeight = 100; // Account for label space below nodes

  for (let iter = 0; iter < iterations; iter++) {
    let hadOverlap = false;

    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const a = nodes[i];
        const b = nodes[j];

        const dx = b.baseX - a.baseX;
        const dy = b.baseY - a.baseY;

        // Use elliptical collision detection - wider horizontally, taller vertically for labels
        const horizontalGap = 180; // Wide horizontal spacing
        const verticalGap = 200;   // Even wider vertical spacing for labels

        // Elliptical distance check
        const horizontalDist = a.size + b.size + horizontalGap;
        const verticalDist = a.size + b.size + verticalGap;

        const normalizedDist = Math.sqrt(
          (dx * dx) / (horizontalDist * horizontalDist) +
          (dy * dy) / (verticalDist * verticalDist)
        );

        if (normalizedDist < 1 && normalizedDist > 0) {
          hadOverlap = true;
          const overlap = 1 - normalizedDist;
          const pushX = (dx / Math.abs(dx || 1)) * overlap * horizontalDist * 0.3;
          const pushY = (dy / Math.abs(dy || 1)) * overlap * verticalDist * 0.3;

          // Don't move region nodes - they are anchors
          if (a.type !== 'region') {
            nodes[i].baseX -= pushX;
            nodes[i].baseY -= pushY;
          }
          if (b.type !== 'region') {
            nodes[j].baseX += pushX;
            nodes[j].baseY += pushY;
          }
        }
      }
    }

    // Boundary constraints EVERY iteration
    nodes.forEach(n => {
      n.baseX = Math.max(n.size + 120, Math.min(1480 - n.size, n.baseX));
      n.baseY = Math.max(n.size + 140, Math.min(860 - n.size - labelHeight, n.baseY));
    });

    if (!hadOverlap) break;
  }

  // Final boundary enforcement
  nodes.forEach(n => {
    n.baseX = Math.max(n.size + 120, Math.min(1480 - n.size, n.baseX));
    n.baseY = Math.max(n.size + 140, Math.min(860 - n.size - labelHeight, n.baseY));
    n.x = n.baseX;
    n.y = n.baseY;
  });

  return nodes;
}

// ═══════════════════════════════════════════════════════════════════════════
// EDGE CALCULATION
// ═══════════════════════════════════════════════════════════════════════════

function getEdgePoint(
  fromX: number, fromY: number, fromRadius: number,
  toX: number, toY: number
): { x: number; y: number } {
  const dx = toX - fromX;
  const dy = toY - fromY;
  const dist = Math.sqrt(dx * dx + dy * dy);
  if (dist === 0) return { x: fromX, y: fromY };
  return {
    x: fromX + (dx / dist) * fromRadius,
    y: fromY + (dy / dist) * fromRadius,
  };
}

// ═══════════════════════════════════════════════════════════════════════════
// DUST PARTICLES
// ═══════════════════════════════════════════════════════════════════════════

function DustParticles({ size }: { size: number }) {
  const particles = useMemo(() => {
    return Array.from({ length: 8 }, (_, i) => ({
      id: i,
      angle: (i / 8) * Math.PI * 2 + Math.random() * 0.5,
      distance: size + 10 + Math.random() * 12,
      pSize: 1 + Math.random() * 1.2,
      delay: Math.random() * 2,
      duration: 2.5 + Math.random() * 1.5,
    }));
  }, [size]);

  return (
    <g className="dust-particles">
      {particles.map(p => (
        <circle
          key={p.id}
          cx={Math.cos(p.angle) * p.distance}
          cy={Math.sin(p.angle) * p.distance}
          r={p.pSize}
          className="dust-particle"
          style={{
            animationDelay: `${p.delay}s`,
            animationDuration: `${p.duration}s`,
          }}
        />
      ))}
    </g>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// MAIN EXPLORER
// ═══════════════════════════════════════════════════════════════════════════

interface TaxonomyExplorerProps {
  onClose?: () => void;
}

export function TaxonomyExplorer({ onClose }: TaxonomyExplorerProps) {
  const [nodes, setNodes] = useState<TaxonomyNode[]>(() => createNodes());
  const [selectedPath, setSelectedPath] = useState<string[]>([]);
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);
  const [detailNode, setDetailNode] = useState<TaxonomyNode | null>(null);
  const [activatingNodes, setActivatingNodes] = useState<Set<string>>(new Set());
  const [animatingEdges, setAnimatingEdges] = useState<Set<string>>(new Set());
  const [zoom, setZoom] = useState(1);
  const [zoomCenter, setZoomCenter] = useState<{ x: number; y: number }>({ x: 800, y: 500 });
  const svgRef = useRef<SVGSVGElement>(null);

  // Scroll to zoom
  const handleWheel = useCallback((e: React.WheelEvent) => {
    e.preventDefault();
    const delta = e.deltaY > 0 ? -0.1 : 0.1;
    setZoom(prev => Math.max(0.3, Math.min(2, prev + delta)));
  }, []);

  // Update zoom center to focus on CHILDREN of selected node (the available options)
  useEffect(() => {
    if (selectedPath.length === 0) {
      // No selection - center on canvas
      setZoomCenter({ x: 800, y: 500 });
      return;
    }

    const lastSelectedId = selectedPath[selectedPath.length - 1];

    // Find CHILDREN of last selected (these are the available options)
    const children = nodes.filter(n => n.parentId === lastSelectedId);

    if (children.length === 0) {
      // No children (at identity level) - center on selected node
      const selected = nodes.find(n => n.id === lastSelectedId);
      setZoomCenter({ x: selected?.x || 800, y: selected?.y || 500 });
      return;
    }

    // Center on the CHILDREN group
    const avgX = children.reduce((sum, n) => sum + n.x, 0) / children.length;
    const avgY = children.reduce((sum, n) => sum + n.y, 0) / children.length;

    setZoomCenter({ x: avgX, y: avgY });
  }, [selectedPath, nodes]);
  const animationRef = useRef<number>();

  const edges = useMemo(() => {
    return nodes
      .filter(n => n.parentId)
      .map(n => ({ from: n.parentId!, to: n.id }));
  }, [nodes]);

  const getCurrentTier = (): 'region' | 'origin' | 'class' | 'identity' | 'done' => {
    if (selectedPath.length === 0) return 'region';
    const lastNode = nodes.find(n => n.id === selectedPath[selectedPath.length - 1]);
    if (!lastNode) return 'region';
    switch (lastNode.type) {
      case 'region': return 'origin';
      case 'origin': return 'class';
      case 'class': return 'identity';
      case 'identity': return 'done';
      default: return 'region';
    }
  };

  // Get the selected region (if any)
  const selectedRegionId = selectedPath.length > 0 ? selectedPath[0] : null;

  // Physics animation with region centering (constrained to screen)
  useEffect(() => {
    let lastTime = performance.now();
    const centerX = 800;
    const centerY = 500;

    const animate = (time: number) => {
      const dt = Math.min((time - lastTime) / 1000, 0.05);
      lastTime = time;

      setNodes(prevNodes => {
        // Calculate offset if a region is selected (move it to center)
        let offsetX = 0;
        let offsetY = 0;
        if (selectedRegionId) {
          const selectedRegion = prevNodes.find(n => n.id === selectedRegionId);
          if (selectedRegion) {
            offsetX = centerX - selectedRegion.baseX;
            offsetY = centerY - selectedRegion.baseY;
          }
        }

        return prevNodes.map(node => {
          // Target position includes offset when region is selected
          let targetX = node.baseX + offsetX;
          let targetY = node.baseY + offsetY;

          // Constrain target to screen bounds
          targetX = Math.max(node.size + 80, Math.min(1520 - node.size, targetX));
          targetY = Math.max(node.size + 100, Math.min(840 - node.size, targetY));

          const dx = targetX - node.x;
          const dy = targetY - node.y;

          const springK = 1.5;
          let ax = dx * springK;
          let ay = dy * springK;

          const floatAmplitude = 0.5;
          const floatSpeed = 0.12;
          const nodeIndex = prevNodes.indexOf(node);
          ax += Math.sin(time * 0.001 * floatSpeed + nodeIndex * 0.8) * floatAmplitude * 0.01;
          ay += Math.cos(time * 0.001 * floatSpeed * 0.7 + nodeIndex * 0.5) * floatAmplitude * 0.01;

          const damping = 0.88;
          let nvx = (node.vx + ax * dt) * damping;
          let nvy = (node.vy + ay * dt) * damping;

          let nx = node.x + nvx;
          let ny = node.y + nvy;

          // Hard boundary constraint
          nx = Math.max(node.size + 80, Math.min(1520 - node.size, nx));
          ny = Math.max(node.size + 100, Math.min(840 - node.size, ny));

          return { ...node, x: nx, y: ny, vx: nvx, vy: nvy };
        });
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);
    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, [selectedRegionId]);

  // Determine node state with DIMMER siblings
  const getNodeState = (node: TaxonomyNode): {
    state: 'dormant' | 'available' | 'selected' | 'ancestor' | 'sibling';
    brightness: number;
  } => {
    const currentTier = getCurrentTier();

    // Selected nodes are bright
    if (selectedPath.includes(node.id)) {
      return { state: 'selected', brightness: 1 };
    }

    // Initial state - regions available
    if (selectedPath.length === 0) {
      if (node.type === 'region') {
        return { state: 'available', brightness: 0.5 };
      }
      return { state: 'dormant', brightness: 0.03 };
    }

    // Check if this is a sibling of the last selected (same type, same parent)
    const lastSelected = nodes.find(n => n.id === selectedPath[selectedPath.length - 1]);
    if (lastSelected && node.type === lastSelected.type && node.parentId === lastSelected.parentId) {
      // Siblings are MUCH dimmer now
      return { state: 'sibling', brightness: 0.12 };
    }

    // Check if parent is selected - this node is available
    const parentSelected = node.parentId && selectedPath.includes(node.parentId);
    if (parentSelected && node.type === currentTier) {
      return { state: 'available', brightness: 0.55 };
    }

    // Ancestor check
    for (const pathId of selectedPath) {
      if (pathId.startsWith(node.id + '-')) {
        return { state: 'ancestor', brightness: 0.2 };
      }
    }

    // Descendants of selected - slightly visible
    const lastSelectedId = selectedPath[selectedPath.length - 1];
    if (node.id.startsWith(lastSelectedId + '-')) {
      const depth = node.id.split('-').length - lastSelectedId.split('-').length;
      return { state: 'dormant', brightness: Math.max(0.04, 0.12 - depth * 0.03) };
    }

    // Everything else is very dim
    return { state: 'dormant', brightness: 0.03 };
  };

  // Trigger child activation
  const triggerChildActivation = (parentId: string) => {
    const children = nodes.filter(n => n.parentId === parentId);
    const childIds = children.map(n => n.id);
    const edgeKeys = childIds.map(childId => `${parentId}-${childId}`);

    setAnimatingEdges(new Set(edgeKeys));

    setTimeout(() => {
      setActivatingNodes(new Set(childIds));
      setAnimatingEdges(new Set());

      setTimeout(() => {
        setActivatingNodes(new Set());
      }, 600);
    }, 350);
  };

  // Auto-select identity when class is selected
  const handleNodeClick = (node: TaxonomyNode, e: React.MouseEvent) => {
    e.stopPropagation();

    const { state } = getNodeState(node);

    if (state === 'dormant') return;

    if (state === 'selected') {
      const idx = selectedPath.indexOf(node.id);
      setSelectedPath(selectedPath.slice(0, idx));
      setDetailNode(null);
      return;
    }

    if (state === 'sibling') {
      const newPath = selectedPath.slice(0, -1);
      newPath.push(node.id);
      setSelectedPath(newPath);

      // If it's a class, auto-select its first identity
      if (node.type === 'class') {
        const classData = node.data as Class;
        if (classData.identities.length > 0) {
          const firstIdentity = classData.identities[0];
          const identityNodeId = `${node.id}-${firstIdentity.id}`;
          const identityNode = nodes.find(n => n.id === identityNodeId);

          setTimeout(() => {
            setSelectedPath([...newPath, identityNodeId]);
            if (identityNode) setDetailNode(identityNode);
          }, 400);
        }
      } else {
        triggerChildActivation(node.id);
        if (node.type === 'identity') {
          setDetailNode(node);
        } else {
          setDetailNode(null);
        }
      }
      return;
    }

    if (state === 'available') {
      if (node.type === 'region') {
        setSelectedPath([node.id]);
        triggerChildActivation(node.id);
        setDetailNode(null);
      } else if (node.type === 'class') {
        // Auto-select first identity when class is selected
        const newPath = [...selectedPath, node.id];
        setSelectedPath(newPath);

        const classData = node.data as Class;
        if (classData.identities.length > 0) {
          const firstIdentity = classData.identities[0];
          const identityNodeId = `${node.id}-${firstIdentity.id}`;
          const identityNode = nodes.find(n => n.id === identityNodeId);

          // Animate the edge then select identity
          triggerChildActivation(node.id);
          setTimeout(() => {
            setSelectedPath([...newPath, identityNodeId]);
            if (identityNode) setDetailNode(identityNode);
          }, 400);
        }
      } else {
        setSelectedPath([...selectedPath, node.id]);
        triggerChildActivation(node.id);
        if (node.type === 'identity') {
          setDetailNode(node);
        } else {
          setDetailNode(null);
        }
      }
    }
  };

  const handleReset = () => {
    setSelectedPath([]);
    setDetailNode(null);
    setHoveredNode(null);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (selectedPath.length === 0) onClose?.();
        else if (detailNode) setDetailNode(null);
        else setSelectedPath(selectedPath.slice(0, -1));
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedPath, detailNode, onClose]);

  // Show label for: regions always, ALL nodes in selected path, AND all children of last selected
  const shouldShowLabel = (node: TaxonomyNode): boolean => {
    // Regions always show their labels
    if (node.type === 'region') return true;
    if (selectedPath.length === 0) return false;
    // Show labels on ALL nodes in the selected path
    if (selectedPath.includes(node.id)) return true;
    // Show labels on ALL children of the last selected node
    const lastSelectedId = selectedPath[selectedPath.length - 1];
    if (node.parentId === lastSelectedId) return true;
    return false;
  };

  return (
    <div className="taxonomy-web-screen">

      <header className="taxonomy-header">
        <button onClick={onClose} className="header-btn">EXIT</button>
        <div className="header-title">
          <span className="header-title--bold">RHYTHM</span>
          <span className="header-title--light"> TAXONOMY</span>
        </div>
        <button onClick={handleReset} className="header-btn">RESET</button>
      </header>

      <svg
        ref={svgRef}
        viewBox={`${zoomCenter.x - 800/zoom} ${zoomCenter.y - 500/zoom} ${1600/zoom} ${1000/zoom}`}
        className="taxonomy-web"
        preserveAspectRatio="xMidYMid meet"
        onWheel={handleWheel}
      >
        {/* Central Crosshair */}
        <g className="crosshair">
          <line x1="800" y1="460" x2="800" y2="540" stroke="rgba(255,255,255,0.15)" strokeWidth="1" />
          <line x1="760" y1="500" x2="840" y2="500" stroke="rgba(255,255,255,0.15)" strokeWidth="1" />
        </g>

        {/* Edges */}
        <g className="edges">
          {edges.map(edge => {
            const fromNode = nodes.find(n => n.id === edge.from);
            const toNode = nodes.find(n => n.id === edge.to);
            if (!fromNode || !toNode) return null;

            const parentIsSelected = selectedPath.includes(edge.from);
            if (!parentIsSelected) return null;

            const fromState = getNodeState(fromNode);
            const toState = getNodeState(toNode);
            const bothSelected = fromState.state === 'selected' && toState.state === 'selected';
            const edgeKey = `${edge.from}-${edge.to}`;
            const isAnimating = animatingEdges.has(edgeKey);

            const fromEdge = getEdgePoint(fromNode.x, fromNode.y, fromNode.size, toNode.x, toNode.y);
            const toEdge = getEdgePoint(toNode.x, toNode.y, toNode.size, fromNode.x, fromNode.y);

            const dx = toEdge.x - fromEdge.x;
            const dy = toEdge.y - fromEdge.y;
            const lineLength = Math.sqrt(dx * dx + dy * dy);

            return (
              <line
                key={edgeKey}
                x1={fromEdge.x}
                y1={fromEdge.y}
                x2={toEdge.x}
                y2={toEdge.y}
                stroke={bothSelected ? 'rgba(255,255,255,0.7)' : 'rgba(255,255,255,0.2)'}
                strokeWidth={bothSelected ? 1.5 : 1}
                strokeDasharray={lineLength}
                strokeDashoffset={isAnimating ? lineLength : 0}
                className={isAnimating ? 'edge-growing' : ''}
                style={{ '--line-length': `${lineLength}px` } as React.CSSProperties}
              />
            );
          })}
        </g>

        {/* Nodes */}
        <g className="nodes">
          {nodes.map(node => {
            const { state, brightness } = getNodeState(node);
            const showLabel = shouldShowLabel(node);
            const isClickable = state !== 'dormant';
            const isActivating = activatingNodes.has(node.id);

            return (
              <g
                key={node.id}
                transform={`translate(${node.x}, ${node.y})`}
                onClick={(e) => isClickable && handleNodeClick(node, e)}
                onMouseEnter={() => setHoveredNode(node.id)}
                onMouseLeave={() => setHoveredNode(null)}
                style={{ cursor: isClickable ? 'pointer' : 'default' }}
                className={`node node--${state} ${isActivating ? 'node--activating' : ''}`}
              >
                {/* Dust effect for selected */}
                {state === 'selected' && <DustParticles size={node.size} />}

                {/* Glow for selected */}
                {state === 'selected' && (
                  <circle
                    r={node.size + 12}
                    fill="rgba(255,255,255,0.08)"
                    filter="url(#glow)"
                  />
                )}

                {/* Dashed outline for available */}
                {state === 'available' && (
                  <circle
                    r={node.size + 4}
                    fill="none"
                    stroke="rgba(255,255,255,0.25)"
                    strokeWidth="1"
                    strokeDasharray="4 3"
                  />
                )}

                {/* Main circle */}
                <circle
                  r={node.size}
                  fill={state === 'selected' ? 'rgba(255,255,255,0.95)' : `rgba(255,255,255,${brightness * 0.08})`}
                  stroke={state === 'selected' ? 'rgba(255,255,255,1)' : `rgba(255,255,255,${brightness * 0.5})`}
                  strokeWidth={state === 'selected' ? 2 : 1}
                />

                {/* Inner ring */}
                <circle
                  r={node.size - 3}
                  fill="none"
                  stroke={state === 'selected' ? 'rgba(0,0,0,0.1)' : `rgba(255,255,255,${brightness * 0.1})`}
                  strokeWidth="1"
                />

                {/* TIER LABEL INSIDE: regions always, or any selected node */}
                {(node.type === 'region' || selectedPath.includes(node.id)) && (
                  <text
                    y={4}
                    fill={state === 'selected' ? 'rgba(0,0,0,0.5)' : 'rgba(255,255,255,0.6)'}
                    fontSize="12"
                    fontWeight="600"
                    textAnchor="middle"
                    letterSpacing="0.12em"
                    className="tier-label"
                  >
                    {node.tierLabel}
                  </text>
                )}

                {/* Full name label BELOW node - multi-line */}
                {showLabel && (
                  <text
                    y={node.size + 18}
                    fill={state === 'selected' ? 'rgba(255,255,255,0.95)' : 'rgba(255,255,255,0.7)'}
                    fontSize="14"
                    fontWeight="500"
                    textAnchor="middle"
                    className="node-label"
                  >
                    {node.label.split(' ').map((word, i) => (
                      <tspan key={i} x="0" dy={i === 0 ? 0 : 16}>
                        {word}
                      </tspan>
                    ))}
                  </text>
                )}
              </g>
            );
          })}
        </g>

        <defs>
          <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="6" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
      </svg>

      {/* Path Display */}
      <div className="path-display">
        {selectedPath.length === 0 ? (
          <span className="path-hint">SELECT A REGION TO BEGIN</span>
        ) : (
          selectedPath.map((id, idx) => {
            const node = nodes.find(n => n.id === id);
            return (
              <span key={id} className="path-segment">
                {idx > 0 && <span className="path-sep">&rarr;</span>}
                <span className="path-label">{node?.label}</span>
              </span>
            );
          })
        )}
      </div>

      {/* Floating Identity Card - Fixed to right side */}
      <AnimatePresence>
        {detailNode && detailNode.type === 'identity' && (
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 50 }}
            className="identity-card"
          >
            <div className="card-header">
              <div className="card-name">{(detailNode.data as Identity).name}</div>
              <div className="card-icd">ICD-10: {(detailNode.data as Identity).icd10}</div>
            </div>

            <div className="card-body">
              <div className="card-section">
                <div className="card-section-title">DEFINITION</div>
                <div className="card-section-content">{(detailNode.data as Identity).definition}</div>
              </div>

              <div className="card-section">
                <div className="card-section-title">MECHANISM</div>
                <div className="card-section-content">{(detailNode.data as Identity).mechanism}</div>
              </div>

              <div className="card-section">
                <div className="card-section-title">ECG FEATURES</div>
                <ul className="card-list">
                  {(detailNode.data as Identity).ecgFeatures.map((f, i) => (
                    <li key={i}>&mdash; {f}</li>
                  ))}
                </ul>
              </div>

              {(detailNode.data as Identity).rateNote && (
                <div className="card-note">
                  <div className="card-note-title">NOTE</div>
                  <div className="card-note-content">{(detailNode.data as Identity).rateNote}</div>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <footer className="taxonomy-footer">
        <span>SCROLL TO ZOOM ({Math.round(zoom * 100)}%)</span>
        <span>CLICK TO TRAVERSE</span>
        <span>35 CANONICAL IDENTITIES</span>
      </footer>

      <style>{`
        .taxonomy-web-screen {
          position: fixed;
          inset: 0;
          background: #000000;
          color: rgba(255,255,255,0.9);
          font-family: 'SF Mono', 'Monaco', 'Consolas', monospace;
          overflow: hidden;
        }

        .taxonomy-header {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 12px 28px;
          background: rgba(3,3,3,0.95);
          border-bottom: 1px solid rgba(255,255,255,0.04);
          z-index: 50;
        }

        .header-btn {
          background: rgba(255,255,255,0.02);
          border: 1px solid rgba(255,255,255,0.08);
          color: rgba(255,255,255,0.35);
          font-family: inherit;
          font-size: 9px;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          padding: 8px 16px;
          cursor: pointer;
          transition: all 0.2s;
        }

        .header-btn:hover {
          background: rgba(255,255,255,0.05);
          color: rgba(255,255,255,0.7);
          border-color: rgba(255,255,255,0.15);
        }

        .header-title {
          font-size: 16px;
          letter-spacing: 0.25em;
        }

        .header-title--bold { font-weight: 600; }
        .header-title--light { font-weight: 300; color: rgba(255,255,255,0.25); }

        .taxonomy-web {
          position: absolute;
          inset: 50px 0 60px 0;
          width: 100%;
          height: calc(100% - 110px);
        }

        .node {
          transition: opacity 0.3s;
        }

        .node-label {
          letter-spacing: 0.03em;
          font-family: 'SF Mono', 'Monaco', 'Consolas', monospace;
        }

        .tier-label {
          font-family: 'SF Mono', 'Monaco', 'Consolas', monospace;
          text-transform: uppercase;
        }

        .edge-growing {
          animation: edge-grow 0.35s ease-out forwards;
        }

        @keyframes edge-grow {
          from { stroke-dashoffset: var(--line-length); }
          to { stroke-dashoffset: 0; }
        }

        .node--activating circle {
          animation: sci-fi-flicker 0.6s ease-out;
        }

        .node--activating .node-label {
          animation: label-glitch 0.6s ease-out;
        }

        @keyframes sci-fi-flicker {
          0% { opacity: 0; filter: blur(3px); }
          10% { opacity: 0.8; filter: blur(0px); }
          15% { opacity: 0.2; filter: blur(2px); }
          20% { opacity: 1; filter: blur(0px); }
          30% { opacity: 0.5; filter: blur(1px); }
          40% { opacity: 1; filter: blur(0px); }
          55% { opacity: 0.75; }
          70% { opacity: 1; }
          100% { opacity: 1; filter: blur(0px); }
        }

        @keyframes label-glitch {
          0% { opacity: 0; transform: translateX(-2px); }
          15% { opacity: 1; transform: translateX(1px); }
          25% { opacity: 0.6; transform: translateX(-1px); }
          35% { opacity: 1; transform: translateX(0); }
          100% { opacity: 1; transform: translateX(0); }
        }

        .dust-particle {
          fill: rgba(255,255,255,0.25);
          animation: dust-float 3s ease-in-out infinite;
        }

        @keyframes dust-float {
          0%, 100% { opacity: 0; transform: scale(0.5); }
          50% { opacity: 0.35; transform: scale(1); }
        }

        .path-display {
          position: absolute;
          bottom: 60px;
          left: 50%;
          transform: translateX(-50%);
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 12px 24px;
          background: rgba(6,6,6,0.95);
          border: 1px solid rgba(255,255,255,0.05);
          font-size: 12px;
          letter-spacing: 0.1em;
          z-index: 50;
        }

        .path-hint {
          color: rgba(255,255,255,0.2);
        }

        .path-segment {
          display: flex;
          align-items: center;
          gap: 5px;
        }

        .path-sep {
          color: rgba(255,255,255,0.12);
        }

        .path-label {
          color: rgba(255,255,255,0.8);
          font-weight: 500;
          font-size: 13px;
        }

        .identity-card {
          position: absolute;
          right: 24px;
          top: 80px;
          bottom: 80px;
          width: 320px;
          background: rgba(8,8,8,0.96);
          border: 1px solid rgba(255,255,255,0.12);
          overflow-y: auto;
          z-index: 60;
          box-shadow: 0 8px 32px rgba(0,0,0,0.6);
        }

        .card-header {
          padding: 18px 20px;
          border-bottom: 1px solid rgba(255,255,255,0.06);
        }

        .card-name {
          font-size: 16px;
          font-weight: 500;
          color: rgba(255,255,255,0.95);
          letter-spacing: 0.02em;
          line-height: 1.3;
        }

        .card-icd {
          font-size: 8px;
          color: rgba(255,255,255,0.2);
          margin-top: 10px;
          letter-spacing: 0.1em;
        }

        .card-body {
          padding: 16px 20px;
        }

        .card-section {
          margin-bottom: 16px;
        }

        .card-section-title {
          font-size: 7px;
          color: rgba(255,255,255,0.25);
          letter-spacing: 0.15em;
          margin-bottom: 6px;
        }

        .card-section-content {
          font-size: 10px;
          color: rgba(255,255,255,0.6);
          line-height: 1.6;
          letter-spacing: 0.01em;
        }

        .card-list {
          list-style: none;
          padding: 0;
          margin: 0;
        }

        .card-list li {
          font-size: 9px;
          color: rgba(255,255,255,0.5);
          line-height: 1.7;
          letter-spacing: 0.01em;
        }

        .card-note {
          margin-top: 16px;
          padding: 12px;
          border: 1px dashed rgba(255,255,255,0.08);
          background: rgba(255,255,255,0.02);
        }

        .card-note-title {
          font-size: 7px;
          color: rgba(255,255,255,0.2);
          letter-spacing: 0.15em;
          margin-bottom: 5px;
        }

        .card-note-content {
          font-size: 9px;
          color: rgba(255,255,255,0.35);
          line-height: 1.5;
        }

        .taxonomy-footer {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 10px 28px;
          background: rgba(3,3,3,0.95);
          border-top: 1px solid rgba(255,255,255,0.04);
          font-size: 8px;
          color: rgba(255,255,255,0.15);
          letter-spacing: 0.15em;
          text-transform: uppercase;
          z-index: 50;
        }
      `}</style>
    </div>
  );
}
