export function TechnologyShowcase() {
  return (
    <section className="relative py-32 px-8 bg-black">
      <div className="relative max-w-7xl mx-auto">
        {/* First Block - Honest */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-32">
          <div>
            <div className="text-sm tracking-widest text-gray-400 mb-4">VALIDATION</div>
            <h2 className="text-5xl mb-8">
              Honest
            </h2>
            <p className="text-xl text-gray-300 mb-6">
              Benchmarked against gold-standard PhysioNet databases with cardiologist-verified ground truth. Honest about what we know, and what we don't.
            </p>
            <div className="grid grid-cols-2 gap-8 mt-8">
              <div>
                <div className="text-4xl mb-2">87.9%</div>
                <div className="text-gray-400">Overall Accuracy</div>
              </div>
              <div>
                <div className="text-4xl mb-2">{'<'}0.1s</div>
                <div className="text-gray-400">Classification Time</div>
              </div>
              <div>
                <div className="text-4xl mb-2">2,235</div>
                <div className="text-gray-400">Validated Records</div>
              </div>
              <div>
                <div className="text-4xl mb-2">35</div>
                <div className="text-gray-400">Rhythm Identities</div>
              </div>
            </div>
            <div className="mt-8 p-4 border border-emerald-900/30 bg-emerald-950/10 rounded">
              <div className="text-sm text-gray-400 mb-3">Life-Threatening Arrhythmia Detection:</div>
              <div className="flex gap-12 text-lg text-emerald-400">
                <span>✓ 97.1% VT/VF</span>
                <span>✓ 94.9% STEMI <span style={{ fontSize: '0.625em' }}>(n=665, Sens 98.2%, Spec 93.8%)</span></span>
              </div>
            </div>
          </div>

          <div>
            {/* Accuracy table */}
            <div className="w-full bg-gradient-to-br from-zinc-900 to-black rounded-lg border border-zinc-800 p-6">
              <div className="text-sm text-gray-400 mb-4">Accuracy Breakdown</div>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between border-b border-zinc-800 pb-2">
                  <span className="text-gray-400">STEMI Detection</span>
                  <span className="text-emerald-400">94.9%</span>
                </div>
                <div className="flex justify-between border-b border-zinc-800 pb-2">
                  <span className="text-gray-400">VT/VF Identification</span>
                  <span className="text-emerald-400">97.1%</span>
                </div>
                <div className="flex justify-between border-b border-zinc-800 pb-2">
                  <span className="text-gray-400">AFib Recognition</span>
                  <span className="text-emerald-400">89.1%</span>
                </div>
                <div className="flex justify-between pb-2">
                  <span className="text-gray-400">Overall Performance</span>
                  <span className="text-cyan-400">87.9%</span>
                </div>
              </div>
            </div>

            {/* Challenge CTA */}
            <div className="mt-8">
              <div className="text-lg font-medium mb-2" style={{ color: '#86754f' }}>Have a dataset? Challenge us.</div>
              <p className="text-sm text-gray-400 mb-4">
                We're actively seeking validation partnerships with institutions, device manufacturers, and researchers. If you have labeled ECG data, we'll run Cardiologica against it—and share the results.
              </p>
              <a href="mailto:TC@sarc-usa.com?subject=Dataset%20Validation%20Request" className="inline-block px-8 py-2 text-sm rounded transition-all text-white hover:opacity-90" style={{ background: 'linear-gradient(135deg, #86754f 0%, #5c5035 100%)' }}>
                Send us a Dataset
              </a>
            </div>
          </div>
        </div>

        {/* Second Block - Infrastructure */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="order-2 lg:order-1">
            {/* JSON Output Mockup */}
            <div className="w-full bg-black rounded-xl p-6 font-mono text-xs leading-relaxed overflow-hidden">
              <div className="text-lg mb-4" style={{ color: '#9CA3AF' }}>
                Sample Audit Trail
              </div>

              <pre style={{ color: '#9CA3AF', whiteSpace: 'pre-wrap' }}>{`{
  `}<span style={{ color: '#86754f' }}>"ecg_id"</span>{`: `}<span style={{ color: '#FFFFFF' }}>"07234"</span>{`,
  `}<span style={{ color: '#86754f' }}>"timestamp"</span>{`: `}<span style={{ color: '#6B7280' }}>"2026-01-13T09:41:03Z"</span>{`,

  `}<span style={{ color: '#86754f' }}>"roci"</span>{`: {
    `}<span style={{ color: '#86754f' }}>"region"</span>{`: `}<span style={{ color: '#FFFFFF' }}>"SVr"</span>{`,
    `}<span style={{ color: '#86754f' }}>"origin"</span>{`: `}<span style={{ color: '#FFFFFF' }}>"SAn"</span>{`,
    `}<span style={{ color: '#86754f' }}>"class"</span>{`: `}<span style={{ color: '#FFFFFF' }}>"regular_automaticity"</span>{`,
    `}<span style={{ color: '#86754f' }}>"identity"</span>{`: `}<span style={{ color: '#10B981' }}>"Sinus Rhythm"</span>{`,
    `}<span style={{ color: '#86754f' }}>"icd10"</span>{`: `}<span style={{ color: '#6B7280' }}>"I49.8"</span>{`
  },

  `}<span style={{ color: '#86754f' }}>"intrinsics"</span>{`: {
    `}<span style={{ color: '#86754f' }}>"rate_state"</span>{`: `}<span style={{ color: '#FFFFFF' }}>"normocardic"</span>{`,
    `}<span style={{ color: '#86754f' }}>"qrs_duration"</span>{`: `}<span style={{ color: '#FFFFFF' }}>"narrow"</span>{`,
    `}<span style={{ color: '#86754f' }}>"axis"</span>{`: `}<span style={{ color: '#FFFFFF' }}>"normal"</span>{`,
    `}<span style={{ color: '#86754f' }}>"qt_status"</span>{`: `}<span style={{ color: '#FFFFFF' }}>"normal"</span>{`,
    `}<span style={{ color: '#86754f' }}>"pr_interval"</span>{`: `}<span style={{ color: '#FFFFFF' }}>"normal"</span>{`
  },

  `}<span style={{ color: '#86754f' }}>"pathognomonics"</span>{`: {
    `}<span style={{ color: '#86754f' }}>"brugada_pattern"</span>{`: {
      `}<span style={{ color: '#86754f' }}>"detected"</span>{`: `}<span style={{ color: '#EF4444' }}>true</span>{`,
      `}<span style={{ color: '#86754f' }}>"type"</span>{`: `}<span style={{ color: '#EF4444' }}>"Type 1 (Coved)"</span>{`,
      `}<span style={{ color: '#86754f' }}>"leads"</span>{`: [`}<span style={{ color: '#FFFFFF' }}>"V1"</span>{`, `}<span style={{ color: '#FFFFFF' }}>"V2"</span>{`],
      `}<span style={{ color: '#86754f' }}>"icd10"</span>{`: `}<span style={{ color: '#6B7280' }}>"I45.89"</span>{`,
      `}<span style={{ color: '#86754f' }}>"clinical_action"</span>{`: `}<span style={{ color: '#EF4444' }}>"URGENT: Cardiology referral"</span>{`
    },
    `}<span style={{ color: '#86754f' }}>"stemi"</span>{`: { `}<span style={{ color: '#86754f' }}>"detected"</span>{`: `}<span style={{ color: '#10B981' }}>false</span>{` }
  },

  `}<span style={{ color: '#86754f' }}>"determinability"</span>{`: `}<span style={{ color: '#10B981' }}>"GREEN"</span>{`,
  `}<span style={{ color: '#86754f' }}>"audit_ref"</span>{`: `}<span style={{ color: '#6B7280' }}>"CL-2026-01-13-00421"</span>{`
}`}</pre>
            </div>
          </div>

          <div className="order-1 lg:order-2">
            <div className="text-sm tracking-widest text-gray-400 mb-4">CLINICAL GRADE</div>
            <h2 className="text-5xl mb-8">
              Built for Regulatory Scrutiny
            </h2>
            <p className="text-xl text-gray-300 mb-6">
              Designed from day one for clinical deployment and FDA submission, not retrofitted later.
            </p>
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="text-2xl mt-1">•</div>
                <div>
                  <div className="text-lg mb-1">Regulatory Ready</div>
                  <div className="text-gray-400">Aligned to IEC 62304 • ISO 14971 • IEC 62366 • IEC 81001 • IEC 82304 • ISO 13485</div>
                  <div className="text-gray-400 mt-1">Built for FDA 510(k) submission from day one, not retrofitted.</div>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="text-2xl mt-1">•</div>
                <div>
                  <div className="text-lg mb-1">Multi-Lead Analysis</div>
                  <div className="text-gray-400">Single-lead to 12-lead support with lead-specific pattern recognition.</div>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="text-2xl mt-1">•</div>
                <div>
                  <div className="text-lg mb-1">Complete Audit Trail</div>
                  <div className="text-gray-400">Every classification decision logged with full evidence chain.</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
