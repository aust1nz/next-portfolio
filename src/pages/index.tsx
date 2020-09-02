import Head from "next/head";

import Layout, { siteTitle } from "../components/layout";

export default function Home() {
  return (
    <Layout>
      <Head>
        <title>{`${siteTitle} | Home`}</title>
      </Head>
      <div className="text-gray-300 bg-gradient-to-r from-blue-600 to-blue-800 pt-20 pb-20">
        <div className="container mx-auto flex flex-col-reverse sm:flex-row sm:divide-x">
          <div className="sm:w-1/2 text-right pr-4 pb-2 my-auto">
            <h1 className="text-2xl mb-4 md:text-3xl">
              Hi! I'm{" "}
              <span className="font-semibold text-white">Austin Zentz</span>,
              and I build online tools for education organizations.
            </h1>
            <p className="text-lg text-blue-200">
              I help organizations make HR and finance decisions by building
              websites that organize data and automate processes. I love to
              build with Javascript using{" "}
              <span className="font-semibold text-blue-100 font-mono">
                React
              </span>{" "}
              and{" "}
              <span className="font-semibold text-blue-100 font-mono">
                Express
              </span>
              , and sometimes I post about those things.
            </p>
          </div>
          <div className="flex justify-center sm:block sm:w-1/2 sm:pl-4">
            <img
              src="/portrait.jpg"
              className="h-64 object-cover rounded-full"
              style={{ filter: `grayscale(100%)` }}
            />
          </div>
        </div>
      </div>
      <div
        style={{
          backgroundColor: "#edf2f7",
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='4' height='4' viewBox='0 0 4 4'%3E%3Cpath fill='%233075b9' fill-opacity='0.35' d='M1 3h1v1H1V3zm2-2h1v1H3V1z'%3E%3C/path%3E%3C/svg%3E")`,
        }}
      >
        <div className="container flex py-8 mx-auto">
          <div className="bg-white border border-gray-500 rounded w-11/12 sm:w-7/12 mx-auto px-2 py-2 shadow">
            <h2 className="text-2xl mb-2 border-b">Who I am</h2>
            <div className="prose">
              <p>
                For a few years after college, I taught middle school social
                studies in schools in and near Washington, DC. It was hard! I
                still work in education, but now I contribute behind the scenes,
                building tools that help school systems make staff and budget
                decisions.
              </p>
              <p>
                When I'm not working, I'm usually hanging out with my wife and
                two young kids. When they're asleep, I might be playing
                Overwatch on the Xbox. 😃
              </p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
