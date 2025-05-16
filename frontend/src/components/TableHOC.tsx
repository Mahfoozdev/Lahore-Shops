import { useState } from "react";
import DataTable, { TableColumn } from "react-data-table-component";
import "../styles/tableHOC.css";

interface TableHOCProps<T> {
  columns: TableColumn<T>[];
  data: T[];
  containerClassName: string;
  heading: string;
}

const customStyles = {
  table: {
    style: {
      backgroundColor: "#f4f4f8", // 👈 change this to any background color
    },
  },
  headRow: {
    style: {
      backgroundColor: "#928dab",
      color: "#333",
    },
  },
  pagination: {
    style: {
      backgroundColor: "#d8d6e3", // 👈 pagination background color
      borderTop: "1px solid #ccc", // optional border
      padding: "10px",
    },
  },
  rows: {
    style: {
      backgroundColor: "#d8d6e3",
      color: "#000",
    },
  },
  headCells: {
    style: {
      backgroundColor: "#d8d6e3",
      color: "#444",
      fontWeight: "bold",
    },
  },
};
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
    <div className={`${containerClassName} w-full flex justify-center pb-32`}>
      <div className="w-[95%] md:w-[90%]">
        <div className="w-full text-center">
          <h2 className="pb-10 text-3xl font-semibold pt-10">{heading}</h2>
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
            customStyles={customStyles}
          />
        </div>
      </div>
    </div>
  );
}

export default TableHOC;
