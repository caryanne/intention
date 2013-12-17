google.load("visualization", "1", {packages:["corechart"]});

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

/*
function variable() {
    this.start = 0;
    this.stop = 0;
    this.every = 0;
    this.func = "";
    this.at = 0;
    this.update = {};
    this.export = false;
    this.init = 0;
}*/

var variables = {};

window.onload = function() {}

function drawChart() {
  var data = google.visualization.arrayToDataTable([
    ['Year', 'Sales', 'Expenses'],['2004',  1000,      400],['2005',  1170,      460]
  ]);

  var options = {};

  var chart = new google.visualization.LineChart(document.getElementById('chart_div'));
  chart.draw(data, options);
}

function clearProgram() {

  
}

function loadLine(line) {
    var primary = line.split(" is ");
    console.log(primary);
    if(primary.length == 1) {
        var parameters = primary[0].split(" ");
        if(parameters[0] == "title")
            title = parameters[1];
        if(parameters[0] == "runfor")
            runfor = parameters[1];
    }
}

function loadProgram() {
    var prog = $('#code-box').val();
    var lines = prog.split("\n");
    lines = lines.filter(function(n){return n});
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