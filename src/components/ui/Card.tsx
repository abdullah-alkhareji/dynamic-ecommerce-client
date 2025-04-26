type CardProps = {
  children: React.ReactNode;
  className?: string;
};

export default function Card({ children, className = "" }: CardProps) {
  return (
    <div
      className={`border rounded-lg p-4 shadow-sm hover:shadow-md transition ${className}`}
    >
      {children}
    </div>
  );
}
