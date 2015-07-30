(function() {
  "use strict";
  GOVUK.analyticsPlugins = GOVUK.analyticsPlugins || {};
  GOVUK.analyticsPlugins.externalLinkTracker = function () {

    var externalLinkSelector = 'a[href^="http"]:not(a[href*="'+window.location.hostname+'"])',
        hasSendBeacon = typeof navigator.sendBeacon === "function",
        shouldCancelPageLoad = false;

    // add listeners for all external links clicked
    $('body').on('click', externalLinkSelector, trackClickEvent);

    function trackBeaconEvent(evt) {
      // send usual event, no shenanigans
    }

    function trackClickEvent(evt) {

      // easy option, not much to do here
      if (hasSendBeacon) {
        trackBeaconEvent();

      // test for modifiers - shift, cmd click, right click
      // check for `_target` attr
      } else if (probablyNewWindow) {
          trackStandardEvent();

      // probably opening in this window, the problem scenario
      } else {
        trackEventWithCallbackAndTimeout();
        addBeforeUnloadListener();
          // in listener
          // see if hit callback has returned, or timeout has passed
          // if not, cancel the page unload
          // wait, and then manually change the page with document.location
      }
    }
  }

}());
