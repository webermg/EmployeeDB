const cht1 = $('#chart1');
const cht2 = $('#chart2');
const cht3 = $('#chart3');

const colors = ['red','blue','green','yellow','orange','purple','brown','silver','tan','pink'];

let chart1;

const getSalaryData = () => {
    return $.ajax({
      url: `/api/salarybydept`,
      method: "GET"
    });
  };



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

const createChart = (chart, type,data,label) => {
    const labels = [], values = [];
    data.forEach(e => {
        labels.push(e.name);
        values.push(e.value);
    })
    return new Chart(chart,{
        type: type,
        data: {
            labels: labels,
            datasets: [{
                label: label,
                data: values,
                backgroundColor: function(context) {
                    return colors[context.dataIndex % colors.length];
                },
            }]
        }
    })
}

$(document).ready(() => {
    getSalaryData().then(result => {
        chart1 = createChart(cht1,"pie",result,"Costs by Department");
    })
  });