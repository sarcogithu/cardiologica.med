import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Navigation } from '../components/Navigation';
import { SubpageHero } from '../components/SubpageHero';
import { EngineSection } from '../components/EngineSection';
import { Footer } from '../components/Footer';
import { TaxonomyExplorer } from '../components/TaxonomyExplorer';
import { ChevronDown } from 'lucide-react';
import { GearSix, Atom, MusicNote, Export, ChartLineUp, Certificate } from '@phosphor-icons/react';

const features = [
  {
    icon: <GearSix size={48} weight="light" color="#86754f" />,
    title: 'Deterministic Generation',
    description: 'Same seed + same params = identical output. Cryptographically verified.'
  },
  {
    icon: <Atom size={48} weight="light" color="#86754f" />,
    title: 'Construction-Guaranteed Labels',
    description: 'Labels are true because we built the waveform to match the taxonomy.'
  },
  {
    icon: <MusicNote size={48} weight="light" color="#86754f" />,
    title: '8 Rhythm Identities',
    description: 'SR, AF, AFL, VT, VF, AVNRT, Junctional, CHB. Growing to 35.'
  },
  {
    icon: <Export size={48} weight="light" color="#86754f" />,
    title: 'Multi-Format Export',
    description: 'HDF5, WFDB (PhysioNet), CSV, JSON. Plug into any training pipeline.'
  },
  {
    icon: <ChartLineUp size={48} weight="light" color="#86754f" />,
    title: 'Augmentation Proven',
    description: '+7.56 F1 points at 10% real data. Positive lift at all data fractions.'
  },
  {
    icon: <Certificate size={48} weight="light" color="#86754f" />,
    title: 'Patent-Pending Method',
    description: 'Ontology-constrained labeling methodology. Patent 63/943,976.'
  }
];

const augmentationData = [
  { fraction: '10% real data', lift: '+7.56 F1' },
  { fraction: '25% real data', lift: '+5.36 F1' },
  { fraction: '50% real data', lift: '+4.03 F1' },
  { fraction: '100% real data', lift: '+0.76 F1' },
];

const faqs = [
  {
    question: 'What is Cardiologica-AI?',
    answer: 'A synthetic ECG generation platform for AI training data. It produces physiologically accurate waveforms with construction-guaranteed labels, eliminating annotator disagreement.'
  },
  {
    question: 'How are the labels guaranteed?',
    answer: 'Waveforms are built from the ROCI taxonomy. The label IS the generation instruction. If we tell the generator to build Atrial Fibrillation, the resulting waveform has fibrillatory baseline, irregular RR intervals, and absent P-waves by construction.'
  },
  {
    question: 'What rhythms are supported?',
    answer: '8 currently: Sinus Rhythm, Atrial Fibrillation, Atrial Flutter, Ventricular Tachycardia, Ventricular Fibrillation, AVNRT, Junctional Rhythm, and Complete Heart Block. Expanding to all 35 canonical identities.'
  },
  {
    question: 'How does augmentation work?',
    answer: 'Add our synthetic data to your limited real dataset. Our controlled experiment shows positive F1 lift at every data fraction tested, from 10% to 100% of available real data.'
  },
  {
    question: 'Is this a medical device?',
    answer: 'No. Cardiologica-AI is non-SaMD. It generates training data, not clinical interpretations. The synthetic ECGs are for model development and research only.'
  },
  {
    question: 'How do I get access?',
    answer: 'Contact us for API access and dataset licensing. We offer research partnerships, commercial licenses, and custom generation contracts.'
  }
];

export function AIPage() {
  const [showTaxonomy, setShowTaxonomy] = useState(false);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);
  const [glowPosition, setGlowPosition] = useState({ x: 30, y: 40 });

  useEffect(() => {
    const animate = () => {
      const duration = 10000 + Math.random() * 5000;
      const nextX = 20 + Math.random() * 60;
      const nextY = 20 + Math.random() * 60;
      setGlowPosition({ x: nextX, y: nextY });
      setTimeout(animate, duration);
    };
    animate();
  }, []);

  if (showTaxonomy) {
    return <TaxonomyExplorer onClose={() => setShowTaxonomy(false)} />;
  }

  return (
    <div className="min-h-screen w-full bg-black text-white overflow-x-hidden">
      <Navigation alwaysVisible />
      <SubpageHero
        title="CARDIOLOGICA-AI"
        subtitle="Synthetic ECG Training Data Platform"
        tagline="Deterministic generation. Construction-guaranteed labels."
      />

      {/* Overview */}
      <section className="relative pt-16 px-8 bg-black" style={{ paddingBottom: '120px' }}>
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                             linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
            backgroundSize: '50px 50px'
          }}></div>
        </div>
        <div className="relative max-w-7xl mx-auto px-8">
          <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <div className="text-sm tracking-widest text-gray-400 mb-4">OVERVIEW</div>
            <h2 className="text-5xl mb-8">Labels True by Construction</h2>
            <p className="text-xl text-gray-300 mb-4">
              Most AI training data is labeled by humans who disagree 15-30% of the time. Cardiologica-AI generates synthetic ECGs where the label is guaranteed correct because the waveform was built from the taxonomy. No annotators. No disagreement. No ambiguity.
            </p>
          </div>
        </div>
      </section>

      {/* Feature Grid */}
      <section className="relative py-32 px-8 bg-[#0a0a0a] overflow-hidden">
        <div
          className="absolute inset-0 w-full h-full"
          style={{
            backgroundImage: `
              linear-gradient(to right, #000000 1px, transparent 1px),
              linear-gradient(to bottom, #000000 1px, transparent 1px)
            `,
            backgroundSize: '32px 32px',
            opacity: 0.2
          }}
        />
        <motion.div
          className="absolute inset-0 w-full h-full pointer-events-none"
          style={{ filter: 'blur(80px)' }}
          animate={{
            background: `radial-gradient(ellipse 50% 50% at ${glowPosition.x}% ${glowPosition.y}%,
              rgba(134, 117, 77, 0.12) 0%,
              rgba(134, 117, 77, 0.06) 40%,
              transparent 70%)`
          }}
          transition={{ duration: 12.5, ease: [0.25, 0.1, 0.25, 1] }}
        />
        <div className="relative max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <div className="text-sm tracking-widest text-gray-400 mb-4">CAPABILITIES</div>
            <h2 className="text-5xl mb-6">Engineered for Training Data Quality</h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Every waveform is deterministic. Every label is guaranteed.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="p-8 bg-black border border-zinc-800 hover:border-zinc-700 transition-all group rounded-lg">
                <div className="text-5xl mb-6">{feature.icon}</div>
                <h3 className="text-2xl mb-4">{feature.title}</h3>
                <p className="text-gray-400">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Validation - Augmentation Results */}
      <section className="relative py-32 px-8 bg-black">
        <div className="relative max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="text-sm tracking-widest text-gray-400 mb-4">VALIDATION</div>
              <h2 className="text-5xl mb-8">Proven Augmentation Value</h2>
              <p className="text-xl text-gray-300 mb-6">
                Controlled experiment on PhysioNet Challenge 2017 data. Synthetic augmentation produces positive F1 lift at every data fraction tested.
              </p>
              <div className="mt-8 p-4 border border-emerald-900/30 bg-emerald-950/10 rounded">
                <div className="text-sm text-gray-400 mb-3">Peak Augmentation Lift:</div>
                <div className="text-lg text-emerald-400">
                  +7.56 F1 points at 10% real data
                </div>
              </div>
            </div>
            <div>
              <div className="w-full bg-gradient-to-br from-zinc-900 to-black rounded-lg border border-zinc-800 p-6">
                <div className="text-sm text-gray-400 mb-4">Mix Experiment Results</div>
                <div className="space-y-2 text-sm">
                  {augmentationData.map((row, i) => (
                    <div key={i} className="flex justify-between border-b border-zinc-800 pb-2 last:border-b-0">
                      <span className="text-gray-400">{row.fraction}</span>
                      <span className="text-emerald-400">{row.lift}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="mt-8">
                <div className="text-lg font-medium mb-2" style={{ color: '#86754f' }}>Need training data?</div>
                <p className="text-sm text-gray-400 mb-4">
                  We provide custom synthetic datasets for research teams, device manufacturers, and AI companies building ECG classification models.
                </p>
                <a href="mailto:devteam@cardiologica.med?subject=Synthetic%20Data%20Request" className="inline-block px-8 py-2 text-sm rounded transition-all text-white hover:opacity-90" style={{ background: 'linear-gradient(135deg, #86754f 0%, #5c5035 100%)' }}>
                  Request a Sample Dataset
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Framework (shared) */}
      <EngineSection onExploreTaxonomy={() => setShowTaxonomy(true)} />

      {/* FAQ */}
      <section className="relative py-32 px-8 bg-black">
        <div className="relative max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <div className="text-sm tracking-widest text-gray-400 mb-4">SUPPORT</div>
            <h2 className="text-5xl mb-6">Frequently Asked Questions</h2>
          </div>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-black rounded-xl">
                <button
                  onClick={() => setOpenFaqIndex(openFaqIndex === index ? null : index)}
                  className="w-full px-8 py-6 flex items-center justify-between text-left"
                >
                  <span className="text-xl pr-8">{faq.question}</span>
                  <ChevronDown className={`w-6 h-6 flex-shrink-0 transition-transform ${openFaqIndex === index ? 'rotate-180' : ''}`} />
                </button>
                {openFaqIndex === index && (
                  <div className="px-8 pb-6 text-gray-400">{faq.answer}</div>
                )}
              </div>
            ))}
          </div>
          <div className="mt-16 text-center">
            <p className="text-gray-400 mb-6">Need additional support?</p>
            <a href="mailto:devteam@cardiologica.med?subject=Cardiologica-AI%20Inquiry" className="inline-block px-8 py-3 border border-white hover:bg-white hover:text-black transition-all">
              Contact Research Team
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
