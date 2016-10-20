var items = 0;
var showingEdit = false;
var picker = 0;

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
  // submitButtonState();

  // add new row to the bottom of the table
  var tableLength = table.rows.length;
  var newEntry = table.insertRow(tableLength);
  newEntry.id = "entry_".concat(items.toString());
  newEntry.setAttribute("class", "valign-wrapper");

// create checkbox cell and add to row
  var checkbox = document.createElement("INPUT");
  checkbox.setAttribute("id", "checkbox_".concat(items.toString()));
  checkbox.setAttribute("type", "checkbox");
  checkbox.class = "checkbox";
  checkbox.onclick = function() {strikeOutEntry(checkbox.id)}
  var checkBoxCell = newEntry.insertCell(0);
  checkBoxCell.class = "checkboxCell";
  var inputField = document.createElement("div");
  inputField.setAttribute("class","input-field col s12");
  inputField.appendChild(checkbox);
  checkBoxCell.appendChild(inputField);
  var label = document.createElement("LABEL");
  label.setAttribute("for",checkbox.id);
  label.id = checkbox.id.concat("_label");
  inputField.appendChild(label);
  label.innerHTML = value;

  // add date text/button
  var dateButton = document.createElement("BUTTON");
  dateButton.setAttribute("class","dateButton btn-flat datepicker");
  dateButton.id = checkbox.id.concat("_date");
  dateButton.onclick = function () {
    console.log("date clicked");
    setDate(dateButton.id);
  }
  dateButton.innerHTML = "Add due date";
  inputField.appendChild(dateButton);

// create deleteButton and cell and add to row
  var deleteButton = document.createElement("BUTTON")
  deleteButton.innerHTML = "x";
  if (showingEdit){
    deleteButton.style.display = "block";
  } else {
    deleteButton.style.display = "none";
  }
  deleteButton.setAttribute("class","deleteButton waves-effect waves-light btn-flat");
  deleteButton.id = items.toString();
// code for deleting todo item
  deleteButton.onclick = function () {removeEntry(parseInt(deleteButton.id))};
  var deleteCell = newEntry.insertCell(1);
  deleteCell.appendChild(deleteButton);

  listControllerButtonsStates();

  var tD = document.getElementById("tableDiv");
  console.log(table.rows.length );
  if (table.rows.length > 0){
    tD.style.display = "block";
  } else {
    tD.style.display = "none";
  }

  items += 1 // increment counter for unique ids
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
    document.getElementById('submitItemButton').add("disabled") = true;
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

// strike out labels for checkboxes when checkbox is clicked
var strikeOutEntry = function(id) {
  var item = document.getElementById(id);
  if (item.checked)
  {
    document.getElementById(id.concat("_label")).style.textDecoration = "line-through";
  } else {
    document.getElementById(id.concat("_label")).style.textDecoration = "none";
  }
}

// check all list items
var checkAll = function() {
  console.log("hello");
  var table = document.getElementById('todoList');
  var tableLength = table.rows.length;
  for (var i = 0; i < tableLength; i ++) {
    table.rows[i].cells[0].childNodes[0].childNodes[0].setAttribute("checked","checked");
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

// shows the buttons in the edit menu bar
var showEditMenu = function() {
  showingEdit = true;
  document.getElementById('footerButton').style.display = "none";
  document.getElementById('editMenu').style.display = "block";

  var deleteButtons = document.getElementsByClassName('deleteButton');
  // show delete buttons
  for (var i = 0; i < deleteButtons.length; i ++) {
    deleteButtons[i].style.display = 'block';
  }
}

// hides the buttons in the edit menu bar
var hideEditMenu = function() {
  showingEdit = false;
  document.getElementById('footerButton').style.display = "block";
  document.getElementById('editMenu').style.display = "none";

  var deleteButtons = document.getElementsByClassName('deleteButton');
  // hide delete buttons
  for (var i = 0; i < deleteButtons.length; i ++) {
    deleteButtons[i].style.display = 'none';
  }
}

// open date picker and start process
var setDate = function(id) {
  picker = $('.datepicker').pickadate({
    selectMonths: true,
    selectYears:4,
    onClose: function() {
      closedDate(id);
    }});
}

// Set values when picker closed
var closedDate = function(id) {
  var data = "";
  if (picker) {
    var date = $(picker.get()).val();
  }
  console.log(date);
  if (date != "")
  {
    document.getElementById(id).innerHTML = date;
  }
  picker = 0
}
