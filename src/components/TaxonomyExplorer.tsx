import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { rociTaxonomy, Region, Origin, Class, Identity, taxonomyRules } from '../data/rociTaxonomy';

type Tier = 'region' | 'origin' | 'class' | 'identity' | 'detail';

interface Selection {
  region: Region | null;
  origin: Origin | null;
  class: Class | null;
  identity: Identity | null;
}

interface TaxonomyExplorerProps {
  onClose?: () => void;
}

export function TaxonomyExplorer({ onClose }: TaxonomyExplorerProps) {
  const [currentTier, setCurrentTier] = useState<Tier>('region');
  const [selection, setSelection] = useState<Selection>({
    region: null,
    origin: null,
    class: null,
    identity: null,
  });

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (currentTier === 'region') {
          onClose?.();
        } else {
          handleBack();
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentTier, onClose]);

  const handleBack = useCallback(() => {
    if (currentTier === 'detail') {
      setCurrentTier('identity');
    } else if (currentTier === 'identity') {
      setCurrentTier('class');
      setSelection(s => ({ ...s, identity: null }));
    } else if (currentTier === 'class') {
      setCurrentTier('origin');
      setSelection(s => ({ ...s, class: null }));
    } else if (currentTier === 'origin') {
      setCurrentTier('region');
      setSelection(s => ({ ...s, origin: null }));
    }
  }, [currentTier]);

  const handleReset = () => {
    setCurrentTier('region');
    setSelection({ region: null, origin: null, class: null, identity: null });
  };

  const selectRegion = (region: Region) => {
    setSelection({ region, origin: null, class: null, identity: null });
    setCurrentTier('origin');
  };

  const selectOrigin = (origin: Origin) => {
    setSelection(s => ({ ...s, origin, class: null, identity: null }));
    setCurrentTier('class');
  };

  const selectClass = (cls: Class) => {
    setSelection(s => ({ ...s, class: cls, identity: null }));
    setCurrentTier('identity');
  };

  const selectIdentity = (identity: Identity) => {
    setSelection(s => ({ ...s, identity }));
    setCurrentTier('detail');
  };

  const handleBreadcrumbClick = (tier: Tier) => {
    if (tier === 'region') {
      handleReset();
    } else if (tier === 'origin' && selection.region) {
      setCurrentTier('origin');
      setSelection(s => ({ ...s, origin: null, class: null, identity: null }));
    } else if (tier === 'class' && selection.origin) {
      setCurrentTier('class');
      setSelection(s => ({ ...s, class: null, identity: null }));
    } else if (tier === 'identity' && selection.class) {
      setCurrentTier('identity');
      setSelection(s => ({ ...s, identity: null }));
    }
  };

  const getTierTitle = () => {
    switch (currentTier) {
      case 'region': return 'Select Region';
      case 'origin': return 'Select Origin';
      case 'class': return 'Select Class';
      case 'identity': return 'Select Identity';
      case 'detail': return selection.identity?.name || '';
    }
  };

  const getTierSubtitle = () => {
    switch (currentTier) {
      case 'region': return 'Where does the impulse originate relative to the His bundle?';
      case 'origin': return 'What is the specific anatomical source?';
      case 'class': return 'What is the electrophysiologic mechanism?';
      case 'identity': return 'The clinical rhythm diagnosis';
      case 'detail': return selection.identity?.abbreviation || '';
    }
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-black/95 backdrop-blur-sm border-b border-zinc-900">
        <div className="max-w-7xl mx-auto px-8 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-white transition-colors text-sm"
            >
              ← Back to site
            </button>
            <div className="text-sm text-gray-500">
              ROCI Taxonomy Explorer
            </div>
            <button
              onClick={handleReset}
              className="text-gray-400 hover:text-white transition-colors text-sm"
            >
              Reset
            </button>
          </div>
        </div>
      </header>

      {/* Breadcrumb */}
      <div className="fixed top-16 left-0 right-0 z-40 bg-black/90 backdrop-blur-sm border-b border-zinc-900/50">
        <div className="max-w-7xl mx-auto px-8 py-3">
          <div className="flex items-center gap-2 text-sm">
            <button
              onClick={() => handleBreadcrumbClick('region')}
              className={`transition-colors ${selection.region ? 'text-[#86754f] hover:text-[#a8936a]' : 'text-gray-500'}`}
            >
              {selection.region?.id || 'Region'}
            </button>
            {selection.region && (
              <>
                <span className="text-gray-600">→</span>
                <button
                  onClick={() => handleBreadcrumbClick('origin')}
                  className={`transition-colors ${selection.origin ? 'text-[#86754f] hover:text-[#a8936a]' : 'text-gray-500'}`}
                >
                  {selection.origin?.abbreviation || 'Origin'}
                </button>
              </>
            )}
            {selection.origin && (
              <>
                <span className="text-gray-600">→</span>
                <button
                  onClick={() => handleBreadcrumbClick('class')}
                  className={`transition-colors ${selection.class ? 'text-[#86754f] hover:text-[#a8936a]' : 'text-gray-500'}`}
                >
                  {selection.class?.name || 'Class'}
                </button>
              </>
            )}
            {selection.class && (
              <>
                <span className="text-gray-600">→</span>
                <button
                  onClick={() => handleBreadcrumbClick('identity')}
                  className={`transition-colors ${selection.identity ? 'text-[#86754f] hover:text-[#a8936a]' : 'text-gray-500'}`}
                >
                  {selection.identity?.abbreviation || 'Identity'}
                </button>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="pt-32 pb-20 px-8">
        <div className="max-w-7xl mx-auto">
          {/* Tier Header */}
          <motion.div
            key={currentTier}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="text-center mb-16"
          >
            <div className="text-xs tracking-widest text-gray-500 mb-4 uppercase">
              {currentTier === 'detail' ? 'Identity Detail' : `Tier ${['region', 'origin', 'class', 'identity'].indexOf(currentTier) + 1} of 4`}
            </div>
            <h1 className="text-5xl mb-4">{getTierTitle()}</h1>
            <p className="text-xl text-gray-400">{getTierSubtitle()}</p>
          </motion.div>

          {/* Content */}
          <AnimatePresence mode="wait">
            {currentTier === 'region' && (
              <RegionSelection key="region" regions={rociTaxonomy} onSelect={selectRegion} />
            )}
            {currentTier === 'origin' && selection.region && (
              <OriginSelection key="origin" origins={selection.region.origins} onSelect={selectOrigin} onBack={handleBack} />
            )}
            {currentTier === 'class' && selection.origin && (
              <ClassSelection key="class" classes={selection.origin.classes} onSelect={selectClass} onBack={handleBack} />
            )}
            {currentTier === 'identity' && selection.class && (
              <IdentitySelection key="identity" identities={selection.class.identities} onSelect={selectIdentity} onBack={handleBack} />
            )}
            {currentTier === 'detail' && selection.identity && (
              <IdentityDetail key="detail" identity={selection.identity} selection={selection} onBack={handleBack} />
            )}
          </AnimatePresence>
        </div>
      </main>

      {/* Footer */}
      <footer className="fixed bottom-0 left-0 right-0 bg-black/95 backdrop-blur-sm border-t border-zinc-900">
        <div className="max-w-7xl mx-auto px-8 py-4">
          <div className="flex items-center justify-between text-xs text-gray-500">
            <div>{taxonomyRules.traversalOrder}</div>
            <div>35 Canonical Identities</div>
          </div>
        </div>
      </footer>
    </div>
  );
}

// Region Selection Component
function RegionSelection({ regions, onSelect }: { regions: Region[]; onSelect: (r: Region) => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -40 }}
      transition={{ duration: 0.4 }}
      className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto"
    >
      {regions.map((region, index) => (
        <motion.button
          key={region.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1, duration: 0.4 }}
          onClick={() => onSelect(region)}
          className="group relative p-10 bg-zinc-950 border border-zinc-800 hover:border-[#86754f] transition-all duration-300 text-left"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-[#86754f]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          <div className="relative">
            <div className="text-4xl font-light mb-2">{region.id}</div>
            <div className="text-2xl mb-4">{region.name}</div>
            <p className="text-gray-400 text-sm leading-relaxed">{region.description}</p>
            <div className="mt-6 text-xs text-gray-500">
              {region.origins.length} origins • {region.origins.reduce((acc, o) => acc + o.classes.reduce((a, c) => a + c.identities.length, 0), 0)} identities
            </div>
          </div>
          <motion.div
            className="absolute bottom-4 right-4 text-[#86754f] opacity-0 group-hover:opacity-100"
            initial={{ x: -10 }}
            whileHover={{ x: 0 }}
          >
            →
          </motion.div>
        </motion.button>
      ))}
    </motion.div>
  );
}

// Origin Selection Component
function OriginSelection({ origins, onSelect, onBack }: { origins: Origin[]; onSelect: (o: Origin) => void; onBack: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -40 }}
      transition={{ duration: 0.4 }}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
        {origins.map((origin, index) => (
          <motion.button
            key={origin.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.08, duration: 0.4 }}
            onClick={() => onSelect(origin)}
            className="group relative p-8 bg-zinc-950 border border-zinc-800 hover:border-[#86754f] transition-all duration-300 text-left"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-[#86754f]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="relative">
              <div className="flex items-baseline gap-3 mb-3">
                <span className="text-3xl font-light">{origin.abbreviation}</span>
                <span className="text-lg text-gray-400">{origin.name}</span>
              </div>
              <p className="text-gray-500 text-sm">{origin.description}</p>
              <div className="mt-4 text-xs text-gray-600">
                {origin.classes.length} classes • {origin.classes.reduce((a, c) => a + c.identities.length, 0)} identities
              </div>
            </div>
          </motion.button>
        ))}
      </div>
      <div className="text-center mt-12">
        <button onClick={onBack} className="text-gray-500 hover:text-white transition-colors text-sm">
          ← Back to Region
        </button>
      </div>
    </motion.div>
  );
}

// Class Selection Component
function ClassSelection({ classes, onSelect, onBack }: { classes: Class[]; onSelect: (c: Class) => void; onBack: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -40 }}
      transition={{ duration: 0.4 }}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-6xl mx-auto">
        {classes.map((cls, index) => (
          <motion.button
            key={cls.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.06, duration: 0.4 }}
            onClick={() => onSelect(cls)}
            className="group relative p-6 bg-zinc-950 border border-zinc-800 hover:border-[#86754f] transition-all duration-300 text-left"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-[#86754f]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="relative">
              <div className="text-lg mb-2">{cls.name}</div>
              <p className="text-gray-500 text-xs">{cls.description}</p>
              <div className="mt-3 text-xs text-gray-600">
                {cls.identities.length} {cls.identities.length === 1 ? 'identity' : 'identities'}
              </div>
            </div>
          </motion.button>
        ))}
      </div>
      <div className="text-center mt-12">
        <button onClick={onBack} className="text-gray-500 hover:text-white transition-colors text-sm">
          ← Back to Origin
        </button>
      </div>
    </motion.div>
  );
}

// Identity Selection Component
function IdentitySelection({ identities, onSelect, onBack }: { identities: Identity[]; onSelect: (i: Identity) => void; onBack: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -40 }}
      transition={{ duration: 0.4 }}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl mx-auto">
        {identities.map((identity, index) => (
          <motion.button
            key={identity.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.08, duration: 0.4 }}
            onClick={() => onSelect(identity)}
            className="group relative p-6 bg-zinc-950 border border-zinc-800 hover:border-[#86754f] transition-all duration-300 text-left"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-[#86754f]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="relative">
              <div className="flex items-baseline gap-3 mb-2">
                <span className="text-xl">{identity.name}</span>
                <span className="text-sm text-[#86754f]">{identity.abbreviation}</span>
              </div>
              <div className="text-xs text-gray-500">ICD-10: {identity.icd10}</div>
            </div>
          </motion.button>
        ))}
      </div>
      <div className="text-center mt-12">
        <button onClick={onBack} className="text-gray-500 hover:text-white transition-colors text-sm">
          ← Back to Class
        </button>
      </div>
    </motion.div>
  );
}

// Identity Detail Component
function IdentityDetail({ identity, selection, onBack }: { identity: Identity; selection: Selection; onBack: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -40 }}
      transition={{ duration: 0.4 }}
      className="max-w-4xl mx-auto"
    >
      {/* Path Visualization */}
      <div className="flex items-center justify-center gap-4 mb-12 text-sm">
        <div className="px-4 py-2 bg-zinc-900 border border-zinc-800">
          <div className="text-[#86754f]">{selection.region?.id}</div>
          <div className="text-xs text-gray-500">{selection.region?.name}</div>
        </div>
        <div className="text-gray-600">→</div>
        <div className="px-4 py-2 bg-zinc-900 border border-zinc-800">
          <div className="text-[#86754f]">{selection.origin?.abbreviation}</div>
          <div className="text-xs text-gray-500">{selection.origin?.name}</div>
        </div>
        <div className="text-gray-600">→</div>
        <div className="px-4 py-2 bg-zinc-900 border border-zinc-800">
          <div className="text-[#86754f] text-xs">{selection.class?.name}</div>
        </div>
        <div className="text-gray-600">→</div>
        <div className="px-4 py-2 bg-[#86754f]/20 border border-[#86754f]">
          <div className="text-[#86754f]">{identity.abbreviation}</div>
        </div>
      </div>

      {/* Main Detail Card */}
      <div className="bg-zinc-950 border border-zinc-800 p-8">
        {/* Header */}
        <div className="border-b border-zinc-800 pb-6 mb-6">
          <div className="flex items-baseline gap-4 mb-2">
            <h2 className="text-3xl">{identity.name}</h2>
            <span className="text-xl text-[#86754f]">{identity.abbreviation}</span>
          </div>
          <div className="text-sm text-gray-500">ICD-10: {identity.icd10}</div>
        </div>

        {/* Definition */}
        <div className="mb-8">
          <div className="text-xs tracking-widest text-gray-500 mb-2 uppercase">Definition</div>
          <p className="text-gray-300 leading-relaxed">{identity.definition}</p>
        </div>

        {/* Mechanism */}
        <div className="mb-8">
          <div className="text-xs tracking-widest text-gray-500 mb-2 uppercase">Mechanism</div>
          <p className="text-gray-300 leading-relaxed">{identity.mechanism}</p>
        </div>

        {/* ECG Features */}
        <div className="mb-8">
          <div className="text-xs tracking-widest text-gray-500 mb-3 uppercase">ECG Characteristics</div>
          <ul className="space-y-2">
            {identity.ecgFeatures.map((feature, index) => (
              <li key={index} className="flex items-start gap-3 text-gray-300">
                <span className="text-[#86754f] mt-1">•</span>
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Rate Note */}
        {identity.rateNote && (
          <div className="bg-zinc-900/50 border border-zinc-800 p-6 mt-8">
            <div className="text-xs tracking-widest text-[#86754f] mb-2 uppercase">Important Note</div>
            <p className="text-gray-400 text-sm leading-relaxed">{identity.rateNote}</p>
          </div>
        )}
      </div>

      <div className="text-center mt-12">
        <button onClick={onBack} className="text-gray-500 hover:text-white transition-colors text-sm">
          ← Back to Identities
        </button>
      </div>
    </motion.div>
  );
}
