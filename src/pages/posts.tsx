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
          backgroundImage: `url("/topography.svg"`,
        }}
      >
        {" "}
        <main className="sm:container sm:mx-auto bg-white px-4 rounded-md mx-4">
          <section>
            <h1 className="text-4xl font-semibold">Posts</h1>
            <p className="text-lg text-gray-700">
              Sometimes, I write about app building and programming. Here are a
              few of my thoughts.
            </p>
          </section>
          <ul className="mt-8">
            {allPostsData.map(({ id, date, title, description }) => (
              <li key={id} className="flex">
                <div className="my-4 lg:w-1/2">
                  <h2 className="text-xl font-semibold">
                    <Link href="/posts/[id]" as={`/posts/${id}`}>
                      <a className="text-blue-700">{title}</a>
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
