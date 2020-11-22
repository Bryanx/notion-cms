import { NotionAPI } from 'notion-client'
import { config } from "../config"
import { PageRow } from "../types/pageTableRow";
import { ExtendedRecordMap } from "notion-types"

const notion = new NotionAPI()

export const getPagesTable = async (): Promise<PageRow[]> => {
  return await fetch(
    `https://notion-api.splitbee.io/v1/table/${config.notionPagesTableId}`
  ).then(res => res.json())
    .then(rows => rows.filter((row) => process.env.NODE_ENV === "development" || row.published));
}

export const getPageBlocks = async (pageId: string): Promise<ExtendedRecordMap> => {
  return await notion.getPage(`${pageId}`);
}
