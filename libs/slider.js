;(function ($) {

    $.fn.mySlider = function (options) {
        //default settings
        var defaults = {
            classForSliderItems: 'slider-item',
            classForCurrentSlide: 'current-slide',
            classForTotalSlides: 'total-slides',
            currentClick: 0

        };
        var settings = $.extend({}, defaults, options);
        var currentClick = settings.currentClick;
        console.log('current click: ' + currentClick);
        console.log('this.length: ' + this.length);
        //make HTML for slider

        if (this.length === 0) {
            return this;
        }
        if (this.length > 1) {
            this.each(function () {
                $(this).mySlider(options);
            });
            return this;
        }


        $(this).each(function (m, i) {
            var slider = $(this);
            console.log(slider.attr('class'));
            $(slider).append("<div class='controls'> <div><p><span class='" + settings.classForCurrentSlide + "'>01</span>/<span class='" + settings.classForTotalSlides + "'>" + getSliderCount() + "</span></p></div> <i class='fa fa-chevron-left " + slider.attr('class') + "-scroll-left'></i><i class='fa fa-chevron-right " + slider.attr('class') + "-scroll-right'></i></div>");
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
                var sl = clickedObject.parent().parent();
                var bl = $(sl).find('ul');
                var gl = $('.active').innerWidth();

                var step = gl * currentClick;
                $(bl).animate({marginLeft: '-' + step + 'px'}, 500);
                console.log(currentClick);
                return currentSlide(currentClick);
            }

            $('i[class*="-scroll-right"]').on('click', function () {
                console.log(event.target);
                var self = $(event.target);
                currentClick++;
                if (currentClick > getSliderCount() - 1) {
                    currentClick = 0;
                }
                sliderAction(self);
            });
            $('.slider-scroll-left').on('click', function () {
                var self = $(event.target);
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
})(jQuery);


(function ($) {

    $.fn.myBurger = function () {
        var self=this;
        $(self).find('span').each(function () {
            $(this).addClass('nav-burger-span' + $(this).index());
        });

        $(self).on('click', function () {
            if($(this).attr('data-click-state')==1) {
                $(this).attr('data-click-state',0);

                $('ul.nav-menu').hide('slow');
                $('.nav-burger-span1').show();
                $('.nav-burger-span0').css({'transform': '', marginTop: ''});
                $('.nav-burger-span2').css({'transform': '', marginTop: ''});
            }else{
                $(this).attr('data-click-state',1);

                $('.nav-burger-span1').hide();
                $('.nav-burger-span0').css({'transform': 'rotate(45deg)', marginTop: '45%'});
                $('.nav-burger-span2').css({'transform': 'rotate(-45deg)', marginTop: '-18%'});
                $('ul.nav-menu').show('slow');
            }
        });
        $(self).parents().find('a').each(function () {
            $(this).on('click', function () {
                console.log('clicked a');
                $(self).trigger('click');
            });
        })
    };
})(jQuery);