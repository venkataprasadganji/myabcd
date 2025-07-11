export function Badge({ label }) {
  return (
    <span className="inline-block bg-green-100 text-green-800 text-xs font-semibold px-3 py-1 rounded-full mr-2 mb-1">
      {label}
    </span>
  );
}
