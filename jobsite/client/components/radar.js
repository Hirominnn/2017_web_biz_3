import Chart from 'chart.js';

Template.radar.onRendered(function() {
	var ctx = document.getElementById("radar").getContext('2d');
	var randomScalingFactor = function() {
      return Math.round(Math.random() * 100);
  };
  var color = Chart.helpers.color;
  var config = {
      type: 'radar',
      data: {
        labels: ['待遇面の満足度', '社員の士気', '風通しの良さ', '社員の相互尊重', '20代成長環境', '人材の長期育成', '法令順守意識', '人事評価の適正感'],
        datasets: [{
            label: "My First dataset",
            backgroundColor: color('#c6f0f4').alpha(0.8).rgbString(),
            borderColor: '#75b2d0',
            pointBackgroundColor: '#4093bb',
            data: [
                randomScalingFactor(),
                randomScalingFactor(),
                randomScalingFactor(),
                randomScalingFactor(),
                randomScalingFactor(),
                randomScalingFactor(),
                randomScalingFactor(),
                randomScalingFactor()
            ]
        }]
      },
      options: {
      	legend: {
	        display: false
	    	},
        scale: {
          ticks: {
            display: false
          }
        }
      }
  };
	var myRadarChart = new Chart(ctx, config);
});
