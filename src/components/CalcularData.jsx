export default function DateWed({ weddingDate }) {
  const calcDate = () => {
    const today = new Date();
    const wedding = new Date(weddingDate);
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
