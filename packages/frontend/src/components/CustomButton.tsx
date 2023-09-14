import { CustomButtonProps } from '../types/kiosk';

function CustomButton({
  text,
  icon,
  onClick,
  bgColor = 'bg-green-500',
  hoverColor = 'hover:bg-green-700',
  textColor = 'text-white'
}: CustomButtonProps) {
  return (
    <button
      className={`flex items-center px-4 py-2 m-2 font-bold rounded transition ${bgColor} ${hoverColor} ${textColor}`}
      onClick={onClick}
    >
      {icon && <span className="mr-2">{icon}</span>}
      {text}
    </button>
  );
};

export default CustomButton;