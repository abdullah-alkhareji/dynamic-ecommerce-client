type FormGroupProps = {
  label: string;
  children: React.ReactNode;
};

export default function FormGroup({ label, children }: FormGroupProps) {
  return (
    <div className="flex flex-col gap-2 mb-4">
      <label className="font-semibold text-gray-700">{label}</label>
      {children}
    </div>
  );
}
