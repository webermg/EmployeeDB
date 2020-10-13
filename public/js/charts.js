var cht1 = $('#chart1');
var cht2 = $('#chart2');
var cht3 = $('#chart3');

const getSalaryData = () => {
    return $.ajax({
      url: `/api/salarybydept`,
      method: "GET"
    });
  };

var myChart = new Chart(cht1, {
  type: 'bar',
  data: {
      labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
      datasets: [{
          label: '# of Votes',
          data: [12, 19, 3, 5, 2, 3],
          backgroundColor: function(context) {
            let r = Math.floor(Math.random()*255);
            let g = Math.floor(Math.random()*255);
            let b = Math.floor(Math.random()*255);
            return `rgba(${r}, ${g}, ${b}, 1)`;
            },
          borderColor: function(context) {
            return 'black;'
          },
          borderWidth: 1
      }]
  },
  options: {
      scales: {
          yAxes: [{
              ticks: {
                  beginAtZero: true
              }
          }]
      }
  }
});

var myChart = new Chart(cht2, {
  type: 'pie',
  data: {
      labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
      datasets: [{
          label: '# of Votes',
          data: [12, 19, 3, 5, 2, 3],
          backgroundColor: function(context) {
            let r = Math.floor(Math.random()*255);
            let g = Math.floor(Math.random()*255);
            let b = Math.floor(Math.random()*255);
            return `rgba(${r}, ${g}, ${b}, 1)`;
            },
          borderColor: function(context) {
            return 'black;'
          },
          borderWidth: 1
      }]
  },
  options: {
      scales: {
          yAxes: [{
              ticks: {
                  beginAtZero: true
              }
          }]
      }
  }
});

$(document).ready(() => {
    getSalaryData().then(result => {
        console.log(result);
    })
  });