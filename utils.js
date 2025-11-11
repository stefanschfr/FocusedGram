function removeSelectors(selectors) {
    // Removes all elements defined in the RULES
    for (const { selector } of selectors) {
        for (const el of document.querySelectorAll(selector)) {
            el.remove();
        }
    }
}

function handleRedirectsSPA(redirects) {
    for (const rule of redirects) {
        const url = new URL(window.location.href);

        // Check if the current URL matches the rule; query parameters are ignored
        const match = rule.exactMatch
            ? url.pathname === rule.fromPath || (url.pathname === '' && rule.fromPath === '/')
            : url.pathname.startsWith(rule.fromPath);

        if (!match) continue;

        // Create target URL (relative or absolute)
        const targetUrl = rule.toUrl.startsWith('http')
            ? new URL(rule.toUrl)
            : new URL(rule.toUrl, window.location.origin);

        // Only change if the URL actually differs
        if (url.href !== targetUrl.href) {
            history.replaceState({}, '', targetUrl.href);        // SPA-compatible URL change
            window.dispatchEvent(new PopStateEvent('popstate')); // trigger Instagram internal router
        }
    }
}

function observeAndClean(callback) {
    const observer = new MutationObserver(callback); // observe DOM changes
    observer.observe(document.body, { childList: true, subtree: true });
    callback(); // run once initially
}
