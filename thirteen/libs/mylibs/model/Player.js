
/* 玩家类*/
var Player = function (player,sid){
    this.username = player.username;
    this.userId = player.userId;
    this.sex = player.sex;
    this.gold = player.gold;
    this.useravatar = player.useravatar;
    this.sid = sid;
    this.isOk = false;
    this.cardList = [];
    //桌号
    this.deskNo = null;
    //座位号
    this.seatNo = null;
    //积分
    this.score = 0;
    //是否叫地主
    this.isCall = false;
    //是否抢地主
    this.isRob = false;
    //是否是地主
    this.isLandlord = false;
    //状态 1：正常 2：离开 3：掉线
    this.status = 1;
    //十三张状态1为准备比牌
    this.thirteenStatus =0;
    //下一个玩家
    this.nextCardsCnt = 0;
    //上一个玩家
    this.preCardsCnt = 0;
    //计时器id
    this.timer = null;
    //十三张手牌的所有牌型
    this.ways = null;
    //十三张房间类型
    this.roomType = player.roomType;
};
/*十三张拿到牌之后类型分类*/
Player.prototype.cardsType = function(){
    var newData = this.cardList.sort(function(a,b){
                    var va = a.val;
                    var vb = b.val;
                    if(va === vb){
                        return a.type > b.type ? 1 : -1;
                    } else if(va > vb){
                        return -1;
                    } else {
                        return 1;
                    }
    });   
    //判断是否为特殊牌型
    var a = 0;
    for(var i=0;i<newData.length;i++){
        if(newData[i].type == newData[i+1].type){
            a+=1;
        }
    }
    
}

Player.prototype.subCards = function(list){
    // this.cardList.sort(util.cardSort);
    for (var i = 0; i < list.length; i++) {
        for (var j = 0; j < this.cardList.length; j++) {
            if(list[i] && this.cardList[j].val === list[i].val && this.cardList[j].type === list[i].type){
                this.cardList.splice(j, 1);
                break;
            }
        }
    }
}

/* 卡牌排序*/
Player.prototype.cardSort = function (a, b){
    var va = parseInt(a.val);
    var vb = parseInt(b.val);
    if(va === vb){
        return a.type > b.type ? 1 : -1;
    } else if(va > vb){
        return -1;
    } else {
        return 1;
    }
};

module.exports = Player;
