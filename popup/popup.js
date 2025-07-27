const valid_settings = /** @type {const} */ ([
    "TOP_POSTS",
    "RECENT_ACTIVITY",
    "CHRONOLOGICAL",
]);
/**
 * Saves default sorting_setting value in sync storage
 * @param {string} val - Default sorting_setting value
 * @returns Saved sorting_setting value
 */
async function setDefault(val) {
    if (!valid_settings.includes(val)) {
        val = valid_settings[0];
        console.error("Invalid default value: ", val);
    }
    await chrome.storage.sync.set({
        default_sorting_setting: val,
    });
    console.log("Set val:", val);
    return val;
}
document.addEventListener("DOMContentLoaded", async () => {
    let { default_sorting_setting } = await chrome.storage.sync.get([
        "default_sorting_setting",
    ]);
    const select = document.getElementById("default_sorting_setting");
    select.addEventListener("change", async (event) => {
        await setDefault(event.target.value);
    });
    select.value = await setDefault(default_sorting_setting);
});
