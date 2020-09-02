import Link from "next/Link";

interface NavLinkProps {
  children: any;
  href: string;
  size?: string;
}

export default function NavLink(props: NavLinkProps) {
  const size = props.size ? `text-${props.size}` : "";
  return (
    <Link href={props.href}>
      <a
        className={`block ${size} px-2 py-1 text-white font-semibold rounded hover:bg-blue-700 hover:text-blue-100`}
      >
        {props.children}
      </a>
    </Link>
  );
}
