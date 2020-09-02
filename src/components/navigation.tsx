import { useState } from "react";
import NavLink from "./nav-link";

export default function Navigation() {
  const [isOpen, setOpen] = useState(false);

  const toggleOpen = () => setOpen(!isOpen);
  return (
    <header className="sticky top-0 z-10 bg-gradient-to-r from-blue-600 to-blue-800">
      <nav className="container mx-auto border-b border-white border-opacity-25 sm:flex sm:justify-between sm:items-center sm:py-2">
        <div className="flex items-center justify-between pl-2 pr-6 py-2 sm:p-0">
          <NavLink href="/" size="lg">
            Austin Zentz
          </NavLink>
          <div className="sm:hidden">
            <button
              onClick={toggleOpen}
              type="button"
              className="block text-gray-200 hover:text-white focus:text-white focus:outline-none border border-gray-400 px-2 py-1 rounded"
            >
              {!isOpen ? (
                "Menu"
              ) : (
                <svg className="h-6 w-6 fill-current" viewBox="0 0 24 24">
                  <path
                    fillRule="evenodd"
                    d="M18.278 16.864a1 1 0 0 1-1.414 1.414l-4.829-4.828-4.828 4.828a1 1 0 0 1-1.414-1.414l4.828-4.829-4.828-4.828a1 1 0 0 1 1.414-1.414l4.829 4.828 4.828-4.828a1 1 0 1 1 1.414 1.414l-4.828 4.829 4.828 4.828z"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
        <nav
          className={`px-2 pt-2 pb-4 sm:flex sm:p-0 ${
            isOpen ? "block" : "hidden"
          }`}
        >
          <NavLink href="/">About</NavLink>
          <NavLink href="/contact">Contact</NavLink>
          <NavLink href="/posts">Posts</NavLink>
        </nav>
      </nav>
    </header>
  );
}
