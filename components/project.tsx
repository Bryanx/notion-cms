import React from 'react'
import { ProjectRow } from '../types/projectRow'
import { toNotionImageUrl } from '../util/utils';

interface ProjectProps {
  projectRows: ProjectRow[];
}

export const Project = ({ projectRows }) => {
  console.log(projectRows);

  var rows = projectRows.map((row: ProjectRow) =>
    <li key={row.id} className="h-full w-full">
      <div className="h-32 w-full flex justify-center items-center bg-gray-200">
        <img className="w-12"
          src={toNotionImageUrl(row.images[0].url)}
          alt={row.title}
        />
      </div>
      <h2 className="text-xl">{row.title}</h2>
      <p>{row.description}</p>
    </li>
  );

  return (
    <div className="notion-page">
      <ul className="w-full grid grid-cols-3 gap-4 text-sm">
        {rows}
      </ul>
    </div>
  )
}
