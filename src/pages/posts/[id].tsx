import Head from "next/head";
import ReactMarkdown from "react-markdown/with-html";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";

import Layout, { siteTitle } from "../../components/layout";
import { getAllPostIds, getPostData } from "../../lib/posts";

const CodeBlock = ({ language, value }) => {
  return <SyntaxHighlighter language={language}>{value}</SyntaxHighlighter>;
};

export default function Post({ postData }) {
  return (
    <Layout>
      <Head>
        <title>{`${postData.title} | ${siteTitle}`}</title>
      </Head>

      <div className="container mx-auto prose rounded-lg px-4 mt-10 py-4 xl:w-1/2 lg:w-3/4">
        <h1>{postData.title}</h1>
        <p className="text-gray-600">Posted {postData.date}</p>
        <ReactMarkdown
          escapeHtml={false}
          source={postData.content}
          renderers={{ code: CodeBlock }}
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
