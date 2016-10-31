/**
 * Created by cattle on 2016/10/18 0018.
 */
(function (window, document, $) {
    $.fn._RP = {
        init: function (options) {
            this.defaults = {
                ele: '.red-pack-box', //�����box
                dom_switch: true,    //�Ƿ�ʼ���غ��
                winW: $(window).width(),   //��������
                winH: $(window).height(), //������߶�
                red_pack_types: ['box-item-big', 'box-item-small'], //�����С
                red_pack_W: 0, //����Ŀ��
                red_pack_H: 0,  //����ĸ߶�
                load_red_pack_time: 200, //ÿ������ļ��ʱ��
                animation_time: 2000    //���ִ��������ɵ�ʱ��
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
         * ���غ��HTML
         * @param ele ���õ�Ԫ��
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
                    //Ϊÿ������趨topֵ
                    self.packMarginTop(redPackDown);
                    self.start(redPackDown);
                }, self.options.load_red_pack_time);
            }
        },
        /**
         * Ϊÿ������趨ƫ��ֵ
         * @param ele
         */
        packMarginTop: function (ele) {
            var self = this;
            var _t = $(ele);
            self.options.red_pack_H = _t.outerHeight(true);
            self.options.red_pack_W = _t.outerHeight(true);
            //��������domռ����������İٷּ�
            var occupyPost = (self.countRandom(Math.floor(self.options.winW / self.options.red_pack_W)));
            _t.css({
                'top': '-' + self.options.red_pack_H + 'px',
                'left': (occupyPost * self.options.red_pack_W) + 'px'
            })
        },
        /**
         * ִ�����¶���
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
         * ������
         * @param ele
         */
        lotteryDraw: function (ele) {
            $(ele).unbind('click').on('click', function () {
                var _t = $(ele);
               

            });
        },
        /**
         * �����
         * @param n ���ص������
         * @returns {number}
         */
        countRandom: function (n) {
            return parseInt(Math.floor(n * Math.random()));
        },
        initPupHtml: function () {
            //����������ı���
            //�����ʱ�ı���
            var self = this;
            var red_pack_bg_pup = '<div class="red-pack-pup"></div>';
            var red_pack_box = '<div class="red-pack-box"></div>';
            $('body').append(red_pack_bg_pup);
            $('body').append(red_pack_box);
      }
    }
})(window, document, jQuery);