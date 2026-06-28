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
  const dropdownRef = useRef<HTMLDivElement>(null);
  const menuId = useId();
  const selectedOption = options.find((option) => option.value === value) ?? options[0];

  useEffect(() => {
    if (!open) {
      return;
    }

    const handlePointerDown = (event: PointerEvent) => {
      if (!dropdownRef.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
      }
    };

    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [open]);

  return (
    <div className={open ? "custom-dropdown open" : "custom-dropdown"} ref={dropdownRef}>
      <button
        aria-controls={menuId}
        aria-expanded={open}
        aria-haspopup="listbox"
        className="dropdown-trigger"
        onClick={() => setOpen((current) => !current)}
        type="button"
      >
        <Icon size={17} />
        <span className="dropdown-label">{label}</span>
        <strong>{selectedOption.label}</strong>
        <ChevronDown className="dropdown-chevron" size={17} />
      </button>

      {open && (
        <div className="dropdown-menu" id={menuId} role="listbox" aria-label={label}>
          {options.map((option) => {
            const selected = option.value === value;

            return (
              <button
                aria-selected={selected}
                className={selected ? "dropdown-option active" : "dropdown-option"}
                key={option.value}
                onClick={() => {
                  onChange(option.value);
                  setOpen(false);
                }}
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
