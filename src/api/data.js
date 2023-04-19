export function getCurrentTimeZone() {
    return Intl.DateTimeFormat().resolvedOptions().timeZone;
}
