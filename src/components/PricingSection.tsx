import { useState } from 'react';
import './PricingSection.css';

const STRIPE_LINKS = {
  proMonthly: 'https://buy.stripe.com/14AeVfccL13pcaP3St0oM01',
  proAnnual: 'https://buy.stripe.com/cNibJ3foX8vR4In9cN0oM00',
};

export function PricingSection() {
  const [billingPeriod, setBillingPeriod] = useState<'monthly' | 'annual'>('annual');

  return (
    <div className="pricing-wrap">
      {/* HEADER */}
      <div className="pricing-header">
        <h2>Simple pricing</h2>
        <p>Same clinical content at every tier. Pay for the tools that help you prove you learned it.</p>
      </div>

      {/* THREE TIERS */}
      <div className="tiers">
        {/* FREE */}
        <div className="tier">
          <div className="tier-name">Free</div>
          <div className="tier-price">$0</div>
          <div className="tier-annual">Free forever</div>
          <div className="tier-desc">The full ECG simulator. Learn at your own pace with every rhythm and condition.</div>
          <div className="tier-divider"></div>
          <ul className="tier-features">
            <li className="section-label">Simulator</li>
            <li>All 35 rhythm identities</li>
            <li>All 51 conduction modifiers</li>
            <li>All 48 pathognomonic patterns</li>
            <li>Full M&Oslash;RPHL&#916;B access</li>
            <li>Learn mode with guided content</li>
            <li>OpenEvidence clinical cards</li>
            <li>Paper 12-lead and monitor views</li>
            <li className="section-label">Testing</li>
            <li>5 sample QBank questions</li>
            <li className="locked">Full QBank (all levels)</li>
            <li className="locked">Study mode with explanations</li>
            <li className="locked">Test history and analytics</li>
            <li className="locked">PDF export with credentials</li>
            <li className="locked">Flagged questions and incorrect queue</li>
            <li className="locked">Anki, Notion, GoodNotes export</li>
          </ul>
          <button className="tier-btn btn-free">Get started free</button>
        </div>

        {/* PRO — AURORA */}
        <div className="tier featured">
          <div className="badge">Most popular</div>
          <div className="tier-name">Pro</div>
          <div className="tier-price">
            {billingPeriod === 'monthly' ? '$4.99' : '$29.99'}{' '}
            <span>{billingPeriod === 'monthly' ? '/month' : '/year'}</span>
          </div>
          <div className="tier-annual">
            {billingPeriod === 'monthly' ? '$59.88/year at monthly rate' : 'Save 50% vs monthly'}
          </div>
          {/* Billing toggle */}
          <div className="billing-toggle">
            <button
              className={`toggle-btn ${billingPeriod === 'monthly' ? 'active' : ''}`}
              onClick={() => setBillingPeriod('monthly')}
            >
              Monthly
            </button>
            <button
              className={`toggle-btn ${billingPeriod === 'annual' ? 'active' : ''}`}
              onClick={() => setBillingPeriod('annual')}
            >
              Annual
            </button>
          </div>
          <div className="tier-desc">Full testing and tracking. Everything you need to prepare for NREMT, boards, or certification exams.</div>
          <div className="tier-divider"></div>
          <ul className="tier-features">
            <li className="section-label">Everything in Free, plus</li>
            <li>Full QBank &mdash; all difficulty levels</li>
            <li>Study mode with full explanations</li>
            <li>Exam mode (timed, no feedback)</li>
            <li>Test history and score analytics</li>
            <li>Incorrect queue (retake missed)</li>
            <li>Flagged question review</li>
            <li>PDF export with name, institution, instructor</li>
            <li>All monitor skins (field, clinical, ICU)</li>
            <li>Anki (.apkg) export</li>
            <li>Notion, Notability, GoodNotes export</li>
            <li>Aurora highlight engine on waveforms</li>
            <li>Priority access to new content</li>
          </ul>
          <a
            href={billingPeriod === 'monthly' ? STRIPE_LINKS.proMonthly : STRIPE_LINKS.proAnnual}
            target="_blank"
            rel="noopener noreferrer"
            className="tier-btn btn-aurora"
          >
            Start pro
          </a>
        </div>

        {/* INSTITUTIONAL */}
        <div className="tier">
          <div className="tier-name">Institutional</div>
          <div className="tier-price">$29&ndash;39 <span>/seat/year</span></div>
          <div className="tier-annual">Volume pricing for 10+ seats</div>
          <div className="tier-desc">For paramedic programs, nursing schools, PA programs, residencies, and hospital departments.</div>
          <div className="tier-divider"></div>
          <ul className="tier-features">
            <li className="section-label">Everything in Pro, plus</li>
            <li>Instructor dashboard</li>
            <li>Student progress tracking</li>
            <li>Assignment creation and scheduling</li>
            <li>Class-level analytics and reporting</li>
            <li>Custom question authoring</li>
            <li>Teaching mode (present to class)</li>
            <li>PDF reports with institutional branding</li>
            <li>Microsoft 365 SSO for students</li>
            <li>Custom case builder</li>
            <li>Dedicated support</li>
            <li>LMS / LTI integration (coming soon)</li>
            <li>CME tracking (coming soon)</li>
          </ul>
          <a
            href="mailto:institutions@cardiologica.med?subject=CORDIS-DX%20Institutional%20Inquiry"
            className="tier-btn btn-contact"
          >
            Contact us
          </a>
        </div>
      </div>

      {/* INSTITUTIONAL DETAIL */}
      <div className="inst-section">
        <div className="inst-header">
          <h3>Institutional pricing</h3>
          <p>Volume discounts based on seat count. All plans include full Pro access for every student.</p>
        </div>

        <div className="inst-grid">
          <div className="inst-card">
            <div className="ic-name">Program</div>
            <div className="ic-price">$39 <span>/seat/year</span></div>
            <div className="ic-desc">10&ndash;60 students<br />Paramedic, nursing, or PA programs</div>
          </div>
          <div className="inst-card">
            <div className="ic-name">Department</div>
            <div className="ic-price">$29 <span>/seat/year</span></div>
            <div className="ic-desc">61&ndash;250 seats<br />Hospital departments, residency programs</div>
          </div>
          <div className="inst-card">
            <div className="ic-name">Enterprise</div>
            <div className="ic-price">Custom</div>
            <div className="ic-desc">251+ seats<br />Health systems, multi-site deployments</div>
          </div>
        </div>

        <div className="inst-features">
          <h4>Included with every institutional plan</h4>
          <ul className="inst-feat-grid">
            <li>Instructor dashboard</li>
            <li>Microsoft 365 SSO</li>
            <li>Student progress tracking</li>
            <li>Assignment creation tools</li>
            <li>Class analytics and reporting</li>
            <li>Custom question authoring</li>
            <li>PDF reports with school branding</li>
            <li>Priority support</li>
          </ul>
        </div>

        <div className="note">
          <span className="sdvosb">SDVOSB certified &mdash; eligible for VA and DoD procurement &mdash; GSA schedule pending</span>
          <br />
          <a href="mailto:institutions@cardiologica.med" className="contact-email">institutions@cardiologica.med</a>
        </div>
      </div>
    </div>
  );
}
