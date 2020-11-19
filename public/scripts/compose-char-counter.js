const MAXCHARACTERS = 140;

$(document).ready(function() {

    $("#tweet-text").keyup(function() {
        const length = $(this).val().length
        const $count = $(this).parent().children().children('output');
        $count.text(MAXCHARACTERS - length)
        if (length > MAXCHARACTERS) {
            $count.addClass("max-characters")
        } else {
            $count.removeClass("max-characters")
        }
    });
    
    // Sticky Header
    $(window).scroll(function() {
        if (this.scrollY > 1) {
            $('nav').addClass("sticky");
        } else {
            $('nav').removeClass("sticky");
        }
    });

});
