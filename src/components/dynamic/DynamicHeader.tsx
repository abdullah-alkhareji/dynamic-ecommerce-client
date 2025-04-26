import { Link } from "react-router-dom";

type HeaderProps = {
  title: string;
  links: { label: string; href: string }[];
};

export default function DynamicHeader({ title, links }: HeaderProps) {
  return (
    <header className="flex justify-between items-center p-4 bg-blue-700 text-white shadow-md">
      <h1 className="text-xl font-bold">{title}</h1>
      <nav className="flex gap-6">
        {links.map((link, idx) => (
          <Link key={idx} to={link.href} className="hover:underline">
            {link.label}
          </Link>
        ))}
      </nav>
    </header>
  );
}
