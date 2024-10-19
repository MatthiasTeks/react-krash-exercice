export default function List({ children }: { children: React.ReactNode }) {
  return <ul className="list-disc list-inside text-gray-700">{children}</ul>;
}
