import { useState } from 'react';
import { AddKioskFormProps } from '../types/kiosk';

function AddKioskForm({ onAdd }: AddKioskFormProps) {
  const [kioskData, setKioskData] = useState({ description: '', serial: '', isOpen: true });

  const handleAddKiosk = () => {
    onAdd(kioskData);
    setKioskData({ description: '', serial: '', isOpen: true });
  };

  return (
    <div className="mb-4">
      <input
        value={kioskData.description}
        onChange={(e) =>
          setKioskData((prev) => ({
            ...prev,
            description: e.target.value,
          }))
        }
        placeholder="Description"
        className="p-2 mr-2 border"
      />
      <input
        value={kioskData.serial}
        onChange={(e) =>
          setKioskData((prev) => ({
            ...prev,
            serial: e.target.value,
          }))
        }
        placeholder="Serial"
        className="p-2 mr-2 border"
      />
      <input
        type="checkbox"
        onChange={(e) =>
          setKioskData((prev) => ({
            ...prev,
            isOpen: e.target.checked
          }))
        }
        className="p-2 mr-2 border"
      />
      <button
        className="px-4 py-2 mr-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700"
        onClick={handleAddKiosk}
      >
        Submit
      </button>
    </div>
  );
};

export default AddKioskForm;