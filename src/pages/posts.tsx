import Head from "next/head";
import Link from "next/link";

import Layout, { siteTitle } from "../components/layout";
import { getSortedPostsData } from "../lib/posts";

export default function Posts({ allPostsData }) {
  return (
    <Layout>
      <Head>
        <title>{`Posts | ${siteTitle}`}</title>
      </Head>
      <div
        className="py-10"
        style={{
          backgroundColor: "#3075b9",
          backgroundImage: `url("/patterns/topography.svg"`,
        }}
      >
        {" "}
        <main className="sm:container sm:mx-auto bg-white p-4 rounded-md mx-4">
          <section>
            <h1 className="text-2xl border-b">Posts</h1>
            <p className="text-lg text-gray-700">
              Sometimes, I write about things. Mainly about what I've learned in
              web development over the years. Find it interesting, or wrong?{" "}
              <Link href="/contact">
                <a className="text-blue-700 hover:text-blue-900">
                  Let me know.
                </a>
              </Link>
            </p>
          </section>
          <ul className="mt-8">
            {allPostsData.map(({ id, date, title, description }) => (
              <li key={id} className="flex">
                <div className="my-4 lg:w-1/2">
                  <h2 className="text-xl font-semibold">
                    <Link href="/posts/[id]" as={`/posts/${id}`}>
                      <a className="text-blue-700 hover:text-blue-900">
                        {title}
                      </a>
                    </Link>{" "}
                  </h2>
                  <div>
                    <span className="text-base text-gray-500 mr-2">
                      {new Date(date).toLocaleDateString()}
                    </span>
                    {description}
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </main>
      </div>
    </Layout>
  );
}

export async function getStaticProps() {
  const allPostsData = getSortedPostsData();
  return {
    props: {
      allPostsData,
    },
  };
}
