import { CustomCheckboxProps } from '../types/kiosk';

function CustomCheckbox({ checked, onChange }: CustomCheckboxProps) {
  return (
    <label className="flex items-center cursor-pointer">
      <input
        type="checkbox"
        className="hidden"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
      />
      <span className={`w-4 h-4 border rounded ${checked ? 'bg-blue-500 border-blue-500' : 'border-gray-400'}`}></span>
    </label>
  );
};

export default CustomCheckbox;