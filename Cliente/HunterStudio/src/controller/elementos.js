function cargar (){
    jQuery(document).ready(function ($) {
        $(".slider-img").on("click", function () {
            $(".slider-img").removeClass("active");
            $(this).addClass("active");
        });
    });
}