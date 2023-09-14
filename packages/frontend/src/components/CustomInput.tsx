import { CustomInputProps } from '../types/kiosk';

function CustomInput({ value, onChange, placeholder }: CustomInputProps) {
  return (
    <input
      className="w-full px-3 py-2 border rounded focus:ring focus:ring-blue-200"
      value={value}
      onChange={onChange}
      placeholder={placeholder}
    />
  );
};

export default CustomInput;