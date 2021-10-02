function startDay() {
    var SimpleDateFormat = Java.type('java.text.SimpleDateFormat');
    var sdf = new SimpleDateFormat('yyyy-MM-dd\'T00:00:00\'');
    var date = new java.util.Date();
    return sdf.format(date);
}

function endDay() {
    var SimpleDateFormat = Java.type('java.text.SimpleDateFormat');
    var sdf = new SimpleDateFormat('yyyy-MM-dd\'T00:00:00\'');
    var date = new java.util.Date();
    date.setDate(date.getDate() + 1)
    return sdf.format(date);
}

function midDay() {
    var SimpleDateFormat = Java.type('java.text.SimpleDateFormat');
    var sdf = new SimpleDateFormat('yyyy-MM-dd\'T11:00:00\'');
    var date = new java.util.Date();
    return sdf.format(date);
}

function pastDay() {
    var SimpleDateFormat = Java.type('java.text.SimpleDateFormat');
    var sdf = new SimpleDateFormat('yyyy-MM-dd\'T11:00:00\'');
    var date = new java.util.Date();
    date.setDate(date.getDate() - 1)
    return sdf.format(date);
}

function nextYear() {
    var SimpleDateFormat = Java.type('java.text.SimpleDateFormat');
    var sdf = new SimpleDateFormat('yyyy-MM-dd\'T00:00:00\'');
    var date = new java.util.Date();
    date.setDate(date.getDate() + 365)
    return sdf.format(date);
}

function lastYear() {
    var SimpleDateFormat = Java.type('java.text.SimpleDateFormat');
    var sdf = new SimpleDateFormat('yyyy-MM-dd\'T00:00:00\'');
    var date = new java.util.Date();
    date.setDate(date.getDate() - 365)
    return sdf.format(date);
}

function randomZipCode() {
    return Math.floor(Math.random() * (11100 - 11200 + 1)) + 11100;
}

function wait(seconds) {
    java.lang.Thread.sleep(seconds)
}

function replaceString(mystring) {
    mystring = mystring.split('-').join('')
    return mystring.toUpperCase()
}

function returnUUID() {
    return java.util.UUID.randomUUID() + '';
}

function randomNumber(max) {
    return Math.floor((Math.random() * max) +1)
}
