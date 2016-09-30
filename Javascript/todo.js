var items = 0;

// create new todo item
var newItem = function() {
  var table = document.getElementById('todoList');
  var txtBox =  document.getElementById('todoEntryName');
  var value = txtBox.value;

  // just in case the value is nothing, set a default (this shouldn't be possible)
  if (value == "") {
    value = "New Item"
  }
  // reset the value and set button state
  txtBox.value = "";
  submitButtonState();

  // add new row to the bottom of the table
  var tableLength = table.rows.length;
  var newEntry = table.insertRow(tableLength);

// create checkbox cell and add to row
  var checkbox = document.createElement("INPUT");
  checkbox.setAttribute("id", "checkbox_".concat(items.toString()));
  checkbox.setAttribute("type", "checkbox");
  checkbox.class = "checkbox";
  var checkBoxCell = newEntry.insertCell(0);
  checkBoxCell.class = "checkboxCell"
  checkBoxCell.appendChild(checkbox);

// create todo name cell and add to row
  newEntry.id = "entry_".concat(items.toString())
  var entryNameCell = newEntry.insertCell(1);
  entryNameCell.innerHTML = value;

// create deleteButton and cell and add to row
  var deleteButton = document.createElement("BUTTON")
  deleteButton.innerHTML = "x";
  deleteButton.id = items.toString();
// code for deleting todo item
  deleteButton.onclick = function () {removeEntry(parseInt(deleteButton.id))};
  var deleteCell = newEntry.insertCell(2);
  deleteCell.appendChild(deleteButton);

  items += 1
}

// delete row
var removeEntry = function(buttonNum) {
  var rowId = "entry_".concat(buttonNum);
  var row = document.getElementById(rowId);
  row.parentNode.removeChild(row);
}

// if textbox is empty then disable submitButton
var submitButtonState = function() {
  var txtBox =  document.getElementById('todoEntryName');
  var value = txtBox.value;
  if (value == "") {
    document.getElementById('submitItemButton').disabled = true;
  } else {
    document.getElementById('submitItemButton').disabled = false;
  }
}
