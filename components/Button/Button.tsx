interface ButtonProps {
  className: string;
  onClick?: () => void;
  text?: string;
}

export default function Button({ className, onClick, text }: ButtonProps) {
  return (
    <button className={className} onClick={onClick}>
      {text}
    </button>
  );
}
