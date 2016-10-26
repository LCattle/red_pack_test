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
                packTypes: ['big', 'secondary', 'small'],
                itemPositions: [30, 50, 80, 110],
                translateX: 0,
                deg: 0
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
            var k = 50;
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
                //clearInterval(loadRedPackTime)
            }, 500);




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
            var itemH =  _t.outerHeight(true);
            var itemW = _t.outerHeight(true)
            var random = self.countRandom(3);
            var autoCenter = (self.options.winW - itemW) /2;
            self.options.translateX = (autoCenter * random)
            if(_t.hasClass('item-left')){
                self.options.deg = -40;
            }
            if(_t.hasClass('item-right')){
                self.options.deg = 40;

            }
            if(_t.hasClass('item-center')){
                self.options.deg = 20;
            }
            _t.css('transform', 'translate3d('+ self.options.translateX +'px, -'+ (itemH + 50) +'px, 0px) rotate('+ self.options.deg +'deg)');

        },
        /**
         * 执行落下动作
         * @param ele
         */
        start: function(ele){
            var self = this;
            if(self.options.switch){
                var _t = $(ele);
                var hei =  $(window).height() + _t.outerHeight(true);
                var deg = 40;
                var boxItemW = _t.width();
                var autoW = (self.options.winW - boxItemW) / 2;
                var random = self.countRandom(5);
                var y = -200;
                var x = (autoW + self.options.itemPositions[random]);
                var timer = window.setInterval(function(){
                    //红包的度数变化
                    //红包落下来
                    //有的红包逐渐消失,有的会倾斜，有的大，有的小
                    var translate = _t.css('transform');
                    //var translateY = translate.substring(translate.lastIndexOf(',')+1, translate.indexOf(')'));
                    if(_t.hasClass('item-left')){
                        deg = 40;
                        deg = deg + 0.1;
                        x = x - 0.5;
                    }
                    if(_t.hasClass('item-right')){
                        deg = 300;
                        deg = deg - 0.1;
                        x = x + 0.5;
                    }
                    y = y + 3;
                    if(y < self.options.winH){
                        _t.css({
                            'transform': 'translate3d('+ x +'px, '+ y +'px, 0px) rotate('+ deg +'deg)'
                        })
                    }else{
                        _t.remove();
                    }
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