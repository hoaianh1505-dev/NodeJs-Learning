(function ($) {
    "use strict";

    // Spinner
    var spinner = function () {
        setTimeout(function () {
            if ($('#spinner').length > 0) {
                $('#spinner').removeClass('show');
            }
        }, 1);
    };
    spinner(0);


    // Fixed Navbar
    $(window).scroll(function () {
        if ($(window).width() < 992) {
            if ($(this).scrollTop() > 55) {
                $('.fixed-top').addClass('shadow');
            } else {
                $('.fixed-top').removeClass('shadow');
            }
        } else {
            if ($(this).scrollTop() > 55) {
                $('.fixed-top').addClass('shadow').css('top', -55);
            } else {
                $('.fixed-top').removeClass('shadow').css('top', 0);
            }
        }
    });


    // Back to top button
    $(window).scroll(function () {
        if ($(this).scrollTop() > 300) {
            $('.back-to-top').fadeIn('slow');
        } else {
            $('.back-to-top').fadeOut('slow');
        }
    });
    $('.back-to-top').click(function () {
        $('html, body').animate({ scrollTop: 0 }, 1500, 'easeInOutExpo');
        return false;
    });


    // Testimonial carousel
    $(".testimonial-carousel").owlCarousel({
        autoplay: true,
        smartSpeed: 2000,
        center: false,
        dots: true,
        loop: true,
        margin: 25,
        nav: true,
        navText: [
            '<i class="bi bi-arrow-left"></i>',
            '<i class="bi bi-arrow-right"></i>'
        ],
        responsiveClass: true,
        responsive: {
            0: {
                items: 1
            },
            576: {
                items: 1
            },
            768: {
                items: 1
            },
            992: {
                items: 2
            },
            1200: {
                items: 2
            }
        }
    });


    // vegetable carousel
    $(".vegetable-carousel").owlCarousel({
        autoplay: true,
        smartSpeed: 1500,
        center: false,
        dots: true,
        loop: true,
        margin: 25,
        nav: true,
        navText: [
            '<i class="bi bi-arrow-left"></i>',
            '<i class="bi bi-arrow-right"></i>'
        ],
        responsiveClass: true,
        responsive: {
            0: {
                items: 1
            },
            576: {
                items: 1
            },
            768: {
                items: 2
            },
            992: {
                items: 3
            },
            1200: {
                items: 4
            }
        }
    });


    // Modal Video
    $(document).ready(function () {
        var $videoSrc;
        $('.btn-play').click(function () {
            $videoSrc = $(this).data("src");
        });
        console.log($videoSrc);

        $('#videoModal').on('shown.bs.modal', function (e) {
            $("#video").attr('src', $videoSrc + "?autoplay=1&amp;modestbranding=1&amp;showinfo=0");
        })

        $('#videoModal').on('hide.bs.modal', function (e) {
            $("#video").attr('src', $videoSrc);
        })
    });



    // Product Quantity
    $('.quantity button').on('click', function () {
        var button = $(this);
        var input = button.parent().parent().find('input');
        var oldValue = input.val();
        var newVal = 1;

        if (button.hasClass('btn-plus')) {
            newVal = parseFloat(oldValue) + 1;
        } else {
            if (oldValue > 1) {
                newVal = parseFloat(oldValue) - 1;
            }
        }
        input.val(newVal);

        // Pricing logic
        var price = parseFloat(input.data('cart-detail-price'));
        var detailId = input.data('cart-detail-id');
        if (price && detailId) {
            var itemTotal = price * newVal;
            var formatter = new Intl.NumberFormat('vi-VN', {
                style: 'currency',
                currency: 'VND'
            });

            // Update item total
            $(`p[data-cart-detail-id="${detailId}"]`).text(formatter.format(itemTotal));

            // Update cart subtotal and total
            var total = 0;
            var totalQty = 0;
            $('.quantity input').each(function () {
                var itemInput = $(this);
                var itemPrice = parseFloat(itemInput.data('cart-detail-price'));
                var itemQty = parseFloat(itemInput.val());
                if (itemPrice && itemQty) {
                    total += itemPrice * itemQty;
                    totalQty += itemQty;
                }
            });

            $('p[data-cart-total-price]').text(formatter.format(total));
            $('.cart-badge').text(totalQty);
            if (totalQty > 0) {
                $('.cart-badge').show();
            } else {
                $('.cart-badge').hide();
            }

            // Sync to database
            $.ajax({
                url: '/cart/update',
                type: 'POST',
                data: {
                    cartDetailId: detailId,
                    quantity: newVal
                },
                success: function (response) {
                    console.log('Cart updated');
                },
                error: function (error) {
                    console.error('Update failed', error);
                }
            });
        }
    });

})(jQuery);

