import Chart from 'chart.js';

Template.radar.onCreated(function() {

})

Template.radar.onRendered(function() {
  Chart.defaults.global.maintainAspectRatio = false;
  var id = Template.instance().data.id
  var radarData = Template.instance().data.radarData
	var ctx = document.getElementById(id).getContext('2d');
	var randomScalingFactor = function() {
      return Math.round(Math.random() * 100);
  };
  var color = Chart.helpers.color;
  var config = {
      type: 'radar',
      data: {
        labels: [
          '待遇面の満足度\t' + radarData.salary, 
          '社員の士気\t' + radarData.upbeat, 
          '風通しの良さ\t' + radarData.ventilation, 
          '社員の相互尊重\t' + radarData.respect, 
          '20代成長環境\t' + radarData.environment, 
          '人材の長期育成\t' + radarData.training, 
          '法令順守意識\t' + radarData.law, 
          '人事評価の適正感\t' + radarData.recruit
        ],
        datasets: [{
            label: "My First dataset",
            backgroundColor: color('#c6f0f4').alpha(0.8).rgbString(),
            borderColor: '#75b2d0',
            pointBackgroundColor: '#4093bb',
            data: [
                radarData.salary,
                radarData.upbeat,
                radarData.ventilation,
                radarData.respect,
                radarData.environment,
                radarData.training,
                radarData.law,
                radarData.recruit,
            ]
        }]
      },
      options: {
      	legend: {
	        display: false
	    	},
        scale: {
          ticks: {
            display: false,
            max: 5, // Set it to your Max value
            min: 0,
          }
        }
      }
  };
	var myRadarChart = new Chart(ctx, config);
});
