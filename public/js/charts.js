const cht1 = $('#chart1');
const cht2 = $('#chart2');
const cht3 = $('#chart3');

const colors = ['red', 'blue', 'green', 'yellow', 'orange', 'purple', 'brown', 'silver', 'tan', 'pink'];
const barChartOpts = {
    scales: {
        yAxes: [{
            ticks: {
                beginAtZero: true
            }
        }]
    }
}

let chart1;
let chart2;

const getSalaryData = () => {
    return $.ajax({
        url: `/api/salarybydept`,
        method: "GET"
    });
};

const getEmployeeData = () => {
    return $.ajax({
        url: `/api/empsbymgr`,
        method: "GET"
    });
};

const createChart = (chart, type, data, label, options=null) => {
    const labels = [], values = [];
    data.forEach(e => {
        labels.push(formatText(e.name));
        values.push(e.value);
    })
    return new Chart(chart, {
        type: type,
        data: {
            labels: labels,
            datasets: [{
                label: label,
                data: values,
                backgroundColor: function (context) {
                    return colors[context.dataIndex % colors.length];
                },
            }]
        },
        options: options
    })
}

const formatText = str => {
    //number test
    if(/\d+/.test(str)) return str;
    else if(str === null) return "";
    else {
      const letters = str.split("");
      letters[0] = letters[0].toUpperCase();
      for (let i = 1; i < letters.length; i++) {
        if(letters[i-1] === " ") letters[i] = letters[i].toUpperCase();
      }
      return letters.join("");
    }
  }

$(document).ready(() => {
    getSalaryData().then(result => {
        chart1 = createChart(cht1, "pie", result, "Costs by Department");
    })
    getEmployeeData().then(result => {
        //nsole.log(result);
        chart2 = createChart(cht2, "bar", result, "Employees by Manager", barChartOpts);
    })
});