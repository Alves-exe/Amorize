export default function Card({ title, icon, content, className }) {
  return (
    <div
      className={`bg-white shadow-lg rounded-lg p-6 border border-rose-200 justify-items-start ${className}`}
      style={{ maxWidth: "400px", width: "100%" }}
    >
      {title && (
        <h2 className="text-xl font-bold text-gray-800">
          {title} <span className="text-rose-400">{icon}</span>{" "}
        </h2>
      )}

      <p className="text-gray-600 mt-4">{content}</p>
    </div>
  );
}
