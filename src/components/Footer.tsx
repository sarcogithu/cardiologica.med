import logo from 'figma:asset/1e6c52ff2697aaf9588fe0f4bb5bc6992fca671a.png';

export function Footer() {
  return (
    <footer className="relative py-16 px-8 bg-black border-t border-zinc-900">
      <div className="relative max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12 items-start">
          {/* Brand - Logo */}
          <div className="md:col-span-1">
            <img
              src={logo}
              alt="Cardiologica"
              style={{ height: '150px', width: 'auto', marginTop: '-40px', marginLeft: '-8px' }}
            />
          </div>

          {/* Features */}
          <div>
            <h3 className="mb-4 tracking-wide">Features</h3>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li><a href="#" className="hover:text-white transition-colors">ROCI Taxonomy</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Signal Processing</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Multi-Lead Support</a></li>
              <li><a href="#" className="hover:text-white transition-colors">EHR Integration</a></li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="mb-4 tracking-wide">Resources</h3>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li><a href="#" className="hover:text-white transition-colors">Documentation</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Research Papers</a></li>
              <li><a href="#" className="hover:text-white transition-colors">API Reference</a></li>
              <li><a href="#" className="hover:text-white transition-colors">PhysioNet Data</a></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="mb-4 tracking-wide">Company</h3>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li><a href="#" className="hover:text-white transition-colors">About</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Team</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
            </ul>
          </div>
        </div>

        {/* Patents Section */}
        <div className="py-8 border-t border-zinc-900 mb-8">
          <h3 className="text-sm tracking-widest text-gray-400 mb-6">PROVISIONAL PATENTS</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-sm">
            <div>
              <div className="text-white mb-1">Cardiologica Framework</div>
              <div style={{ color: '#86754f' }} className="text-xs">Patent Pending 63/927,475</div>
              <div className="text-gray-500 text-xs">November 29, 2025</div>
            </div>
            <div>
              <div className="text-white mb-1">Cardiologica-DX</div>
              <div style={{ color: '#86754f' }} className="text-xs">Patent Pending 63/912,035</div>
              <div className="text-gray-500 text-xs">November 5, 2025</div>
            </div>
            <div>
              <div className="text-white mb-1">Cardiologica-AI</div>
              <div style={{ color: '#86754f' }} className="text-xs">Patent Pending 63/943,976</div>
              <div className="text-gray-500 text-xs">December 18, 2025</div>
            </div>
          </div>
        </div>

        {/* SARC Section */}
        <div className="py-8 border-t border-zinc-900 mb-8">
          <div className="text-white text-lg mb-2">SARC, LLC.</div>
          <div className="text-gray-500 text-sm mb-1">SDVOSB Certified • VOSB Certified</div>
          <div className="text-gray-600 text-xs">Service-Disabled Veteran-Owned Small Business</div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-gray-500 border-t border-zinc-900 pt-8">
          <p>
            © 2026 Cardiologica. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <a href="#" className="hover:text-white transition-colors">Privacy</a>
            <span>|</span>
            <a href="#" className="hover:text-white transition-colors">Terms</a>
            <span>|</span>
            <span style={{ color: '#86754f' }}>Patents Pending</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
