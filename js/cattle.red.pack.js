/**
 * Created by cattle on 2016/10/18 0018.
 */
(function(window, document, $){
    $.fn._RP = {
        init : function(options){
            this.defaults = {
                ele : '.red-pack-box',
                switch: true,
                winW : $(window).width(),
                winH : $(window).height(),
                downPositions :['item-left', 'item-right', 'item-center'],
                packTypes: ['big', 'small']
            }

            this.options = $.extend({}, this.defaults, options);
            $(this.options.ele).css({
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
            var k = 100;
            var redPackHtml = '';
            var ran = '';
            var redPackDown = '';
            for(var i = 0; i < k; i++){
                ran = self.countRandom(3)
                console.log(ran);
                redPackHtml = '<div class="box-item '+ self.options.downPositions[ran] +'" data-rp-id = "'+ i +'"></div>';
                $(ele).append(redPackHtml);
                redPackDown = $('div[data-rp-id="'+ i +'"]');
                //为每个红包设定大小
                self.setPackSize(redPackDown);
                //为每个红包设定margin-top值
                self.packMarginTop(redPackDown);
            }

            self.start(ele);
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
         * 为每个红包设定margin-top值
         * @param ele
         */
        packMarginTop: function(ele){
            $(ele).width();
            var itemH =  $(ele).outerHeight(true);
            $(ele).css('margin-top', '-' + itemH + 'px' );
        },
        /**
         * 执行落下动作
         * @param ele
         */
        start: function(ele){
            var self = this;
            if(self.options.switch){
                var rpNumber = 100;
                var y = 0;
                var x = 500;
                window.setInterval(function(){
                    y++;
                    x = x - 0.4;
                    $(ele).children('.box-item').css({
                        transform: 'translate3d('+ x +'px, '+ y +'px, 0px) rotate(40deg)'
                    });
                }, 1);
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