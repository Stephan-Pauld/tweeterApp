const MAXCHARACTERS = 140;

$(document).ready(function () {

    $("#tweet-text").on('input', function () {
        const length = $(this).val().length
        const $count = $(this).parent().children().children('output');
        $count.text(MAXCHARACTERS - length)
        if (length > MAXCHARACTERS) {
            $count.addClass("max-characters")
        } else {
            $count.removeClass("max-characters")
        }
    });

    // Scroll functions Header & Back to top button
    $(window).scroll(function () {
        //header sticky
        if (this.scrollY > 1) {
            $('nav').addClass("sticky");
            $('.phrase').fadeOut()
        } else {
            $('nav').removeClass("sticky");
            $('.phrase').fadeIn()
        }
        // Back to top button
        if (this.scrollY > 80) {
            $('.arrow-toggle').fadeIn();
        }else{
            $('.arrow-toggle').fadeOut();
        }
    });

    // header click dropdown tweetbox 
    $(".phrase").click(function () {

        if ($('#slide').is(':hidden')) {
            $("form").slideDown();
        } else {
            $("form").slideUp()
        }
    })
    $('.arrow-toggle').click(function(e) {
        e.preventDefault();
        window.scrollTo(0, 0);
    })










});