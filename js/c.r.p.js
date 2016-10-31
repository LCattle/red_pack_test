/**
 * Created by cattle on 2016/10/18 0018.
 */
(function (window, document, $) {
    $.fn._RP = {
        init: function (options) {
            this.defaults = {
                ele: '.red-pack-box', //红包的box
                dom_switch: true,    //是否开始加载红包
                winW: $(window).width(),   //浏览器宽度
                winH: $(window).height(), //浏览器高度
                red_pack_types: ['box-item-big', 'box-item-small'], //红包大小
                red_pack_W: 0, //红包的宽度
                red_pack_H: 0,  //红包的高度
                load_red_pack_time: 200, //每个红包的间隔时间
                animation_time: 2000    //红包执行落下完成的时间
            }
            this.options = $.extend({}, this.defaults, options);
            if(this.options.dom_switch){
                this.loadRedPack(this.options.ele);
                this.initPupHtml();
                $(this.options.ele).css({
                    width: this.options.winW,
                    height: this.options.winH
                });
                $('.red-pack-pup').css({
                    width: this.options.winW,
                    height: this.options.winH
                });
            }

        },
        /**
         * 加载红包HTML
         * @param ele 调用的元素
         */
        loadRedPack: function (ele) {
            var self = this;
            if (self.options.dom_switch) {
                var redPackHtml = '';
                var r = '';
                var redPackDown = '';
                var i = 0;
                var loadRedPackTime = window.setInterval(function () {
                    i++;
                    r = self.countRandom(2)
                    redPackHtml = '<div class="box-item ' + self.options.red_pack_types[r] + '" data-rp-id = "' + i + '"></div>';
                    $(ele).append(redPackHtml);
                    redPackDown = $('div[data-rp-id="' + i + '"]');
                    self.lotteryDraw(redPackDown);
                    //为每个红包设定top值
                    self.packMarginTop(redPackDown);
                    self.start(redPackDown);
                }, self.options.load_red_pack_time);
            }
        },
        /**
         * 为每个红包设定偏移值
         * @param ele
         */
        packMarginTop: function (ele) {
            var self = this;
            var _t = $(ele);
            self.options.red_pack_H = _t.outerHeight(true);
            self.options.red_pack_W = _t.outerHeight(true);
            //计算出红包dom占用了浏览器的百分几
            var occupyPost = (self.countRandom(Math.floor(self.options.winW / self.options.red_pack_W)));
            _t.css({
                'top': '-' + self.options.red_pack_H + 'px',
                'left': (occupyPost * self.options.red_pack_W) + 'px'
            })
        },
        /**
         * 执行落下动作
         * @param ele
         */
        start: function (ele) {
            var self = this;
            var _t = $(ele);
            _t.stop(true, true).animate({
                'top': (self.options.winH + self.options.red_pack_H)
            }, self.options.animation_time, function () {
                _t.remove();
            });
        },
        /**
         * 点击红包
         * @param ele
         */
        lotteryDraw: function (ele) {
            $(ele).unbind('click').on('click', function () {
                var _t = $(ele);
               

            });
        },
        /**
         * 随机数
         * @param n 返回的最高数
         * @returns {number}
         */
        countRandom: function (n) {
            return parseInt(Math.floor(n * Math.random()));
        },
        initPupHtml: function () {
            //红包落下来的背景
            //红包打开时的背景
            var self = this;
            var red_pack_bg_pup = '<div class="red-pack-pup"></div>';
            var red_pack_box = '<div class="red-pack-box"></div>';
            $('body').append(red_pack_bg_pup);
            $('body').append(red_pack_box);
      }
    }
})(window, document, jQuery);