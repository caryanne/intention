google.load("visualization", "1", {packages:["corechart"]});

$('.btn').button()

window.onload = function() {}

function drawChart() {
  var data = google.visualization.arrayToDataTable([
    ['Year', 'Sales', 'Expenses'],
    ['2004',  1000,      400],
    ['2005',  1170,      460],
    ['2006',  660,       1120],
    ['2007',  1030,      540]
  ]);

  var options = {};

  var chart = new google.visualization.LineChart(document.getElementById('chart_div'));
  chart.draw(data, options);
}

function clearProgram() {

  
}

function loadLine() {


}

function loadProgram() {
    var prog = $('#code-box').val();
    var lines = prog.split("\n");
    lines = lines.filter(function(n){return n});
    $('#log-box').val(lines);
    

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