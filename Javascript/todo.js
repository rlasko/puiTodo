var items = 0;

var newItem = function() {
  var table = document.getElementById('todoList');
  var txtBox =  document.getElementById('todoEntryName');
  var value = txtBox.value;
  if (value == "") {
    value = "New Item"
  }
  txtBox.value = "";

  var tableLength = table.rows.length;

  var newEntry = table.insertRow(tableLength);
  newEntry.id = "entry_".concat(items.toString())
  var entryNameCell = newEntry.insertCell(0);
  entryNameCell.innerHTML = value;

  var checkbox = document.createElement("INPUT");
  checkbox.setAttribute("id", "checkbox_".concat(items.toString()));
  checkbox.setAttribute("type", "checkbox");
  var checkBoxCell = newEntry.insertCell(1);
  checkBoxCell.appendChild(checkbox);

  var deleteButton = document.createElement("BUTTON")
  deleteButton.innerHTML = "x";
  deleteButton.id = items.toString();
  deleteButton.onclick = function () {removeEntry(parseInt(deleteButton.id))};
  var deleteCell = newEntry.insertCell(2);
  deleteCell.appendChild(deleteButton);

  

  items += 1
}

var removeEntry = function(buttonNum) {
  var rowId = "entry_".concat(buttonNum);
  var row = document.getElementById(rowId);
  row.parentNode.removeChild(row);
}
