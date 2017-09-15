document.addEventListener('DOMContentLoaded', addInfo);
document.addEventListener('DOMContentLoaded', insertInfo);

// Create items for the webpage
header();
createForm();
createTable("logTable");

/************************************************************
					addInfo()
	Continues to display information from the database when
	user renders the site
************************************************************/
function addInfo () {
	var req = new XMLHttpRequest();

	req.open('GET', "/display", true);

	req.addEventListener('load',function(){ 
		if(req.status >= 200 && req.status < 400){
	      
	    	var response = JSON.parse(req.responseText);

	    	var length = response.results.length;

	    	// Adds all of the informaiton into each row
	    	for (var i = 0; i < length; i++) {	
	    		var workOutID = response.results[i].id;
	    		var exName = response.results[i].name;
	    		var repNum = response.results[i].reps;
	    		var weightNum = response.results[i].weight;
	    		var exDate = response.results[i].date;
	    		var lbsNum = response.results[i].lbs;
				addItem(workOutID, exName, repNum, weightNum, exDate, lbsNum);
	    	}  
	    }
	    else {
	    	console.log("Error in network request: " + req.statusText);
	    }});

	req.send(null);

	event.preventDefault();
}

/************************************************************
					insertInfo()
	When the user selects to enter an excercise then the 
	information will be sent to the database to be saved/updated
************************************************************/
function insertInfo () {
	document.getElementById('submitTracker').addEventListener('click', function(event) {
	    var req = new XMLHttpRequest();

	    var payload = {name:null, reps:null, weight:null, date:null, lbs:null};

	    payload.name = document.getElementById('workoutName').value;
	    payload.reps = document.getElementById('repNumber').value;
	    payload.weight = document.getElementById('weightNumber').value;    
	    payload.date = document.getElementById('date').value;    
	    payload.lbs = document.getElementById('pounds').value;    
		

	   if (payload.name == "") {
	   	alert("Must Enter Name Of Excercise");
	   }
	   else {
			var context = "name=" + payload.name;
	   		context += "&reps=" + payload.reps;
		   	context += "&weight=" + payload.weight;
		   	context += "&date=" + payload.date;
		   	context += "&lbs=" +  payload.lbs;

		   
		   req.open('POST', "/insert?" + context, true);
		   req.setRequestHeader('Content-Type', 'application/json');

		   req.addEventListener('load', function()
		   	{ if(req.status >= 200 && req.status < 400) {

		   		document.getElementById("logTable").remove();
				createTable("logTable");

				var response = JSON.parse(req.responseText);

				// Create new table with updated informaiton 
				// received from the database
	    		var length = response.results.length;
	    		for (var i = 0; i < length; i++) {	
		    		var workOutID = response.results[i].id;
		    		var exName = response.results[i].name;
		    		var repNum = response.results[i].reps;
		    		var weightNum = response.results[i].weight;
		    		var exDate = response.results[i].date;
		    		var lbsNum = response.results[i].lbs;
					addItem(workOutID, exName, repNum, weightNum, exDate, lbsNum);
	    		}  

	    	}
	    	else {
	    		console.log("Error in network request: " + req.statusText);
	    	}});

			req.send(JSON.stringify(payload));
	    }

	    // Removes items from the form values
	    document.getElementById('workoutName').value = "";
	    document.getElementById('repNumber').value = "";
	    document.getElementById('weightNumber').value = "";  
	    document.getElementById('date').value = "";
	    document.getElementById('pounds').value = "";

	    event.preventDefault();
  })
}


/************************************************************
					updateRow()
	When the user selects to update a row, then the row will 
	be selected amd the values of each row will be stored
	A new form will be called for the user to complete
************************************************************/
function updateRow(tableID, currentRow) {
	try {
		var table = document.getElementById(tableID);
	    var rowCount = table.rows.length;

	    // Get the child node of the row in order to get the id
	    var idNum = currentRow.parentNode;
	    idNum = idNum.childNodes[0]; 
	    idNum = idNum.textContent

		// Traverse through all the rows until the appropriate table is found 
	    for (var i = 0; i < rowCount; i++) {
	    	var row = table.rows[i];
	            
	        if (row == currentRow.parentNode) {

	            // Variable to hold row infomration
	        	var workOutID = idNum;
	    		var exName;
	    		var repNum;
	    		var weightNum;
	    		var exDate;
	    		var lbsNum = 1; // Default lb

	           	var tableData = table.rows.item(i).cells;

				// Length of cells
			    var cellLength = tableData.length;

				// Traverse through each cell 
			    for (var j = 0; j < cellLength; j++){

				    // Obtain cell info then add it to the appropriate variable
				    var value = tableData.item(j).innerHTML;

				    var type = tableData.item(j);

				    if (j == 0) 
				     	exName = value;
				    else if (j == 1) 
				        repNum = value;
				    else if (j == 2) 
				        weightNum = value;
				    else if (j == 3)
				        exDate = value;
				    else if (j == 4){
				       	if (value == "Kgs")
				      		lbsNum = 0;
				    }

				}
					// Remove update form if it has already been displayed
  					if (document.getElementById("updateHeader") && document.getElementById("newForm")) {
  						document.getElementById("updateHeader").remove();
  						document.getElementById("newForm").remove();
  					}

  					// Add the form to the page so that the user can change the item
	                changeFormat(workOutID, exName, repNum, weightNum, exDate, lbsNum);

	                // The items changed will be sent to the database
	                updateNewContent(workOutID);
	            }
	        }
	} catch (e) {
        alert(e);
	}
}


/************************************************************
					updateNewContent()
	The information that the user would like to edit will be 
	posted to the database. The old table will be removed and 
	a new table will be populated. 
************************************************************/
function updateNewContent(workOutID) {
	document.getElementById('changeSection').addEventListener('click', function(event) {
		var req = new XMLHttpRequest();

		var content = "?id=" + workOutID;

		// Check whether the values have any items in them
		// If they do then send to the database
		if (document.getElementById('nameChange').value != "")
			content += "&name=" + document.getElementById('nameChange').value;
		else if (document.getElementById('repsChange').value != "")
			content += "&reps=" + document.getElementById('repsChange').value;
		else if (document.getElementById('weightChange').value != "")
			content += "&weight=" + document.getElementById('weightChange').value;
		else if (document.getElementById('dateChange').value != "")
			content += "&date=" + document.getElementById('dateChange').value;
		else if (document.getElementById('lbsChange').value != "")
			content += "&lbs=" + document.getElementById('lbsChange').value;

		var payload = {name:null, reps:null, weight:null, date:null, lbs:null};
		payload.name = document.getElementById('workoutName').value;
		payload.reps = document.getElementById('repNumber').value;
		payload.weight = document.getElementById('weightNumber').value;    
		payload.date = document.getElementById('date').value;    
		payload.lbs = document.getElementById('pounds').value;    
			
		req.open('POST', "/update" + content, true);
		req.setRequestHeader('Content-Type', 'application/json');

		req.addEventListener('load', function()
			{ if(req.status >= 200 && req.status < 400) {
				document.getElementById("logTable").remove();
				createTable("logTable");

				var response = JSON.parse(req.responseText);

				// Create new table with updated informaiton 
				// received from the database
	    		var length = response.results.length;
	    		for (var i = 0; i < length; i++) {	
		    		var workOutID = response.results[i].id;
		    		var exName = response.results[i].name;
		    		var repNum = response.results[i].reps;
		    		var weightNum = response.results[i].weight;
		    		var exDate = response.results[i].date;
		    		var lbsNum = response.results[i].lbs;
					addItem(workOutID, exName, repNum, weightNum, exDate, lbsNum);
	    		}  
		}
		else {
		  	console.log("Error in network request: " + req.statusText);
		}});

		req.send(JSON.stringify(payload));

		document.getElementById("updateHeader").remove();
  		document.getElementById("newForm").remove();
		event.preventDefault();
	})
}


/************************************************************
					deleteRow()
	The function will traverse through the rows to match the
	correct row that the user requested to delete.
	That row will then be deleted
************************************************************/
function deleteRow(tableID, currentRow) {
    try {
        var table = document.getElementById(tableID);
        var rowCount = table.rows.length;

        var idNum = currentRow.parentNode;
        idNum = idNum.childNodes[0]; 
        idNum = idNum.childNodes[0]; 
        idNum = idNum.textContent

        for (var i = 0; i < rowCount; i++) {
            var row = table.rows[i];
            
            if (row == currentRow.parentNode) {
                if (rowCount <= 1 ) {
                    alert("Cannot delete all the rows.");
                    break;
                }
                // Delete from database
				deleteFromDataBase(idNum);

				// Delete row
                table.deleteRow(i);
                rowCount--;
                i--;
            }
        }
    } catch (e) {
        alert(e);
    }
}

/************************************************************
					deleteRow()
	The function will traverse through the rows to match the
	correct row that the user requested to delete.
	That row will then be deleted
************************************************************/
function deleteFromDataBase(idNum) {
	var req = new XMLHttpRequest();
    
	var payload = {id:null};

	payload.id = idNum;

	var content = "?id=" + idNum;

	req.open('POST', "/delete" + content, true);
	req.setRequestHeader('Content-Type', 'application/json');

	req.addEventListener('load',function(){ 
		if(req.status >= 200 && req.status < 400){

      	} else {
        	console.log("Error in network request: " + req.statusText);
    }});

    req.send(JSON.stringify(payload));

    event.preventDefault();
}




