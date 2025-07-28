const validSettings = /** @type {const} */ ([
    "TOP_POSTS",
    "RECENT_ACTIVITY",
    "CHRONOLOGICAL",
]);
const groupsUrlRegex = /^\/groups\/\d+?\/?$/;
/**
 * Checks if chrome storage is avaliable
 * @returns {boolean} If chrome storage is avaliable
 */
const isChromeStoreAvaliable = () => chrome.storage && chrome.storage.local;
/**
 * Sets default sorting setting on group page
 */
const setDefaultSorting = async () => {
    if (!isChromeStoreAvaliable()) {
        console.warn("Chrome store is not avaliable");
    }
    const url = new URL(location);
    if (!url.pathname.match(groupsUrlRegex)) return;
    if (url.searchParams.has("sorting_setting")) return;
    let { default_sorting_setting } = await chrome.storage.local.get(
        "default_sorting_setting"
    );
    if (!validSettings.includes(default_sorting_setting)) {
        default_sorting_setting = validSettings[0];
        await chrome.storage.local.set({
            default_sorting_setting: default_sorting_setting,
        });
    }
    url.searchParams.append("sorting_setting", default_sorting_setting);
    // Reloads to ensure loading proper content, however slows down page loading time
    location.replace(url);
};
document.addEventListener("DOMContentLoaded", () => {
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
});
