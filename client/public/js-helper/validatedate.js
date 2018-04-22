// Taken and modified from https://www.w3resource.com/javascript/form/javascript-date-validation.php

export const validateDate = (inputText) => {
    let dateformat = /^(0?[1-9]|1[012])[\/\-](0?[1-9]|[12][0-9]|3[01])[\/\-]\d{4}$/;

    // Match the date format through regular expression
    if (inputText.match(dateformat)) {
  
      //Test which seperator is used '/' or '-'
      var opera1 = inputText.split("/");
      var opera2 = inputText.split("-");
      let lopera1 = opera1.length;
      let lopera2 = opera2.length;
  
      // Extract the string into month, date and year
      if (lopera1 > 1) {
        var pdate = inputText.split("/");
      } else if (lopera2 > 1) {
        var pdate = inputText.split("-");
      }
  
      var mm = parseInt(pdate[0]);
      var dd = parseInt(pdate[1]);
      var yy = parseInt(pdate[2]);
  
      // Create list of days of a month [assume there is no leap year by default]
      var ListofDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
      if (mm == 1 || mm > 2) {
        if (dd > ListofDays[mm - 1]) {
          return false;
        }
      }
      if (mm == 2) {
        var lyear = false;
        if ((!(yy % 4) && yy % 100) || !(yy % 400)) {
          lyear = true;
        }
        if (lyear == false && dd >= 29) {
          alert("Invalid date format!");
          return false;
        }
        if (lyear == true && dd > 29) {
          alert("Invalid date format!");
          return false;
        }
      }
      return true;
    } else {
      return false;
    }
  }