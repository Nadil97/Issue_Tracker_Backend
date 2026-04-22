import { useState, useRef, useEffect } from 'react';
import { ChevronDown, X, Check, User } from 'lucide-react';

interface Option {
  label: string;
  value: string;
}

interface MultiSelectProps {
  label?: string;
  options: Option[];
  value: string[];
  onChange: (values: string[]) => void;
  placeholder?: string;
  disabled?: boolean;
}

export function MultiSelect({
  label,
  options,
  value,
  onChange,
  placeholder = 'Select users...',
  disabled = false
}: MultiSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, []);

  const toggleOption = (optValue: string) => {
    if (value.includes(optValue)) {
      onChange(value.filter(v => v !== optValue));
    } else {
      onChange([...value, optValue]);
    }
  };

  const selectedOptions = options.filter(opt => value.includes(opt.value));

  return (
    <div className="form-group" ref={containerRef} style={{ position: 'relative' }}>
      {label && <label className="form-label">{label}</label>}
      
      <div 
        className={`form-input flex flex-wrap items-center gap-2 min-h-[46px] cursor-pointer ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
        onClick={() => !disabled && setIsOpen(!isOpen)}
        style={{ 
          display: 'flex', 
          flexWrap: 'wrap', 
          padding: '8px 40px 8px 12px',
          background: 'var(--bg-card)',
          borderColor: isOpen ? 'var(--primary)' : 'var(--border-main)',
          boxShadow: isOpen ? '0 0 0 2px var(--primary-glow)' : 'none'
        }}
      >
        {selectedOptions.length === 0 && (
          <span style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>{placeholder}</span>
        )}
        
        {selectedOptions.map(opt => (
          <span 
            key={opt.value} 
            className="badge"
            style={{ 
              background: 'var(--primary-glow)', 
              color: 'var(--primary)',
              padding: '2px 8px',
              borderRadius: 'var(--radius-sm)',
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
              fontSize: '0.85rem'
            }}
            onClick={(e) => {
              e.stopPropagation();
              if (!disabled) toggleOption(opt.value);
            }}
          >
            {opt.label}
            <X size={14} style={{ cursor: 'pointer' }} />
          </span>
        ))}
        
        <div style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', display: 'flex', alignItems: 'center', color: 'var(--text-dim)' }}>
          <ChevronDown size={18} style={{ transform: isOpen ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }} />
        </div>
      </div>

      {isOpen && (
        <div 
          className="dropdown-menu"
          style={{ 
            position: 'absolute', 
            top: '100%', 
            left: 0, 
            right: 0, 
            zIndex: 1000, 
            marginTop: '4px',
            background: 'var(--bg-card)',
            border: '1px solid var(--border-main)',
            borderRadius: 'var(--radius-md)',
            boxShadow: 'var(--shadow-lg)',
            maxHeight: '240px',
            overflowY: 'auto',
            padding: '4px'
          }}
        >
          {options.length === 0 ? (
            <div style={{ padding: '12px', textAlign: 'center', color: 'var(--text-muted)' }}>
              No users available
            </div>
          ) : (
            options.map(opt => {
              const isSelected = value.includes(opt.value);
              return (
                <div 
                  key={opt.value}
                  style={{ 
                    padding: '8px 12px', 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'space-between',
                    cursor: 'pointer',
                    borderRadius: 'var(--radius-sm)',
                    background: isSelected ? 'var(--bg-card-hover)' : 'transparent',
                    color: isSelected ? 'var(--primary)' : 'var(--text-main)',
                    marginBottom: '2px'
                  }}
                  className="hover-bg"
                  onClick={() => toggleOption(opt.value)}
                  onMouseEnter={(e) => e.currentTarget.style.background = 'var(--bg-card-hover)'}
                  onMouseLeave={(e) => e.currentTarget.style.background = isSelected ? 'var(--bg-card-hover)' : 'transparent'}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <div style={{ 
                      width: '24px', 
                      height: '24px', 
                      borderRadius: '50%', 
                      background: isSelected ? 'var(--primary)' : 'var(--secondary)', 
                      color: 'white',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '0.7rem'
                    }}>
                      {opt.label.charAt(0).toUpperCase()}
                    </div>
                    <span style={{ fontWeight: isSelected ? '600' : '400' }}>{opt.label}</span>
                  </div>
                  {isSelected && <Check size={16} />}
                </div>
              );
            })
          )}
        </div>
      )}
    </div>
  );
}
