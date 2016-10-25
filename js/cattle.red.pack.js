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
                packTypes: ['big', 'small'],
                centerAuto:[10, 300, 50, 500],
                domTranslate: {
                    x : 0,
                    y : 0
                }
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
            var k = 50;
            var redPackHtml = '';
            var ran = '';
            var redPackDom = '';
            var h = 0;
            var setTimeoutT = window.setInterval(function(){
               k = k - 2;

                for(var i = 0; i < k; i++){
                    ran = self.countRandom(3)
                    console.log(ran);
                    h = h + 1;
                    redPackHtml = '<div class="box-item '+ self.options.downPositions[ran] +'" data-rp-id = "'+ h +'"></div>';
                    $(ele).append(redPackHtml);
                    redPackDom = $('div[data-rp-id="'+ i +'"]');
                    // console.log('aaa:' + redPackDom.attr('data-rp-id'));
                    //为每个红包设定大小
                    self.setPackSize(redPackDom);
                    //为每个红包设定偏移值
                    self.packMarginTop(redPackDom, self.options.downPositions[ran]);
                    //执行动画
                    self.start(redPackDom, self.options.downPositions[ran]);
                    k--;
                };
                if(k == 0){
                    clearInterval(setTimeoutT);
                }
            }, 300)

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
         * 为每个红包设定 x, y 值
         * @param ele
         */
        packMarginTop: function(ele, downType){
            var self = this;
            self.options.domTranslate.y =  $(ele).outerHeight(true);
            var downX =  self.autoCenter(ele);
            var r_posi = self.countRandom(4);

            /*var cssTemp = '';
            if(downType === 'item-left'){
                self.options.domTranslate.x = downX - self.options.centerAuto[r_posi];
                cssTemp = 'translate3d('+ self.options.domTranslate.x +'px, -'+ self.options.domTranslate.y +'px, 0px) rotate(-40deg)'
            }else if(downType === 'item-right'){
                self.options.domTranslate.x = downX + self.options.centerAuto[r_posi];
                cssTemp = 'translate3d('+ self.options.domTranslate.x +'px, -'+ self.options.domTranslate.y +'px, 0px) rotate(40deg)'
            }else{
                self.options.domTranslate.x = downX;
                cssTemp = 'translate3d('+ self.options.domTranslate.x +'px, -'+ self.options.domTranslate.y +'px, 0px) rotate(40deg)'
            }

            $(ele).css({
                transform: cssTemp
            });*/
            var i = 0;
            var r = self.countRandom(3);
            var rPosition = self.countRandom(10);
            var autoNumber = self.options.centerAuto[r];
            if(downType === 'item-left'){
                $(ele).css({
                    'top': '-' + (self.options.domTranslate.y + 200 ) + 'px',
                    'left': self.autoCenter(ele) + (rPosition * 100) + 'px'
                });
            }else if(downType === 'item-right'){
                $(ele).css({
                    'top': '-' + (self.options.domTranslate.y + 200 ) + 'px',
                    'right': self.autoCenter(ele) + (rPosition * 100) + 'px'
                });
            }


        },
        /**
         * 执行落下动作
         * @param ele
         */
        start: function(ele, downType){
            var self = this;
            if(self.options.switch){
                var rpNumber = 100;
                var y = 0;
                var x = 500;
                var itemDeg = 40;
                var downY = 0;

               // var downX =  self.autoCenter(ele);
                var cssTemp = '';
                /*window.setInterval(function(events){
                    self.options.domTranslate.y = self.options.domTranslate.y +1 ;
                    if(downType === 'item-right'){
                        itemDeg = '-40';
                        self.options.domTranslate.x = self.options.domTranslate.x + 1;
                        cssTemp = 'translate3d('+ self.options.domTranslate.x +'px, '+ self.options.domTranslate.y +'px, 0px) rotate('+ itemDeg +'deg)';
                    }else if(downType === 'item-left'){
                        itemDeg = '40';
                        self.options.domTranslate.x = self.options.domTranslate.x - 1;
                        cssTemp = 'translate3d('+ self.options.domTranslate.x +'px, '+ self.options.domTranslate.y +'px, 0px) rotate('+ itemDeg +'deg)';
                    }else if(downType === 'item-center'){
                        itemDeg = '0';
                        cssTemp = 'translate3d('+ self.options.domTranslate.x +'px, '+ self.options.domTranslate.y +'px, 0px) rotate('+ itemDeg +'deg)';
                    }
                    console.log('执行了。' + self.options.domTranslate.x);
                    //要分开执行动画
                    $(ele).css({
                        transform : cssTemp
                    });

                    //获取到当前元素的位置，如果超出了浏览器的宽度和高度，则删除掉当前的元素或者复制当前的元素重新添加到容器当中

              }, 0);*/


                $(ele).animate({
                    'top': $(window).height()
                }, 2000, function(){
                    var _t = $(this);
                    $(_t).remove();
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
        },
        /**
         *自动居中
         */
        autoCenter: function(ele){
            var self = this;
            var eleW = $(ele).width();
            return (self.options.winW - eleW) / 2;
        }
    }

})(window, document, jQuery)