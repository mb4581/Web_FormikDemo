export type NewHistoryRow = {
  title: string,
  message: string,
}

export type HistoryRow = NewHistoryRow & {
  id: number,
}
