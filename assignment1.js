//Window Initialization
let rowMax = 10,
  columnMax = 10;

window.addEventListener("load", (event) => {
  console.log("The page is fully loaded!");
  createTable(rowMax, columnMax);
});

//Customer Prompt
const numberOfPrompt = function () {
  if (numberOfRow.value && numberOfColumn.value) {
    createTable(numberOfRow.value, numberOfColumn.value);
  }
};

//Add rows and colums
const createTable = function (row, column) {
  const elementOfDiv = document.getElementById("tableContainer");

  //Remove the exiseted table, if applicable
  const existedTable = document.getElementById("myTable");

  if (existedTable) {
    existedTable.remove();
    console.log("The previous table has been removed.");
  }

  //Create New table tag
  const newTable = document.createElement("table");
  newTable.setAttribute("id", "myTable");
  elementOfDiv.appendChild(newTable);

  let result;

  for (let rowCounter = 1; rowCounter <= row; rowCounter++) {
    const elementOfRow = document.createElement("tr");
    newTable.appendChild(elementOfRow);

    for (let columnCounter = 1; columnCounter <= column; columnCounter++) {
      const elementOfColumn = document.createElement("td");
      elementOfRow.appendChild(elementOfColumn);
      result = rowCounter * columnCounter;

      const columnNode = document.createTextNode(
        `${rowCounter} x ${columnCounter} = ${result}`
      );

      elementOfColumn.appendChild(columnNode);
    }
  }
};
