import Link from "next/link";
import { PageTableRow } from "../types/pageTableRow";
import { config } from "../config";

interface NavProps {
  pageRows: PageTableRow[];
}

export const Nav: React.FC<NavProps> = (props: NavProps) => {

  const navItems = props.pageRows
    .filter((row) => row.visibleOnNavbar)
    .map((row: PageTableRow) => getNavItem(`/${row.path}`, row.path));

  return (
    <nav className="px-2 py-2 flex justify-between text-sm text-gray-700">
      <ul>
        {getNavItem("/", `${config.name}`)}
      </ul>
      <ul className="flex">
        {navItems}
      </ul>
    </nav>
  );
};

function getNavItem(path: string, name: string): JSX.Element {
  return <Link href={path}>
    <li key="path" className="px-3 py-2 rounded-sm hover:bg-gray-200 flex items-center cursor-pointer">
      <a>{name}</a>
    </li>
  </Link>
}
