const RULES = {
    selectors: [
        { id: "ig-explore", selector: 'a[href="/explore/"]' }, // remove link to Explore
        { id: "ig-reels", selector: 'a[href="/reels/"]' }      // remove link to Reels
    ],
    redirects: [
        {
            id: "ig-homepage-to-following",
            fromPath: "/",                  // path the rule applies to
            toUrl: "/?variant=following",   // target URL (relative)
            exactMatch: true                // match only "/" exactly, ignore query parameters
        },
    ]
};
