import { createColumnHelper } from "@tanstack/react-table";
import { HistoryRow } from "../Types.ts";

const helper = createColumnHelper<HistoryRow>();

export const notifyListColumns = [
  helper.accessor("title", {
    id: "title",
    header: "Title",
    size: 200,
    enablePinning: true,
  }),
  helper.accessor("message", {
    id: "message",
    header: "Message",
    size: 600,
  }),
];
