//google.load("visualization", "1", {packages:["corechart"]});

$('.btn').button()

/*function Apple (type) {
    this.type = type;
    this.color = "red";
    this.getInfo = function() {
        return this.color + ' ' + this.type + ' apple';
    };
}

var apple = new Apple('macintosh');
apple.color = "reddish";
alert(apple.getInfo());*/

var title = "";
var runfor = 0;



var variables = {};

window.onload = function() {}

function drawChart() {
  /*var data = google.visualization.arrayToDataTable([
    ['Year', 'Sales', 'Expenses'],['2004',  1000,      400],['2005',  1170,      460]
  ]);

  var options = {};

  var chart = new google.visualization.LineChart(document.getElementById('chart_div'));
  chart.draw(data, options);*/
}

function clearProgram() {

  
}

function loadLine(line) {
    var primary = line.split(" is ");
    console.log(primary);
    if(primary.length == 1) { //program setting
        var parameters = primary[0].split(" ");
        if(parameters[0] == "title")
            title = parameters[1];
        else if(parameters[0] == "runfor")
            runfor = parameters[1];
        else
            alert("invalid program setting");
    } else if(primary.length == 2) { //variable definition
        var parameters = primary[0].split(" "); //do settings
        var start = -1, stop = -1, every = -1, at = -1, update = {}, exp = false, init = 0 , name = "null";
        var func = "1";
        for(var s = 0; s < parameters.length; s += 2) {
            if(parameters[s] == "start") start = parameters[s+1];
            else if(parameters[s] == "stop") stop = parameters[s+1];
            else if(parameters[s] == "every") every = parameters[s+1];
            else if(parameters[s] == "at") at = parameters[s+1];
            else if(parameters[s] == "update") update = parameters[s+1];    
            else if(parameters[s] == "export") exp = parameters[s+1];
            else if(parameters[s] == "init") init = parameters[s+1];
            else if(parameters[s] == "define") name = parameters[s+1];
        }
        func = primary[1];
        eval("var" + name + "=" + init + ";");
        console.log(name + " = " + eval("name;"));
    } else { //some error
        alert("something wrong?");
    }
}

function loadProgram() {
    var prog = $('#code-box').val();
    var lines = prog.split("\n");
    lines = lines.filter(function(n){return n});
    runfor = 1000;
    title = "no title";
    for(var l = 0; l < lines.length; l++) {
        loadLine(lines[l]);
    }
    console.log("title is " + title);
    console.log("run for " + runfor);

}

function runProgram() {

}

$('#run-btn').click(function () {
  var btn = $(this)
  btn.button('loading')
  clearProgram();
  loadProgram();
  runProgram();
  drawChart();
  btn.button('reset');
})