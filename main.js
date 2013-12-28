(function(intent) {
google.load("visualization", "1", {packages:["corechart"]});

$('.btn').button();

var title = "";
var runfor = 0;



var variables = {};
var output;
var options = {};

window.onload = function() {

}

function updateVariable(name) {
  var initial = eval("intent." + name);
  var runstring = "intent." + name + "=(" + variables[name].func + ");";
  //log("doing " + runstring);
  eval(runstring);
  //log("updated " + name + "=" + eval(name) + " (" + initial + ")");
  //if(variables[name].exp == true)
  // log(name + " = " + eval("intent." + name));
  for(var i = 0; i < variables[name].update.length; i++) {
    //log("notifying " + variables[name].update[i]);
    updateVariable(variables[name].update[i]);
  }
}

function log(entry) {
  var box = $('#log-box');
  box.val(box.val() + entry + '\n');
  box.scrollTop(box[0].scrollHeight - box.height());
}

function drawChart() {



  var chart = new google.visualization.LineChart(document.getElementById('chart_div'));
  chart.draw(output, options);
}

function clearProgram() {
  $('#log-box').val("");
  title = "";
  variables = {};
  runfor = 0;
  output = new google.visualization.DataTable();
}

function loadLine(line) {
    var primary = line.split(" is ");
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
        var start = -1, stop = -1, every = -1, at = -1, update = [], exp = false, init = 0 , name = "null";
        var func = "1";
        var noparam = 0;
        for(var s = 0; s < parameters.length; s += 2) {
            if(parameters[s] == "start") start = parameters[s+1];
            else if(parameters[s] == "stop") stop = parameters[s+1];
            else if(parameters[s] == "every") every = parameters[s+1];
            else if(parameters[s] == "at") at = parameters[s+1];
            else if(parameters[s] == "do") update.push(parameters[s+1]);    
            else if(parameters[s] == "export") {
               exp = true;
               name = parameters[s+1];
            }
            else if(parameters[s] == "init") init = parameters[s+1];
            else if(parameters[s] == "define") name = parameters[s+1];
            else alert(parameters[s] + " is possibly unexpected");
        }
        func = primary[1];
        var runstring = "intent." + name + "=" + init + ";";
        eval(runstring);

        variables[name] = {"start": start,
                          "stop": stop,
                          "every": every,
                          "at": at,
                          "update": update,
                          "exp": exp,
                          "func": func};

    } else { //some error
        alert("something wrong?");
    }
}

function loadProgram() {
    var prog = $('#code-box').val();
    var lines = prog.split("\n");
    lines = lines.filter(function(n){return n});
    for(var l = 0; l < lines.length; l++) {
        loadLine(lines[l]);
    }
    options.title = title;
    log("run for " + runfor);
}

var runProgram = function() {
  keys = Object.keys(variables);
  
  output.addColumn('number', 'cycle');
  for(var y = 0; y < keys.length; y++) {
    if(variables[keys[y]].exp == true)
      output.addColumn('number', keys[y]);
  }

  for(var x = 0; x < runfor; x++) {
    setTimeout(runProgram, 5);
     for(var y = 0; y < keys.length; y++) {
      
      var at = variables[keys[y]].at;
      var every = variables[keys[y]].every;
      var start = variables[keys[y]].start;
      var stop = variables[keys[y]].stop;
      
      if(every > 0 && x % every == 0) {
        if(start <= 0 || (start >= 0 && x >= start)) {
          if(stop <= 0 || (stop >= 0 && x <= stop)) {
            updateVariable(keys[y]);
          }
        }
      } else if(at == x) {
        updateVariable(keys[y]);
      }
    }
    var row = [x];

    for(var y = 0; y < keys.length; y++) {
      if(variables[keys[y]].exp == true)
        row.push(eval("intent." + keys[y]));
    }
    output.addRow(row);
  }

}

$('#run-btn').click(function () {
  var btn = $(this)
  btn.button('loading');
  clearProgram();
  loadProgram();
  runProgram();
  drawChart();
  btn.button('reset');
})

})(this);