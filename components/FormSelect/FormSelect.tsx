'use client';
import { useState, useRef, useEffect } from 'react';
import css from './FormSelect.module.css';

const SPRITE = '/svg/icons.svg';
type IconProps = {
  id: string;
  className?: string;
};
function Icon({ id, className }: IconProps) {
  return (
    <svg className={className || css.socialIcon} aria-hidden="true">
      <use href={`${SPRITE}#${id}`} />
    </svg>
  );
}

interface Option {
  value: string;
  label: string;
}
interface SelectProps {
  options: Option[];
  value: string;
  onChange: (val: string) => void;
}
const FormSelect: React.FC<SelectProps> = ({ options, value, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const toggleOpen = () => setIsOpen(!isOpen);
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (val: string) => {
    onChange(val);
    setIsOpen(false);
  };
  const selectedLabel = options.find((o) => o.value === value)?.label ?? '';

  return (
    <div
      ref={wrapperRef}
      className={`${css.simpleSelect} ${isOpen ? css.active : ''}`}
    >
      <div className={css.header} onClick={toggleOpen}>
        <span className={!selectedLabel ? css.placeholder : ''}>
          {selectedLabel || 'Категорія'}
        </span>
        <span className={css.arrow}>
          <Icon id="down" />
        </span>
      </div>
      <div className={css.options}>
        {options.map((opt) => (
          <div
            key={opt.value}
            className={css.option}
            onClick={() => handleSelect(opt.value)}
          >
            {opt.label}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FormSelect;
