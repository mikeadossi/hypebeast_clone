/* global window, document */
/* exported clearAllFilters */

const clearAllFilters = () => {
  let url = window.location.href;
  url = url.split("/filter")[0];
  document.location.href = url;
};
