"use client";

import { ChevronDown, Check, type LucideIcon } from "lucide-react";
import { useEffect, useId, useRef, useState } from "react";

type DropdownOption = {
  label: string;
  value: string;
};

type CustomDropdownProps = {
  icon: LucideIcon;
  label: string;
  options: DropdownOption[];
  value: string;
  onChange: (value: string) => void;
};

export function CustomDropdown({ icon: Icon, label, options, value, onChange }: CustomDropdownProps) {
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const menuId = useId();
  const selectedOption = options.find((option) => option.value === value) ?? options[0];

  useEffect(() => {
    if (!open) {
      return;
    }

    const selectedIndex = options.findIndex((option) => option.value === value);
    setActiveIndex(selectedIndex >= 0 ? selectedIndex : 0);

    const handlePointerDown = (event: PointerEvent) => {
      if (!dropdownRef.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        return;
      }

      if (!dropdownRef.current?.contains(document.activeElement)) {
        return;
      }

      if (event.key === "ArrowDown") {
        event.preventDefault();
        setActiveIndex((current) => (current + 1) % options.length);
      }

      if (event.key === "ArrowUp") {
        event.preventDefault();
        setActiveIndex((current) => (current - 1 + options.length) % options.length);
      }

      if (event.key === "Home") {
        event.preventDefault();
        setActiveIndex(0);
      }

      if (event.key === "End") {
        event.preventDefault();
        setActiveIndex(options.length - 1);
      }

      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        const option = options[activeIndex];
        if (option) {
          onChange(option.value);
          setOpen(false);
        }
      }
    };

    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [activeIndex, onChange, open, options, value]);

  return (
    <div className={open ? "custom-dropdown open" : "custom-dropdown"} ref={dropdownRef}>
      <button
        aria-controls={menuId}
        aria-expanded={open}
        aria-haspopup="listbox"
        aria-label={`${label}, ${selectedOption.label}`}
        className="dropdown-trigger"
        onClick={() => setOpen((current) => !current)}
        type="button"
      >
        <Icon size={17} />
        <span className="dropdown-label">{label}</span>
        <strong>{selectedOption.label}</strong>
        <ChevronDown aria-hidden="true" className="dropdown-chevron" size={17} />
      </button>

      {open && (
        <div className="dropdown-menu" id={menuId} role="listbox" aria-label={label}>
          {options.map((option, index) => {
            const selected = option.value === value;
            const highlighted = index === activeIndex;

            return (
              <button
                aria-selected={selected}
                className={
                  selected ? "dropdown-option active" : highlighted ? "dropdown-option highlighted" : "dropdown-option"
                }
                key={option.value}
                onClick={() => {
                  onChange(option.value);
                  setOpen(false);
                }}
                onMouseEnter={() => setActiveIndex(index)}
                role="option"
                type="button"
              >
                <span>{option.label}</span>
                {selected && <Check size={16} />}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
