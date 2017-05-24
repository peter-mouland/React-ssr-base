/* eslint-disable no-console, global-require */
if (process.env.NODE_ENV !== 'production') {
  const Perf = require('react-addons-perf');

  window.addEventListener('keyup', (evt) => {
    if (evt.ctrlKey || evt.altKey || evt.metaKey || evt.shiftKey) {
      return;
    }

    if (evt.target.tagName !== 'BODY') {
      return;
    }

    switch (evt.key) {
      case 's':
        if (Perf.isRunning()) {
          console.log('Stopped React Perf Measurement.');
          Perf.stop();
        } else {
          console.log('Started React Perf Measurement.');
          Perf.start();
        }
        break;
      case 'w':
        console.log('Output of printWasted');
        Perf.printWasted();
        break;
      case 'e':
        console.log('Output of printExclusive');
        Perf.printExclusive();
        break;
      case 'i':
        console.log('Output of printInclusive');
        Perf.printInclusive();
        break;
      default:
        break;
    }
  });
}
