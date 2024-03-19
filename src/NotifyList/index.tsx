import { HistoryRow } from "./Types.ts";
import { API_URL } from "../Config.ts";
import { Button, Container, Table } from "react-bootstrap";
import { useServerHistory } from "./DataProvider.ts";

export function NotifyList() {
  const [data, reloadData] = useServerHistory();

  async function deleteItem(id: number): Promise<void> {
    const result = await fetch(`${API_URL}/api/history/${id}`, {
      method: "DELETE",
    });
    if(result.status != 200)
      return alert("Failed to delete");
    reloadData();
  }

  if(!data) return (
    <p>Loading...</p>
  );

  return (
    <Container style={{paddingTop: 32}}>
      <Table striped bordered hover>
        <thead>
        <tr>
          <th>Title</th>
          <th>Message</th>
          <th>Actions</th>
        </tr>
        </thead>
        <tbody>
          {data.map((value: HistoryRow) => (
            <tr key={value.id}>
              <td className="app-history__row__title">
                {value.title}
              </td>
              <td className="app-history__row__message">
                {value.message}
              </td>
              <td>
                <Button variant="danger" size="sm" onClick={() => deleteItem(value.id)}>
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  )
}
