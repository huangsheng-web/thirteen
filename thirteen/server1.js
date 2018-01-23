var express = require('express');
var app = express();
var http = require('http').Server(app);
var request = require('request');
var fs = require('fs');
var io = require('socket.io')(http);
var CardAc = require('./libs/mylibs/action/CardAc'); 
var DeskAc = require('./libs/mylibs/action/DeskAc');
var Player = require('./libs/mylibs/model/Player');
var B = require('./libs/mylibs/rules/ThirteenRule');


var deskAc = new DeskAc();
var cardAc = new CardAc();
io.on('connection', function(socket){
    var userId = null
    /*十三水服务*/
    socket.on('enterRoom',(mes)=>{
        let player = new Player(mes,socket.id);
        userId = mes.userId
        deskAc.playerJoinThirteen(player,socket.id);
        
        //socket加入一个room
        socket.join(player.deskNo);
        switch(mes.roomType){
            case 1:
            deskAc.desks[player.deskNo].rate = 20;
            deskAc.desks[player.deskNo].leastMoney = 100;
            break;
            case 2:
            deskAc.desks[player.deskNo].rate = 100;
            deskAc.desks[player.deskNo].leastMoney = 500;
            break;
            case 3:
            deskAc.desks[player.deskNo].rate = 400;
            deskAc.desks[player.deskNo].leastMoney = 4000;
            break;
            case 4:
            deskAc.desks[player.deskNo].rate = 2000;
            deskAc.desks[player.deskNo].leastMoney = 20000;
            break;
        };
        var seats = deskAc.desks[player.deskNo].seats;//本桌座位信息
        var deskInfo = {
            "mySeatNo": player.seatNo,
            "seats":    seats,
            "deskNo": player.deskNo,
            "rate": deskAc.desks[player.deskNo].rate
        };//座位信息，跟我的座位;
        socket.emit('joinT',deskInfo);
        var desk = deskAc.desks[player.deskNo];        
        
        io.sockets.in(player.deskNo).emit('t_begin',deskAc.desks[player.deskNo].seats);
        setTimeout(()=>{
            if(deskAc.desks[player.deskNo]){
                
                if(deskAc.desks[player.deskNo].size()==3&&deskAc.desks[player.deskNo].status!=4){
                    
                
                        deskAc.desks[player.deskNo].status = 4;
                        
                        cardAc.t_Cards(deskAc.desks[player.deskNo]);
                        for(var p in desk.seats){
                            if(desk.seats[p]){
                                var socketId = desk.seats[p].sid;
                                var cards = [];
                                for(var i=0;i<desk.seats[p].cardList.length;i++){
                                    cards[i] = desk.seats[p].cardList[i].val;
                                }
                                var b = new B(cards);
                                desk.seats[p].ways = b;
                                
                                var data = {
                                    'cardList':desk.seats[p].cardList,
                                    'seats':desk.seats,
                                    'ways':b
                                };
                                io.sockets.in(socketId).emit('start',data);
                            }
                            
                        };
                    
                    }
                }
            },2000);
            
        
        
        /*改变玩家优点*/
        socket.on('changeGold',(data)=>{
            
            var desk =  deskAc.desks[data.deskNo];
            console.log(desk)
            for(var p in desk.seats){                
                if(data[p]){
                    desk.seats[p].gold = data[p];
                    if(parseInt(desk.seats[p].gold)<desk.leastMoney){
                        
                        io.sockets.in(desk.seats[p].sid).emit('shotOff');
                    }
                }
            }
            
        })
       
        /*离开房间，从房间移除,如果游戏未结束，记录到离线人员当中*/
        socket.on('leaveRoom',(mes)=>{
            
            // if(deskAc.desks[mes.deskNo].status ==4){
            //     io.sockets.in(mes.deskNo).emit('isGaming',0)
            //     return;
            // }else{
            //     io.sockets.in(mes.deskNo).emit('isGaming',1)
            // }
            
            var prevNo = deskAc.prevSeatNo(mes.mySeatNo);
            var nextNo = deskAc.nextSeatNo(mes.mySeatNo);
            // io.sockets.in(mes.deskNo).emit('deskUpdate', {leaveNo:mes.mySeatNo,prevNo:prevNo,nextNo:nextNo});
           
           if(deskAc.desks[mes.deskNo]){
                if(deskAc.desks[mes.deskNo].seats[mes.mySeatNo]){
                    
                    if(deskAc.desks[mes.deskNo].seats[mes.mySeatNo].ways){
                            deskAc.desks[mes.deskNo].seats[mes.mySeatNo].ways= null;
                        };
                    if(deskAc.desks[mes.deskNo].seats[mes.mySeatNo].deskNo){
                            deskAc.desks[mes.deskNo].seats[mes.mySeatNo].deskNo = null;
                        };
                    if(deskAc.desks[mes.deskNo].seats[mes.mySeatNo].seatNo){
                            deskAc.desks[mes.deskNo].seats[mes.mySeatNo].seatNo = null;
                        };
                    deskAc.desks[mes.deskNo].seats[mes.mySeatNo] = null;
                };
            // console.log(deskAc.desks[mes.deskNo])
            
                if(deskAc.desks[mes.deskNo].size()==0){
                    deskAc.desks[mes.deskNo].status = 1;
                        deskAc.deleteDesk(mes.deskNo)
                }
                
            } 
           socket.leave(mes.deskNo)
           if(deskAc.desks[mes.deskNo]){
               io.sockets.in(mes.deskNo).emit('t_begin',deskAc.desks[mes.deskNo].seats);
           }
           
        })
        /*离开了十三张客户端*/
        socket.on('disconnect',function(){
           
            // if(deskAc.desks[player.deskNo].seats[player.seatNo]){
            //     deskAc.desks[player.deskNo].seats[player.seatNo] = null;
            // };
            if(deskAc.desks[player.deskNo]){
                if(deskAc.desks[player.deskNo].size()==0){
                    deskAc.desks[player.deskNo].status = 1;
                } 
            }
            
        })
    });

    /*接收准备清理桌面指令*/
    socket.on('clearDesk',(data)=>{
        
            var desk =  deskAc.desks[data.deskNo];
            
            desk.seats[data.mySeatNo].thirteenStatus = 0;
            for(var p in desk.seats){
                if(desk.seats[p]){
                    desk.seats[p].cardList = [];
                }
            }

            if(desk.beginClear()){
            setTimeout(()=>{ 
            if(deskAc.desks[data.deskNo]){
                
            deskAc.desks[data.deskNo].status = 1;
            if(deskAc.desks[data.deskNo].size()==3){
                        
                        deskAc.desks[data.deskNo].status = 4;
                        // io.sockets.in(player.deskNo).emit('t_begin',deskAc.desks[player.deskNo].seats);
                        cardAc.t_Cards(deskAc.desks[data.deskNo]);
                        for(var p in desk.seats){
                            if(desk.seats[p]){
                                var socketId = desk.seats[p].sid;
                                var cards = [];
                                for(var i=0;i<desk.seats[p].cardList.length;i++){
                                    cards[i] = desk.seats[p].cardList[i].val;
                                }
                                
                                var b = new B(cards);
                                
                                desk.seats[p].ways = b;
                                var data1 = {
                                    'cardList':desk.seats[p].cardList,
                                    'seats':desk.seats,
                                    'ways':b
                                };
                                io.sockets.in(socketId).emit('start',data1);
                            }
                            
                        };
                
            }  
            } 
            },4000);               
            }
            
    })    
    socket.on('wNum',(data)=>{
        
        var desk =  deskAc.desks[data.deskNo];
        const prevNo = deskAc.prevSeatNo(data.mySeatNo);
        const nextNo = deskAc.nextSeatNo(data.mySeatNo);
        
        desk.seats[data.mySeatNo].thirteenStatus = 1;
        if(desk.seats[data.mySeatNo].ways.length==7){
            desk.seats[data.mySeatNo].ways.splice(0,desk.seats[data.mySeatNo].ways.length,desk.seats[data.mySeatNo].ways[data.n])
        }
        /*判断是否可以开始比牌*/
        console.log("还是中文")
        if(desk.beginCompare()){
            console.log('来电中文')
            var result = desk.compareResult();
            io.sockets.in(data.deskNo).emit('beginCompare',{seats:desk.seats,result:result})

        }
    })
    /*接收聊天内容*/
    socket.on('chatInfo',(data)=>{
        io.sockets.in(data.deskNo).emit('roomChats',{mes:data.mes,curNo:data.seatNo})
    })
    /*离开了客户端*/
    socket.on('disconnect',function(){
        
        console.log(userId)
});

http.listen(3101, function(){
    console.log('listening on *:3101');

});

app.use(express.static('./'))
