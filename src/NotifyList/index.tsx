import "./index.scss";
import { HistoryRow } from "./Types.ts";
import { API_URL } from "../Config.ts";
import { Button, Container, Table } from "react-bootstrap";
import { useServerHistory } from "./DataProvider.ts";
import { getCoreRowModel, useReactTable } from "@tanstack/react-table";
import { restrictToHorizontalAxis } from '@dnd-kit/modifiers'
import { notifyListColumns } from "./react_table_trash/columnHelper.ts";
import React from "react";
import {
  closestCenter,
  DndContext,
  type DragEndEvent,
  KeyboardSensor,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core'
import { arrayMove, horizontalListSortingStrategy, SortableContext } from "@dnd-kit/sortable";
import { DraggableHistoryTableHeader } from "./react_table_trash/DraggableHistoryTableHeader.tsx";
import { DragAlongHistoryRowCell } from "./react_table_trash/DragAlongHistoryRowCell.tsx";

export function NotifyList() {
  const [data, reloadData] = useServerHistory();
  const [columnOrder, setColumnOrder] = React.useState<string[]>(() =>
    notifyListColumns.map(c => c.id!)
  );

  const table = useReactTable<HistoryRow>({
    data: data ?? [],
    state: {
      columnOrder,
    },
    onColumnOrderChange: setColumnOrder,
    columns: notifyListColumns,
    getCoreRowModel: getCoreRowModel(),
  });

  /**
   * Delete item button callback
   * @param id
   */
  async function deleteItem(id: string): Promise<void> {
    const result = await fetch(`${API_URL}/api/history/${id}`, {
      method: "DELETE",
    });
    if(result.status != 200)
      return alert("Failed to delete");
    reloadData();
  }

  /**
   * Called after column DnD
   * @param event
   */
  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event
    if (active && over && active.id !== over.id) {
      setColumnOrder(columnOrder => {
        const oldIndex = columnOrder.indexOf(active.id as string)
        const newIndex = columnOrder.indexOf(over.id as string)
        return arrayMove(columnOrder, oldIndex, newIndex) //this is just a splice util
      })
    }
  }

  const sensors = useSensors(
    useSensor(MouseSensor, {}),
    useSensor(TouchSensor, {}),
    useSensor(KeyboardSensor, {})
  )


  if(!data) return (
    <p>Loading...</p>
  );

  return (
    <Container style={{paddingTop: 32}}>
      <DndContext collisionDetection={closestCenter}
                  modifiers={[restrictToHorizontalAxis]}
                  onDragEnd={handleDragEnd}
                  sensors={sensors}>
        <Table striped bordered hover responsive className="notify-list-table">
          <thead>
          {table.getHeaderGroups().map(headerGroup => (
            <tr key={headerGroup.id}>
              <SortableContext
                items={columnOrder}
                strategy={horizontalListSortingStrategy}
              >
                {headerGroup.headers.map(header => (
                  <DraggableHistoryTableHeader key={header.id} header={header} />
                ))}
              </SortableContext>
              <th>
                Actions:
              </th>
            </tr>
          ))}
          </thead>
          <tbody>
          {table.getRowModel().rows.map(row => (
            <tr key={row.id}>
              {row.getVisibleCells().map(cell => (
                <SortableContext
                  key={cell.id}
                  items={columnOrder}
                  strategy={horizontalListSortingStrategy}
                >
                  <DragAlongHistoryRowCell key={cell.id} cell={cell}/>
                </SortableContext>
              ))}
              <td>
                <Button variant="danger" size="sm" onClick={() => deleteItem(row.id)}>
                  Delete
                </Button>
              </td>
            </tr>
          ))}
          </tbody>
        </Table>
      </DndContext>
    </Container>
  )
}
