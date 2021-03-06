/**
 * Created by cattle on 2016/10/18 0018.
 */
(function (window, document, $) {
    $.fn._RP = {
        init: function (options) {
            this.defaults = {
                ele: '.red-pack-box', //红包的box
                red_pack_pup: '.red-pack-pup', //活动背景弹出层
                open_red_pack_pup: '.open-red-pack-pup', //打开红包遮罩层
                red_pack_content_pup: '.red-pack-content', //打开红包的遮罩层内容
                activity_time: 1000,  //活动时长
                dom_switch: true,    //是否开始加载红包
                winW: $(window).width(),   //浏览器宽度
                winH: $(window).height(), //浏览器高度
                red_pack_types: ['box-item-big', 'box-item-small'], //红包大小
                red_pack_W: 0, //红包的宽度
                red_pack_H: 0,  //红包的高度
                load_red_pack_time: 300, //每个红包的间隔时间
                animation_time: 2000,    //红包执行落下完成的时间
                open_pup_close_btn: '.close-pup',  //关闭打开红包的弹出层dom
                red_pack_type: '.rp-box',   //红包的类型dom
                red_pack_price: '.rp-price', //红包的金额dom,
                click_red_pack:function(){}, //红包点击事件
                red_pack_direction: ['pack-left', 'pack-right']
            }
            this.options = $.extend({}, this.defaults, options);
            if (this.options.dom_switch) {
                this.initPupHtml();
                this.loadRedPack(this.options.ele);
                this.autoCenterPup(this.options.red_pack_content_pup);
                this.autoCenterPup(this.options.hint_box);
                $(this.options.ele).css({
                    width: this.options.winW,
                    height: this.options.winH
                });
                $(this.options.red_pack_pup).css({
                    width: this.options.winW,
                    height: this.options.winH
                });
                $(this.options.open_red_pack_pup).css({
                    width: this.options.winW,
                    height: this.options.winH
                });
                this.countDown(this.options.activity_time);
                this.closePup(this.options.open_pup_close_btn);
            }
        },
        /**
         * 加载红包HTML
         * @param ele 调用的元素
         */
        loadRedPack: function (ele) {
            var self = this;
            var redPackHtml = '';
            var r = '';
            var redPackDown = '';
            var i = 0;

            var loadRedPackTime = window.setInterval(function () {
                //判断开关是否为开
                if (self.options.dom_switch) {
                    i++;
                    var f = 0;
                    r = self.countRandom(2)
                    if(i % 2 == 0){
                        f = 1;
                    }
                   // redPackHtml = '<div class="box-item ' + self.options.red_pack_types[r]   +' '+ self.options.red_pack_direction[f] +'" data-rp-id = "' + i + '"></div>';
                    redPackHtml = '<div class="box-item ' + self.options.red_pack_types[r]   +' pack-left" data-rp-id = "' + i + '"></div>';
                    $(ele).append(redPackHtml);
                    redPackDown = $('div[data-rp-id="' + i + '"]');
                    self.packMarginTop(redPackDown);
                    self.lotteryDraw(redPackDown);
                    self.start(redPackDown);
                } else {
                    clearInterval(loadRedPackTime);
                    //清除背景
                    window.setTimeout(function () {
                        $('.red-pack-pup').css('display', 'none');
                    }, self.options.animation_time);
                }
            }, self.options.load_red_pack_time);
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
            //如果当前没有进行动画，则添加
           /* _t.stop(true, true).animate({
                //'top': (self.options.winH + self.options.red_pack_H)
                transform: 'rotate(-40deg) translate3d(400px, 400px, 0px)'
            }, self.options.animation_time, function () {
                _t.remove().delay(_t);
            });*/
            var h = 0;
            var deg = 40;
            var drawInterval = window.setInterval(function(){
                h = h + 3;
                if(_t.hasClass('pack-right')){
                    deg = -40;
                }
                if(h >= self.options.winH){
                    _t.remove();
                    return;
                }
                _t.css({
                    transform: 'rotate('+ deg +'deg) translate3d(400px, '+ h +'px, 0px)'
                });
            }, 0);
        },
        /**
         * 点击红包
         * @param ele
         */
        lotteryDraw: function (ele) {
            var self = this;
            $(ele).unbind('click').on('click', function () {
                var _t = $(ele);
                _t.stop().remove().delay();
                self.options.click_red_pack();

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
        /**
         * 初始化弹出层
         */
        initPupHtml: function () {
            //红包落下来的背景
            //红包打开时的背景
            var self = this;
            var pupHTMl = '<div class="red-pack-pup"></div><div style="display:none;" class="open-red-pack-pup"></div><div class="red-pack-box"></div>';
            var red_pack_contentHtml = '<div class="red-pack-content" style="display:none">' +
                '<span class="close-pup">x</span>' +
                '<div class="rp-box ">' +
                '<span class="rp-price"></span>' +
                '</div></div>';
            $('body').append(pupHTMl + red_pack_contentHtml);
        },
        /**
         * 点击红包之后弹出中奖层
         * @param price 红包金额
         * @param pupType 红包类型
         */
        setOpenRedPackPup: function (price, pupType) {
            var self = this;
            $(self.options.red_pack_type).removeClass('cash_voucher-box available_reduce-box redpacket-box').addClass(pupType);
            $(self.options.red_pack_price).html(price);
            $(self.options.open_red_pack_pup).css('display', 'block');
            $(self.options.red_pack_content_pup).css('display', 'block');

        },
        /**
         * 打开红包后弹出层居中
         */
        autoCenterPup: function (ele) {
            var self = this;
            var content = ele;
            $(content).css({
                top: (self.options.winH - $(content).height()) / 2 + 'px',
                left: (self.options.winW - $(content).width()) / 2 + 'px'
            });
        },
        /**
         * 关闭弹出层
         * @param ele 要关闭的元素
         */
        closePup: function (ele) {
            var self = this;
            $(ele).unbind('click').on('click', function () {
                $(self.options.open_red_pack_pup).css('display', 'none');
                if (ele === self.options.open_pup_close_btn) {
                    $(self.options.red_pack_content_pup).css('display', 'none');
                } else {
                    $(self.options.hint_box).css('display', 'none');
                }
            });
        },
        countDown: function (time) {
            var self = this;
            var intDiff = parseInt(60);
            if (time) {
                intDiff = parseInt(time);
            }
            var red_pack_interval = window.setInterval(function () {
                intDiff--;
                if (intDiff <= 0) {
                    self.options.dom_switch = false;
                    clearInterval(red_pack_interval);
                }
            }, 1000);
        }
    }
})(window, document, jQuery);