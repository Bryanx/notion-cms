import { BlockMapType } from "react-notion";
import { config } from "../config"
import { PageTableRow } from "../types/pageTableRow";

export const getPagesTable = async (): Promise<PageTableRow[]> => {
  return await fetch(
    `https://notion-api.splitbee.io/v1/table/${config.notionPagesTableId}`
  ).then(res => res.json())
  .then(rows => rows.filter((row) => process.env.NODE_ENV === "development" || row.published));
}

export const getPageBlocks = async (pageId: string): Promise<BlockMapType> => {
  return await fetch(
    `https://notion-api.splitbee.io/v1/page/${pageId}`
  ).then(res => res.json());
}
