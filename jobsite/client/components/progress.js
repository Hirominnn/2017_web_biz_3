import ProgressBar from 'progressbar.js';

Template.progress.onRendered(function() {
	var bar = new ProgressBar.Line('#' + this.data.id, {
    strokeWidth: 4,
    easing: 'easeInOut',
    duration: 1400,
    color: '#FFEA82',
    trailColor: '#eee',
    trailWidth: 1,
    svgStyle: {width: '100%', height: '100%'},
    text: {
      style: {
        // Text color.
        // Default: same as stroke color (options.color)
        color: '#999',
        position: 'absolute',
        right: '0',
        top: '30px',
        padding: 0,
        margin: 0,
        transform: null
      },
      autoStyleContainer: false
    },
    from: {color: '#FFEA82'},
    to: {color: '#ED6A5A'},
    step: (state, bar) => {
      bar.setText(this.data.name + Math.round(bar.value() * 100) + this.data.unit);
    }
  });
  bar.animate(this.data.value/100);  // Number from 0.0 to 1.0
});
