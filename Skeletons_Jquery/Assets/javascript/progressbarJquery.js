// STILL IN PROGRESS
// This is a jquery for dding a progress bar under the nav bar on ever page
// basically the more you scroll the more the bar progresses
//
//
function scrollProgressBar() {
    var getMax = function () {
        return $(document).height() - $(window).height();
    };

    var getValue = function () {
        return $(window).scrollTop();
    };

    var progressBar = $(".my-progress-bar"),
        max = getMax(),
        value,
        width;

    var getWidth = function () {
        // Calculate width in percentage
        value = getValue();
        width = (value / max) * 100;
        width = width + "%";
        return width;
    };

    var setWidth = function () {
        progressBar.css({ width: getWidth() });
    };

    $(document).on("scroll", setWidth);
    $(window).on("resize", function () {
        // Need to reset max
        max = getMax();
        setWidth();
    });
}
$(document).ready(function () {
    //I foundthis example for the scroll bar and changed it but everywhere I look I can't find the SF_scripts function and it keep the jquery from executing
    // the author didn't expain it of course and I can't find docs on it for any version of jquery
    // I will rewrite tis most likely in vanilla js if I can't figure out where this coes from. I hate using code I don't understand.
    // Professor if you see this do you know? have you ever heard of it? if not ill just rewrite whole progress bar in vanilla javascript

    //SF_scripts();

    scrollProgressBar();
});