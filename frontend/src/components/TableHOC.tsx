import { useState } from "react";
import DataTable, { TableColumn } from "react-data-table-component";
import "../styles/tableHOC.css";

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
    <div className={`${containerClassName} w-full flex justify-center py-32`}>
      <div className="w-[95%] md:w-[90%]">
        <div className="w-full text-center">
          <h2 className="pb-10 text-3xl font-semibold font-dance">{heading}</h2>
        </div>
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
            columns={columns}
            data={filteredData}
            pagination
            highlightOnHover
            pointerOnHover
          />
        </div>
      </div>
    </div>
  );
}

export default TableHOC;
