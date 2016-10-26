/**
 * Created by cattle on 2016/10/18 0018.
 */
(function(window, document, $){
    $.fn._RP = {
        init : function(options){
            this.defaults = {
                ele : '.red-pack-box',
                domSwitch: true,
                winW : $(window).width(),
                winH : $(window).height(),
                downPositions :['item-left', 'item-right', 'item-center'],
                red_pack_W: 0,
                red_pack_H: 0
            }

            this.options = $.extend({}, this.defaults, options);
            $(this.options.ele).css({
                width : this.options.winW,
                height : this.options.winH
            });
            $('.red-pack-pup').css({
                width : this.options.winW,
                height : this.options.winH
            });
            this.loadRedPack(this.options.ele);
        },

        /**
         * ����HTML
         * @param ele
         */
        loadRedPack : function(ele){
            var self = this;
            var redPackHtml = '';
            var ran = '';
            var redPackDown = '';
            var i = 0;
            var loadRedPackTime = window.setInterval(function(){
                i++;
                ran = self.countRandom(3)
                redPackHtml = '<div class="box-item '+ self.options.downPositions[ran] +'" data-rp-id = "'+ i +'"></div>';
                $(ele).append(redPackHtml);
                redPackDown = $('div[data-rp-id="'+ i +'"]');
                //Ϊÿ������趨��С
                self.setPackSize(redPackDown);
                //Ϊÿ������趨topֵ
                self.packMarginTop(redPackDown);
                self.start(redPackDown);
            }, 200);




        },
        /**
         * Ϊÿ������趨��С
         * @param ele
         */
        setPackSize: function(ele){
            if($(ele).hasClass('item-left') || $(ele).hasClass('item-right')){
                $(ele).addClass('box-item-small');
            }
        },
        /**
         * Ϊÿ������趨ƫ��ֵ
         * @param ele
         */
        packMarginTop: function(ele){
            var self = this;
            var _t = $(ele);
            self.options.red_pack_H =  _t.outerHeight(true);
            self.options.red_pack_W = _t.outerHeight(true)
            //��������domռ����������İٷּ�
            var occupyPost = (self.countRandom(Math.floor(self.options.winW /  self.options.red_pack_W)));
            //console.log('occupyPost:' + occupyPost);
            _t.css({
                'top': '-' +  self.options.red_pack_H + 'px',
                'left': (occupyPost *  self.options.red_pack_W) + 'px'
            })
        },
        /**
         * ִ�����¶���
         * @param ele
         */
        start: function(ele){
            var self = this;
            if(self.options.domSwitch){
                var _t = $(ele);
                _t.stop(true, true).animate({
                    'top':(self.options.winH + _t.height())
                }, 2000, function(){
                    _t.remove();
                });

            }
        },

        /**
         * �����
         * @param b ��������
         * @param e ��ʼ����
         * @returns {number}
         */
        countRandom: function(n){
            return parseInt(Math.floor(n * Math.random()));
        }
    }

})(window, document, jQuery)