(function IIFE() {
  var chronoDisplayNode = document.getElementById('chrono-display');
  var isPlaying = false;
  var currentTimer = 0;
  var tickInterval = 100;
  var initialDate;
  var interval;

  /**
   * All needed units.
   */
  var unitInMilliseconds = {
    cents: 100,
    seconds: 1000,
    minutes: 60000,
    hours: 3600000,
  };

  /**
   * Converts milliseconds to correct unit.
   *
   * @param  {number} unit The unit we want to convert the milliseconds to.
   * @return {string} Returns the displayable string.
   */
  function getConvertedUnit(unit) {
    var convertedUnit = Math.floor(currentTimer / unitInMilliseconds[unit]);
    return convertedUnit > 9 ? convertedUnit.toString() : '0' + convertedUnit.toString();
  }

  /**
   * Timer refresh tick.
   */
  function tick() {
    if (isPlaying) {
      currentTimer = new Date() - initialDate;
    }

    // Could be sorted by descending value instead of reversed but meh.
    chronoDisplayNode.textContent = Object.keys(unitInMilliseconds)
      .reverse()
      .map(function(unit) {
        return getConvertedUnit(unit);
      })
      .join(':');
  }

  /**
   * Start the chronometer.
   */
  function start() {
    if (isPlaying) {
      return;
    }

    isPlaying = true;

    // If paused, keep the same interval to calculate correct next tick value.
    initialDate = currentTimer > 0 ? new Date() - currentTimer : new Date();

    interval = setInterval(tick, tickInterval);
  }

  function pause() {
    if (!isPlaying) {
      return;
    }

    isPlaying = false;

    // Remove unnessary ticks to be executed.
    clearInterval(interval);
  }

  function reset() {
    pause();

    currentTimer = 0;

    // Refresh timer to make sure it is reseted.
    tick();
  }

  // Initialize chonometer text.
  tick();

  // Expose functions globally to make sure the view and other scripts can access it
  window.start = start;
  window.pause = pause;
  window.reset = reset;
})();
