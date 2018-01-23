var Card = require('../model/Card.js');
var DeskAc = require('./DeskAc');
/* 卡牌管理*/
var CardAc = function (){};

/* 十三张发牌*/
CardAc.prototype.t_Cards = function(desk){
    var self = this,
        total = 13;
    //创建一副牌
    var cards = (new Card()).data1;
    //p1发牌
	if(desk.seats.p1){
		desk.seats.p1.cardList = [];
		for (i = 0; i < total; i++) {
			desk.seats.p1.cardList[i] = self.getOneCard(cards);
		}	
		console.log(desk.seats.p1.cardList)
	}

    //p2发牌
	if(desk.seats.p2){
		desk.seats.p2.cardList = [];
		for (i = 0; i < total; i++) {
			desk.seats.p2.cardList[i] = self.getOneCard(cards);
		}	
		console.log(desk.seats.p2.cardList)
	}

    //p3发牌
	if(desk.seats.p3){
		desk.seats.p3.cardList = [];
		for (i = 0; i < total; i++) {
        	desk.seats.p3.cardList[i] = self.getOneCard(cards);
    	}
		console.log(desk.seats.p3.cardList)
	}

};
CardAc.prototype.play = function(data){
		var self = this,
			desk = DeskAc.desks[data.deskNo],
			next = DeskAc.nextSeatNo(data.seatNo);
		var resultData = {
			'preSeatNo': data.seatNo, //前一位出牌玩家
			'nextSeatNo': next
		};
		if(data.cardInfo){//有出牌更新桌位信息
			if(data.cardInfo.cardKind === gameRule.BOMB || data.cardInfo.cardKind === gameRule.KING_BOMB){
				desk.rate *= 2;
				resultData.rate = desk.rate;
			}
			desk.seats[data.seatNo].subCards(data.cardInfo.cardList);
			if(desk.seats[data.seatNo].cardList.length === 0 ){//牌出完，判断胜利方
				io.sockets.in(data.deskNo).emit('gameover', desk.gameover(data.seatNo, data.cardInfo));
				desk.afterGameover();
				return;
			}
			desk.roundWinSeatNo = data.seatNo;
			desk.winCard = data.cardInfo;
			resultData.preCardInfo = data.cardInfo; //前一位玩家出的牌
			resultData.winCard = data.cardInfo;
		} else {
			if(desk.roundWinSeatNo === next){//不出当前牌大者再重新一轮出牌
				desk.winCard = null;
				resultData.preCardInfo = null; //前一位玩家出的牌
				resultData.winCard = null;
			} else {
				resultData.preCardInfo = null; //前一位玩家出的牌
				resultData.winCard = desk.winCard;
			}
		}
		desk.currentPlaySeatNo = next;
		io.sockets.in(data.deskNo).emit('play', resultData);

    }

/**
 * 抽取牌组中的一张牌
 */
CardAc.prototype.getOneCard = function (cards){
    return cards.splice(this.random(0,cards.length - 1) ,1)[0];
};

/** 获取min到max之间的随机整数，min和max值都取得到*/
CardAc.prototype.random = function(min, max) {
	min = min == null ? 0 : min;
	max = max == null ? 1 : max;
	var delta = (max - min) + 1;
	return Math.floor(Math.random() * delta + min);
};
module.exports = CardAc;
