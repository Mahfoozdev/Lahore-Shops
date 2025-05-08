import { useState } from "react";
import DataTable, { TableColumn } from "react-data-table-component";

interface TableHOCProps<T> {
  columns: TableColumn<T>[];
  data: T[];
  containerClassName: string;
  heading: string;
}

function TableHOC<T extends object>({
  columns,
  data,
  containerClassName,
  heading,
}: TableHOCProps<T>) {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredData = data.filter((item) =>
    Object.values(item).some((val) =>
      String(val).toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  return (
    <div className={containerClassName}>
      <h2>{heading}</h2>

      <div style={{ maxWidth: 1000, margin: "0 auto 1rem" }}>
        <input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{
            width: "100%",
            padding: "8px",
            borderRadius: "4px",
            border: "1px solid #ccc",
            marginBottom: "10px",
          }}
        />
      </div>

      <div style={{ maxWidth: 1000, margin: "0 auto" }}>
        <DataTable
          title={heading}
          columns={columns}
          data={filteredData}
          pagination
          highlightOnHover
          pointerOnHover
        />
      </div>
    </div>
  );
}

export default TableHOC;
