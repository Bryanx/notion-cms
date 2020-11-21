import * as React from "react";
import Link from "next/link";
import Head from "next/head";
import { NextSeo } from "next-seo";
import { NotionRenderer, BlockMapType } from "react-notion";
import { PageTableRow } from "../types/pageTableRow";
import { getPageBlocks, getPagesTable } from "../lib/pages";
import { GetStaticPaths, GetStaticProps } from "next";
import { Nav } from "../components/nav";

interface PageProps {
  blocks: BlockMapType;
  page: PageTableRow;
  pageRows: PageTableRow[];
}

export const getStaticPaths: GetStaticPaths = async () => {
  const table = await getPagesTable();
  return {
    paths: table.map((row) => `/${row.path}`),
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const pageId = params?.pageId;

  if (!pageId) throw Error("No path given");
  
  const pageRows = await getPagesTable();
  const page = pageRows.find((t) => t.path === pageId);

  if (!page) throw Error(`Failed to find page for path: ${pageId}`);
  
  const blocks = await getPageBlocks(page.id);

  return {
    props: {
      page,
      blocks,
      pageRows
    },
    revalidate: 10,
  };
};

const PageComponent: React.FC<PageProps> = ({ page, blocks, pageRows }) => {
  if (!page) return null;

  return (
    <>
      <Nav pageRows={pageRows} />
      <NotionRenderer
        fullPage
        hideHeader
        blockMap={blocks}
      />
    </>
  );
};
export default PageComponent;