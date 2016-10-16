var items = 0;

// create new todo item
var newItem = function() {
  var table = document.getElementById('todoList');
  var txtBox =  document.getElementById('todoEntryName');
  console.log(txtBox);
  var value = txtBox.value;

  // just in case the value is nothing, set a default (this shouldn't be possible)
  if (value == "") {
    value = "New Item"
  }
  // reset the value and set button state
  txtBox.value = "";
  // submitButtonState();

  // add new row to the bottom of the table
  var tableLength = table.rows.length;
  var newEntry = table.insertRow(tableLength);

// create checkbox cell and add to row
  var checkbox = document.createElement("INPUT");
  checkbox.setAttribute("id", "checkbox_".concat(items.toString()));
  checkbox.setAttribute("type", "checkbox");
  // checkbox.setAttribute("checked","not checked")
  checkbox.class = "checkbox";
  var checkBoxCell = newEntry.insertCell(0);
  checkBoxCell.class = "checkboxCell";
  var inputField = document.createElement("div");
  inputField.setAttribute("class","input-field col s12");
  inputField.appendChild(checkbox);
  checkBoxCell.appendChild(inputField);
  var label = document.createElement("LABEL");
  label.setAttribute("for",checkbox.id);
  inputField.appendChild(label);

// create todo name cell and add to row
  // newEntry.id = "entry_".concat(items.toString());
  // var entryNameCell = newEntry.insertCell(1);
  // entryNameCell.innerHTML = value;
  // var label = document.createElement("LABEL");
  // label.setAttribute("for",checkbox.id);
  // label.innerHTML = "ehllo";
  label.innerHTML = value;


// create deleteButton and cell and add to row
  var deleteButton = document.createElement("BUTTON")
  deleteButton.innerHTML = "x";
  deleteButton.setAttribute("class","deleteButton");
  deleteButton.id = items.toString();
// code for deleting todo item
  deleteButton.onclick = function () {removeEntry(parseInt(deleteButton.id))};
  var deleteCell = newEntry.insertCell(2);
  deleteCell.appendChild(deleteButton);

  listControllerButtonsStates();
  items += 1
}

// delete row
var removeEntry = function(buttonNum) {
  var rowId = "entry_".concat(buttonNum);
  var row = document.getElementById(rowId);
  row.parentNode.removeChild(row);
  listControllerButtonsStates();
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

// set enable/disable state of check all and delete all
var listControllerButtonsStates = function() {
  var table = document.getElementById('todoList');
  if (table.rows.length > 0) {
    document.getElementById('deleteAllButton').disabled = false;
    document.getElementById('checkAllButton').disabled = false;
  } else {
    document.getElementById('deleteAllButton').disabled = true;
    document.getElementById('checkAllButton').disabled = true;
  }
}

// check all list items
var checkAll = function() {
  var table = document.getElementById('todoList');
  var tableLength = table.rows.length;
  for (var i = 0; i < tableLength; i ++) {
    table.rows[i].cells[0].childNodes[0].checked = true;
  }
}

// delete all items
var deleteAll = function() {
  var table = document.getElementById('todoList');
  var tableLength = table.rows.length;
  for (var i = 0; i < tableLength; i ++) {
    var row = table.rows[0];
    table.rows[0].parentNode.removeChild(row);
  }
  listControllerButtonsStates(); // update state
}
