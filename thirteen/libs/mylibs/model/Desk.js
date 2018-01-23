var Desk = function(no){
    //桌号
    this.deskNo = no;
    //倍数
    this.rate = 1;
    //房间最少携带
    this.leastMoney = 0;
    //座位
    this.seats = {
        'p1': null,
        'p2': null,
        'p3': null
    };
    //当前状态 1：正常，状态4为游戏中
    this.status = 1;
};

Desk.prototype.cardSort= function(){
    var cardP1 = this.seats.p1.cardList;
    var cardP2 = this.seats.p2.cardList;
    var cardP3 = this.seats.p3.cardList;
    var arr = new Array();
    for(var i=0;i<cardP1.length;i++){
        arr[i] = parseInt(cardP1[i].val);
    }
    
}

Desk.prototype.gameover = function (seatNo, lastCards){
    var self = this;
    //计算分数
    for (var p in self.seats) {
        if(self.seats[p].status != util.PLAYER_STATUS_NORMAL){
            self.seats[p].score -= self.currentScore * self.rate * (p === self.landlordSeatNo ? 6 : 3);
            continue;
        }
        if(self.landlordSeatNo === seatNo){//地主获胜
            if (p === seatNo) {//地主获取双倍分
                self.seats[p].score += self.currentScore * self.rate * 2;
            } else {//农民扣分
                self.seats[p].score -= self.currentScore * self.rate;
            }
        } else {//地主输了
            if (p === self.landlordSeatNo) {//地主扣双倍分
                self.seats[p].score -= self.currentScore * self.rate * 2;
            } else {//农民扣分
                self.seats[p].score += self.currentScore * self.rate;
            }
        }
    }
    //返回数据
    var data = {
            'winnerSeatNo': seatNo,
            'landlordSeatNo': self.landlordSeatNo,
            'seats': self.seats,
            'currentScore': self.currentScore,
            'lastCards': lastCards,
            'rate': self.rate
    };
    return data;
};
//重置
Desk.prototype.reset = function(){
    
    this.rate = 1;
    
};
/**
 * 设置本轮地主
 * @method setLandlord
 */
Desk.prototype.setLandlord = function (){
    var self = this,
        seatNo = self.landlordSeatNo;
    self.status = util.DESK_STATUS_PLAY;
    self.currentPlaySeatNo = seatNo;
    
    self.seats[seatNo].isLandlord = true;
    self.seats[seatNo].cardList = self.seats[seatNo].cardList.concat(self.hiddenCards);
    self.seats['p1'].cardList.sort(util.cardSort);
    self.seats['p2'].cardList.sort(util.cardSort);
    self.seats['p3'].cardList.sort(util.cardSort);
};

Desk.prototype.setCardsCnt = function(player){
    if(player.seatNo === 'p1'){
        player.preCardsCnt = this.seats.p3.cardList.length;
        player.nextCardsCnt = this.seats.p2.cardList.length;
    } else if(player.seatNo === 'p2'){
        player.preCardsCnt = this.seats.p1.cardList.length;
        player.nextCardsCnt = this.seats.p3.cardList.length;
    } else if(player.seatNo === 'p3'){
        player.preCardsCnt = this.seats.p2.cardList.length;
        player.nextCardsCnt = this.seats.p1.cardList.length;
    }
};
/**
 * 本桌是否以满员且都已准备
 * @method function
 * @return {Boolean}
 */
Desk.prototype.isAllReady = function(){
    if(this.size() === 3){
        return this.seats.p1.isOk && this.seats.p2.isOk && this.seats.p3.isOk;
    } else {
        return false;
    }
};
//十三张判断是否开始比牌
Desk.prototype.beginCompare = function(){
    var self = this;
    let isOk = true;
    for(var p in self.seats){
        if(self.seats[p]){
            if(self.seats[p].thirteenStatus ==0){
                isOk = false
            }
        }
    }
    return isOk;
}
//十三张判断是否开始清理桌面
Desk.prototype.beginClear = function(){
    var self = this;
    let isOk = true;
    for(var p in self.seats){
        if(self.seats[p]){
            if(self.seats[p].thirteenStatus ==1){
                isOk = false
            }
        }
    }
    return isOk;
}
/*十三张比牌结果*/
Desk.prototype.compareResult = function(){
    var self = this;
    var arr = [];
    var a = [[[],[],[]],[[],[],[]],[[],[],[]]];
    
    for(var p in self.seats){
        if(self.seats[p]){
            switch (p){
                case 'p1':
                if(self.seats[p].ways[0][2].length == 3){
                    self.seats[p].ways[0][2].unshift('0');
                    if(self.seats[p].ways[0][1].length == 5){
                        self.seats[p].ways[0][1].unshift('0')
                    }
                }
                arr[0]=self.seats[p].ways
                break;
                case 'p2':
                
                if(self.seats[p].ways[0][2].length == 3){
                    self.seats[p].ways[0][2].unshift('0');
                    if(self.seats[p].ways[0][1].length == 5){
                        self.seats[p].ways[0][1].unshift('0')
                    }
                }
                arr[1]=self.seats[p].ways
                break;
                case 'p3':
                if(self.seats[p].ways[0][2].length == 3){
                    self.seats[p].ways[0][2].unshift('0');
                    if(self.seats[p].ways[0][1].length == 5){
                        self.seats[p].ways[0][1].unshift('0')
                    }
                }
                arr[2]=self.seats[p].ways
                break;
            }
        }
    }
    
    for(var i=0;i<arr.length;i++){
        if(arr[i].length){
            // console.log(arr[i][0])
            
            //判断我的座位号然后来对比
            switch (i){
                case 0://我的座位为0
                if(arr[1].length){//判断座位1是不是有人
                    //比较第一墩
                        if(parseInt(arr[i][0][2][0])>parseInt(arr[1][0][2][0])){
                                a[i][0].push(1);
                        }else if(parseInt(arr[i][0][2][0])<parseInt(arr[1][0][2][0])){
                                a[i][0].push(-1);
                        }else{
                            if(parseInt(arr[i][0][2][1])>parseInt(arr[1][0][2][1])){
                                a[i][0].push(1);
                            }else{
                                a[i][0].push(-1);
                            }
                        }
                    //比较第2墩    
                        if(parseInt(arr[i][0][1][0])>parseInt(arr[1][0][1][0])){
                                a[i][1].push(1);
                        }else if(parseInt(arr[i][0][1][0])<parseInt(arr[1][0][1][0])){
                                a[i][1].push(-1);
                        }else{
                            if(parseInt(arr[i][0][1][1])>parseInt(arr[1][0][1][1])){
                                a[i][1].push(1);
                            }else{
                                a[i][1].push(-1);
                            }    
                        }
                    //比较第3墩    
                        if(parseInt(arr[i][0][0][0])>parseInt(arr[1][0][0][0])){
                                a[i][2].push(1);
                        }else if(parseInt(arr[i][0][0][0])<parseInt(arr[1][0][0][0])){
                                a[i][2].push(-1);
                        }else{
                            if(parseInt(arr[i][0][0][1])>parseInt(arr[1][0][0][1])){
                                a[i][2].push(1);
                            }else{
                                a[i][2].push(-1);
                            }
                        }
                }      
                if(arr[2]){//判断座位2是不是有人
                         //比较第一墩
                        if(parseInt(arr[i][0][2][0])>parseInt(arr[2][0][2][0])){
                                a[i][0].push(1);
                        }else if(parseInt(arr[i][0][2][0])<parseInt(arr[2][0][2][0])){
                                a[i][0].push(-1);
                        }else{
                            if(parseInt(arr[i][0][2][1])>parseInt(arr[2][0][2][1])){
                                a[i][0].push(1);
                            }else{
                                a[i][0].push(-1);
                            }
                        }
                    //比较第2墩    
                        if(parseInt(arr[i][0][1][0])>parseInt(arr[2][0][1][0])){
                                a[i][1].push(1);
                        }else if(parseInt(arr[i][0][1][0])<parseInt(arr[2][0][1][0])){
                                a[i][1].push(-1);
                        }else{
                            if(parseInt(arr[i][0][1][1])>parseInt(arr[2][0][1][1])){
                                a[i][1].push(1);
                            }else{
                                a[i][1].push(-1);
                            }    
                        }
                    //比较第3墩    
                        if(parseInt(arr[i][0][0][0])>parseInt(arr[2][0][0][0])){
                                a[i][2].push(1);
                        }else if(parseInt(arr[i][0][0][0])<parseInt(arr[2][0][0][0])){
                                a[i][2].push(-1);
                        }else{
                            if(parseInt(arr[i][0][0][1])>parseInt(arr[2][0][0][1])){
                                a[i][2].push(1);
                            }else{
                                a[i][2].push(-1);
                            }
                        } 
                }
                break;
                case 1://我的座位是1
                if(arr[0]){//判断座位0是不是有人
                    //比较第一墩
                        if(parseInt(arr[i][0][2][0])>parseInt(arr[0][0][2][0])){
                                a[i][0].push(1);
                        }else if(parseInt(arr[i][0][2][0])<parseInt(arr[0][0][2][0])){
                                a[i][0].push(-1);
                        }else{
                            if(parseInt(arr[i][0][2][1])>parseInt(arr[0][0][2][1])){
                                a[i][0].push(1);
                            }else{
                                a[i][0].push(-1);
                            }
                        }
                    //比较第2墩    
                        if(parseInt(arr[i][0][1][0])>parseInt(arr[0][0][1][0])){
                                a[i][1].push(1);
                        }else if(parseInt(arr[i][0][1][0])<parseInt(arr[0][0][1][0])){
                                a[i][1].push(-1);
                        }else{
                            if(parseInt(arr[i][0][1][1])>parseInt(arr[0][0][1][1])){
                                a[i][1].push(1);
                            }else{
                                a[i][1].push(-1);
                            }    
                        }
                    //比较第3墩    
                        if(parseInt(arr[i][0][0][0])>parseInt(arr[0][0][0][0])){
                                a[i][2].push(1);
                        }else if(parseInt(arr[i][0][0][0])<parseInt(arr[0][0][0][0])){
                                a[i][2].push(-1);
                        }else{
                            if(parseInt(arr[i][0][0][1])>parseInt(arr[0][0][0][1])){
                                a[i][2].push(1);
                            }else{
                                a[i][2].push(-1);
                            }
                        }     
                }
                //
                if(arr[2]){//判断座位2是不是有人
                    //比较第一墩
                        if(parseInt(arr[i][0][2][0])>parseInt(arr[2][0][2][0])){
                                a[i][0].push(1);
                        }else if(parseInt(arr[i][0][2][0])<parseInt(arr[2][0][2][0])){
                                a[i][0].push(-1);
                        }else{
                            if(parseInt(arr[i][0][2][1])>parseInt(arr[2][0][2][1])){
                                a[i][0].push(1);
                            }else{
                                a[i][0].push(-1);
                            }
                        }
                    //比较第2墩    
                        if(parseInt(arr[i][0][1][0])>parseInt(arr[2][0][1][0])){
                                a[i][1].push(1);
                        }else if(parseInt(arr[i][0][1][0])<parseInt(arr[2][0][1][0])){
                                a[i][1].push(-1);
                        }else{
                            if(parseInt(arr[i][0][1][1])>parseInt(arr[2][0][1][1])){
                                a[i][1].push(1);
                            }else{
                                a[i][1].push(-1);
                            }    
                        }
                    //比较第3墩    
                        if(parseInt(arr[i][0][0][0])>parseInt(arr[2][0][0][0])){
                                a[i][2].push(1);
                        }else if(parseInt(arr[i][0][0][0])<parseInt(arr[2][0][0][0])){
                                a[i][2].push(-1);
                        }else{
                            if(parseInt(arr[i][0][0][1])>parseInt(arr[2][0][0][1])){
                                a[i][2].push(1);
                            }else{
                                a[i][2].push(-1);
                            }
                        }     
                }                
                break;
                case 2://我的座位是2
                if(arr[1]){//判断座位1是不是有人
                    //比较第一墩
                        if(parseInt(arr[i][0][2][0])>parseInt(arr[1][0][2][0])){
                                a[i][0].push(1);
                        }else if(parseInt(arr[i][0][2][0])<parseInt(arr[1][0][2][0])){
                                a[i][0].push(-1);
                        }else{
                            if(parseInt(arr[i][0][2][1])>parseInt(arr[1][0][2][1])){
                                a[i][0].push(1);
                            }else{
                                a[i][0].push(-1);
                            }
                        }
                    //比较第2墩    
                        if(parseInt(arr[i][0][1][0])>parseInt(arr[1][0][1][0])){
                                a[i][1].push(1);
                        }else if(parseInt(arr[i][0][1][0])<parseInt(arr[1][0][1][0])){
                                a[i][1].push(-1);
                        }else{
                            if(parseInt(arr[i][0][1][1])>parseInt(arr[1][0][1][1])){
                                a[i][1].push(1);
                            }else{
                                a[i][1].push(-1);
                            }    
                        }
                    //比较第3墩    
                        if(parseInt(arr[i][0][0][0])>parseInt(arr[1][0][0][0])){
                                a[i][2].push(1);
                        }else if(parseInt(arr[i][0][0][0])<parseInt(arr[1][0][0][0])){
                                a[i][2].push(-1);
                        }else{
                            if(parseInt(arr[i][0][0][1])>parseInt(arr[1][0][0][1])){
                                a[i][2].push(1);
                            }else{
                                a[i][2].push(-1);
                            }
                        }       
                }
                //
                if(arr[0]){//判断座位0是不是有人
                    //比较第一墩
                        if(parseInt(arr[i][0][2][0])>parseInt(arr[0][0][2][0])){
                                a[i][0].push(1);
                        }else if(parseInt(arr[i][0][2][0])<parseInt(arr[0][0][2][0])){
                                a[i][0].push(-1);
                        }else{
                            if(parseInt(arr[i][0][2][1])>parseInt(arr[0][0][2][1])){
                                a[i][0].push(1);
                            }else{
                                a[i][0].push(-1);
                            }
                        }
                    //比较第2墩    
                        if(parseInt(arr[i][0][1][0])>parseInt(arr[0][0][1][0])){
                                a[i][1].push(1);
                        }else if(parseInt(arr[i][0][1][0])<parseInt(arr[0][0][1][0])){
                                a[i][1].push(-1);
                        }else{
                            if(parseInt(arr[i][0][1][1])>parseInt(arr[0][0][1][1])){
                                a[i][1].push(1);
                            }else{
                                a[i][1].push(-1);
                            }    
                        }
                    //比较第3墩    
                        if(parseInt(arr[i][0][0][0])>parseInt(arr[0][0][0][0])){
                                a[i][2].push(1);
                        }else if(parseInt(arr[i][0][0][0])<parseInt(arr[0][0][0][0])){
                                a[i][2].push(-1);
                        }else{
                            if(parseInt(arr[i][0][0][1])>parseInt(arr[0][0][0][1])){
                                a[i][2].push(1);
                            }else{
                                a[i][2].push(-1);
                            }
                        }     
                }
                break;
            }
            
        }
    }
    return a;
}
//返回本桌人数
Desk.prototype.size = function(){
    var total = 0;
    for (var p in this.seats) {
        if(this.seats[p]){
            total ++;
        }
    }
    return total;
};
//返回本桌在线人数
Desk.prototype.onlineSize = function(){
    var total = 0;
    for (var p in this.seats) {
        if(this.seats[p] && this.seats[p].status === util.PLAYER_STATUS_NORMAL){
            total ++;
        }
    }
    return total;
};

//在删除本桌之前执行
Desk.prototype.onDestroy = function (player){
    var self = this;
    for(var p in self.seats){
        offline.remove(self.seats[p].uid);
        if(self.seats[p].timer){
            clearTimeout(self.seats[p].timer);
        }
    }
};
/**
 * 玩家离开，如果当前桌位没有玩家，删除
 */
Desk.prototype.playerExit = function (player){
    var self = this;
	if(self.deskNo === player.deskNo){
		console.log(self.deskNo, '桌', player.seatNo, self.seats[player.seatNo].name, '退出了游戏');
		if(self.status === util.DESK_STATUS_ROB){//正在进行抢地主退出，需要扣分
            //扣分
            player = self.seats[player.seatNo];
            playerScoreDao.updateScore(player.uid, player.score - 10);
            //处理
            self.reset();
            self.seats[player.seatNo] = null;
            return {
                'seats': self.copySeats(),
                'status': util.DESK_STATUS_ROB
            }
		} else if(self.status === util.DESK_STATUS_PLAY){//正在进行玩牌退出，需要扣分,当前计分的4倍
            //扣分
            // player = self.seats[player.seatNo];
            // var score = player.score - self.currentScore * self.rate * 4;
            // playerScoreDao.updateScore(player.uid, score);
            self.seats[player.seatNo].status = util.PLAYER_STATUS_OFFLINE;
            offline.add(self.seats[player.seatNo]);
            //处理
            return {
                'seats': self.copySeats(),
                'status': util.DESK_STATUS_PLAY,
                'exitSeatNo': player.seatNo
            }
		} else {
            self.seats[player.seatNo] = null;
        }
	}
	return null;
};

//复制座位信息
Desk.prototype.copySeats = function (){
    var self = this,
        dest = {};
    for(var p in self.seats){
        if(self.seats[p]){
            dest[p] = {};
            for(var pro in self.seats[p]){
                if(typeof self.seats[p][pro] === 'number' || typeof self.seats[p][pro] === 'string'){
                    dest[p][pro] = self.seats[p][pro];
                }
            }
        }
    }
    return dest;
};
module.exports = Desk;
