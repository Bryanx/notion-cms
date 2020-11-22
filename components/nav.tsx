import Link from "next/link";
import { PageRow } from "../types/pageTableRow";
import { config } from "../config";

interface NavProps {
  pageRows: PageRow[];
}

export const Nav = (props: NavProps) => {

  const navItems = props.pageRows
    .filter((row) => row.visibleOnNavbar)
    .map((row: PageRow) => getNavItem(`/${row.path}`, row.title));

  function getNavItem(path: string, name: string): JSX.Element {
    return <Link href={path}>
      <li key={name} className="px-3 py-2 rounded-sm cursor-pointer hover:bg-gray-200 ">
        <a>{name}</a>
      </li>
    </Link>
  }

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