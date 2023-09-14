import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { MdAddCircle, MdEdit, MdDelete, MdCheck, MdClose } from 'react-icons/md';
import { kioskState } from '../states/kioskState';
import { Kiosk } from '../types/kiosk';
import Toast from './Toast'
import AddKioskForm from './AddKioskForm';
import CustomInput from './CustomInput';
import CustomCheckbox from './CustomCheckbox';
import CustomButton from './CustomButton';

function KioskList() {
  const [kiosks, setKiosks] = useRecoilState<Kiosk[]>(kioskState);
  const [editingKioskId, setEditingKioskId] = useState<number | null>(null);
  const [editingKioskData, setEditingKioskData] = useState<Kiosk | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [isAdding, setIsAdding] = useState(false);

  const startEditing = (kiosk: Kiosk) => {
    setEditingKioskId(kiosk.id);
    setEditingKioskData(kiosk);
  };

  const stopEditing = () => {
    setEditingKioskId(null);
    setEditingKioskData(null);
  };

  const handleAddKioskClick = () => {
    setIsAdding(true);
  };

  const handleAddKiosk = (kioskData: { description: string; serial: string; isOpen: boolean }) => {
    fetch('http://localhost:3001/kiosk', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(kioskData),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        fetchKiosks();
        setIsAdding(false);
        setToastMessage('Kiosk added successfully!');
      })
      .catch((error) => {
        setToastMessage(`Error adding kiosk: ${error}`);
      });
  };

  const handleDelete = (kioskId: number) => {
    fetch(`http://localhost:3001/kiosk/${kioskId}`, {
      method: 'DELETE',
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        setKiosks(prevKiosks => prevKiosks.filter(kiosk => kiosk.id !== kioskId));
        setToastMessage('Kiosk deleted successfully!');
      })
      .catch(error => {
        setToastMessage(`There was a problem with the delete operation: ${error}`);
      });
  };

  const fetchKiosks = () => {
    fetch('http://localhost:3001/kiosk')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => setKiosks(data))
      .catch(error => {
        setToastMessage(`Error fetching kiosks: ${error}`);
      });
  };

  const handleSaveChanges = (kioskId: number, updatedKiosk: any) => {
    fetch(`http://localhost:3001/kiosk/${kioskId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(updatedKiosk)
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(() => {
        fetchKiosks();
        setToastMessage('Kiosk saved successfully!');
      })
      .catch(error => {
        setToastMessage(`Error updating kiosk: ${error}`);
      });
  };

  useEffect(() => {
    fetchKiosks();
  }, [setKiosks]);

  return (
    <>
      <Toast
        message={toastMessage || ''}
        isVisible={!!toastMessage}
        onClose={() => setToastMessage(null)}
      />
      <div className="flex flex-col items-center justify-center min-h-screen py-6 bg-gray-100">
        <div className="w-full max-w-4xl px-4">
          <div className="flex items-center justify-between mb-4">
            <h2 className="flex-grow text-2xl font-bold text-center text-gray-700">Kiosk List</h2>
            <CustomButton
              text="Add Kiosk"
              icon={<MdAddCircle />}
              onClick={handleAddKioskClick}
            />
          </div>
        </div>
        {isAdding && <AddKioskForm onAdd={handleAddKiosk} />}
        <div className="w-4/5 overflow-hidden bg-white rounded-lg shadow-md md:w-3/4 lg:w-2/3 xl:w-1/2">
          <table className="min-w-full table-auto">
            <thead>
              <tr className="text-white bg-blue-600">
                <th className="px-4 py-2 text-center">ID</th>
                <th className="px-4 py-2 text-center">Description</th>
                <th className="px-4 py-2 text-center">Serial</th>
                <th className="px-4 py-2 text-center">Status</th>
                <th className="px-4 py-2 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {kiosks.map((kiosk) => (
                <tr key={kiosk.id} className="border-b border-gray-200">
                  <td className="px-4 py-2 text-center">{kiosk.id}</td>
                  <td className="px-4 py-2 text-center">
                    {editingKioskId === kiosk.id ? (
                      <CustomInput
                        value={editingKioskData?.description || ''}
                        onChange={(e) =>
                          setEditingKioskData((prev) => ({
                            ...prev as Kiosk,
                            description: e.target.value
                          }))
                        }
                        placeholder="Description"
                      />
                    ) : (
                      kiosk.description
                    )}
                  </td>
                  <td className="px-4 py-2 text-center">
                    {editingKioskId === kiosk.id ? (
                      <CustomInput
                        value={editingKioskData?.serial || ''}
                        onChange={(e) =>
                          setEditingKioskData((prev) => ({
                            ...prev as Kiosk,
                            serial: e.target.value,
                          }))
                        }
                        placeholder="Serial"
                      />
                    ) : (
                      kiosk.serial
                    )}
                  </td>
                  <td className="px-4 py-2 text-center">
                    {editingKioskId === kiosk.id ? (
                      <CustomCheckbox
                        checked={editingKioskData?.isOpen || false}
                        onChange={(isChecked) =>
                          setEditingKioskData((prev) => ({
                            ...prev as Kiosk,
                            isOpen: isChecked
                          }))
                        }
                      />
                    ) : (
                      kiosk.isOpen ? "Open" : "Closed"
                    )}
                  </td>
                  <td className="flex justify-end px-4 py-2">
                    {editingKioskId === kiosk.id ? (
                      <>
                        <CustomButton
                          text="Save"
                          icon={<MdCheck />}
                          onClick={() => {
                            if (editingKioskData) {
                              handleSaveChanges(editingKioskData.id, editingKioskData);
                            }
                            stopEditing();
                          }}
                        />
                        <CustomButton
                          text="Cancel"
                          icon={<MdClose />}
                          onClick={stopEditing}
                          bgColor="bg-gray-400"
                          hoverColor="hover:bg-gray-500"
                        />
                      </>
                    ) : (
                      <>
                        <CustomButton
                          text="Edit"
                          icon={<MdEdit />}
                          onClick={() => startEditing(kiosk)}
                        />
                        <CustomButton
                          text="Delete"
                          icon={<MdDelete />}
                          onClick={() => handleDelete(kiosk.id)}
                          bgColor="bg-red-500"
                          hoverColor="hover:bg-red-700"
                        />
                      </>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default KioskList;