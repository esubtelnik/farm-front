import { useState } from 'react';
import { Modal } from '../helpers/Modal';


export default function ExamplePage() {
  const [isModalOpen, setModalOpen] = useState(false);

  return (
    <div className="p-8">
      <button onClick={() => setModalOpen(true)}>Открыть модалку</button>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        title="Заголовок модального окна"
      >
        <p>Содержимое модального окна</p>
      </Modal>
    </div>
  );
}
