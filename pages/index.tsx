import { NotionRenderer, BlockMapType } from "react-notion";
import { NextSeo } from "next-seo";
import { config } from "../config";
import Head from "next/head";
import Link from "next/link";
import { PageTableRow } from "../types/pageTableRow";
import { getPageBlocks, getPagesTable } from "../lib/pages";
import React from "react";
import { Nav } from "../components/nav";

interface PageProps {
  blocks: BlockMapType;
  pageRows: PageTableRow[];
}

export async function getStaticProps() {
  const blocks: BlockMapType = await getPageBlocks(`${config.notionHomePageId}`);
  const pageRows = await getPagesTable();

  return {
    props: {
      blocks,
      pageRows
    },
    revalidate: 1
  };
}

const Home: React.FC<PageProps> = ({ blocks, pageRows }) => (
  <div>
    <NextSeo
      title={`${config.name}`}
      description="Hi, I'm Bryan! I like software programming and designing user interfaces."
      openGraph={{
        images: [
          {
            url: 'https://avatars0.githubusercontent.com/u/17814185?s=460&u=3bf382ad4310fbbc7daef4a52ce05ade816459b3&v=4',
            width: 450,
            height: 450,
            alt: `${config.name}`,
          }],
      }}
      twitter={{
        handle: "@bryan_de_ridder",
        cardType: "summary_large_image",
      }}
    />
    <Head>
      <style>{`body { margin: 0;}`}</style>
      <title>{config.name}</title>
    </Head>
    <Nav pageRows={pageRows} />
    <NotionRenderer
      blockMap={blocks}
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
