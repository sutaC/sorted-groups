const valid_settings = /** @type {const} */ ([
    "TOP_POSTS",
    "RECENT_ACTIVITY",
    "CHRONOLOGICAL",
]);
(async () => {
    const params = new URLSearchParams(location.search);
    if (!params.has("sorting_setting")) {
        let { default_sorting_setting } = await chrome.storage.sync.get(
            "default_sorting_setting"
        );
        if (!valid_settings.includes(default_sorting_setting)) {
            default_sorting_setting = valid_settings[0];
            await chrome.storage.sync.set({
                default_sorting_setting: default_sorting_setting,
            });
        }
        params.append("sorting_setting", default_sorting_setting);
        location.search = params.toString();
    }
})();
