import axios from "axios";

export default function DateWed({ weddingDate }) {
  try {
    const response = axios.get("http://localhost:5000/users", {
      weddingDate,
    });

    const user = response.data.find((user) => user.weddingDate);
  } catch {
    null;
  }
  const calcDate = () => {
    const today = new Date();
    const wedding = new Date(user.weddingDate);
    const timeDiff = wedding - today;
    return Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
  };
  weddingDate = "2026/03/30";
  return (
    <div>
      <p>
        Seu casamento está previsto para {weddingDate} ( {calcDate()} dias
        restantes)
      </p>
    </div>
  );
}
