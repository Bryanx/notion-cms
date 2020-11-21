import { NotionRenderer, BlockMapType } from "react-notion";
import { NextSeo } from "next-seo";
import Head from "next/head";
import Link from "next/link";
import fetch from "node-fetch";

export async function getStaticProps() {
  const data: BlockMapType = await fetch(
    "https://notion-api.splitbee.io/v1/page/d8ea983c5002452c9bcb23aa331dcb24"
  ).then(res => res.json());

  return {
    props: {
      blockMap: data
    },
    revalidate: 1
  };
}

const Home = ({ blockMap }) => (
  <div>
    <NextSeo
      title={"Bryan de Ridder"}
      description="Hi, I'm Bryan! I like software programming and designing user interfaces."
      openGraph={{
        images: [
          {
            url: 'https://avatars0.githubusercontent.com/u/17814185?s=460&u=3bf382ad4310fbbc7daef4a52ce05ade816459b3&v=4',
            width: 450,
            height: 450,
            alt: 'Bryan de Ridder',
          }],
      }}
      twitter={{
        handle: "@bryan_de_ridder",
        cardType: "summary_large_image",
      }}
    />
    <Head>
      <style>{`body { margin: 0;}`}</style>
      <title>Bryan de Ridder</title>
    </Head>
    <NotionRenderer
      blockMap={blockMap}
      fullPage
      hideHeader
      customBlockComponents={{
        page: ({ blockValue, renderComponent }) => (
          <Link href={`/${blockValue.id}`}>{renderComponent()}</Link>
        )
      }}
    />
  </div>
);

export default Home;
