$(document).ready(function () {

    $.fn.mySlider = function (options) {
        var currentClick = 0;

        //default settings
        var defaults = {
            classForSliderItems: 'slider-item',
            classForCurrentSlide: 'current-slide',
            classForTotalSlides: 'total-slides'

        };
        var settings = $.extend({}, defaults, options);

        //make HTML for slider
        $(this).each(function () {
            var slider = $(this);
            $(slider).append("<div class='controls'> <div><p><span class='" + settings.classForCurrentSlide + "'>01</span>/<span class='" + settings.classForTotalSlides + "'>" + getSliderCount() + "</span></p></div> <i class='fa fa-chevron-left slider-scroll-left'></i><i class='fa fa-chevron-right slider-scroll-right'></i></div>");
            $(slider).find('li').each(function () {
                $(this).addClass(settings.classForSliderItems + $(this).index());
            });
            $(slider).find('li').first().addClass('active');
            //getting total slides to show it on page
            function getSliderCount() {
                var slides = $(slider).find('li').length;
                if (slides > 0 && slides < 10) {
                    return '0' + slides;
                } else if (slides >= 10) {
                    return slides;
                } else {
                    return 'no slides';
                }
            }
            //main func of slider makes it move
            function sliderAction(clickedObject) {
                var sl = $(clickedObject).parent().parent();
                var bl = $(sl).find('ul');
                var gl = $('.active').innerWidth();

                var step = gl * currentClick;
                $(bl).animate({marginLeft: '-' + step + 'px'}, 500);
                console.log(currentClick);
                return currentSlide(currentClick);
            }

            $('.slider-scroll-right').on('click', function () {
                var self = $(this);
                currentClick++;
                if (currentClick > getSliderCount() - 1) {
                    currentClick = 0;
                }

                sliderAction(self);

            });
            $('.slider-scroll-left').on('click', function () {
                var self = $(this);
                currentClick--;
                if (currentClick < 0) {
                    currentClick = getSliderCount() - 1;
                }

                sliderAction(self);
            });
        });
        //shows # of slide in real-time
        function currentSlide(slideN) {
            if (slideN < 10) {
                return $('.' + settings.classForCurrentSlide).html('0' + (slideN + 1));
            } else {
                return $('.' + settings.classForCurrentSlide).html(slideN + 1);
            }

        }
    };


    $('.slider').mySlider();
});

