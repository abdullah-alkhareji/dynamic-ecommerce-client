type PageTitleProps = {
  title: string;
};

export default function PageTitle({ title }: PageTitleProps) {
  return <h1 className="text-3xl font-bold mb-6 text-center">{title}</h1>;
}
