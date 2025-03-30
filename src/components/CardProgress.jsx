export default function CardProgress({
  title,
  subtitle,
  convidados,
  budget,
  progressValue,
  className,
}) {
  return (
    <div
      className={`bg-white shadow-lg outline rounded-lg p-6 max-w-full mr-32 ml-32 ${className}`}
    >
      {title && (
        <h2 className="text-xl font-semibold text-gray-800">{title}</h2>
      )}
      {subtitle && (
        <p className="text-sm font-semibold text-gray-400">{subtitle}</p>
      )}

      <div className="mt-4">
        <div className="relative w-full h-3 rounded-full bg-gray-200">
          <progress
            value={progressValue}
            max={100}
            className="absolute top-0 left-0 w-full h-full rounded-full bg-black appearance-none"
          />
        </div>
      </div>
      <div className="flex flex-wrap ml-20 gap-96">
        {convidados}
        {budget}
      </div>
    </div>
  );
}
