import { flexRender, Header } from "@tanstack/react-table";
import { HistoryRow } from "../Types.ts";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from '@dnd-kit/utilities'
import { CSSProperties } from "react";

export const DraggableHistoryTableHeader = ({header}: { header: Header<HistoryRow, unknown> }) => {
  const {attributes, isDragging, listeners, setNodeRef, transform} =
    useSortable({
      id: header.column.id,
    })

  const style: CSSProperties = {
    opacity: isDragging ? 0.8 : 1,
    position: 'relative',
    transform: CSS.Translate.toString(transform), // translate instead of transform to avoid squishing
    transition: 'width transform 0.2s ease-in-out',
    whiteSpace: 'nowrap',
    width: header.column.getSize(),
    zIndex: isDragging ? 1 : 0,
  }

  return (
    <th colSpan={header.colSpan} ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <span style={{fontSize: "0.8em", opacity: 0.5, marginRight: "8px"}}>
        🟰
      </span>
      {flexRender(header.column.columnDef.header, header.getContext())}
    </th>
  )
}
