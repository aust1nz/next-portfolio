export default function Footer() {
  return (
    <div className="py-12">
      <div className="container mx-auto border-t border-gray-500 pt-10">
        <div className="sm:flex divide-y sm:divide-y-0 sm:divide-x">
          <div className="sm:w-1/2 pl-2 pb-4">
            <div className="font-semibold text-gray-700">About</div>
            <p className="text-gray-600 px-2">
              I'm Austin Zentz. I live in Washington, DC. I build and customize
              tools that help school systems make smart decisions. When I can, I
              work with Javascript, and I sometimes write about what I find.
            </p>
          </div>
          <div className="sm:w-1/2 pl-2">
            <div className="font-semibold text-gray-700">Contact</div>
            <div>
              <a href="mailto:austin@austinzentz.com">austin@austinzentz.com</a>
            </div>
          </div>
        </div>
        <div className="text-sm mt-2 pl-2">
          © {new Date().getFullYear()} Austin Zentz. All rights reserved.
        </div>
      </div>
    </div>
  );
}
