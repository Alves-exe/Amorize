export default function Budget() {
  const budgetMax = 15000;
  const totalGasto = budgetMax - 4500;
  return (
    <div>
      <div className="mt-6 justify-items-center">
        <p className=" text-xl font-bold text-black">R${budgetMax}</p>
        <h3 className="text-sm font-semibold text-gray-500">Orçamento total</h3>
      </div>
    </div>
  );
}
