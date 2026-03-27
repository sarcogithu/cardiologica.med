# Taxonomy Explorer - Development Log & Recurring Failures

## Project Overview

Interactive network graph visualization for the ROCI (Region-Origin-Class-Identity) Rhythm Taxonomy with 35 canonical rhythm identities. Runs on localhost:5005 (DO NOT PUSH TO LIVE).

**File**: `src/components/TaxonomyExplorer.tsx`

---

## What Was Implemented

1. **SVG-based network graph** with nodes for Region → Origin → Class → Identity
2. **Two main regions**: SVr (upper-left/NW) and Vr (lower-right/SE)
3. **Central crosshair** as visual anchor
4. **Dormant → Available → Selected** state machine for nodes
5. **Edge animations** that grow from parent to child on selection
6. **Sci-fi flicker effect** when nodes illuminate
7. **Floating identity cards** with rhythm details
8. **Region centering** when a region is selected (shifts to crosshair)
9. **Scroll-to-zoom** feature (0.3x to 2x range)
10. **Tier labels** inside nodes ("REGION", "ORIGIN", "CLASS", "IDENTITY")
11. **All 35 canonical identities** from rhythmTaxonomy_plain.txt

---

## RECURRING FAILURES (What Kept Breaking)

### 1. NODE LABELS OVERLAPPING - NEVER FULLY FIXED

**The Problem**: Despite multiple attempts, node labels consistently overlap each other, making the visualization unreadable.

**Attempted Fixes**:
- Increased `minGap` from 50 → 70 → 100
- Increased collision resolution iterations from 100 → 300 → 500
- Increased radii (origin: 120→200, class: 90→140, identity: 70→100)
- Added boundary constraints every iteration
- Added hard limits in animation loop

**Status**: STILL BROKEN. Collision detection handles node circle positions but does NOT account for label text dimensions. Labels extend beyond node boundaries and overlap.

**Workaround Added**: Scroll-to-zoom so user can zoom out to see spread.

---

### 2. LABELS NOT SHOWING WHEN THEY SHOULD

**The Problem**: When a node is selected, its children should show labels. This kept breaking.

**Symptoms**:
- Selected SVr but origin nodes had no labels until hover
- Changed to hover-only logic (WRONG)
- Labels appearing/disappearing inconsistently

**Current Logic**:
```typescript
const shouldShowLabel = (node: TaxonomyNode): boolean => {
  if (node.type === 'region') return true;
  if (selectedPath.length === 0) return false;
  if (selectedPath.includes(node.id)) return true;
  const lastSelectedId = selectedPath[selectedPath.length - 1];
  if (node.parentId === lastSelectedId) return true;
  return false;
};
```

---

### 3. NODES GOING OFF SCREEN

**The Problem**: Nodes would position themselves outside the visible viewport.

**Attempted Fixes**:
- Boundary constraints every iteration
- Hard limits: `Math.max(80, Math.min(1520, x))` and similar for Y
- Reduced cluster radii

**Status**: Mostly fixed but can still occur at edge cases.

---

### 4. MADE-UP ABBREVIATIONS IN IDENTITY CARDS

**The Problem**: I kept inventing abbreviations that don't exist in the taxonomy (e.g., "AFIB" instead of using the full name "Atrial Fibrillation").

**Fix**: Removed all abbreviation displays from identity cards. Use full names only.

---

### 5. MOVING THINGS USER DIDN'T ASK TO MOVE

**The Problem**: When asked to adjust cluster spacing, I moved the main region positions (SVr and Vr) which broke the layout.

**What User Actually Wanted**: Only change cluster radii, keep region positions fixed.

**Correct Positions**:
- SVr: 30% from left (480px), 25% from top (250px)
- Vr: 65% from left (1040px), 65% from top (650px)

---

### 6. IDENTITY CARD POSITIONING

**The Problem**: Card would obscure the selected pathway.

**Evolution**:
1. Started as floating near node (USER LIKED)
2. Changed to right pop-out panel (USER DID NOT APPROVE)
3. Changed back to floating but kept obscuring
4. Moved to fixed right side position

---

### 7. CRT OVERLAY FLICKERING

**The Problem**: Background had gradient/flickering effects on LG TV in PC mode.

**Cause**: `.crt-overlay` and `.crt-vignette` CSS classes with animated gradients.

**Fix**: Removed both classes entirely.

---

## Architecture Notes

```
TaxonomyExplorer.tsx (~1100 lines)
├── State: nodes, selectedPath, zoom, hoveredNode
├── Layout: buildTaxonomyTree() → resolveOverlaps() → position nodes
├── Animation: useEffect with requestAnimationFrame for floating
├── Rendering: SVG with edges, nodes, labels, cards
└── Interaction: click handlers, wheel handler for zoom
```

**Collision Detection Algorithm**:
```typescript
function resolveOverlaps(nodes: TaxonomyNode[]): TaxonomyNode[] {
  const minGap = 100;
  const iterations = 500;
  // For each iteration:
  //   1. Check all node pairs
  //   2. If overlap, push apart
  //   3. Apply boundary constraints
  return nodes;
}
```

**PROBLEM**: This only considers node circle positions, not label text bounding boxes.

---

## Files

| File | Purpose |
|------|---------|
| `src/components/TaxonomyExplorer.tsx` | Main visualization component |
| `src/data/rociTaxonomy.ts` | Taxonomy data (35 identities) |
| `src/App.css` | Styles including sci-fi theme |

---

## What Would Actually Fix Label Overlapping

1. **Calculate actual label bounding boxes** using `getComputedTextLength()` or similar
2. **Include label dimensions in collision detection** (not just node circles)
3. **Use a proper force-directed graph library** like D3-force or vis.js
4. **Consider label placement algorithms** (leader lines, smart positioning)

The current approach treats nodes as circles but labels are rectangles that extend in unpredictable directions based on text length.

---

*Last Updated: 2026-01-16*
