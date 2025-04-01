export default function Card({ title, content, className }) {
  return (
    <div
      className={`bg-white shadow-lg rounded-lg p-6 border border-rose-200 justify-items-center ${className}`}
      style={{ maxWidth: "400px", width: "100%" }}
    >
      {title && (
        <h2 className="text-xl font-semibold text-gray-800">{title}</h2>
      )}
      <p className="text-gray-600 mt-4">{content}</p>
    </div>
  );
}
