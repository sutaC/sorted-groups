const validSettings = /** @type {const} */ ([
    "TOP_POSTS",
    "RECENT_ACTIVITY",
    "CHRONOLOGICAL",
]);
/**
 * Saves default sorting_setting value in sync storage
 * @param {string} val - Default sorting_setting value
 * @returns Saved sorting_setting value
 */
async function setDefaultSorting(val) {
    if (!validSettings.includes(val)) {
        val = validSettings[0];
        console.error("Invalid default value: ", val);
    }
    await chrome.storage.sync.set({
        default_sorting_setting: val,
    });
    return val;
}
document.addEventListener("DOMContentLoaded", async () => {
    let { default_sorting_setting } = await chrome.storage.sync.get([
        "default_sorting_setting",
    ]);
    const select = document.getElementById("default_sorting_setting");
    select.addEventListener("change", async (event) => {
        await setDefaultSorting(event.target.value);
    });
    select.value = await setDefaultSorting(default_sorting_setting);
});
