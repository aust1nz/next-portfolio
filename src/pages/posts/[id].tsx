import Head from "next/head";
import ReactMarkdown from "react-markdown/with-html";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";

import Layout, { siteTitle } from "../../components/layout";
import { getAllPostIds, getPostData } from "../../lib/posts";

const CodeBlock = ({ language, value }) => {
  return (
    <SyntaxHighlighter language={language} customStyle={{ fontSize: ".80em" }}>
      {value}
    </SyntaxHighlighter>
  );
};

export default function Post({ postData }) {
  return (
    <Layout>
      <Head>
        <title>{`${postData.title} | ${siteTitle}`}</title>
      </Head>

      <div className="container mx-auto rounded-lg px-4 mt-10 py-4 xl:w-1/2 lg:w-3/4">
        <h1 className="text-xl sm:text-2xl xl:text-3xl font-semibold">
          {postData.title}
        </h1>
        <div className="border rounded mt-1 -mx-2 p-2 text-gray-600 max-w-2xl xl:max-w-3xl">
          <p>Posted {new Date(postData.date).toLocaleDateString()}</p>

          <p className="mt-1 ">
            <i>{postData.description}</i>
          </p>
        </div>
        <ReactMarkdown
          escapeHtml={false}
          source={postData.content}
          renderers={{ code: CodeBlock }}
          className="prose prose-sm sm:prose xl:prose-lg mt-4"
        />
      </div>
    </Layout>
  );
}

export async function getStaticPaths() {
  const paths = getAllPostIds();
  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const postData = getPostData(params.id);
  return {
    props: {
      postData,
    },
  };
}
