google.load("visualization", "1", {packages:["corechart"]});

$('.btn').button()

window.onload = function() {
  //drawChart();
}


function drawChart() {
  var data = google.visualization.arrayToDataTable([
    ['Year', 'Sales', 'Expenses'],
    ['2004',  1000,      400],
    ['2005',  1170,      460],
    ['2006',  660,       1120],
    ['2007',  1030,      540]
  ]);

  var options = {

  };

  var chart = new google.visualization.LineChart(document.getElementById('chart_div'));
  chart.draw(data, options);
}

$('#run-btn')
  .click(function () {
    var btn = $(this)
    btn.button('loading')


    setTimeout(function () {
      btn.button('reset');
      drawChart();
    }, 1000)
    

  })