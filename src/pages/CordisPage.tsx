import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Navigation } from '../components/Navigation';
import { EngineSection } from '../components/EngineSection';
import { Footer } from '../components/Footer';
import { TaxonomyExplorer } from '../components/TaxonomyExplorer';
import { ChevronDown } from 'lucide-react';
import { TreeStructure, Stack, Monitor, Exam, Sparkle, BookOpen } from '@phosphor-icons/react';

const features = [
  {
    icon: <TreeStructure size={48} weight="light" color="#6CC8D0" style={{ transform: 'rotate(90deg)' }} />,
    title: '35 Rhythm Identities',
    description: 'Every clinically relevant rhythm, from sinus to ventricular fibrillation.'
  },
  {
    icon: <Stack size={48} weight="light" color="#A97CF8" />,
    title: 'Three Ontology Layers',
    description: 'Rhythm + Conduction + Conditions stack independently and correctly.'
  },
  {
    icon: <Monitor size={48} weight="light" color="#4AE8A0" />,
    title: 'Paper + Monitor Display',
    description: "See ECGs the way you'll see them in the field, the ED, or the ICU."
  },
  {
    icon: <Exam size={48} weight="light" color="#6CC8D0" />,
    title: 'QBank Test Mode',
    description: '25+ questions spanning basic through expert. Paramedic to physician.'
  },
  {
    icon: <Sparkle size={48} weight="light" color="#A97CF8" />,
    title: 'Aurora Highlight Engine',
    description: 'Critical findings glow on the waveform so students know exactly where to look.'
  },
  {
    icon: <BookOpen size={48} weight="light" color="#4AE8A0" />,
    title: 'OpenEvidence Integration',
    description: 'Evidence-based clinical flashcards with citations for every condition.'
  }
];

const faqs = [
  {
    question: 'What is CORDIS-DX?',
    answer: 'An interactive ECG education simulator where you build rhythms and conditions from the ground up. Select a base rhythm, layer on conduction abnormalities, add diagnostic conditions, and watch the 12-lead waveform respond in real time.'
  },
  {
    question: 'Who is it for?',
    answer: 'Paramedic students, nursing students, PA students, medical students, residents, and practicing clinicians. Anyone who reads ECGs benefits from understanding how waveforms are constructed from underlying electrophysiology.'
  },
  {
    question: 'Is it a medical device?',
    answer: 'No. CORDIS-DX is an educational tool, not a clinical decision support system. It is designed for learning and practice, not for clinical interpretation of patient ECGs.'
  },
  {
    question: 'How much does it cost?',
    answer: 'Free forever for the full simulator with all rhythms, conduction modifiers, and conditions. Pro is $4.99/month or $29.99/year for full QBank access, analytics, and export tools. Institutional pricing starts at $29/seat/year for programs with 10+ students.'
  },
  {
    question: 'Does it work on iPad?',
    answer: 'Yes. CORDIS-DX runs in any modern browser and is optimized for iPad landscape. It also works on desktop, Android tablets, and large-screen phones.'
  },
  {
    question: 'Can my program use it for assignments?',
    answer: 'Yes. Test mode includes student name, institution, and instructor fields. Students save results as PDF for submission and grading.'
  }
];

const STRIPE_LINKS = {
  proMonthly: 'https://buy.stripe.com/14AeVfccL13pcaP3St0oM01',
  proAnnual: 'https://buy.stripe.com/cNibJ3foX8vR4In9cN0oM00',
};

export function CordisPage() {
  const [showTaxonomy, setShowTaxonomy] = useState(false);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);
  const [billingPeriod, setBillingPeriod] = useState<'monthly' | 'annual'>('annual');
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

      {/* CORDIS Hero with aurora gradient */}
      <section className="relative w-full flex items-center justify-center bg-black pt-32 pb-20" style={{ minHeight: '45vh' }}>
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
        <div className="relative z-10 text-center px-8">
          <div className="text-sm tracking-widest text-gray-400 mb-6">INTERACTIVE ECG EDUCATION SIMULATOR</div>
          <h1
            className="text-6xl md:text-7xl tracking-tight mb-6"
            style={{
              background: 'linear-gradient(135deg, #A97CF8, #6CC8D0, #4AE8A0)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            CORDIS-DX
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Build any rhythm. Layer any condition. See it on any monitor.
          </p>
        </div>
      </section>

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
            <h2
              className="text-5xl mb-8"
              style={{
                background: 'linear-gradient(135deg, #A97CF8, #6CC8D0, #4AE8A0)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              Learn by Building
            </h2>
            <p className="text-xl text-gray-300 mb-12">
              CORDIS-DX lets you construct ECGs from the ground up. Select a rhythm, layer on conduction changes, add diagnostic patterns, and watch the waveform respond in real time across all 12 leads. One simulator, every environment, every layer of cardiac pathology.
            </p>
          </div>

          {/* Screenshot - full width */}
          <div className="w-full rounded-lg overflow-hidden border border-zinc-800 mb-8">
            <img
              src="/cordis-screenshot.png"
              alt="CORDIS-DX Interface — Sinus Bradycardia with Hyperkalemia Syndrome"
              className="w-full h-auto"
            />
          </div>
          <div className="text-center">
            <a
              href="mailto:devteam@cardiologica.med?subject=CORDIS-DX%20Access"
              className="inline-block px-8 py-2 text-sm rounded transition-all text-white hover:opacity-90"
              style={{ background: 'linear-gradient(135deg, #A97CF8 0%, #4AE8A0 100%)' }}
            >
              Try CORDIS-DX
            </a>
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
              rgba(106, 200, 208, 0.12) 0%,
              rgba(169, 124, 248, 0.06) 40%,
              transparent 70%)`
          }}
          transition={{ duration: 12.5, ease: [0.25, 0.1, 0.25, 1] }}
        />
        <div className="relative max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <div className="text-sm tracking-widest text-gray-400 mb-4">FEATURES</div>
            <h2
              className="text-5xl mb-6"
              style={{
                background: 'linear-gradient(135deg, #A97CF8, #6CC8D0, #4AE8A0)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              Built for Education
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Every rhythm. Every condition. Every lead.
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

      {/* Validation - Built by Clinicians */}
      <section className="relative py-32 px-8 bg-black">
        <div className="relative max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="text-sm tracking-widest text-gray-400 mb-4">VALIDATION</div>
              <h2
                className="text-5xl mb-8"
                style={{
                  background: 'linear-gradient(135deg, #A97CF8, #6CC8D0, #4AE8A0)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                Built by Clinicians
              </h2>
              <p className="text-xl text-gray-300 mb-6">
                Created by a combat veteran, critical care paramedic (FP-C, TP-C), and StatPearls Tactical Paramedic Editor-in-Chief.
              </p>
              <p className="text-xl text-gray-300 mb-6">
                Every waveform is physiologically accurate. Every condition follows published guidelines.
              </p>
              <div className="mt-8 p-4 border border-zinc-800 rounded">
                <div className="text-sm text-gray-400 mb-3">References:</div>
                <div className="text-sm text-gray-500 space-y-1">
                  <div>O'Gara PT, et al. (2013) STEMI Guidelines</div>
                  <div>Thygesen K, et al. (2018) Fourth Universal Definition of MI</div>
                  <div>Zimetbaum PJ, Josephson ME. (2003) NEJM Arrhythmia Review</div>
                  <div>Wagner GS, et al. (2009) AHA ECG Interpretation Standards</div>
                </div>
              </div>
            </div>
            <div className="flex flex-col items-center justify-center">
              <div className="grid grid-cols-2 gap-8 text-center">
                <div>
                  <div className="text-4xl mb-2" style={{ color: '#6CC8D0' }}>35</div>
                  <div className="text-gray-400">Rhythm Identities</div>
                </div>
                <div>
                  <div className="text-4xl mb-2" style={{ color: '#A97CF8' }}>50+</div>
                  <div className="text-gray-400">Conduction Features</div>
                </div>
                <div>
                  <div className="text-4xl mb-2" style={{ color: '#4AE8A0' }}>48</div>
                  <div className="text-gray-400">Diagnostic Patterns</div>
                </div>
                <div>
                  <div className="text-4xl mb-2" style={{ color: '#6CC8D0' }}>12</div>
                  <div className="text-gray-400">Lead Display</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="relative py-32 px-8 bg-[#0a0a0a]">
        <div className="relative max-w-[1100px] mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h2 className="text-[32px] font-medium tracking-[0.5px] mb-2">Simple pricing</h2>
            <p className="text-[15px]" style={{ color: 'rgba(255,255,255,0.5)' }}>
              Same clinical content at every tier. Pay for the tools that help you prove you learned it.
            </p>
          </div>

          {/* Three Tiers */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-[72px]">
            {/* FREE */}
            <div className="border border-white/10 rounded-2xl p-8 flex flex-col hover:border-white/20 transition-all" style={{ background: 'rgba(255,255,255,0.02)' }}>
              <div className="text-xs font-semibold uppercase tracking-[2px] mb-3.5" style={{ color: 'rgba(255,255,255,0.45)' }}>Free</div>
              <div className="text-4xl font-medium mb-1">$0</div>
              <div className="text-xs mb-5 min-h-[18px]" style={{ color: 'rgba(255,255,255,0.3)' }}>Free forever</div>
              <div className="text-sm leading-relaxed mb-5" style={{ color: 'rgba(255,255,255,0.5)' }}>
                The full ECG simulator. Learn at your own pace with every rhythm and condition.
              </div>
              <div className="h-px mb-5" style={{ background: 'rgba(255,255,255,0.06)' }} />
              <ul className="flex-1 mb-6 space-y-0">
                <li className="text-xs font-semibold uppercase tracking-[1px] pt-3 pb-1" style={{ color: 'rgba(255,255,255,0.4)' }}>Simulator</li>
                {['All 35 rhythm identities', 'All 51 conduction modifiers', 'All 48 pathognomonic patterns', 'Full MØRPHLΔB access', 'Learn mode with guided content', 'OpenEvidence clinical cards', 'Paper 12-lead and monitor views'].map(f => (
                  <li key={f} className="text-[13px] leading-relaxed py-[5px] pl-6 relative" style={{ color: 'rgba(255,255,255,0.6)' }}>
                    <span className="absolute left-0 font-bold text-xs" style={{ color: '#86754F' }}>✓</span>{f}
                  </li>
                ))}
                <li className="text-xs font-semibold uppercase tracking-[1px] pt-3 pb-1" style={{ color: 'rgba(255,255,255,0.4)' }}>Testing</li>
                <li className="text-[13px] leading-relaxed py-[5px] pl-6 relative" style={{ color: 'rgba(255,255,255,0.6)' }}>
                  <span className="absolute left-0 font-bold text-xs" style={{ color: '#86754F' }}>✓</span>5 sample QBank questions
                </li>
                {['Full QBank (all levels)', 'Study mode with explanations', 'Test history and analytics', 'PDF export with credentials', 'Flagged questions and incorrect queue', 'Anki, Notion, GoodNotes export'].map(f => (
                  <li key={f} className="text-[13px] leading-relaxed py-[5px] pl-6 relative" style={{ color: 'rgba(255,255,255,0.2)' }}>
                    <span className="absolute left-0" style={{ color: 'rgba(255,255,255,0.15)' }}>—</span>{f}
                  </li>
                ))}
              </ul>
              <button className="w-full py-3.5 rounded-[10px] text-[13px] font-semibold uppercase tracking-[0.8px] border border-white/10 hover:opacity-90 hover:-translate-y-px transition-all" style={{ background: 'rgba(255,255,255,0.06)', color: 'rgba(255,255,255,0.7)' }}>
                Get started free
              </button>
            </div>

            {/* PRO — AURORA */}
            <div className="rounded-2xl p-8 flex flex-col relative hover:border-white/20 transition-all" style={{
              border: '2px solid transparent',
              backgroundOrigin: 'border-box',
              backgroundClip: 'padding-box, border-box',
              backgroundImage: 'linear-gradient(#000, #000), linear-gradient(135deg, #A97CF8, #6CC8D0, #4AE8A0)',
              boxShadow: '0 0 24px rgba(169,124,248,0.15), 0 0 48px rgba(74,232,160,0.08)',
            }}>
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 text-[10px] font-semibold uppercase tracking-[1.5px] px-4 py-1 rounded-xl text-black whitespace-nowrap" style={{ background: 'linear-gradient(135deg, #A97CF8, #6CC8D0, #4AE8A0)' }}>
                Most popular
              </div>
              <div className="text-xs font-semibold uppercase tracking-[2px] mb-3.5" style={{ color: 'rgba(255,255,255,0.45)' }}>Pro</div>
              <div className="text-4xl font-medium mb-1">
                {billingPeriod === 'monthly' ? '$4.99' : '$29.99'} <span className="text-sm font-normal" style={{ color: 'rgba(255,255,255,0.4)' }}>{billingPeriod === 'monthly' ? '/month' : '/year'}</span>
              </div>
              <div className="text-xs mb-3 min-h-[18px]" style={{ color: 'rgba(255,255,255,0.3)' }}>
                {billingPeriod === 'monthly' ? '$59.88/year at monthly rate' : 'Save 50% vs monthly'}
              </div>
              {/* Billing toggle */}
              <div className="flex items-center gap-2 mb-5">
                <button
                  onClick={() => setBillingPeriod('monthly')}
                  className="text-xs px-3 py-1 rounded-full transition-all"
                  style={{
                    background: billingPeriod === 'monthly' ? 'rgba(255,255,255,0.1)' : 'transparent',
                    color: billingPeriod === 'monthly' ? 'rgba(255,255,255,0.9)' : 'rgba(255,255,255,0.3)',
                    border: billingPeriod === 'monthly' ? '1px solid rgba(255,255,255,0.2)' : '1px solid transparent',
                  }}
                >
                  Monthly
                </button>
                <button
                  onClick={() => setBillingPeriod('annual')}
                  className="text-xs px-3 py-1 rounded-full transition-all"
                  style={{
                    background: billingPeriod === 'annual' ? 'rgba(255,255,255,0.1)' : 'transparent',
                    color: billingPeriod === 'annual' ? 'rgba(255,255,255,0.9)' : 'rgba(255,255,255,0.3)',
                    border: billingPeriod === 'annual' ? '1px solid rgba(255,255,255,0.2)' : '1px solid transparent',
                  }}
                >
                  Annual
                </button>
              </div>
              <div className="text-sm leading-relaxed mb-5" style={{ color: 'rgba(255,255,255,0.5)' }}>
                Full testing and tracking. Everything you need to prepare for NREMT, boards, or certification exams.
              </div>
              <div className="h-px mb-5" style={{ background: 'linear-gradient(90deg, rgba(169,124,248,0.2), rgba(108,200,208,0.2), rgba(74,232,160,0.2))' }} />
              <ul className="flex-1 mb-6 space-y-0">
                <li className="text-xs font-semibold uppercase tracking-[1px] pt-3 pb-1" style={{ color: 'rgba(255,255,255,0.4)' }}>Everything in Free, plus</li>
                {['Full QBank — all difficulty levels', 'Study mode with full explanations', 'Exam mode (timed, no feedback)', 'Test history and score analytics', 'Incorrect queue (retake missed)', 'Flagged question review', 'PDF export with name, institution, instructor', 'All monitor skins (field, clinical, ICU)', 'Anki (.apkg) export', 'Notion, Notability, GoodNotes export', 'Aurora highlight engine on waveforms', 'Priority access to new content'].map(f => (
                  <li key={f} className="text-[13px] leading-relaxed py-[5px] pl-6 relative" style={{ color: 'rgba(255,255,255,0.6)' }}>
                    <span className="absolute left-0 font-bold text-xs" style={{ background: 'linear-gradient(135deg, #A97CF8, #6CC8D0, #4AE8A0)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>✓</span>{f}
                  </li>
                ))}
              </ul>
              <a
                href={billingPeriod === 'monthly' ? STRIPE_LINKS.proMonthly : STRIPE_LINKS.proAnnual}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full py-3.5 rounded-[10px] text-[13px] font-bold uppercase tracking-[0.8px] text-black text-center hover:opacity-90 hover:-translate-y-px transition-all"
                style={{ background: 'linear-gradient(135deg, #A97CF8, #6CC8D0, #4AE8A0)' }}
              >
                Start pro
              </a>
            </div>

            {/* INSTITUTIONAL */}
            <div className="border border-white/10 rounded-2xl p-8 flex flex-col hover:border-white/20 transition-all" style={{ background: 'rgba(255,255,255,0.02)' }}>
              <div className="text-xs font-semibold uppercase tracking-[2px] mb-3.5" style={{ color: 'rgba(255,255,255,0.45)' }}>Institutional</div>
              <div className="text-4xl font-medium mb-1">$29–39 <span className="text-sm font-normal" style={{ color: 'rgba(255,255,255,0.4)' }}>/seat/year</span></div>
              <div className="text-xs mb-5 min-h-[18px]" style={{ color: 'rgba(255,255,255,0.3)' }}>Volume pricing for 10+ seats</div>
              <div className="text-sm leading-relaxed mb-5" style={{ color: 'rgba(255,255,255,0.5)' }}>
                For paramedic programs, nursing schools, PA programs, residencies, and hospital departments.
              </div>
              <div className="h-px mb-5" style={{ background: 'rgba(255,255,255,0.06)' }} />
              <ul className="flex-1 mb-6 space-y-0">
                <li className="text-xs font-semibold uppercase tracking-[1px] pt-3 pb-1" style={{ color: 'rgba(255,255,255,0.4)' }}>Everything in Pro, plus</li>
                {['Instructor dashboard', 'Student progress tracking', 'Assignment creation and scheduling', 'Class-level analytics and reporting', 'Custom question authoring', 'Teaching mode (present to class)', 'PDF reports with institutional branding', 'Microsoft 365 SSO for students', 'Custom case builder', 'Dedicated support', 'LMS / LTI integration (coming soon)', 'CME tracking (coming soon)'].map(f => (
                  <li key={f} className="text-[13px] leading-relaxed py-[5px] pl-6 relative" style={{ color: 'rgba(255,255,255,0.6)' }}>
                    <span className="absolute left-0 font-bold text-xs" style={{ color: '#86754F' }}>✓</span>{f}
                  </li>
                ))}
              </ul>
              <a
                href="mailto:institutions@cardiologica.med?subject=CORDIS-DX%20Institutional%20Inquiry"
                className="block w-full py-3.5 rounded-[10px] text-[13px] font-semibold uppercase tracking-[0.8px] border text-center hover:opacity-90 hover:-translate-y-px transition-all"
                style={{ background: 'transparent', color: '#86754F', borderColor: 'rgba(134,117,79,0.4)' }}
              >
                Contact us
              </a>
            </div>
          </div>

          {/* Institutional Detail */}
          <div className="border-t border-white/[0.08] pt-14">
            <div className="text-center mb-9">
              <h3 className="text-[26px] font-medium mb-2">Institutional pricing</h3>
              <p className="text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.45)' }}>
                Volume discounts based on seat count. All plans include full Pro access for every student.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-9">
              {[
                { name: 'Program', price: '$39', unit: '/seat/year', desc: '10–60 students\nParamedic, nursing, or PA programs' },
                { name: 'Department', price: '$29', unit: '/seat/year', desc: '61–250 seats\nHospital departments, residency programs' },
                { name: 'Enterprise', price: 'Custom', unit: '', desc: '251+ seats\nHealth systems, multi-site deployments' },
              ].map(tier => (
                <div key={tier.name} className="border border-white/[0.08] rounded-2xl p-7 text-center" style={{ background: 'rgba(255,255,255,0.02)' }}>
                  <div className="text-[11px] font-semibold uppercase tracking-[2px] mb-2.5" style={{ color: 'rgba(255,255,255,0.4)' }}>{tier.name}</div>
                  <div className="text-[28px] font-medium">{tier.price} {tier.unit && <span className="text-xs font-normal" style={{ color: 'rgba(255,255,255,0.35)' }}>{tier.unit}</span>}</div>
                  <div className="text-xs mt-3.5 leading-relaxed whitespace-pre-line" style={{ color: 'rgba(255,255,255,0.35)' }}>{tier.desc}</div>
                </div>
              ))}
            </div>

            <div className="max-w-[700px] mx-auto mb-7">
              <h4 className="text-[13px] font-medium uppercase tracking-[1.5px] text-center mb-4" style={{ color: 'rgba(255,255,255,0.5)' }}>
                Included with every institutional plan
              </h4>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-1.5">
                {['Instructor dashboard', 'Microsoft 365 SSO', 'Student progress tracking', 'Assignment creation tools', 'Class analytics and reporting', 'Custom question authoring', 'PDF reports with school branding', 'Priority support'].map(f => (
                  <li key={f} className="text-[12.5px] leading-relaxed py-1 pl-5 relative" style={{ color: 'rgba(255,255,255,0.45)' }}>
                    <span className="absolute left-0 font-bold text-[11px]" style={{ color: '#86754F' }}>✓</span>{f}
                  </li>
                ))}
              </ul>
            </div>

            <div className="text-center text-xs leading-loose max-w-[600px] mx-auto" style={{ color: 'rgba(255,255,255,0.25)' }}>
              <span className="inline-block mt-3 text-[11px] tracking-[0.5px]" style={{ color: 'rgba(134,117,79,0.5)' }}>
                SDVOSB certified — eligible for VA and DoD procurement — GSA schedule pending
              </span>
              <br />
              <a href="mailto:institutions@cardiologica.med" className="inline-block mt-2 text-sm font-medium tracking-[0.3px] hover:text-white transition-colors" style={{ color: 'rgba(255,255,255,0.5)' }}>
                institutions@cardiologica.med
              </a>
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
            <a href="mailto:devteam@cardiologica.med?subject=CORDIS-DX%20Inquiry" className="inline-block px-8 py-3 border border-white hover:bg-white hover:text-black transition-all">
              Contact Research Team
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
