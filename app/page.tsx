// Сюди будуть йти компоненти для головної сторінки окрім Header та Footer
// import About from '@/components/About/About';

// export default function Home() {
//   return (
//     <div>
//       <h1>Main Page</h1>
//       <About />
//     </div>
//   );
// }

"use client";

import { useState } from "react";
import About from "@/components/About/About";
import { ConfirmModal } from "@/components/ConfirmModal/ConfirmModal";

export default function Home() {
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);

  const handleConfirm = () => {
    setIsConfirmOpen(false);
  };

  const handleCancel = () => {
    setIsConfirmOpen(false);
  };

  return (
    <div>
      <h1>Main Page</h1>

      <button
        onClick={() => setIsConfirmOpen(true)}
        className="px-4 py-2 bg-blue-600 text-white rounded"
      >
        Відкрити ConfirmModal
      </button>

      <About />

      {isConfirmOpen && (
        <ConfirmModal
          title="Ви точно хочете вийти?"
          text="Ми будемо сумувати за вами!"
          confirmButtonText="Вийти"
          cancelButtonText="Відмінити"
          onConfirm={handleConfirm}
          onCancel={handleCancel}
        />
      )}
    </div>
  );
}