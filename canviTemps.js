let unix_timestamp = 1606075773201
// Create a new JavaScript Date object based on the timestamp
// multiplied by 1000 so that the argument is in milliseconds, not seconds.
var date = new Date(unix_timestamp);
// Hours part from the timestamp

var day = date.getDate();
var month = date.getMonth() +1 ; //Retorna els mesos del 0 al 11 i els volem del 1 al 12
var year = date.getFullYear();

var hours = date.getHours();
var minutes = date.getMinutes();
var seconds = "0" + date.getSeconds();
//Fer els If que toquin si els números són menors a 10 i tota la pesca...


console.log(day + "/" + month + "/" + year);
console.log(hours + ":" + minutes + ":" + seconds)
