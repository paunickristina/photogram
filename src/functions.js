export function breakpoint() {
    const windowWidth = $(window).width()
    const breakpointValue = 768
    return windowWidth < breakpointValue
}
export function storage() {
    return 'http://54.37.227.57/storage/'
}