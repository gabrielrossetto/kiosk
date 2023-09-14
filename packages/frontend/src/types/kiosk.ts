export type Kiosk = {
  id: number;
  description: string;
  serial: string;
  isOpen: boolean;
};

export type ToastProps = {
  message: string;
  isVisible: boolean;
  onClose: () => void;
};

export type AddKioskFormProps = {
  onAdd: (kioskData: { description: string; serial: string; isOpen: boolean; }) => void;
};

export type CustomInputProps = {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
};

export type CustomCheckboxProps = {
  checked: boolean;
  onChange: (checked: boolean) => void;
};

export type CustomButtonProps = {
  text: string;
  icon?: React.ReactNode;
  onClick: () => void;
  bgColor?: string;
  hoverColor?: string;
  textColor?: string;
};