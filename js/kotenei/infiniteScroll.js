/**
 * 无限滚动模块
 * @date :2014-09-24
 * @author kotenei (kotenei@qq.com)
 */
define('kotenei/infiniteScroll', ['jquery'], function ($) {

    /**
     * 无限滚动模块
     * @param {Object} options - 参数
     */
    var InfiniteScroll = function (options) {
        var self = this;
        this.options = $.extend({}, {
            $scrollElement: $(window),
            $watchElement: null,
            scrollDistance: 0,
            callback: $.noop
        }, options);
        this.$scrollElement = this.options.$scrollElement;
        this.$watchElement = this.options.$watchElement;

        if (!this.$watchElement) { return; }
 
        this.$scrollElement.on('scroll.infiniteScroll', function () {
            self.scroll();
        });

        this.scroll();       
    };

    /**
     * 滚动操作
     * @return {Void}       
     */
    InfiniteScroll.prototype.scroll = function () {
        var scrollElmHeight = this.$scrollElement.height();
        var scrollBottom = scrollElmHeight + this.$scrollElement.scrollTop();
        var watchElmBottom = this.$watchElement.offset().top + this.$watchElement.height();
        var remaining = watchElmBottom - scrollBottom;
        var canScroll = remaining <= scrollElmHeight * this.options.scrollDistance;
        if (canScroll) {
            if (this.options.callback() === false) {
                this.destroy();
            }
        }
    };

    InfiniteScroll.prototype.destroy = function () {
        this.$scrollElement.off('scroll.infiniteScroll');
    };

    return InfiniteScroll;
});