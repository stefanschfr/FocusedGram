function init() {
    handleRedirectsSPA(RULES.redirects);            // check initial redirect
    observeAndClean(() => removeSelectors(RULES.selectors)); // clean up the DOM

    // Monitor SPA navigation: URL changes within the same page
    let lastUrl = location.href;
    new MutationObserver(() => {
        const currentUrl = location.href;
        if (currentUrl !== lastUrl) {
            lastUrl = currentUrl;
            handleRedirectsSPA(RULES.redirects); // re-check redirect on SPA navigation
        }
    }).observe(document, { subtree: true, childList: true });
}

init(); // start extension
