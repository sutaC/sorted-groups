const params = new URLSearchParams(location.search);
if (!params.has("sorting_setting")) {
    params.append("sorting_setting", "CHRONOLOGICAL");
    location.search = params.toString();
}
