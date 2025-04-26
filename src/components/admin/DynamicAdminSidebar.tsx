import { Link } from "react-router-dom";

type AdminSidebarProps = {
  links: { label: string; href: string }[];
};

export default function DynamicAdminSidebar({ links }: AdminSidebarProps) {
  return (
    <aside className="w-64 bg-blue-800 text-white flex flex-col p-6 space-y-6">
      {links.map((link, idx) => (
        <Link
          key={idx}
          to={link.href}
          className="hover:underline text-lg font-bold"
        >
          {link.label}
        </Link>
      ))}
    </aside>
  );
}
