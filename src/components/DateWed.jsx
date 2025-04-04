import { useEffect, useState } from "react";

export default function DateWed({ weddingDate }) {
  const [daysLeft, setDaysLeft] = useState(0);

  useEffect(() => {
    if (weddingDate) {
      const today = new Date();
      const wedding = new Date(weddingDate);
      const timeDiff = wedding - today;
      const days = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
      setDaysLeft(days);
    }
  }, [weddingDate]);

  if (!weddingDate) return null;

  return (
    <p className="text-gray-600">
      Seu casamento está previsto para{" "}
      <span className="font-semibold">{weddingDate}</span> ({daysLeft} dias
      restantes)
    </p>
  );
}
