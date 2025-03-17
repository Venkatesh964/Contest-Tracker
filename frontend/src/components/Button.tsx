export const Button = ({
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
      className={`border px-3 cursor-pointer py-1 text-white rounded-full text-sm ${color}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};
