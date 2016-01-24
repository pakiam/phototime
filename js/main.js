$(document).ready(function () {

    $.fn.mySlider = function (options) {
        var currentClick = 0;
        console.log(currentClick);
        var defaults = {
            sliderItems: 'slider-item'
        };
        var settings = $.extend({}, defaults, options);

        $(this).each(function () {
            var slider = $(this);
            $(slider).append("<div class='controls'> <div><p>01/" + getSliderCount() + "</p></div> <i class='fa fa-chevron-left slider-scroll-left'></i><i class='fa fa-chevron-right slider-scroll-right'></i></div>");
            $(slider).find('li').each(function () {
                $(this).addClass(settings.sliderItems + $(this).index());
            });
            $(slider).find('li').first().addClass('active');

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

            function getItSlide(sl) {
                var ul = $(sl).find('ul');
                var step = $(settings.sliderItems).outerWidth(true);
                $(ul).animate({marginLeft: '-' + step + 'px'}, 500);
            }

            $('.slider-scroll-right').on('click', function () {
                currentClick++;
                if (currentClick > getSliderCount() - 1) {
                    currentClick = 0;
                }
                var sl = $(this).parent().parent();
                var bl = $(sl).find('ul');
                var gl = $('.active').innerWidth();
                var gavno = gl * currentClick;
                $(bl).animate({marginLeft: '-' + gavno + 'px'}, 500);
                console.log(currentClick);
            });
            $('.slider-scroll-left').on('click', function () {
                currentClick--;
                if (currentClick <0) {
                    currentClick = getSliderCount()-1;
                }
                var sl = $(this).parent().parent();
                var bl = $(sl).find('ul');
                var gl = $('.active').innerWidth();

                var gavno = gl * currentClick;
                $(bl).animate({marginLeft: '-'+ gavno + 'px'}, 500);
                console.log(currentClick);
            });
        });

    };


    $('.slider').mySlider();
});

