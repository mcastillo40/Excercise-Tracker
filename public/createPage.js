<<<<<<< HEAD
/************************************************************
					header()
	Creates the topbar header
************************************************************/
function header() {
	var header = document.createElement("div");
	header.setAttribute("id", "topbar");

	var title = document.createElement("h1");
	title.textContent = "Excercise Tracker";

	header.appendChild(title);

	document.body.appendChild(header);	
}

/************************************************************
					createForm()
	Creates the form that the user will use in order to input
	the excercise information 
************************************************************/
var createForm = function() {
	// Create Form
	var formContent = document.createElement("form");

	// Create Field to get user's input
	var newFieldset = document.createElement("fieldset");

	var newLegend = document.createElement("legend");

	document.body.appendChild(formContent);	
	formContent.appendChild(newFieldset);
	newFieldset.appendChild(newLegend);

	// Get information from user (name, id)
	createLabel(newFieldset, "Name Of Excercise", "workoutName");

	// Focus on Name 
	document.getElementById('workoutName').focus();

	createLabel(newFieldset, "Reps", "repNumber");
	createLabel(newFieldset, "Weight", "weightNumber");
	createLabel(newFieldset, "Date", "date");
	createLabel(newFieldset, "Lbs (1: lbs 0: Kgs)", "pounds");

	// Create submit button
	var submitButton = document.createElement("input");
	submitButton.setAttribute("type", "submit");
	submitButton.setAttribute("value", "Add To Tracker");
	submitButton.setAttribute("id", "submitTracker");

	newFieldset.appendChild(submitButton);
}

/************************************************************
					createLabel()
	Create a label in the form by populating it's name and 
	giving the item an id 
************************************************************/
function createLabel(field, name, id) {
	var newLabel = document.createElement("label");
	newLabel.setAttribute("for", id);

	var divContent = document.createElement("div");
	divContent.setAttribute("class", "entryType");
	divContent.textContent = name + ":";
	newLabel.appendChild(divContent);
	field.appendChild(newLabel); 

	var inputContent = document.createElement("input");
	inputContent.setAttribute("class", "entry");
	inputContent.setAttribute("type", "text");
	inputContent.setAttribute("id", id);
	inputContent.setAttribute("size", "30");
	inputContent.setAttribute("maxlength", "100");
	if (id == 'workoutName')
		inputContent.setAttribute("required", "true");

	var breakLine = document.createElement("br");

	field.appendChild(inputContent); 
	field.appendChild(breakLine); 
}

/************************************************************
					createTable()
	Builds Table where information will be placed 
	Only adds the Table header
	Name, Reps, Weight, Date, Lbs
************************************************************/
var createTable = function(id) {
	var cell = [];
	var idCounter = 0; 

	var newTable = document.createElement("table");
	newTable.setAttribute("id", id);

	var newRow = document.createElement("tr");

	document.body.appendChild(newTable);	
	//page.appendChild(newTable);
	
	var newRow = document.createElement("tr");
	newTable.appendChild(newRow);

	// Create header in table 
	for (var i = 0; i < 5; i++) {	
		var newHeader = document.createElement("th"); 
		if (i == 0)
			newHeader.textContent = "Name";
		else if (i == 1)
			newHeader.textContent = "Reps";
		else if (i == 2)
			newHeader.textContent = "Weight";
		else if (i == 3)
			newHeader.textContent = "Date";
		else if (i == 4)
			newHeader.textContent = "Lbs";

		newRow.appendChild(newHeader);
	}
}

/************************************************************
					changeFormat()
	A form will be shown to the user for the row that they
	selected to edit. A placeholder will be shown of the 
	current values in each row 
************************************************************/
function changeFormat(idNum, name, reps, weight, date, lbs) {
	// Label form
	var divContent = document.createElement("div");
	divContent.setAttribute("id", "updateHeader");
	var header = document.createElement('h3');
	header.textContent = "Update Excercise";
	divContent.appendChild(header);
	document.body.appendChild(divContent);	

	// Creates a new table with the id "newForm"
	createTable("newForm");

	// Add to exiting table
	var table = document.getElementById('newForm');


	// Create a new row
	var newRow = document.createElement("tr");
	table.appendChild(newRow);

	// Add to data slots 
	var inputID = document.createElement("input");

	// Inserts id as a hden value
	inputID.textContent = idNum;
	inputID.setAttribute("type", "hidden");
	inputID.setAttribute("class", "idInformation");
	newRow.appendChild(inputID);

	// Name of excercise
	var tableData = document.createElement("td");
	var value = document.createElement("input");
	value.setAttribute("placeholder", name);
	value.setAttribute("maxlength", "100");
	value.setAttribute("id", "nameChange");
	tableData.appendChild(value);
	newRow.appendChild(tableData);

	// Focus on Name when form populates
	document.getElementById('nameChange').focus();

	// Number of reps
	var tableData = document.createElement("td");
	var value = document.createElement("input");
	value.setAttribute("placeholder", reps);
	value.setAttribute("maxlength", "100");
	value.setAttribute("id", "repsChange");
	tableData.appendChild(value);
	newRow.appendChild(tableData);

	// Amount of weight
	var tableData = document.createElement("td");
	var value = document.createElement("input");
	value.setAttribute("placeholder", weight);
	value.setAttribute("maxlength", "100");
	value.setAttribute("id", "weightChange");
	tableData.appendChild(value);
	newRow.appendChild(tableData);

	// The date of excercise
	var tableData = document.createElement("td");
	var value = document.createElement("input");
	value.setAttribute("placeholder", date);
	value.setAttribute("maxlength", "100");
	value.setAttribute("id", "dateChange");
	tableData.appendChild(value);
	newRow.appendChild(tableData);

	// If it was done in lbs or kg
	var tableData = document.createElement("td");
	var value = document.createElement("input");
	value.setAttribute("maxlength", "100");
	value.setAttribute("id", "lbsChange");
	if (lbs == 1) {
		value.setAttribute("placeholder", "lbs");
	}
	else {
		value.setAttribute("placeholder", "Kg");
	}
	tableData.appendChild(value);
	newRow.appendChild(tableData);

	// Link edit button to row
	var button = document.createElement("input");
	button.setAttribute("type", "submit");
	button.setAttribute("value", "Update Info");
	button.setAttribute("id", "changeSection");

	// Create new Row with only submit button
	var newRow = document.createElement("tr");
	table.appendChild(newRow);
	var tableData = document.createElement("td");
	tableData.setAttribute("colspan", "5");
	tableData.setAttribute("id", "updateRow");
	tableData.appendChild(button);

	newRow.appendChild(tableData);
}

/************************************************************
					addItem()
	Adds an item with specified information into the last row
	of the form 
************************************************************/
function addItem (id, name, reps, weight, date, lbs,) {
	// Add to exiting table
	var table = document.getElementById('logTable');
	
	// Create a new row
	var newRow = document.createElement("tr");
	table.appendChild(newRow);

	// Add to data slots 
	var inputID = document.createElement("input");
	inputID.textContent = id;
	inputID.setAttribute("type", "hidden");
	inputID.setAttribute("class", "idInformation");
	newRow.appendChild(inputID);

	// Name of excercise
	var tableData = document.createElement("td");
	tableData.textContent = name; 
	tableData.setAttribute("value", name);
	newRow.appendChild(tableData);


	// Number of reps
	var tableData = document.createElement("td");
	tableData.textContent = reps; 
	tableData.setAttribute("value", reps);
	newRow.appendChild(tableData);

	// Amount of weight
	var tableData = document.createElement("td");
	tableData.textContent = weight; 
	tableData.setAttribute("value", weight);
	newRow.appendChild(tableData);

	// The date of excercise
	var tableData = document.createElement("td");
	tableData.textContent = date; 
	tableData.setAttribute("value", date);
	newRow.appendChild(tableData);

	// If it was done in lbs or kg
	var tableData = document.createElement("td");
	if (lbs == 1) {
		tableData.textContent = "Lbs"; 
		tableData.setAttribute("value", 1);
	}
	else {
		tableData.textContent = "Kgs"; 
		tableData.setAttribute("value", 0);
	}

	newRow.appendChild(tableData);

	// Link edit button to row
	var button = document.createElement("button");
	button.textContent = "Edit";
	button.setAttribute("onclick", "updateRow('logTable', this)");
	button.setAttribute("id", "UpdateSection");
	newRow.appendChild(button);

	// Link delete button to row
	var button = document.createElement("button");
	button.textContent = "Delete";
	button.setAttribute("onclick", "deleteRow('logTable', this)");
	button.setAttribute("id", "DeleteSection");
	newRow.appendChild(button);
=======
/************************************************************
					header()
	Creates the topbar header
************************************************************/
function header() {
	var header = document.createElement("div");
	header.setAttribute("id", "topbar");

	var title = document.createElement("h1");
	title.textContent = "Excercise Tracker";

	header.appendChild(title);

	document.body.appendChild(header);	
}

/************************************************************
					createForm()
	Creates the form that the user will use in order to input
	the excercise information 
************************************************************/
var createForm = function() {
	// Create Form
	var formContent = document.createElement("form");

	// Create Field to get user's input
	var newFieldset = document.createElement("fieldset");

	var newLegend = document.createElement("legend");

	document.body.appendChild(formContent);	
	formContent.appendChild(newFieldset);
	newFieldset.appendChild(newLegend);

	// Get information from user (name, id)
	createLabel(newFieldset, "Name Of Excercise", "workoutName");

	// Focus on Name 
	document.getElementById('workoutName').focus();

	createLabel(newFieldset, "Reps", "repNumber");
	createLabel(newFieldset, "Weight", "weightNumber");
	createLabel(newFieldset, "Date", "date");
	createLabel(newFieldset, "Lbs (1: lbs 0: Kgs)", "pounds");

	// Create submit button
	var submitButton = document.createElement("input");
	submitButton.setAttribute("type", "submit");
	submitButton.setAttribute("value", "Add To Tracker");
	submitButton.setAttribute("id", "submitTracker");

	newFieldset.appendChild(submitButton);
}

/************************************************************
					createLabel()
	Create a label in the form by populating it's name and 
	giving the item an id 
************************************************************/
function createLabel(field, name, id) {
	var newLabel = document.createElement("label");
	newLabel.setAttribute("for", id);

	var divContent = document.createElement("div");
	divContent.setAttribute("class", "entryType");
	divContent.textContent = name + ":";
	newLabel.appendChild(divContent);
	field.appendChild(newLabel); 

	var inputContent = document.createElement("input");
	inputContent.setAttribute("class", "entry");
	inputContent.setAttribute("type", "text");
	inputContent.setAttribute("id", id);
	inputContent.setAttribute("size", "30");
	inputContent.setAttribute("maxlength", "100");
	if (id == 'workoutName')
		inputContent.setAttribute("required", "true");

	var breakLine = document.createElement("br");

	field.appendChild(inputContent); 
	field.appendChild(breakLine); 
}

/************************************************************
					createTable()
	Builds Table where information will be placed 
	Only adds the Table header
	Name, Reps, Weight, Date, Lbs
************************************************************/
var createTable = function(id) {
	var cell = [];
	var idCounter = 0; 

	var newTable = document.createElement("table");
	newTable.setAttribute("id", id);

	var newRow = document.createElement("tr");

	document.body.appendChild(newTable);	
	//page.appendChild(newTable);
	
	var newRow = document.createElement("tr");
	newTable.appendChild(newRow);

	// Create header in table 
	for (var i = 0; i < 5; i++) {	
		var newHeader = document.createElement("th"); 
		if (i == 0)
			newHeader.textContent = "Name";
		else if (i == 1)
			newHeader.textContent = "Reps";
		else if (i == 2)
			newHeader.textContent = "Weight";
		else if (i == 3)
			newHeader.textContent = "Date";
		else if (i == 4)
			newHeader.textContent = "Lbs";

		newRow.appendChild(newHeader);
	}
}

/************************************************************
					changeFormat()
	A form will be shown to the user for the row that they
	selected to edit. A placeholder will be shown of the 
	current values in each row 
************************************************************/
function changeFormat(idNum, name, reps, weight, date, lbs) {
	// Label form
	var divContent = document.createElement("div");
	divContent.setAttribute("id", "updateHeader");
	var header = document.createElement('h3');
	header.textContent = "Update Excercise";
	divContent.appendChild(header);
	document.body.appendChild(divContent);	

	// Creates a new table with the id "newForm"
	createTable("newForm");

	// Add to exiting table
	var table = document.getElementById('newForm');


	// Create a new row
	var newRow = document.createElement("tr");
	table.appendChild(newRow);

	// Add to data slots 
	var inputID = document.createElement("input");

	// Inserts id as a hden value
	inputID.textContent = idNum;
	inputID.setAttribute("type", "hidden");
	inputID.setAttribute("class", "idInformation");
	newRow.appendChild(inputID);

	// Name of excercise
	var tableData = document.createElement("td");
	var value = document.createElement("input");
	value.setAttribute("placeholder", name);
	value.setAttribute("maxlength", "100");
	value.setAttribute("id", "nameChange");
	tableData.appendChild(value);
	newRow.appendChild(tableData);

	// Focus on Name when form populates
	document.getElementById('nameChange').focus();

	// Number of reps
	var tableData = document.createElement("td");
	var value = document.createElement("input");
	value.setAttribute("placeholder", reps);
	value.setAttribute("maxlength", "100");
	value.setAttribute("id", "repsChange");
	tableData.appendChild(value);
	newRow.appendChild(tableData);

	// Amount of weight
	var tableData = document.createElement("td");
	var value = document.createElement("input");
	value.setAttribute("placeholder", weight);
	value.setAttribute("maxlength", "100");
	value.setAttribute("id", "weightChange");
	tableData.appendChild(value);
	newRow.appendChild(tableData);

	// The date of excercise
	var tableData = document.createElement("td");
	var value = document.createElement("input");
	value.setAttribute("placeholder", date);
	value.setAttribute("maxlength", "100");
	value.setAttribute("id", "dateChange");
	tableData.appendChild(value);
	newRow.appendChild(tableData);

	// If it was done in lbs or kg
	var tableData = document.createElement("td");
	var value = document.createElement("input");
	value.setAttribute("maxlength", "100");
	value.setAttribute("id", "lbsChange");
	if (lbs == 1) {
		value.setAttribute("placeholder", "lbs");
	}
	else {
		value.setAttribute("placeholder", "Kg");
	}
	tableData.appendChild(value);
	newRow.appendChild(tableData);

	// Link edit button to row
	var button = document.createElement("input");
	button.setAttribute("type", "submit");
	button.setAttribute("value", "Update Info");
	button.setAttribute("id", "changeSection");

	// Create new Row with only submit button
	var newRow = document.createElement("tr");
	table.appendChild(newRow);
	var tableData = document.createElement("td");
	tableData.setAttribute("colspan", "5");
	tableData.setAttribute("id", "updateRow");
	tableData.appendChild(button);

	newRow.appendChild(tableData);
}

/************************************************************
					addItem()
	Adds an item with specified information into the last row
	of the form 
************************************************************/
function addItem (id, name, reps, weight, date, lbs,) {
	// Add to exiting table
	var table = document.getElementById('logTable');
	
	// Create a new row
	var newRow = document.createElement("tr");
	table.appendChild(newRow);

	// Add to data slots 
	var inputID = document.createElement("input");
	inputID.textContent = id;
	inputID.setAttribute("type", "hidden");
	inputID.setAttribute("class", "idInformation");
	newRow.appendChild(inputID);

	// Name of excercise
	var tableData = document.createElement("td");
	tableData.textContent = name; 
	tableData.setAttribute("value", name);
	newRow.appendChild(tableData);


	// Number of reps
	var tableData = document.createElement("td");
	tableData.textContent = reps; 
	tableData.setAttribute("value", reps);
	newRow.appendChild(tableData);

	// Amount of weight
	var tableData = document.createElement("td");
	tableData.textContent = weight; 
	tableData.setAttribute("value", weight);
	newRow.appendChild(tableData);

	// The date of excercise
	var tableData = document.createElement("td");
	tableData.textContent = date; 
	tableData.setAttribute("value", date);
	newRow.appendChild(tableData);

	// If it was done in lbs or kg
	var tableData = document.createElement("td");
	if (lbs == 1) {
		tableData.textContent = "Lbs"; 
		tableData.setAttribute("value", 1);
	}
	else {
		tableData.textContent = "Kgs"; 
		tableData.setAttribute("value", 0);
	}

	newRow.appendChild(tableData);

	// Link edit button to row
	var button = document.createElement("button");
	button.textContent = "Edit";
	button.setAttribute("onclick", "updateRow('logTable', this)");
	button.setAttribute("id", "UpdateSection");
	newRow.appendChild(button);

	// Link delete button to row
	var button = document.createElement("button");
	button.textContent = "Delete";
	button.setAttribute("onclick", "deleteRow('logTable', this)");
	button.setAttribute("id", "DeleteSection");
	newRow.appendChild(button);
>>>>>>> 9cc5b96d9de1e79ecbf73ea916ba152504d293a4
}