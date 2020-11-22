import { NotionRenderer } from "react-notion-x";
import { ExtendedRecordMap } from "notion-types";
import { NextSeo } from "next-seo";
import { config } from "../config";
import Head from "next/head";
import Link from "next/link";
import { PageRow } from "../types/pageTableRow";
import { getPageBlocks, getPagesTable } from "../lib/pages";
import React from "react";
import { Nav } from "../components/nav";
import { Project } from "../components/project";
import { ProjectRow } from "../types/projectRow";
import { getProjectsTable } from "../lib/projects";

interface PageProps {
  pageBlocks: ExtendedRecordMap;
  pageRows: PageRow[];
  projectRows: ProjectRow[];
}

export async function getStaticProps() {
  const pageBlocks: ExtendedRecordMap = await getPageBlocks(`${config.notionHomePageId}`);
  const pageRows = await getPagesTable();
  const projectRows = await getProjectsTable();

  return {
    props: {
      pageBlocks,
      pageRows,
      projectRows
    },
    revalidate: 1
  };
}

const Home: React.FC<PageProps> = ({ pageBlocks, pageRows, projectRows }) => (
  <div className="home">
    <NextSeo
      title={`${config.name}`}
      description={`${config.description}`}
    />
    <Head>
      <title>{config.name}</title>
    </Head>
    <Nav pageRows={pageRows} />
    <NotionRenderer
      recordMap={pageBlocks}
      fullPage={true}
    />
    <Project projectRows={projectRows} />
  </div>
);

export default Home;
