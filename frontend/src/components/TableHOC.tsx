import DataTable, { TableColumn } from "react-data-table-component";

function TableHOC<T extends object>(
  columns: TableColumn<T>[],
  data: T[],
  containerClassName: string,
  heading: string
) {
  return (
    <div className={containerClassName}>
      <h2>{heading}</h2>
      <div style={{ maxWidth: 1000, margin: "0 auto" }}>
        <DataTable
          title={heading}
          columns={columns}
          data={data}
          pagination
          highlightOnHover
          pointerOnHover
        />
      </div>
    </div>
  );
}

export default TableHOC;
