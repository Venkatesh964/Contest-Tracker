export const Button2 = ({
  children,
  onClick,
  color,
}: {
  children: React.ReactNode;
  onClick: () => void;
  color: string;
}) => {
  return (
    <button
      className={`border px-3 border-slate-200 cursor-pointer py-0.5  rounded-full text-sm ${color}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};
