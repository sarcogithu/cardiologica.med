import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

const faqs = [
  {
    question: 'How is this different from AI-based ECG interpretation?',
    answer: 'Most AI systems are black boxes that output a diagnosis without explaining how they got there. Cardiologica is deterministic: same input always produces the same output, with a complete reasoning trail. Every classification follows the ROCI traversal (Region → Origin → Class → Identity) and logs the evidence chain. No neural networks. No probability scores. Just mechanistic logic you can audit and defend.'
  },
  {
    question: 'What rhythms can Cardiologica classify?',
    answer: '35 canonical rhythm identities covering the full spectrum of supraventricular and ventricular arrhythmias, from Sinus Rhythm to Ventricular Fibrillation, including AVNRT, AVRT, Atrial Flutter, Atrial Fibrillation, and all ventricular tachycardia variants. Each identity maps to a specific ICD-10 code for documentation and billing.'
  },
  {
    question: 'Does Cardiologica detect STEMI and other critical findings?',
    answer: 'Yes. The Pathognomonics Ontology screens for 7 diagnostic domains including ischemia (STEMI by territory), Brugada pattern, Wellens syndrome, WPW/preexcitation, long QT, and hyperkalemia. Critical findings trigger alerts with recommended clinical actions.'
  },
  {
    question: 'Is Cardiologica FDA cleared?',
    answer: 'Not yet. Cardiologica is designed from day one for FDA 510(k) submission as a Class II Software as Medical Device (SaMD). The architecture aligns with IEC 62304, ISO 14971, IEC 62366, and IEC 81001-5-1. We are currently in validation and seeking clinical pilot partners.'
  },
  {
    question: 'What ECG formats are supported?',
    answer: 'Cardiologica supports standard formats including WFDB (PhysioNet), EDF, and CSV. Single-lead to 12-lead analysis with lead-specific pattern recognition. We are building integrations for common EHR and monitor exports.'
  },
  {
    question: 'Can I validate Cardiologica on my own data?',
    answer: 'Yes. We benchmark exclusively on public PhysioNet databases, no proprietary test sets. We welcome validation partnerships with institutions, device manufacturers, and researchers. Send us your toughest cases.'
  }
];

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="relative py-32 px-8 bg-black">
      <div className="relative max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <div className="text-sm tracking-widest text-gray-400 mb-4">SUPPORT</div>
          <h2 className="text-5xl mb-6">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-black rounded-xl"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full px-8 py-6 flex items-center justify-between text-left"
              >
                <span className="text-xl pr-8">{faq.question}</span>
                <ChevronDown
                  className={`w-6 h-6 flex-shrink-0 transition-transform ${
                    openIndex === index ? 'rotate-180' : ''
                  }`}
                />
              </button>
              {openIndex === index && (
                <div className="px-8 pb-6 text-gray-400">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <p className="text-gray-400 mb-6">Need additional support?</p>
          <a href="mailto:devteam@cardiologica.med?subject=Cardiologica%20Inquiry" className="inline-block px-8 py-3 border border-white hover:bg-white hover:text-black transition-all">
            Contact Research Team
          </a>
        </div>
      </div>
    </section>
  );
}