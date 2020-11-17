$(document).ready(function() {
    console.log("Document Is Ready");
    $("#tweet-text").keydown(function(event) {
        const text = $(this).val().length
        let $count = $(this).parent().children().children('output');
        $count.text(140 - text)
        if (140 - text < 0) {
            $count.css("color", "red");
        } else {
            $count.css("color", "#545149");
        }
    })
});