/* Your Code Here */

function createEmployeeRecord(input) {
    return {
        firstName: input[0],
        familyName: input[1],
        title: input[2],
        payPerHour: input[3],
        timeInEvents: [],
        timeOutEvents: []
    }
}

function createEmployeeRecords (employeeRecordData) {
    return employeeRecordData.map(createEmployeeRecord)
}

function createTimeInEvent (date) {
    this.timeInEvents.push({
        type: "TimeIn",
        hour: Number(date.slice(11)),
        date: date.slice(0, 10)
    })
    return this
}

function createTimeOutEvent (date) {
    this.timeOutEvents.push({
        type: "TimeOut",
        hour: Number(date.slice(11)),
        date: date.slice(0, 10)
    })
    return this
}

function hoursWorkedOnDate (date) {
    const timeInForDate = findEventFromDate(this.timeInEvents, date).hour
    const timeOutForDate = findEventFromDate(this.timeOutEvents, date).hour
    return ((timeOutForDate - timeInForDate)/100)
}

// this function takes an array of time events and a date and returns the time event whose date matches the date given as an arg
function findEventFromDate (timeEvent, date) {
    return timeEvent.find(obj => obj.date === date)
}

function wagesEarnedOnDate (date) {
    return hoursWorkedOnDate.call(this, date) * this.payPerHour
}

function findEmployeeByFirstName (srcArray, firstName) {
    return srcArray.find(record => record.firstName === firstName)
}

function calculatePayroll (array) {
    return array.reduce((memo, record) => memo + allWagesFor.call(record), 0)
}

// function calculatePayroll (array) {
//     let payArray;

//     for (let date in array) {
//         payArray.push(allWagesFor.call(date))
//     }
//     let totalOwed = 0
//     for (let employeeWage of payArray) {
//         totalOwed = totalOwed + employeeWage
//     }
//     return totalOwed
// }

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

