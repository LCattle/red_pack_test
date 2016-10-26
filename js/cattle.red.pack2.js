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
         * 加载HTML
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
                //为每个红包设定大小
                self.setPackSize(redPackDown);
                //为每个红包设定top值
                self.packMarginTop(redPackDown);
                self.start(redPackDown);
            }, 200);




        },
        /**
         * 为每个红包设定大小
         * @param ele
         */
        setPackSize: function(ele){
            if($(ele).hasClass('item-left') || $(ele).hasClass('item-right')){
                $(ele).addClass('box-item-small');
            }
        },
        /**
         * 为每个红包设定偏移值
         * @param ele
         */
        packMarginTop: function(ele){
            var self = this;
            var _t = $(ele);
            self.options.red_pack_H =  _t.outerHeight(true);
            self.options.red_pack_W = _t.outerHeight(true)
            //计算出红包dom占用了浏览器的百分几
            var occupyPost = (self.countRandom(Math.floor(self.options.winW /  self.options.red_pack_W)));
            //console.log('occupyPost:' + occupyPost);
            _t.css({
                'top': '-' +  self.options.red_pack_H + 'px',
                'left': (occupyPost *  self.options.red_pack_W) + 'px'
            })
        },
        /**
         * 执行落下动作
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
         * 随机数
         * @param b 结束的数
         * @param e 开始的数
         * @returns {number}
         */
        countRandom: function(n){
            return parseInt(Math.floor(n * Math.random()));
        }
    }

})(window, document, jQuery)