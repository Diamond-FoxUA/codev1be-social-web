import Link from "next/link"

interface LinkButtonProps {
  href: string;
  text: string;
  className: string
}

export default function LinkButton ({ href, text, className }: LinkButtonProps) {
  return (
    <Link className={className} href={href}>
      {text}
    </ Link>
  );
}