const validSettings = /** @type {const} */ ([
    "TOP_POSTS",
    "RECENT_ACTIVITY",
    "CHRONOLOGICAL",
]);
const groupsUrlRegex = /^\/groups\/\d+?\/?$/;
const setDefaultSorting = async () => {
    if (!location.pathname.match(groupsUrlRegex)) return;
    const params = new URLSearchParams(location.search);
    if (params.has("sorting_setting")) return;
    let { default_sorting_setting } = await chrome.storage.sync.get(
        "default_sorting_setting"
    );
    if (!validSettings.includes(default_sorting_setting)) {
        default_sorting_setting = validSettings[0];
        await chrome.storage.sync.set({
            default_sorting_setting: default_sorting_setting,
        });
    }
    params.append("sorting_setting", default_sorting_setting);
    location.search = params.toString();
};
setDefaultSorting();
// --- Handles SPA redirects
let lastUrl = location.href;
const checkUrlChange = () => {
    const currentUrl = location.href;
    if (currentUrl === lastUrl) return;
    lastUrl = currentUrl;
    setDefaultSorting();
};
const observer = new MutationObserver(checkUrlChange.bind(this));
observer.observe(document, {
    subtree: true,
    childList: true,
});
