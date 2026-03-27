import { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronDown } from 'lucide-react';

const products = [
  { name: 'Cardiologica-DX', path: '/cardiologica-dx', desc: 'Clinical ECG Interpretation Engine' },
  { name: 'Cardiologica-AI', path: '/cardiologica-ai', desc: 'Synthetic ECG Training Data Platform' },
  { name: 'CORDIS-DX', path: '/cordis-dx', desc: 'Interactive ECG Education Simulator' },
];

interface NavigationProps {
  /** If true, nav is always visible (subpages). If false, fades in on scroll (homepage). */
  alwaysVisible?: boolean;
}

export function Navigation({ alwaysVisible = false }: NavigationProps) {
  const [showNav, setShowNav] = useState(alwaysVisible);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const location = useLocation();

  useEffect(() => {
    if (alwaysVisible) {
      setShowNav(true);
      return;
    }
    const handleScroll = () => {
      setShowNav(window.scrollY > window.innerHeight * 0.8);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [alwaysVisible]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Determine current product name for breadcrumb
  const currentProduct = products.find(p => p.path === location.pathname);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-6 bg-black/90 backdrop-blur-sm transition-opacity duration-500 ${showNav ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
      <div className="flex items-center gap-3">
        <Link to="/" className="text-xl tracking-tight hover:opacity-80 transition-opacity">
          <span style={{ fontWeight: 700 }}>CARDIO</span><span style={{ fontWeight: 300 }}>LOGIC∆</span>
        </Link>
        {currentProduct && (
          <span className="text-gray-500 text-xl tracking-tight flex items-center gap-2">
            <span>/</span>
            <span className="text-gray-300">{currentProduct.name.replace('Cardiologica-', '').replace('CORDIS-', 'CORDIS ')}</span>
          </span>
        )}
      </div>

      <div className="flex items-center gap-8">
        {/* Products dropdown */}
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="flex items-center gap-1 text-sm text-gray-300 hover:text-white transition-colors"
          >
            Products
            <ChevronDown className={`w-4 h-4 transition-transform ${dropdownOpen ? 'rotate-180' : ''}`} />
          </button>

          {dropdownOpen && (
            <div className="absolute right-0 top-full mt-2 w-72 bg-black border border-zinc-800 rounded-lg overflow-hidden shadow-xl">
              {products.map((product) => (
                <Link
                  key={product.path}
                  to={product.path}
                  onClick={() => setDropdownOpen(false)}
                  className={`block px-6 py-4 hover:bg-zinc-900 transition-colors border-b border-zinc-800 last:border-b-0 ${
                    location.pathname === product.path ? 'bg-zinc-900/50' : ''
                  }`}
                >
                  <div className="text-sm text-white mb-1">{product.name}</div>
                  <div className="text-xs text-gray-500">{product.desc}</div>
                </Link>
              ))}
            </div>
          )}
        </div>

        <a
          href="mailto:devteam@cardiologica.med?subject=Cardiologica%20Inquiry"
          className="text-sm text-gray-300 hover:text-white transition-colors"
        >
          Contact
        </a>
      </div>
    </nav>
  );
}
