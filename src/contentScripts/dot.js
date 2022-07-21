export function createDot(url) {
  const dot = document.createElement('i');
  dot.id = 'neuralyzerBtn';
  dot.onclick = clickerOf({
    count: 10,
    timeout: 1000,
    action: function () {
      location.href = url;
    },
  }).onClick;
  return dot;

  /**@param {{count: number, timeout: number, action: function}} config
   * @returns {{onClick: onClick}} */
  function clickerOf(config) {
    let count = 0;
    let jobId;
    function onClick() {
      count++;
      if (jobId) {
        clearTimeout(jobId);
      }
      if (count === config.count) {
        reset();
        config.action();
      } else {
        jobId = setTimeout(reset, config.timeout);
      }
    }
    function reset() {
      count = 0;
      jobId = null;
    }
    return { onClick };
  }
}
