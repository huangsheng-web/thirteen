var Desk = require('../model/Desk.js');
var offline = require('./OfflinePlayer');
//游戏分桌
var DeskAc = function (){
	this.desks = {};
	this.currentNo = 0;
	this.currentNo1 = 0;
	this.currentNo2 = 0;
	this.currentNo3 = 0;

};

//加入新玩家并分配桌号,并设置玩家的桌号和座位号
DeskAc.prototype.playerJoin = function (player){
	var self = this;
	if(self.size() === 0){//没有任何桌位
		self.createDesk(player);
	} else {//有桌位，进行匹配
		//先看是否存在于离线列表中
		var target = offline.find(player.userId);
		if(target){
			player.deskNo = target.deskNo;
			player.seatNo = target.seatNo;
			offline.remove(player.uid);
			return;
		}
		//寻找当前是否有空位
		for (var tb in self.desks) {
			if(self.desks[tb].size() < 3){
				for (var p in self.desks[tb].seats) {
					if(!self.desks[tb].seats[p]){
						self.desks[tb].seats[p] = player;
						player.seatNo = p;
						break;
					}
				}
				player.deskNo = self.desks[tb].deskNo;
				break;
			}
		}
		if(!player.deskNo){//没有找到需要开新的桌位
			self.createDesk(player);
		}
	}
	
};
//十三张加入新玩家并分配桌号,并设置玩家的桌号和座位号
DeskAc.prototype.playerJoinThirteen = function (player){
	var self = this;
	
	if(self.sizeThirteen(player.roomType) === 0){//没有任何桌位
		self.createDesk(player);
	} else {//有桌位，进行匹配
		//先看是否存在于离线列表中
		
		var target = offline.find(player.userId);
		if(target){
			player.deskNo = target.deskNo;
			player.seatNo = target.seatNo;
			offline.remove(player.uid);
			return;
		}
		//寻找当前是否有空位
		
			switch (player.roomType){
				case 1:
				
				for (var tb in self.desks) {
					if(self.desks[tb].size() < 3&&self.desks[tb].status==1&&self.desks[tb].deskNo<10000){
						for (var p in self.desks[tb].seats) {
							if(!self.desks[tb].seats[p]){
								self.desks[tb].seats[p] = player;
								player.seatNo = p;
								break;
							}
						}
						player.deskNo = self.desks[tb].deskNo;
						break;
					}
				}
				break;
				case 2:
				
				for (var tb in self.desks) {
					if(self.desks[tb].size() < 3&&self.desks[tb].status==1&&self.desks[tb].deskNo>10000&&self.desks[tb].deskNo<20000){
						for (var p in self.desks[tb].seats) {
							if(!self.desks[tb].seats[p]){
								self.desks[tb].seats[p] = player;
								player.seatNo = p;
								break;
							}
						}
						player.deskNo = self.desks[tb].deskNo;
						break;
					}
				}
				break;
				case 3:
				
				for (var tb in self.desks) {
					if(self.desks[tb].size() < 3&&self.desks[tb].status==1&&self.desks[tb].deskNo>20000&&self.desks[tb].deskNo<30000){
						for (var p in self.desks[tb].seats) {
							if(!self.desks[tb].seats[p]){
								self.desks[tb].seats[p] = player;
								player.seatNo = p;
								break;
							}
						}
						player.deskNo = self.desks[tb].deskNo;
						break;
					}
				}
				break;
				case 4:				
				for (var tb in self.desks) {
					if(self.desks[tb].size() < 3&&self.desks[tb].status==1&&self.desks[tb].deskNo>30000){
						for (var p in self.desks[tb].seats) {
							if(!self.desks[tb].seats[p]){
								self.desks[tb].seats[p] = player;
								player.seatNo = p;
								break;
							}
						}
						player.deskNo = self.desks[tb].deskNo;
						break;
					}
				}
				break;
			}
			
			// console.log(self.desks[tb].size(),self.desks[tb].seats)
		
		if(!player.deskNo){//没有找到需要开新的桌位
			self.createDesk(player);
		}
	}
	
};
/** 返回指定玩家对于该玩家的桌位信息*/
DeskAc.prototype.deskInfo = function (player){
	return this.desks[player.deskNo].seats;
};

//开一张新桌,并返回桌号
DeskAc.prototype.createDesk = function(player){
	var self = this;
	var	deskNo = null;
	switch(player.roomType){
		case 1:
		deskNo =  ( ++ self.currentNo);
		break;
		case 2:
		deskNo = 10000 + ( ++ self.currentNo1);
		break;
		case 3:
		deskNo = 20000 + ( ++ self.currentNo2);
		break;
		case 4:
		deskNo = 30000 + ( ++ self.currentNo3);
		break;
	};
	self.desks[deskNo] = new Desk(deskNo);
	var seatNo = self.setSeatNo(self.desks[deskNo]);
	player.deskNo = deskNo;
	player.seatNo = seatNo;
	self.desks[deskNo].seats[seatNo] = player;
};

//根据socketid获取用户信息
DeskAc.prototype.getPlayerBySocketId = function(id){
	var self = this;
	for(var sn in self.desks){
		for(var p in self.desks[sn].seats){
			if(self.desks[sn].seats[p] && self.desks[sn].seats[p].socketId === id){
				return self.desks[sn].seats[p];
			}
		}
	}
	return null;
};

/*改当前进入玩家设置座位号*/
DeskAc.prototype.setSeatNo = function(desk){
	for(var p in desk.seats){
		if(desk.seats[p]==null){
			return p;
			break;
		}
		
	}

}
/*下一家的座位号*/
DeskAc.prototype.nextSeatNo = function(seatNo){
	if(seatNo === 'p1'){
		return 'p2';
	} else if(seatNo === 'p2'){
		return 'p3';
	} else {
		return 'p1';
	}
};
/*上一架的座位号*/
DeskAc.prototype.prevSeatNo = function(seatNo){
	if(seatNo === 'p1'){
		return 'p3';
	} else if(seatNo === 'p2'){
		return 'p1';
	} else {
		return 'p2';
	}
};
/*删除房间*/
DeskAc.prototype.deleteDesk = function(deskNo){
    delete this.desks[deskNo];
};

//返回当前总桌数
DeskAc.prototype.size = function (){
	var self = this;
	var total = 0;
	for (var i in self.desks) {
		if (self.desks.hasOwnProperty(i)) {
			total ++;
		}
	}
	return total;
};
//返回十三张当前总桌数
DeskAc.prototype.sizeThirteen = function (type){
	var self = this;
	var total = 0;
	switch(type){
		case 1:
		for (var i in self.desks) {
			if (self.desks[i].deskNo<=10000) {
				total ++;
			}
		}
		return total;	
		break;
		case 2:
		for (var i in self.desks) {
			if (self.desks[i].deskNo>10000&&self.desks[i].deskNo<=20000) {
				total ++;
			}
		}
		return total;	
		break;	
		case 3:
		for (var i in self.desks) {
			if (self.desks[i].deskNo>20000&&self.desks[i].deskNo<=30000) {
				total ++;
			}
		}
		return total;	
		break;	
		case 4:
		for (var i in self.desks) {
			if (self.desks[i].deskNo>30000) {
				total ++;
			}
		}
		return total;	
		break;		
	}

};

module.exports = DeskAc;
