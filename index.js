/* Your Code Here */
// function to create an employee record
function createEmployeeRecord(arr) {
    return {
        firstName: arr[0],
        familyName: arr[1],
        title: arr[2],
        payPerHour: arr[3],
        timeInEvents: [],
        timeOutEvents: []
    };
}

// function to convert an array of arrays into an array of employee records
function createEmployeeRecords(arrays) {
    return arrays.map(createEmployeeRecord);
}

// Function to create a timeIn event for an employee
function createTimeInEvent(dateTimeString) {
    const [date, hour] = dateTimeString.split(' ');
    
    this.timeInEvents.push({
        type: "TimeIn",
        date: date,
        hour: parseInt(hour, 10)
    });
    
    return this;
}

// Function to create a timeOut event for an employee
function createTimeOutEvent(dateTimeString) {
    const [date, hour] = dateTimeString.split(' ');
    
    this.timeOutEvents.push({
        type: "TimeOut",
        date: date,
        hour: parseInt(hour, 10)
    });
    
    return this;
}

// Function to calculate hours worked on a specific date for an employee
function hoursWorkedOnDate(date) {
    const timeIn = this.timeInEvents.find(event => event.date === date);
    const timeOut = this.timeOutEvents.find(event => event.date === date);

    if (timeIn && timeOut) {
        return (timeOut.hour - timeIn.hour) / 100;
    } else {
        throw new Error('No matching timeIn/timeOut events found');
    }
}

// Function to calculate wages earned on a specific date for an employee
function wagesEarnedOnDate(date) {
    const hoursWorked = hoursWorkedOnDate.call(this, date);
    const rate = this.payPerHour;

    return hoursWorked * rate;
}

/*
 We're giving you this function. Take a look at it, you might see some usage
 that's new and different. That's because we're avoiding a well-known, but
 sneaky bug that we'll cover in the next few lessons!

 As a result, the lessons for this function will pass *and* it will be available
 for you to use if you need it!
 */

const allWagesFor = function () {
    const eligibleDates = this.timeInEvents.map(function (e) {
        return e.date
    })

    const payable = eligibleDates.reduce(function (memo, d) {
        return memo + wagesEarnedOnDate.call(this, d)
    }.bind(this), 0) // <== Hm, why did we need to add bind() there? We'll discuss soon!

    return payable
}


// Function to find an employee record by first name in an array of employee records
function findEmployeeByFirstName(srcArray, firstName) {
    return srcArray.find(employee => employee.firstName === firstName);
}

// Function to calculate total payroll for an array of employee records
function calculatePayroll(employees) {
    return employees.reduce((totalPayroll, employee) => {
        return totalPayroll + allWagesFor.call(employee);
    }, 0);
}

module.exports = {
    createEmployeeRecord,
    createEmployeeRecords,
    createTimeInEvent,
    createTimeOutEvent,
    hoursWorkedOnDate,
    wagesEarnedOnDate,
    allWagesFor,
    findEmployeeByFirstName,
    calculatePayroll
};
