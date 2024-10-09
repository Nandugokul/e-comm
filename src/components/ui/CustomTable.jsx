/* eslint-disable react/prop-types */
function CustomTable({ tableHeading, tableRow, tableData }) {
  return (
    <section className="p-4 bg-secondaryColor rounded-md">
      <table className="w-full">
        <thead>
          <tr>
            {tableHeading.map((heading, index) => (
              <th
                key={heading}
                className={`bg-primaryColor py-4 ${
                  index === 0 ? "rounded-l-md" : ""
                } ${index === tableHeading.length - 1 ? "rounded-r-md" : ""}`}
              >
                {heading}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {tableData &&
            tableData.map((data) => (
              <tr className="border-b" key={data.id}>
                {tableRow}
              </tr>
            ))}
        </tbody>
      </table>
    </section>
  );
}

export default CustomTable;
