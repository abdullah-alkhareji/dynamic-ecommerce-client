type AdminHeaderProps = {
  title: string;
  user: string;
};

export default function DynamicAdminHeader({ title, user }: AdminHeaderProps) {
  return (
    <header className="bg-white shadow-md p-4 flex justify-between items-center">
      <h1 className="text-2xl font-bold text-gray-700">{title}</h1>
      <div className="text-gray-500 font-semibold">{user}</div>
    </header>
  );
}
