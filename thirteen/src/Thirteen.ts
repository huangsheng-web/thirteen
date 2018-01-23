// TypeScript file
class Thirteen extends egret.DisplayObjectContainer {

    public constructor() {
        super();
        this.createView();
    }
    private socket = io.connect('http://192.168.1.250:3101/');
    private tool:Tool = new Tool();
    private head:eui.Group;//头部;
    private userId:string;
    private userAvatar:string;
    private gold:string;
    private broadcast:egret.TextField;//广告
    private vx:number = -2;//移动速度
    private username:string;//oldusernmae
    private sex:number;//old sex;    
    private prevUserFrame:egret.Shape = new egret.Shape();//用户头像框
    private nextUserFrame:egret.Shape = new egret.Shape();//用户头像框
    private myFrame:egret.Shape = new egret.Shape();//我的头像框
    private prevUser:eui.Group = new eui.Group();//上家用户头像容器
    private nextUser:eui.Group = new eui.Group();//下家用户头像容器
    private myInfo:eui.Group  = new eui.Group();//我的信息
    private myNameGroup:eui.Group = new eui.Group();//性别 姓名
    private myGoldGroup:eui.Group = new eui.Group();//金币
    private sexImg:egret.Bitmap;//性别图片
    private myname:egret.TextField = new egret.TextField();//我的名字
    private stageHeight:number;//舞台高度；
    private oneCard:eui.Group;
    private firstCardList:eui.Group = new eui.Group();//首次发的牌容器。
    private readyCompare:eui.Group = new eui.Group();//准备比的牌。
    private prevReadyC:eui.Group = new eui.Group();//上家准备比的牌
    private nextReadyC:eui.Group = new eui.Group();//下家准备比的牌。
    private oneCompare:eui.Group = new eui.Group();//第1墩准备比
    private twoCompare:eui.Group = new eui.Group();//第2墩准备比
    private threeCompare:eui.Group = new eui.Group();//第3墩准备比
    private prevOne:eui.Group = new eui.Group();//上家第1墩准备比
    private prevTwo:eui.Group = new eui.Group();//上家第2墩准备比
    private prevThree:eui.Group = new eui.Group();//上家第3墩准备比
    private nextOne:eui.Group = new eui.Group();//下家第1墩准备比
    private nextTwo:eui.Group = new eui.Group();//下家第2墩准备比
    private nextThree:eui.Group = new eui.Group();//下家第3墩准备比
    private landCardList:eui.Group = new eui.Group();//地主的牌容器。
    private cardMask:eui.Group = new eui.Group();//选中牌的遮罩；
    private isGaming:boolean = false;//判断是否在游戏中
    private timerBg:eui.Button; //计时器
    private timer:egret.Timer;
    private num:number = 20;//倒计时
    private passBtn:eui.Button;//不出的按钮
    private putOutBtn:eui.Button;//出牌按钮
    private roomChoose:egret.Sprite;//房间选择页面
    private room:egret.Sprite;//游戏房间；
    private roomGoldNum:eui.Label;//房间里的金币；
    private roomInfo:eui.Label = new eui.Label();//房间信息
    /*加入房间返回的信息*/
    private deskNo:string;
    private seatNo:string;
    private prevNo:string;
    private nextNo:string;
    private rate:number = 1;//当前房间倍率，默认为1；
    private changeMove:boolean = true;
    private prevCardList:eui.Group = new eui.Group();//上家的牌（盖着的
    private hasPrevMask:boolean = false;//是否加入了上家盖着的牌
    private nextCardList:eui.Group = new eui.Group();//下家的牌 (盖着的)
    private hasNextMask:boolean = false;//是否加入了下家盖着的牌
    private hasPrevImg:boolean = false;//有上家玩家图像组件
    private hasNextImg:boolean = false;//有下家玩家图像组件
    private playerMine:eui.Group;
    private userPrev:eui.Group;
    private userNext:eui.Group;
    private cardsInfo:any;//我的牌
    private prevWays:any;//上家牌组合
    private nextWays:any;//下家牌组合
    private ways:any;//出牌方式组合
    private chat:eui.Button;//聊天弹窗
    private chatList:eui.List;//聊天列表
    private chatScroll:eui.Scroller;//聊天容器
    private wNum:number = 0;//选择的第几个出牌方式;
    private chooseCardScreen:egret.Sprite;
    private cardArray:egret.Sprite;
    private hasFC:boolean = true;
    private playBtn:eui.Button;//出牌按钮
    private showChat:boolean = false;//聊天切换；

    private createView():void{
       
          //背景
        this.width = 640;
        this.height = 1136;
        
        /*进入房间选择页面*/
        this.roomChoose = new egret.Sprite;
        this.roomChoose.width = 640;
        this.roomChoose.height = 1136;
        this.roomChoose.x = 0;
        this.roomChoose.y = 0;
        this.addChild(this.roomChoose);

        let returnBtn = new eui.Button();
        returnBtn.x = 60;
        returnBtn.y = 20;
        returnBtn.rotation = 90;
        let exmlReturnBtn = `<e:Skin class="skins.ButtonSkin"  states="up,down" width="40" height="40" xmlns:e="http://ns.egret.com/eui"> 
            <e:Image source="button_json.return" includeIn="up" width="100%" height="100%"/> 
            <e:Image source="button_json.return" includeIn="down" x="2" y="2" scaleX="0.9" scaleY= "0.9" alpha="0.5"/>  
        </e:Skin>`;
        returnBtn.skinName = exmlReturnBtn;

        returnBtn.addEventListener(egret.TouchEvent.TOUCH_TAP,this.returnMain,this);
        

        /*顶部*/
        this.head = new eui.Group();
        this.head.x = 550;
        this.head.y = 0;
        this.head.width = 90;
        this.head.height = 1136;

        let headShape:egret.Shape = new egret.Shape();
        headShape.graphics.beginFill(0x27313A);
        headShape.graphics.drawRect(0,0,90,1136);
        this.head.addChild(headShape);
        this.head.addChild(returnBtn);
        this.roomChoose.addChild(this.head);

        /*房间类别*/
        for(var i=0;i<4;i++){
            let chooseBg:egret.Sprite = new egret.Sprite();
            let btn:eui.Button = new eui.Button();
            btn['role'] = i+1;
            btn.width = 150;
            btn.height = 50;
            btn.x = 50;
            btn.y = 100;
            
            let btnShape = new egret.Shape();
            btnShape.graphics.beginFill(0x4299D6);
            btnShape.graphics.drawRoundRect(0,0,150,50,30,30);
            btn.addChild(btnShape);
            
            let btnLabel = new egret.TextField();
            
            btnLabel.text = "进入";
            btnLabel.width = 150;
            btnLabel.height = 50;
            btnLabel.textAlign = "center";
            btnLabel.verticalAlign = "middle";
            btn.addChild(btnLabel);
            btn.addEventListener(egret.TouchEvent.TOUCH_TAP,this.enterRoom,this);
            
            let label1 = new eui.Label();//房间金额
            let label2 = new eui.Label();//
            let label3 = new eui.Label();//最少携带
            let label4 = new eui.Label();//            
            label1.text = "房间金额 : ";
            label3.text = "最少携带 : ";
            switch(i){
                case 0:
                label2.text = "20/墩";
                label4.text = "100金币";
                break;
                case 1:
                label2.text = "100/墩";
                label4.text = "500金币";
                break; 
                case 2:
                label2.text = "400/墩";
                label4.text = "4,000金币";
                break;
                case 3:
                label2.text = "2,000/墩";
                label4.text = "2万金币";
                break;                               
            }
            label1.textColor = 0x000000;
            label3.textColor = 0x000000;
            label2.textColor = 0xc7422e;
            label4.textColor = 0x4299D6;

            label1.x = 20;
            label1.y = 25;
            label1.size = 24;
            label2.x = 140;
            label2.y = 25;
            label2.size = 24;
            label3.x = 20;
            label3.y = 60;
            label3.size = 24;
            label4.x = 140;
            label4.y = 60;
            label4.size = 24;
            

            chooseBg.graphics.beginFill(0xDCDCDF);
            chooseBg.graphics.drawRoundRect(0,0,250,160,30,30);
            chooseBg.x = 420;
            chooseBg.y = 270*i+20;
            chooseBg.rotation = 90;
            
            chooseBg.addChild(btn);
            chooseBg.addChild(label1);
            chooseBg.addChild(label2);
            chooseBg.addChild(label3);
            chooseBg.addChild(label4);
            this.roomChoose.addChild(chooseBg);
            
  
            }
            /*开始按钮*/
            let bigenBtn:eui.Button = new eui.Button();
            bigenBtn.width = 240;
            bigenBtn.height = 64;
            bigenBtn.x = 100;
            bigenBtn.y = 450;
            
            let bigenBtnShape = new egret.Shape();
            bigenBtnShape.graphics.beginFill(0x72c753);
            bigenBtnShape.graphics.drawRoundRect(0,0,240,64,30,30);
            bigenBtn.addChild(bigenBtnShape);
            
            let bigenBtnLabel = new egret.TextField();
            bigenBtnLabel.text = "快速开始";
            bigenBtnLabel.width = 240;
            bigenBtnLabel.height = 64;
            bigenBtnLabel.textAlign = "center";
            bigenBtnLabel.verticalAlign = "middle";
            bigenBtn.addChild(bigenBtnLabel);
            bigenBtn.addEventListener(egret.TouchEvent.TOUCH_TAP,this.start,this);
            bigenBtn.rotation = 90;

           this.roomChoose.addChild(bigenBtn);  
           
        // this.socket.on('join',(mes)=>{
            
        //     this.deskNo=mes.seats[mes.mySeatNo].deskNo;
        //     this.seatNo=mes.mySeatNo;
        //     switch(mes.mySeatNo){
        //         case 'p1':
        //         this.prevNo = 'p3';
        //         this.nextNo = 'p2';
        //         break;
        //         case 'p2':
        //         this.prevNo = 'p1';
        //         this.nextNo = 'p3';
        //         break;
        //         case 'p3':
        //         this.prevNo = 'p2';
        //         this.nextNo = 'p1';
        //         break;
        //     }
        // })
        /*游戏房间*/
        this.room = new egret.Sprite;
        this.room.width = 640;
        this.room.height = 1136;
        this.room.x = 0;
        this.room.y = 0;
        this.room.graphics.beginFill(0x00573e);
        this.room.graphics.drawRect(0,0,640,1136); 
        
        let leaveBtn = new eui.Button();
        leaveBtn.x = 610;
        leaveBtn.y = 20;
        leaveBtn.rotation = 90;
        let leaveBtnSkin = `<e:Skin class="skins.ButtonSkin"  states="up,down" width="40" height="40" xmlns:e="http://ns.egret.com/eui"> 
            <e:Image source="button_json.return" includeIn="up" width="100%" height="100%"/> 
            <e:Image source="button_json.return" includeIn="down" x="2" y="2" scaleX="0.9" scaleY= "0.9" alpha="0.5"/>  
        </e:Skin>`;
        leaveBtn.skinName = leaveBtnSkin;
        this.room.addChild(leaveBtn);
        leaveBtn.addEventListener(egret.TouchEvent.TOUCH_TAP,this.leave,this);        

        /*底部*/
        let roomBottom:eui.Group = new eui.Group();
        roomBottom.x = 66;
        roomBottom.y = 0;
        roomBottom.width = 1136;
        roomBottom.height = 640;
        roomBottom.rotation = 90;

        /*底部背景*/
        let BottomShape:egret.Shape = new egret.Shape();
        BottomShape.graphics.beginFill(0x27313A);
        BottomShape.graphics.drawRect(0,0,1136,66);
        roomBottom.addChild(BottomShape);

        /*底部金币图片*/
        let roomGoldImg:egret.Bitmap = this.tool.createBitmapByName('show_json.money');
        roomGoldImg.x = 30;
        roomGoldImg.y = 10;
        roomBottom.addChild(roomGoldImg);
        
        /*底部金币*/
        this.roomGoldNum = new eui.Label();
        this.roomGoldNum.height = 42;
        this.roomGoldNum.verticalAlign = "middle";
        this.roomGoldNum.x = 100;
        this.roomGoldNum.y = 10;

        /*底部任务*/
        // let taskBtn:eui.Button = new eui.Button();
        // let taskBtnSkin = `<e:Skin class="skins.ButtonSkin"  states="up,down" width="48" height="66" xmlns:e="http://ns.egret.com/eui"> 
        //     <e:Image source="thirteen_json.task" includeIn="up" width="100%" height="100%"/> 
        //     <e:Image source="thirteen_json.task" includeIn="down" x="2" y="2" scaleX="0.9" scaleY= "0.9" alpha="0.5"/>  
        // </e:Skin>`;
        // taskBtn.x = 900;
        // taskBtn.skinName = taskBtnSkin;
        // roomBottom.addChild(taskBtn);

        /*底部聊天*/
        let chatBtn:eui.Button = new eui.Button();
        let chatBtnSkin = `<e:Skin class="skins.ButtonSkin"  states="up,down" width="48" height="66" xmlns:e="http://ns.egret.com/eui"> 
            <e:Image source="thirteen_json.chat" includeIn="up" width="100%" height="100%"/> 
            <e:Image source="thirteen_json.chat" includeIn="down" x="2" y="2" scaleX="0.9" scaleY= "0.9" alpha="0.5"/>  
        </e:Skin>`;
        chatBtn.skinName = chatBtnSkin;
        chatBtn.x = 1000;
        chatBtn.addEventListener(egret.TouchEvent.TOUCH_TAP,()=>{
            if(this.showChat){
                this.room.removeChild(this.chatScroll);
                this.showChat = false;
            }else{
                this.room.addChild(this.chatScroll);
                this.showChat = true;
            }
        },this);
        roomBottom.addChild(chatBtn);
        roomBottom.addChild(this.roomGoldNum);
        this.room.addChild(roomBottom);

        /*聊天列表*/
             var exml =
            `<e:Group xmlns:e="http://ns.egret.com/eui">
                <e:Scroller >
                    <e:List id="list" width="200" height="400">
                        <e:layout>
                            <e:HorizontalLayout gap="20"/>
                        </e:layout>
                        <e:itemRendererSkinName>
                            <e:Skin states="up,down" height="300">
                                <e:Label text="{data.label}" height='30' textColor.up="0xffffff" textColor.down="0x27313a" horizontalCenter="0"  rotation='90'/>
                            </e:Skin>
                        </e:itemRendererSkinName>
                        <e:ArrayCollection>
                            <e:Array>
                                <e:Object label="快点吧！亲"/>
                                <e:Object label="我快没钱了，要撤了，"/>
                                <e:Object label="我妈喊我吃饭了。"/>
                                <e:Object label="都别走，决战到天亮"/>
                                <e:Object label="你的手气也忒好了"/>
                                <e:Object label="哈哈，终于赢了"/>
                            </e:Array>
                        </e:ArrayCollection>
                    </e:List>
                </e:Scroller>
            </e:Group>`;
        var clazz = EXML.parse(exml);
        this.chatScroll = new clazz();
        this.chatScroll.x = 80;
        this.chatScroll.y = 850;
        this.chatScroll.width = 500;
        this.chatScroll.height = 500;
        this.chatScroll.addEventListener(egret.TouchEvent.TOUCH_TAP,(e:egret.Event)=>{
            var chatInfo = e.target.text;
            if(chatInfo){
                this.room.removeChild(this.chatScroll)
                this.showChat = false;
                this.socket.emit('chatInfo',{deskNo:this.deskNo,seatNo:this.seatNo,mes:chatInfo})
            }

        },this)
        

        /*桌面中间*/
        let roomBg:eui.Group = new eui.Group();
        roomBg.width = 410;
        roomBg.height = 110;
        roomBg.x = 420;
        roomBg.y = 363;
        roomBg.rotation = 90;       
        
        let roomBgImg:egret.Bitmap = this.tool.createBitmapByName('thirteen_json.room_info_bg');
        roomBg.addChild(roomBgImg);
        
        let gameType:eui.Label = new eui.Label();
        gameType.text = "正常";
        gameType.textColor = 0x33856D;
        gameType.x = 160;
        gameType.y = 26;

        this.roomInfo.textColor = 0x33856D; 
        this.roomInfo.x = 100;
        this.roomInfo.y = 64;
        this.roomInfo.size = 20;
        roomBg.addChild(gameType);
        roomBg.addChild(this.roomInfo);

        this.room.addChild(roomBg);
        
        /*接收房间号，座位号*/
        this.socket.on('joinT',(roomInfo)=>{
            console.log('join')
            var self = this;
            this.seatNo = roomInfo.mySeatNo;
            this.deskNo = roomInfo.deskNo;  
            this.rate = roomInfo.rate;  
            switch(roomInfo.mySeatNo){
                case 'p1':
                this.prevNo = 'p3';
                this.nextNo = 'p2';
                break;
                case 'p2':
                this.prevNo = 'p1';
                this.nextNo = 'p3';
                break;
                case 'p3':
                this.prevNo = 'p2';
                this.nextNo = 'p1';
                break;
            }
            this.roomInfo.text = '房间ID: '+roomInfo.deskNo+ '     ' +roomInfo.rate+'/墩';    
            self.playerMine = this.tool.createThirteenPlayer(roomInfo.seats[roomInfo.mySeatNo].useravatar,roomInfo.seats[roomInfo.mySeatNo].username,roomInfo.seats[roomInfo.mySeatNo].gold,0);
            this.room.addChild(self.playerMine);
            
                         
        })
        this.socket.on('t_begin',(data)=>{
                var self = this;
                console.log(data)
                if(self.hasPrevImg){
                    console.log('abc')
                   self.room.removeChild(self.userPrev); 
                   self.hasPrevImg = false;
                }
                if(self.hasNextImg){
                    console.log('def')
                    self.room.removeChild(self.userNext);
                    self.hasNextImg = false;
                }
                if(data.p3==null&&data.p2==null||data.p1==null&&data.p2==null||data.p3==null&&data.p1==null){
                    console.log('shaha')
                }else if(data.p3 == null){
                    for(var p in data){
                        if(p == self.seatNo){
                            switch (p){
                                case 'p1':
                                self.userNext = self.tool.createThirteenPlayer(data.p2.useravatar,data.p2.username,data.p2.gold,2);      
                                self.room.addChild(self.userNext);
                                self.hasNextImg = true;
                                break;
                                case 'p2':
                                self.userPrev = self.tool.createThirteenPlayer(data.p1.useravatar,data.p1.username,data.p1.gold,1);
                                self.room.addChild(self.userPrev);
                                self.hasPrevImg = true;
                                break;                          
                            }
                        }
                    }
                }else if(data.p2 == null){
                    for(var p in data){
                        if(p == self.seatNo){
                            switch (p){
                                case 'p1':
                                self.userPrev = self.tool.createThirteenPlayer(data.p3.useravatar,data.p3.username,data.p3.gold,1);
                                self.room.addChild(self.userPrev);
                                self.hasPrevImg = true;
                                break;
                                case 'p3':
                                self.userNext = self.tool.createThirteenPlayer(data.p1.useravatar,data.p1.username,data.p1.gold,2);      
                                self.room.addChild(self.userNext);
                                self.hasNextImg = true;
                                break;                          
                            }
                        }
                    }
                }else if(data.p1 == null){
                    for(var p in data){
                        if(p == self.seatNo){
                            switch (p){
                                case 'p2':
                                self.userNext = self.tool.createThirteenPlayer(data.p3.useravatar,data.p3.username,data.p3.gold,2);      
                                self.room.addChild(self.userNext);
                                self.hasNextImg = true;
                                break;
                                case 'p3':
                                self.userPrev = self.tool.createThirteenPlayer(data.p2.useravatar,data.p2.username,data.p2.gold,1);
                                self.room.addChild(self.userPrev);
                                self.hasPrevImg = true;
                                break;                          
                            }
                        }
                    }
                }else{

                    for(var p in data){
                        if(p == self.seatNo){
                            switch (p){
                                case 'p1':
                                    self.userPrev = self.tool.createThirteenPlayer(data.p3.useravatar,data.p3.username,data.p3.gold,1);
                                    self.userNext = self.tool.createThirteenPlayer(data.p2.useravatar,data.p2.username,data.p2.gold,2);          
                                break;
                                case 'p2':
                                    self.userPrev = self.tool.createThirteenPlayer(data.p1.useravatar,data.p1.username,data.p1.gold,1);
                                    self.userNext = self.tool.createThirteenPlayer(data.p3.useravatar,data.p3.username,data.p3.gold,2); 
                                break;
                                case 'p3':
                                    self.userPrev = self.tool.createThirteenPlayer(data.p2.useravatar,data.p2.username,data.p2.gold,1);
                                    self.userNext = self.tool.createThirteenPlayer(data.p1.useravatar,data.p1.username,data.p1.gold,2);    
                                break;                                
                            }
                        }
                    }
                    
                    self.room.addChild(self.userPrev);
                    self.hasPrevImg = true;
                    self.room.addChild(self.userNext);
                    self.hasNextImg = true;
                }
            });  
        // this.socket.on('deskUpdate',(mes)=>{
        //             console.log('haha ',mes.leaveNo,mes.prevNo,this.prevNo)
                    
        //             if(this.seatNo == mes.prevNo){
        //                 console.log('a')
        //                 if(this.hasNextImg){
        //                     this.room.removeChild(this.userNext)
        //                     this.hasNextImg  = false;
        //                 }
                        
        //             }else if(this.seatNo == mes.nextNo){
        //                 console.log('b')
        //                 if(this.hasPrevImg){
        //                     this.room.removeChild(this.userPrev)
        //                     console.log('oooooook')
        //                     this.hasPrevImg = false;
        //                 }
                        
        //             }else{
        //                 console.log(this.playerMine)
        //                 this.room.removeChild(this.playerMine)
                        
        //                 if(this.hasPrevImg){
        //                     console.log('有上家')
        //                     this.room.removeChild(this.userPrev)
        //                     this.hasPrevImg = false;
        //                 }
        //                 if(this.hasNextImg){
        //                     console.log('有下家')
        //                     this.room.removeChild(this.userNext)
        //                     this.hasNextImg  = false;
        //                 }                        
        //             }
        //     })
        
        /*玩家都准备了，接收发牌*/
        this.socket.on('start',(data)=>{
            console.log('fjdlasfjslfjdsl')
            this.isGaming = true;
            var self = this;
            self.firstCardList.width = 1136;
            self.firstCardList.height = 200;
            self.firstCardList.x = 200;
            self.firstCardList.rotation = 90;
            
            self.cardsInfo = data.cardList;
            self.ways = data.ways;


            console.log(data.ways)
            for(var p in data.seats){
               
                if(p!=self.seatNo&&data.seats[p]){
                    if(p == self.prevNo){
                        self.prevCardList.width = 600;
                        self.prevCardList.height = 130;
                        self.prevCardList.rotation = 90;
                        self.prevCardList.x = 620;
                        self.prevCardList.y = 200;
                        for(var i=0;i<13;i++){
                         var card =   self.tool.createMaskCard();
                         card.x = 100+20*i;
                         self.prevCardList.addChild(card);
                         self.room.addChild(self.prevCardList);
                         self.hasPrevMask = true;
                        }
                        
                    }else if(p == self.nextNo){
                        console.log(self.nextCardList)
                        self.nextCardList.width = 600;
                        self.nextCardList.height = 130;
                         self.nextCardList.x = 100;
                        self.nextCardList.y = 800;                       
                        for(var i=0;i<13;i++){
                         var card =   self.tool.createMaskCard();
                         card.x = 100+20*i;
                         self.nextCardList.addChild(card);
                         self.room.addChild(self.nextCardList);
                         self.hasNextMask = true;
                        }
                    }
                }
            }
            //依次显示牌
            var newData = data.cardList.sort(function(a,b){
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
            console.log(newData);
            
            for(var i=0;i<newData.length;i++){
                (function(a){
                    setTimeout(function(){
                        self.tool.getSound('resource/assets/Sound/s004.mp3',1,0);
                        self.oneCard = self.tool.createCard(newData[a]);
                        switch(a){
                            case 0:
                            self.oneCard.x = 200;
                            self.oneCard.y = 0;
                            break;
                            case 1:
                            self.oneCard.x = 240;
                            self.oneCard.y = 0;
                            break;
                            case 2:
                            self.oneCard.x = 280;
                            self.oneCard.y = 0;
                            break;
                            case 3:
                            self.oneCard.x = 320;
                            self.oneCard.y = 0;
                            break;
                            case 4:
                            self.oneCard.x = 360;
                            self.oneCard.y = 0;
                            break;
                            case 5:
                            self.oneCard.x = 400;
                            self.oneCard.y = 0;
                            break;
                            case 6:
                            self.oneCard.x = 440;
                            self.oneCard.y = 0;
                            break;
                            case 7:
                            self.oneCard.x = 480;
                            self.oneCard.y = 0;
                            break;
                            case 8:
                            self.oneCard.x = 520;
                            self.oneCard.y = 0;
                            break;
                            case 9:
                            self.oneCard.x = 560;
                            self.oneCard.y = 0;
                            break;
                            case 10:
                            self.oneCard.x = 600;
                            self.oneCard.y = 0;
                            break;
                            case 11:
                            self.oneCard.x = 640;
                            self.oneCard.y = 0;
                            break;
                            case 12:
                            self.oneCard.x = 680;
                            self.oneCard.y = 0;
                            break;
                        }
                        
                        self.firstCardList.addChild(self.oneCard);
                        self.room.addChild(self.firstCardList);

                    },a*50);
                })(i)
            };
           /*请出牌动画*/
            let gameStatus1 = this.tool.createBitmapByName('thirteen_json.GameStatus01');
            gameStatus1.rotation = 90;
            gameStatus1.x = 400;
            gameStatus1.y = 400;
            this.room.addChild(gameStatus1);
            self.tool.getSound('resource/assets/Sound/chupai.mp3',1,0);
            let tw1 = egret.Tween.get(gameStatus1);
            tw1.to({alpha:0.7,x:350},500)
                .to({alpha:0.5,x:400,y:430,width:150,height:55},500)
                .to({alpha:0.3,x:500,y:450,width:100,height:35},500).call(function(){
                    self.room.removeChild(gameStatus1)
                    
                    self.room.removeChild(self.firstCardList);
                    /*选择出牌方式*/
                    self.chooseCardScreen = new egret.Sprite();
                    self.chooseCardScreen.graphics.beginFill(0x00573e);
                    self.chooseCardScreen.graphics.drawRect(0,0,640,1136);
                    
                    let chooseCardScreenBg:egret.Shape = new egret.Shape();
                    chooseCardScreenBg.graphics.beginFill(0xffffff,0.3);
                    chooseCardScreenBg.graphics.drawRoundRect(240,700,390,300,30,30);
                    self.chooseCardScreen.addChild(chooseCardScreenBg)
                    
                    self.chooseCardScreen.addChild(self.firstCardList);
                    
                    

                    /*第一到三墩*/ 
                    self.cardArray = new egret.Sprite();
                    self.cardArray.graphics.beginFill(0xffffff,0.3);
                    self.cardArray.graphics.drawRoundRect(0,0,660,390,30,30);
                    self.cardArray.rotation = 90;
                    self.cardArray.x = 630;
                    self.cardArray.y = 20;
                    for(var i=0;i<3;i++){
                        let btn = new eui.Button();
                        btn.width = 112;
                        btn.height = 66;
                        btn.x = 12;
                        btn.y =25 + 135*i;
                        
                        let btnShape = new egret.Shape();
                        btnShape.graphics.beginFill(0x72c753);
                        btnShape.graphics.drawRoundRect(0,0,112,66,30,30);
                        btn.addChild(btnShape);
                        
                        let btnLabel = new egret.TextField();
                        btnLabel.text = "第"+(i+1)+"墩";
                        btnLabel.width = 112;
                        btnLabel.height = 66;
                        btnLabel.textAlign = "center";
                        btnLabel.verticalAlign = "middle";
                        btn.addChild(btnLabel);
                        self.cardArray.addChild(btn);
                    };

                    /*倒计时*/
                    self.timerBg = new eui.Button();
                    self.timerBg.x = 520;
                    self.timerBg.y = 50;
                    self.timerBg.width = 40;
                    self.timerBg.height = 40;
                    let timerBgSkin = `<e:Skin class="skins.ButtonSkin"  states="up,down" width="40" height="40" xmlns:e="http://ns.egret.com/eui"> 
                                      <e:Label id="labelDisplay"  size="40"/>
                                      </e:Skin>`;
                    self.timerBg.skinName = timerBgSkin;        
                    self.cardArray.addChild(self.timerBg)
                    self.timer = new egret.Timer(1000,20);
                    self.timer.start();
                    self.timer.addEventListener(egret.TimerEvent.TIMER,self.timerFunc,self);
                    self.timer.addEventListener(egret.TimerEvent.TIMER_COMPLETE,self.playTap,self);    

                    /*第一到第三墩的牌*/
                    for(var i=0;i<3;i++){
                        var emptyCard = new egret.Shape();
                        emptyCard.graphics.beginFill(0xBFB9A7);
                        emptyCard.graphics.drawRoundRect(0,0,90,120,10,10);
                        emptyCard.x = 134+105*i;
                        emptyCard.y = 5;
                        self.cardArray.addChild(emptyCard)
                    }
                    for(var i=0;i<5;i++){
                        var emptyCard = new egret.Shape();
                        emptyCard.graphics.beginFill(0xBFB9A7);
                        emptyCard.graphics.drawRoundRect(0,0,90,120,10,10);
                        emptyCard.x = 134+105*i;
                        emptyCard.y = 135;
                        self.cardArray.addChild(emptyCard)
                    }
                    for(var i=0;i<5;i++){
                        var emptyCard = new egret.Shape();
                        emptyCard.graphics.beginFill(0xBFB9A7);
                        emptyCard.graphics.drawRoundRect(0,0,90,120,10,10);
                        emptyCard.x = 134+105*i;
                        emptyCard.y = 265;
                        self.cardArray.addChild(emptyCard)
                    }
                    /*选择牌型*/
                    
                    
                    
                    /*出牌方式*/
                    let allWays:eui.Scroller = new eui.Scroller();
                    allWays.rotation = 90;
                    allWays.x = 630;
                    allWays.y = 700;
                    allWays.width = 300;
                    allWays.height = 390;



                    let waysTop = new eui.Button();
                    waysTop.width = 300;
                    waysTop.height = 50;
                    
                    for(let i=0;i<3;i++){
                        let label = new eui.Label();
                        switch (i) {
                            case 0:
                                label.text = '第三墩'
                                break;
                            case 1:
                                label.text = '第二墩'
                                break;
                            case 2:
                                label.text = '第一墩'
                                break;    
                        }
                        label.textColor = 0x72c753;
                        label.verticalAlign = 'middle';
                        label.x = 100*i + 10;
                        label.y = 13;
                        label.size = 28;
                        waysTop.addChild(label);
                    }

                    allWays.addChild(waysTop);
                    /*出牌方式所有组合*/
                    let waysGroup:eui.Group = new eui.Group();
                    waysGroup.width = 300;
                    let waysNum = 0;
                    for(let i=0;i<data.ways.length;i++){
                        if(data.ways[i].length){
                            
                            let waysList:eui.Button = new eui.Button();
                            let waysListSkin = `<e:Skin class="skins.ButtonSkin"  states="up,down" width="40" height="40" xmlns:e="http://ns.egret.com/eui"> 
                                <e:Image source="button_json.waysListBg" includeIn="up" width="100%" height="100%"/> 
                                <e:Image source="button_json.waysListBg" includeIn="down" x="2" y="2" alpha="0.5"/>  
                            </e:Skin>`;
                            waysList.skinName = waysListSkin;
                            waysList.width = 300;
                            waysList.height = 80;
                            for(let j=0;j<3;j++){
                                let label = new eui.Label();
                                switch (data.ways[i][j][0]) {
                                    case '1':
                                        label.text = '对子'
                                        break;
                                    case '2':
                                        label.text = '两对'
                                        break;
                                    case '3':
                                        label.text = '三条'
                                        break;
                                    case '4':
                                        label.text = '顺子'
                                        break;
                                   case '5':
                                        label.text = '同花'
                                        break;
                                   case '6':
                                        label.text = '葫芦'
                                        break;
                                   case '7':
                                        label.text = '炸弹'
                                        break;
                                   case '8':
                                        label.text = '同花顺'
                                        break;
                                   default:
                                        label.text = '乌龙'
                                        break;
                                }
                                label.x = 100*j+10;
                                label.y = 28;
                                waysList.addChild(label);
                                                          
                            }
                            waysList.y = 80*waysNum+50;
                            waysNum ++;
                            waysList['num'] = i;
                            self.wNum = i;
                            waysList.addEventListener(egret.TouchEvent.TOUCH_TAP,self.waysTap,self);
                            waysGroup.addChild(waysList)
                        }
                    }
                    allWays.viewport = waysGroup;                    

                    self.chooseCardScreen.addChild(allWays)
                    self.chooseCardScreen.addChild(self.cardArray)
                    
                    self.addChild(self.chooseCardScreen);                    
                    for(let i=0;i<data.ways.length;i++){
                        if(data.ways[i].length){
                            if(data.ways[i][0][1]=='ths'||data.ways[i][0][1] =='th'||data.ways[i][0][1]=='ytl'||data.ways[i][0][1]=='liudui'){
                                self.removeChild(self.chooseCardScreen);
                                console.log('特殊牌型')
                            }
                        }
                    }
                })
        
            /*出牌界面*/

        });
        /*开始比牌*/
        this.socket.on('beginCompare',(data)=>{
            console.log('测试1')
            if(this.hasPrevMask){
                console.log('o1o')
                this.room.removeChild(this.prevCardList);
                this.hasPrevMask = false;
                console.log('opo')
            }
            if(this.hasNextMask){
                console.log('o2o')
                this.room.removeChild(this.nextCardList);    
                console.log('pop')
                this.hasNextMask = false;
            }

            //获取到了所有玩家的信息,展示出来
            for(var p in data.seats){
               
                if(p!=this.seatNo&&data.seats[p]){
                    if(p == this.prevNo){
                        // this.prevCardList = data.seats[p].cardList;
                        this.prevWays = data.seats[p].ways[0];
                        this.prevReadyC.width = 500;
                        this.prevReadyC.height = 226;
                        
                        /*三墩准备比的牌，分别用容器装起*/
                        this.prevOne.width = 500;
                        this.prevOne.height = 126;
                        this.prevTwo.width = 500;
                        this.prevTwo.height = 126;
                        this.prevThree.width = 500;
                        this.prevThree.height = 126;
                        
                        for(var i=0;i<3;i++){
                            var str = '';
                            for(let j=0;j<data.seats[p].cardList.length;j++){
                                if(data.seats[p].ways[0][2].length==4){
                                    if(data.seats[p].cardList[j].val == data.seats[p].ways[0][2][i+1]){
                                        str = data.seats[p].cardList[j].url;
                                    }
                                }else{
                                    if(data.seats[p].cardList[j].val == data.seats[p].ways[0][2][i]){
                                        str = data.seats[p].cardList[j].url;
                                    }
                                }
                            }
                            
                            var c = this.tool.createBitmapByName(str);
                            c.x = 180+50*i;
                            c.y = 2;
                            c.width = 60;
                            c.height = 80;
                            
                            this.prevOne.addChild(c)
                        }
                        for(var i=0;i<5;i++){
                            var str = '';
                            for(let j=0;j<data.seats[p].cardList.length;j++){
                                if(data.seats[p].ways[0][1].length==6){
                                    if(data.seats[p].cardList[j].val == data.seats[p].ways[0][1][i+1]){
                                        str = data.seats[p].cardList[j].url;
                                    }
                                }else{
                                    if(data.seats[p].cardList[j].val == data.seats[p].ways[0][1][i]){
                                        str = data.seats[p].cardList[j].url;
                                    }
                                }
                                
                            }
                            
                            var c = this.tool.createBitmapByName(str); 
                            c.x = 130+50*i;
                            c.y = 60;
                            c.width = 60;
                            c.height = 80;
                            this.prevTwo.addChild(c)            
                        }
                        for(var i=0;i<5;i++){
                            var str = '';
                            for(let j=0;j<data.seats[p].cardList.length;j++){
                                if(data.seats[p].cardList[j].val == data.seats[p].ways[0][0][i+1]){
                                    str = data.seats[p].cardList[j].url;
                                }
                            }
                            
                            var c = this.tool.createBitmapByName(str); 
                            c.x = 130+50*i;
                            c.y = 120;
                            c.width = 60;
                            c.height = 80;
                            this.prevThree.addChild(c)            
                        }

                        this.prevReadyC.addChild(this.prevOne);
                        this.prevReadyC.addChild(this.prevTwo);
                        this.prevReadyC.addChild(this.prevThree);
                        this.prevReadyC.rotation = -90;
                        this.prevReadyC.x = 440;
                        this.prevReadyC.y = 670;
                        this.room.addChild(this.prevReadyC);
                        
                    }
                    if(p == this.nextNo){
                        // this.nextCardList = data.seats[p].cardList;
                        this.nextWays = data.seats[p].ways[0];
                        this.nextOne.width = 500;
                        this.nextOne.height = 126;
                        this.nextTwo.width = 500;
                        this.nextTwo.height = 126;
                        this.nextThree.width = 500;
                        this.nextThree.height = 126;
                        
                        for(var i=0;i<3;i++){
                            var str = '';
                            
                            for(let j=0;j<data.seats[p].cardList.length;j++){
                                if(data.seats[p].ways[0][2].length==4){
                                    if(data.seats[p].cardList[j].val == data.seats[p].ways[0][2][i+1]){
                                        str = data.seats[p].cardList[j].url;
                                    }
                                }else{
                                    if(data.seats[p].cardList[j].val == data.seats[p].ways[0][2][i]){
                                        str = data.seats[p].cardList[j].url;
                                    }
                                }
                            }
                            
                            var c = this.tool.createBitmapByName(str);
                            c.x = 180+40*i;
                            c.y = 2;
                            c.width = 60;
                            c.height = 80;
                            
                            this.nextOne.addChild(c)
                        }
                        for(var i=0;i<5;i++){
                            var str = '';
                            for(let j=0;j<data.seats[p].cardList.length;j++){
                                if(data.seats[p].ways[0][1].length==6){
                                    if(data.seats[p].cardList[j].val == data.seats[p].ways[0][1][i+1]){
                                        str = data.seats[p].cardList[j].url;
                                    }
                                }else{
                                    if(data.seats[p].cardList[j].val == data.seats[p].ways[0][1][i]){
                                        str = data.seats[p].cardList[j].url;
                                    }
                                }
                                
                            }
                            
                            var c = this.tool.createBitmapByName(str); 
                            c.x = 130+40*i;
                            c.y = 50;
                            c.width = 60;
                            c.height = 80;
                            this.nextTwo.addChild(c)            
                        }
                        for(var i=0;i<5;i++){
                            var str = '';
                            for(let j=0;j<data.seats[p].cardList.length;j++){
                                if(data.seats[p].cardList[j].val == data.seats[p].ways[0][0][i+1]){
                                    str = data.seats[p].cardList[j].url;
                                }
                            }
                            
                            var c = this.tool.createBitmapByName(str); 
                            c.x = 130+40*i;
                            c.y = 110;
                            c.width = 60;
                            c.height = 80;
                            this.nextThree.addChild(c)            
                        }      

                        this.nextReadyC.addChild(this.nextOne);
                        this.nextReadyC.addChild(this.nextTwo);
                        this.nextReadyC.addChild(this.nextThree);
                        
                        this.nextReadyC.x = 100;
                        this.nextReadyC.y = 720;
                        this.room.addChild(this.nextReadyC); 
                      

                    }
                }
                console.log('测试2')
            }
            
            var self = this;
            /*开始比牌动画*/
            self.tool.getSound('resource/assets/Sound/beginC.mp3',1,0);
            let gameStatus2 = this.tool.createBitmapByName('thirteen_json.GameStatus02');
            gameStatus2.rotation = 90;
            gameStatus2.x = 400;
            gameStatus2.y = 400;
            this.room.addChild(gameStatus2);
            let tw1 = egret.Tween.get(gameStatus2);
            tw1.to({alpha:0.7,x:350},500)
                .to({alpha:0.5,x:400,y:430,width:150,height:55},500)
                .to({alpha:0.3,x:500,y:480,width:100,height:35},500).call(function(){
                    self.room.removeChild(gameStatus2)
                    switch(self.seatNo){
                        case 'p1':
                            //给我的乌龙加上0；
                            if(self.ways[self.wNum][2].length ==3){
                                self.ways[self.wNum][2].unshift('0');
                                if(self.ways[self.wNum][1].length == 5){
                                    self.ways[self.wNum][1].unshift('0');
                                }
                            }
                            //我的第一墩
                            var x = parseInt(self.ways[self.wNum][2][0]);
                            var cardTap10 = self.tool.createBitmapByName('thirteen_json.type'+(x+1).toString());
                            //播放声音
                            self.playSound(x);
                            cardTap10.x = 200;
                            cardTap10.y = -80;
                            self.oneCompare.addChild(cardTap10);                         
                            var t1 = egret.Tween.get(self.oneCompare);
                            t1.to({y:-150},1000).call(function(){
                                self.oneCompare.removeChild(cardTap10);
                                self.oneCompare.y = 0;
                                //我的第二墩
                                    var x = parseInt(self.ways[self.wNum][1][0]);
                                    var cardTap201 = self.tool.createBitmapByName('thirteen_json.type'+(x+1).toString());
                                    self.playSound(x);
                                    
                                    cardTap201.x = 200;
                                    cardTap201.y = -20;
                                    self.twoCompare.addChild(cardTap201);
                                    var t1 = egret.Tween.get(self.twoCompare);
                                    t1.to({y:-150},1000).call(function(){
                                        self.twoCompare.removeChild(cardTap201);
                                        self.twoCompare.y = 0;
                                        //我的第三墩
                                        var x = parseInt(self.ways[self.wNum][0][0]);
                                        var cardTap302 = self.tool.createBitmapByName('thirteen_json.type'+(x+1).toString());
                                        self.playSound(x);
                                        cardTap302.x = 200;
                                        cardTap302.y = 20;
                                        self.threeCompare.addChild(cardTap302);
                                        var t1 = egret.Tween.get(self.threeCompare);
                                        t1.to({y:-150},1000).call(function(){
                                            self.threeCompare.removeChild(cardTap302);
                                            self.threeCompare.y = 0;       
                                              //下家比牌
                                            //   if(self.hasNextMask){
                                                  //给下家乌龙加'0'
                                                  if(self.nextWays[2].length ==3){
                                                        self.nextWays[2].unshift('0');
                                                        if(self.nextWays[1].length == 5){
                                                            self.nextWays[1].unshift('0');
                                                        }
                                                    }
                                                  //下家第一墩
                                                    var x = parseInt(self.nextWays[2][0]);
                                                    var cardTap11 = self.tool.createBitmapByName('thirteen_json.type'+(x+1).toString());
                                                    self.playSound(x);
                                                    cardTap11.x = 200;
                                                    cardTap11.y = -80;
                                                    self.nextOne.addChild(cardTap11);
                                                    self.nextOne.rotation = 90;
                                                    self.nextOne.x =300;
                                                    self.nextOne.y = -300;
                                                    var t1 = egret.Tween.get(self.nextOne);
                                                    t1.to({x:400},1000).call(function(){
                                                        self.nextOne.removeChild(cardTap11);
                                                        self.nextOne.y = 0;
                                                        self.nextOne.x = 0;
                                                        self.nextOne.rotation = 0;
                                                        //下家第二墩
                                                            var x = parseInt(self.nextWays[1][0]);
                                                            var cardTap202 = self.tool.createBitmapByName('thirteen_json.type'+(x+1).toString());
                                                            self.playSound(x);
                                                            cardTap202.x = 200;
                                                            cardTap202.y = -20;
                                                            self.nextTwo.addChild(cardTap202);
                                                            self.nextTwo.rotation = 90;
                                                            self.nextTwo.x =300; 
                                                            self.nextTwo.y = -300;     
                                                            var t1 = egret.Tween.get(self.nextTwo);
                                                            t1.to({x:400},1000).call(function(){
                                                                self.nextTwo.removeChild(cardTap202);
                                                                self.nextTwo.y = 0;
                                                                self.nextTwo.x = 0;
                                                                self.nextTwo.rotation = 0;
                                                                //下家第三墩
                                                                var x = parseInt(self.nextWays[0][0]);
                                                                var cardTap303 = self.tool.createBitmapByName('thirteen_json.type'+(x+1).toString());
                                                                self.playSound(x);
                                                                cardTap303.x = 200;
                                                                cardTap303.y = 20;
                                                                self.nextThree.addChild(cardTap303);    
                                                                self.nextThree.rotation = 90;
                                                                self.nextThree.x =300;      
                                                                self.nextThree.y = -300;                                                                              
                                                                var t1 = egret.Tween.get(self.nextThree);
                                                                t1.to({x:400},1000).call(function(){
                                                                    self.nextThree.removeChild(cardTap303);
                                                                    self.nextThree.y = 0;
                                                                    self.nextThree.x = 0;
                                                                    self.nextThree.rotation = 0;  
                                                                    //上家比牌
                                                                    // if(self.hasPrevMask){
                                                                        //给上家乌龙加'0'
                                                                        if(self.prevWays[2].length ==3){
                                                                                self.prevWays[2].unshift('0');
                                                                                if(self.prevWays[1].length == 5){
                                                                                    self.prevWays[1].unshift('0');
                                                                                }
                                                                            }
                                                                        //上家第一墩
                                                                            var x = parseInt(self.prevWays[2][0]);
                                                                            var cardTap12 = self.tool.createBitmapByName('thirteen_json.type'+(x+1).toString());
                                                                            self.playSound(x);
                                                                            cardTap12.x = 200;
                                                                            cardTap12.y = -80;
                                                                            self.prevOne.addChild(cardTap12);  
                                                                            self.prevOne.rotation = 180;
                                                                            self.prevOne.x =300;                                                                                                 
                                                                            var t1 = egret.Tween.get(self.prevOne);
                                                                            t1.to({y:100},1000).call(function(){
                                                                                self.prevOne.removeChild(cardTap12);
                                                                                self.prevOne.y = 0;
                                                                                self.prevOne.x = 0;
                                                                                self.prevOne.rotation = 0;
                                                                                //上家第二墩                                                                
                                                                                    var x = parseInt(self.prevWays[1][0]);
                                                                                    var cardTap202 = self.tool.createBitmapByName('thirteen_json.type'+(x+1).toString());
                                                                                    self.playSound(x);
                                                                                    cardTap202.x = 200;
                                                                                    cardTap202.y = -20;
                                                                                    self.prevTwo.addChild(cardTap202);
                                                                                    self.prevTwo.rotation = 180;
                                                                                    self.prevTwo.x =300;                                                                                         
                                                                                    var t1 = egret.Tween.get(self.prevTwo);
                                                                                    t1.to({y:100},1000).call(function(){
                                                                                        self.prevTwo.removeChild(cardTap202);
                                                                                        self.prevTwo.y = 0;
                                                                                        self.prevTwo.x = 0;
                                                                                        self.prevTwo.rotation = 0;
                                                                                        //下家第三墩
                                                                                        var x = parseInt(self.prevWays[0][0]);
                                                                                        var cardTap303 = self.tool.createBitmapByName('thirteen_json.type'+(x+1).toString());
                                                                                        self.playSound(x);
                                                                                        cardTap303.x = 200;
                                                                                        cardTap303.y = 20;
                                                                                        self.prevThree.addChild(cardTap303);    
                                                                                        self.prevThree.rotation = 180;
                                                                                        self.prevThree.x =300;                                                                                                        
                                                                                        var t1 = egret.Tween.get(self.prevThree);
                                                                                        t1.to({y:100},1000).call(function(){
                                                                                            self.prevThree.removeChild(cardTap303);
                                                                                            self.prevThree.y = 0;
                                                                                            self.prevThree.x = 0;
                                                                                            self.prevThree.rotation = 0;  
                                                                                             //展示比拼结果
                                                                                            let pf1 = new eui.Label();
                                                                                            pf1.text = self.showResult(data.result,0).text;
                                                                                            pf1.rotation = 90;
                                                                                            pf1.x = 200;
                                                                                            pf1.y = 550;
                                                                                            self.room.addChild(pf1);
                                                                                            //第er墩
                                                                                            let pf2 = new eui.Label();
                                                                                            pf2.text = self.showResult(data.result,1).text;
                                                                                            pf2.rotation = 90;
                                                                                            pf2.x = 160;
                                                                                            pf2.y = 550;
                                                                                            self.room.addChild(pf2);
                                                                                            //第三墩比完
                                                                                            let pf3 = new eui.Label();
                                                                                            pf3.text = self.showResult(data.result,2).text;
                                                                                            pf3.rotation = 90;
                                                                                            pf3.x = 120;
                                                                                            pf3.y = 550;
                                                                                            self.room.addChild(pf3);
                                                                                            //总分
                                                                                            let res = new eui.Label();
                                                                                            res.text = '总分：'+self.showResult(data.result,0).res;
                                                                                            res.rotation = 90;
                                                                                            res.x = 160;
                                                                                            res.y = 850;
                                                                                            self.room.addChild(res);
                                                                                            //改变显示分数
                                                                                            console.log('八成是这里问题')
                                                                                            console.log(self.prevUser)
                                                                                           console.log(self.room)
                                                                                            self.room.$children[1].$children[3]['text'] = (parseInt(self.room.$children[1].$children[3]['text']) + self.finRes(data.result,0)*self.rate).toString();
                                                                                            self.room.$children[3].$children[3].$children[0]['text'] = (parseInt(self.room.$children[3].$children[3].$children[0]['text']) + self.finRes(data.result,0)*self.rate).toString();
                                                                                            self.room.$children[4].$children[3].$children[0]['text'] = (parseInt(self.room.$children[4].$children[3].$children[0]['text']) + self.finRes(data.result,2)*self.rate).toString();
                                                                                            self.room.$children[5].$children[3].$children[0]['text'] = (parseInt(self.room.$children[5].$children[3].$children[0]['text']) + self.finRes(data.result,1)*self.rate).toString();
                                                                                            
                                                                                            self.gold = self.room.$children[1].$children[3]['text'];
                                                                                           

                                                                                            //奖扣优点
                                                                                            if(self.showResult(data.result,0).res>0){
                                                                                                self.tool.ajax(
                                                                                                    'http://testapi.yiuxiu.com/Game/RewardYouDian',
                                                                                                'UserId='+self.userId+'&num='+self.showResult(data.result,0).res*self.rate+'&GameName=拼图',
                                                                                                    function success(e:egret.Event):void{
                                                                                                        var request = <egret.HttpRequest>e.currentTarget;
                                                                                                            const data  = JSON.parse(request.response);
                                                                                                            console.log('伪成功')
                                                                                                            if(data.code == "000000"){
                                                                                                                console.log('成功')
                                                                                                            }
                                                                                                    },
                                                                                                    function error():void{
                                                                                                        console.log('失败')
                                                                                                    },)
                                                                                            }else if(self.showResult(data.result,0).res<0){
                                                                                                self.tool.ajax(
                                                                                                    'http://testapi.yiuxiu.com/Game/SubtractYouDian',
                                                                                                'UserID='+self.userId+'&num='+Math.abs(self.showResult(data.result,0).res*self.rate)+'&GameName=拼图',
                                                                                                    function success(e:egret.Event):void{
                                                                                                        var request = <egret.HttpRequest>e.currentTarget;
                                                                                                            const data  = JSON.parse(request.response);    
                                                                                                            console.log('伪成功')           
                                                                                                            if(data.code == "000000"){
                                                                                                                console.log('成功')
                                                                                                            }
                                                                                                    },
                                                                                                    function error():void{
                                                                                                        console.log('失败')
                                                                                                    },)   
                                                                                            }
                                                                                            //加减分动画
                                                                                            let resAni = new eui.Label();
                                                                                            if(self.showResult(data.result,0).res>0){
                                                                                                resAni.text = '+'+self.showResult(data.result,0).res*self.rate;
                                                                                            }else if(self.showResult(data.result,0).res<0){
                                                                                                resAni.text = ''+self.showResult(data.result,0).res*self.rate;
                                                                                            }
                                                                                            
                                                                                            resAni.rotation = 90;
                                                                                            resAni.x = 160;
                                                                                            resAni.y = 150;
                                                                                            self.room.addChild(resAni);
                                                                                            var t2 = egret.Tween.get(resAni);
                                                                                            t2.to({x:260},6000).call(function(){
                                                                                                self.room.removeChild(resAni);
                                                                                                self.room.removeChild(pf1)
                                                                                                self.room.removeChild(pf2)
                                                                                                self.room.removeChild(pf3)
                                                                                                self.room.removeChild(res)
                                                                                                self.room.removeChild(self.nextReadyC)
                                                                                                self.room.removeChild(self.prevReadyC)
                                                                                                self.room.removeChild(self.readyCompare);
                                                                                                //比牌结束，发送可以清除桌面指令
                                                                                                
                                                                                                console.log('这是1')      
                                                                                                 /*后台修改房间座位玩家的优点,以免再次进入显示之前的优点*/
                                                                                                self.socket.emit('changeGold',{deskNo:self.deskNo,p1:self.room.$children[1].$children[3]['text'],p2:self.room.$children[5].$children[3].$children[0]['text'],p3:self.room.$children[4].$children[3].$children[0]['text']})                                                                                          
                                                                                                self.socket.emit('clearDesk',{deskNo:self.deskNo,mySeatNo:self.seatNo})
                                                                                                self.isGaming = false;                                                                                                
                                                                                            })
                                                                                            
                                                                                        })
                                                                                    })
                                                                            })
                                                                    // }
                                                                })
                                                            })
                                                    })
                                            //   }                                                                               
                                        })
                                    })                                 
                            })                                                      
                            break;  
                        case 'p2':
                            // if(self.hasPrevMask){
                                    //给上家乌龙加'0'
                                    if(self.prevWays[2].length ==3){
                                        self.prevWays[2].unshift('0');
                                        if(self.prevWays[1].length == 5){
                                            self.prevWays[1].unshift('0');
                                        }
                                    }
                                    var x = parseInt(self.prevWays[2][0]);
                                    var cardTap11 = self.tool.createBitmapByName('thirteen_json.type'+(x+1).toString());
                                    self.playSound(x);
                                    cardTap11.x = 200;
                                    cardTap11.y = -80;
                                    self.prevOne.addChild(cardTap11);  
                                    self.prevOne.rotation = 180;
                                    self.prevOne.x =300;
                                    var t1 = egret.Tween.get(self.prevOne);
                                    t1.to({y:100},1000).call(function(){
                                        self.prevOne.removeChild(cardTap11);
                                        self.prevOne.y = 0;
                                        self.prevOne.x = 0;
                                        self.prevOne.rotation = 0;
                                        //上家第二墩
                                            var x = parseInt(self.prevWays[1][0]);
                                            var cardTap202 = self.tool.createBitmapByName('thirteen_json.type'+(x+1).toString());
                                            self.playSound(x);
                                            cardTap202.x = 200;
                                            cardTap202.y = -20;
                                            self.prevTwo.addChild(cardTap202);
                                            self.prevTwo.rotation = 180;
                                            self.prevTwo.x =300;
                                            var t1 = egret.Tween.get(self.prevTwo);
                                            t1.to({y:100},1000).call(function(){
                                                self.prevTwo.removeChild(cardTap202);
                                                self.prevTwo.y = 0;
                                                self.prevTwo.x = 0;
                                                self.prevTwo.rotation = 0;
                                                //上家第三墩
                                                var x = parseInt(self.prevWays[0][0]);
                                                var cardTap303 = self.tool.createBitmapByName('thirteen_json.type'+(x+1).toString());
                                                self.playSound(x);
                                                cardTap303.x = 200;
                                                cardTap303.y = 20;
                                                self.prevThree.addChild(cardTap303);    
                                                self.prevThree.rotation = 180;
                                                    self.prevThree.x =300;                     
                                                var t1 = egret.Tween.get(self.prevThree);
                                                t1.to({y:100},1000).call(function(){
                                                    self.prevThree.removeChild(cardTap303);
                                                    self.prevThree.y = 0;
                                                    self.prevThree.x = 0;
                                                    self.prevThree.rotation = 0; 
                                                    //给我的乌龙加上0；
                                                    if(self.ways[self.wNum][2].length ==3){
                                                        self.ways[self.wNum][2].unshift('0');
                                                        if(self.ways[self.wNum][1].length == 5){
                                                            self.ways[self.wNum][1].unshift('0');
                                                        }
                                                    }
                                                    //我的第一墩
                                                    var x = parseInt(self.ways[self.wNum][2][0]);
                                                    var cardTap10 = self.tool.createBitmapByName('thirteen_json.type'+(x+1).toString());
                                                    self.playSound(x);
                                                    cardTap10.x = 200;
                                                    cardTap10.y = -80;
                                                    self.oneCompare.addChild(cardTap10);              
                                                    var t1 = egret.Tween.get(self.oneCompare);
                                                    t1.to({y:-150},1000).call(function(){
                                                        self.oneCompare.removeChild(cardTap10);
                                                        self.oneCompare.y = 0;
                                                        //我的第二墩                                                                
                                                            var x = parseInt(self.ways[self.wNum][1][0]);
                                                            var cardTap201 = self.tool.createBitmapByName('thirteen_json.type'+(x+1).toString());
                                                            self.playSound(x);
                                                            cardTap201.x = 200;
                                                            cardTap201.y = -20;
                                                            self.twoCompare.addChild(cardTap201);
                                                            var t1 = egret.Tween.get(self.twoCompare);
                                                            t1.to({y:-150},1000).call(function(){
                                                                self.twoCompare.removeChild(cardTap201);
                                                                self.twoCompare.y = 0;
                                                                //我的第三墩
                                                                var x = parseInt(self.ways[self.wNum][0][0]);
                                                                var cardTap302 = self.tool.createBitmapByName('thirteen_json.type'+(x+1).toString());
                                                                self.playSound(x);
                                                                cardTap302.x = 200;
                                                                cardTap302.y = 20;
                                                                self.threeCompare.addChild(cardTap302);                   
                                                                var t1 = egret.Tween.get(self.threeCompare);
                                                                t1.to({y:-150},1000).call(function(){
                                                                    self.threeCompare.removeChild(cardTap302);
                                                                    self.threeCompare.y = 0;  
                                                                    //下家bipai
                                                                    // if(self.hasNextMask){
                                                                        //给下家乌龙加'0'
                                                                        if(self.nextWays[2].length ==3){
                                                                                self.nextWays[2].unshift('0');
                                                                                if(self.nextWays[1].length == 5){
                                                                                    self.nextWays[1].unshift('0');
                                                                                }
                                                                            }
                                                                        //下家第一墩
                                                                            var x = parseInt(self.nextWays[2][0]);
                                                                            var cardTap11 = self.tool.createBitmapByName('thirteen_json.type'+(x+1).toString());
                                                                            self.playSound(x);
                                                                            cardTap11.x = 200;
                                                                            cardTap11.y = -80;
                                                                            self.nextOne.addChild(cardTap11);  
                                                                            self.nextOne.rotation = 90;
                                                                            self.nextOne.x =300;      
                                                                            self.nextOne.y = -300;                    
                                                                            var t1 = egret.Tween.get(self.nextOne);
                                                                            t1.to({x:400},1000).call(function(){
                                                                                self.nextOne.removeChild(cardTap11);
                                                                                self.nextOne.y = 0;
                                                                                self.nextOne.x = 0;
                                                                                self.nextOne.rotation = 0;
                                                                                //下家第二墩                                                                
                                                                                    var x = parseInt(self.nextWays[1][0]);
                                                                                    var cardTap202 = self.tool.createBitmapByName('thirteen_json.type'+(x+1).toString());
                                                                                    self.playSound(x);
                                                                                    cardTap202.x = 200;
                                                                                    cardTap202.y = -20;
                                                                                    self.nextTwo.addChild(cardTap202);
                                                                                    self.nextTwo.rotation = 90;
                                                                                    self.nextTwo.x =300; 
                                                                                    self.nextTwo.y = -300;     
                                                                                    var t1 = egret.Tween.get(self.nextTwo);
                                                                                    t1.to({x:400},1000).call(function(){
                                                                                        self.nextTwo.removeChild(cardTap202);
                                                                                        self.nextTwo.y = 0;
                                                                                        self.nextTwo.x = 0;
                                                                                        self.nextTwo.rotation = 0;
                                                                                        //下家第三墩
                                                                                        var x = parseInt(self.nextWays[0][0]);
                                                                                        var cardTap303 = self.tool.createBitmapByName('thirteen_json.type'+(x+1).toString());
                                                                                        self.playSound(x);
                                                                                        cardTap303.x = 200;
                                                                                        cardTap303.y = 20;
                                                                                        self.nextThree.addChild(cardTap303);    
                                                                                        self.nextThree.rotation = 90;
                                                                                        self.nextThree.x =300;    
                                                                                        self.nextThree.y = -300;                                                                                 
                                                                                        var t1 = egret.Tween.get(self.nextThree);
                                                                                        t1.to({x:400},1000).call(function(){
                                                                                            self.nextThree.removeChild(cardTap303);
                                                                                            self.nextThree.y = 0;
                                                                                            self.nextThree.x = 0;
                                                                                            self.nextThree.rotation = 0;  
                                                                                            //展示比拼结果
                                                                                            let pf1 = new eui.Label();
                                                                                            pf1.text = self.showResult(data.result,0).text;
                                                                                            pf1.rotation = 90;
                                                                                            pf1.x = 200;
                                                                                            pf1.y = 550;
                                                                                            self.room.addChild(pf1);
                                                                                            //第er墩
                                                                                            let pf2 = new eui.Label();
                                                                                            pf2.text = self.showResult(data.result,1).text;
                                                                                            pf2.rotation = 90;
                                                                                            pf2.x = 160;
                                                                                            pf2.y = 550;
                                                                                            self.room.addChild(pf2);
                                                                                            //第三墩比完
                                                                                            let pf3 = new eui.Label();
                                                                                            pf3.text = self.showResult(data.result,2).text;
                                                                                            pf3.rotation = 90;
                                                                                            pf3.x = 120;
                                                                                            pf3.y = 550;
                                                                                            self.room.addChild(pf3);
                                                                                            //总分
                                                                                            let res = new eui.Label();
                                                                                            res.text = '总分：'+self.showResult(data.result,1).res;
                                                                                            res.rotation = 90;
                                                                                            res.x = 160;
                                                                                            res.y = 850;
                                                                                            self.room.addChild(res);
                                                                                            //改变显示分数
                                                                                            self.room.$children[1].$children[3]['text'] = (parseInt(self.room.$children[1].$children[3]['text']) + self.finRes(data.result,1)*self.rate).toString();
                                                                                            self.room.$children[3].$children[3].$children[0]['text'] = (parseInt(self.room.$children[3].$children[3].$children[0]['text']) + self.finRes(data.result,1)*self.rate).toString();
                                                                                            self.room.$children[4].$children[3].$children[0]['text'] = (parseInt(self.room.$children[4].$children[3].$children[0]['text']) + self.finRes(data.result,0)*self.rate).toString();
                                                                                            self.room.$children[5].$children[3].$children[0]['text'] = (parseInt(self.room.$children[5].$children[3].$children[0]['text']) + self.finRes(data.result,2)*self.rate).toString();
                                                                                            self.gold = self.room.$children[1].$children[3]['text'];
                                                                                            
                                                                                            
                                                                                           
                                                                                            if(self.showResult(data.result,1).res>0){
                                                                                                self.tool.ajax(
                                                                                                    'http://testapi.yiuxiu.com/Game/RewardYouDian',
                                                                                                'UserId='+self.userId+'&num='+self.showResult(data.result,1).res*self.rate+'&GameName=拼图',
                                                                                                    function success(e:egret.Event):void{
                                                                                                        var request = <egret.HttpRequest>e.currentTarget;
                                                                                                            const data  = JSON.parse(request.response);        
                                                                                                            if(data.code == "000000"){
                                                                                                                console.log('成功')
                                                                                                            }
                                                                                                    },
                                                                                                    function error():void{
                                                                                                        console.log('失败')
                                                                                                    },)
                                                                                            }else if(self.showResult(data.result,1).res<0){
                                                                                                self.tool.ajax(
                                                                                                    'http://testapi.yiuxiu.com/Game/SubtractYouDian',
                                                                                                'UserID='+self.userId+'&num='+Math.abs(self.showResult(data.result,1).res*self.rate)+'&GameName=拼图',
                                                                                                    function success(e:egret.Event):void{
                                                                                                        var request = <egret.HttpRequest>e.currentTarget;
                                                                                                            const data  = JSON.parse(request.response);        
                                                                                                            if(data.code == "000000"){
                                                                                                                console.log('成功')
                                                                                                            }
                                                                                                    },
                                                                                                    function error():void{
                                                                                                        console.log('失败')
                                                                                                    },)   
                                                                                            }
                                                                                            //加减分动画
                                                                                            let resAni = new eui.Label();
                                                                                            if(self.showResult(data.result,1).res>0){
                                                                                                resAni.text = '+'+self.showResult(data.result,1).res*self.rate;
                                                                                            }else if(self.showResult(data.result,1).res<0){
                                                                                                resAni.text = ''+self.showResult(data.result,1).res*self.rate;
                                                                                            }
                                                                                            
                                                                                            resAni.rotation = 90;
                                                                                            resAni.x = 160;
                                                                                            resAni.y = 150;
                                                                                            self.room.addChild(resAni);
                                                                                            var t2 = egret.Tween.get(resAni);
                                                                                            t2.to({x:260},6000).call(function(){
                                                                                                self.room.removeChild(resAni);
                                                                                                self.room.removeChild(pf1)
                                                                                                self.room.removeChild(pf2)
                                                                                                self.room.removeChild(pf3)
                                                                                                self.room.removeChild(res)
                                                                                                self.room.removeChild(self.nextReadyC)
                                                                                                self.room.removeChild(self.prevReadyC)
                                                                                                self.room.removeChild(self.readyCompare);
                                                                                                //比牌结束，发送可以清除桌面指令
                                                                                                
                                                                                                console.log('这是4')
                                                                                                /*后台修改房间座位玩家的优点,以免再次进入显示之前的优点*/
                                                                                                self.socket.emit('changeGold',{deskNo:self.deskNo,p1:self.room.$children[4].$children[3].$children[0]['text'],p2:self.room.$children[3].$children[3].$children[0]['text'],p3:self.room.$children[5].$children[3].$children[0]['text']})
                                                                                                self.socket.emit('clearDesk',{deskNo:self.deskNo,mySeatNo:self.seatNo})
                                                                                                self.isGaming = false;
                                                                                            })
                                                                                        })
                                                                                    })
                                                                            })

                                                                    // }
                                                                })
                                                            })
                                                        })    
                                                    
                                                })
                                            })
                                    })

                            // }

                            break;
                        case 'p3':
                            // if(self.hasNextMask){
                                //给下家乌龙加'0'
                                if(self.nextWays[2].length ==3){
                                    self.nextWays[2].unshift('0');
                                    if(self.nextWays[1].length == 5){
                                        self.nextWays[1].unshift('0');
                                    }
                                }
                                //下家第一墩
                                var x = parseInt(self.nextWays[2][0]);
                                var cardTap11 = self.tool.createBitmapByName('thirteen_json.type'+(x+1).toString());
                                self.playSound(x);
                                cardTap11.x = 200;
                                cardTap11.y = -80;
                                self.nextOne.addChild(cardTap11);  
                                self.nextOne.rotation = 90;
                                self.nextOne.x =300;      
                                self.nextOne.y = -300;                    
                                var t1 = egret.Tween.get(self.nextOne);
                                t1.to({x:400},1000).call(function(){
                                    self.nextOne.removeChild(cardTap11);
                                    self.nextOne.y = 0;
                                    self.nextOne.x = 0;
                                    self.nextOne.rotation = 0;
                                    //下家第二墩                                                                
                                        var x = parseInt(self.nextWays[1][0]);
                                        var cardTap202 = self.tool.createBitmapByName('thirteen_json.type'+(x+1).toString());
                                        self.playSound(x);
                                        cardTap202.x = 200;
                                        cardTap202.y = -20;
                                        self.nextTwo.addChild(cardTap202);
                                        self.nextTwo.rotation = 90;
                                        self.nextTwo.x =300; 
                                        self.nextTwo.y = -300;     
                                        var t1 = egret.Tween.get(self.nextTwo);
                                        t1.to({x:400},1000).call(function(){
                                            self.nextTwo.removeChild(cardTap202);
                                            self.nextTwo.y = 0;
                                            self.nextTwo.x = 0;
                                            self.nextTwo.rotation = 0;
                                            //下家第三墩
                                            var x = parseInt(self.nextWays[0][0]);
                                            var cardTap303 = self.tool.createBitmapByName('thirteen_json.type'+(x+1).toString());
                                            self.playSound(x);
                                            cardTap303.x = 200;
                                            cardTap303.y = 20;
                                            self.nextThree.addChild(cardTap303);    
                                            self.nextThree.rotation = 90;
                                            self.nextThree.x =300;  
                                            self.nextThree.y = -300;                                                                                   
                                            var t1 = egret.Tween.get(self.nextThree);
                                            t1.to({x:400},1000).call(function(){
                                                self.nextThree.removeChild(cardTap303);
                                                self.nextThree.y = 0;
                                                self.nextThree.x = 0;
                                                self.nextThree.rotation = 0;  
                                                //上家比牌
                                                // if(self.hasPrevMask){
                                                    //给上家乌龙加'0'
                                                    if(self.prevWays[2].length ==3){
                                                            self.prevWays[2].unshift('0');
                                                            if(self.prevWays[1].length == 5){
                                                                self.prevWays[1].unshift('0');
                                                            }
                                                        }
                                                    //上家第一墩
                                                        var x = parseInt(self.prevWays[2][0]);
                                                        var cardTap12 = self.tool.createBitmapByName('thirteen_json.type'+(x+1).toString());
                                                        self.playSound(x);
                                                        cardTap12.x = 200;
                                                        cardTap12.y = -80;
                                                        self.prevOne.addChild(cardTap12);  
                                                        self.prevOne.rotation = 180;
                                                        self.prevOne.x =300;                                                                                                 
                                                        var t1 = egret.Tween.get(self.prevOne);
                                                        t1.to({y:100},1000).call(function(){
                                                            self.prevOne.removeChild(cardTap12);
                                                            self.prevOne.y = 0;
                                                            self.prevOne.x = 0;
                                                            self.prevOne.rotation = 0;
                                                            //上家第二墩                                                                
                                                                var x = parseInt(self.prevWays[1][0]);
                                                                var cardTap202 = self.tool.createBitmapByName('thirteen_json.type'+(x+1).toString());
                                                                self.playSound(x);
                                                                cardTap202.x = 200;
                                                                cardTap202.y = -20;
                                                                self.prevTwo.addChild(cardTap202);
                                                                self.prevTwo.rotation = 180;
                                                                self.prevTwo.x =300;                                                                                         
                                                                var t1 = egret.Tween.get(self.prevTwo);
                                                                t1.to({y:100},1000).call(function(){
                                                                    self.prevTwo.removeChild(cardTap202);
                                                                    self.prevTwo.y = 0;
                                                                    self.prevTwo.x = 0;
                                                                    self.prevTwo.rotation = 0;
                                                                    //下家第三墩
                                                                    var x = parseInt(self.prevWays[0][0]);
                                                                    var cardTap303 = self.tool.createBitmapByName('thirteen_json.type'+(x+1).toString());
                                                                    self.playSound(x);
                                                                    cardTap303.x = 200;
                                                                    cardTap303.y = 20;
                                                                    self.prevThree.addChild(cardTap303);    
                                                                    self.prevThree.rotation = 180;
                                                                    self.prevThree.x =300;                                                                                                        
                                                                    var t1 = egret.Tween.get(self.prevThree);
                                                                    t1.to({y:100},1000).call(function(){
                                                                        self.prevThree.removeChild(cardTap303);
                                                                        self.prevThree.y = 0;
                                                                        self.prevThree.x = 0;
                                                                        self.prevThree.rotation = 0;  
                                                                        //给我的乌龙加上0；
                                                                        if(self.ways[self.wNum][2].length ==3){
                                                                            self.ways[self.wNum][2].unshift('0');
                                                                            if(self.ways[self.wNum][1].length == 5){
                                                                                self.ways[self.wNum][1].unshift('0');
                                                                            }
                                                                        }   
                                                                        //我的第一墩
                                                                        var x = parseInt(self.ways[self.wNum][2][0]);
                                                                        var cardTap10 = self.tool.createBitmapByName('thirteen_json.type'+(x+1).toString());
                                                                        self.playSound(x);
                                                                        cardTap10.x = 200;
                                                                        cardTap10.y = -80;
                                                                        self.oneCompare.addChild(cardTap10);                            
                                                                        var t1 = egret.Tween.get(self.oneCompare);
                                                                        t1.to({y:-150},1000).call(function(){
                                                                            self.oneCompare.removeChild(cardTap10);
                                                                            self.oneCompare.y = 0;
                                                                            //我的第二墩                                                        
                                                                                var x = parseInt(self.ways[self.wNum][1][0]);
                                                                                var cardTap201 = self.tool.createBitmapByName('thirteen_json.type'+(x+1).toString());
                                                                                self.playSound(x);
                                                                                cardTap201.x = 200;
                                                                                cardTap201.y = -20;
                                                                                self.twoCompare.addChild(cardTap201);
                                                                                var t1 = egret.Tween.get(self.twoCompare);
                                                                                t1.to({y:-150},1000).call(function(){
                                                                                    self.twoCompare.removeChild(cardTap201);
                                                                                    self.twoCompare.y = 0;
                                                                                    //我的第三墩
                                                                                    var x = parseInt(self.ways[self.wNum][0][0]);
                                                                                    var cardTap302 = self.tool.createBitmapByName('thirteen_json.type'+(x+1).toString());
                                                                                    self.playSound(x);
                                                                                    cardTap302.x = 200;
                                                                                    cardTap302.y = 20;
                                                                                    self.threeCompare.addChild(cardTap302);                   
                                                                                    var t1 = egret.Tween.get(self.threeCompare);
                                                                                    t1.to({y:-150},1000).call(function(){
                                                                                        self.threeCompare.removeChild(cardTap302);
                                                                                        self.threeCompare.y = 0;
                                                                                        //展示比拼结果
                                                                                        let pf1 = new eui.Label();
                                                                                        pf1.text = self.showResult(data.result,0).text;
                                                                                        pf1.rotation = 90;
                                                                                        pf1.x = 200;
                                                                                        pf1.y = 550;
                                                                                        self.room.addChild(pf1);
                                                                                        //第er墩
                                                                                        let pf2 = new eui.Label();
                                                                                        pf2.text = self.showResult(data.result,1).text;
                                                                                        pf2.rotation = 90;
                                                                                        pf2.x = 160;
                                                                                        pf2.y = 550;
                                                                                        self.room.addChild(pf2);
                                                                                        //第三墩比完
                                                                                        let pf3 = new eui.Label();
                                                                                        pf3.text = self.showResult(data.result,2).text;
                                                                                        pf3.rotation = 90;
                                                                                        pf3.x = 120;
                                                                                        pf3.y = 550;
                                                                                        self.room.addChild(pf3);
                                                                                        //总分
                                                                                        let res = new eui.Label();
                                                                                        res.text = '总分：'+self.showResult(data.result,2).res;
                                                                                        res.rotation = 90;
                                                                                        res.x = 160;
                                                                                        res.y = 850;
                                                                                        self.room.addChild(res);
                                                                                       //改变显示分数
                                                                                       console.log(self.room)
                                                                                       console.log(self.room.$children[1].$children[3]['text'])
                                                                                        self.room.$children[1].$children[3]['text'] = (parseInt(self.room.$children[1].$children[3]['text']) + self.finRes(data.result,2)*self.rate).toString();
                                                                                        self.room.$children[3].$children[3].$children[0]['text'] = self.room.$children[1].$children[3]['text'];
                                                                                        self.room.$children[4].$children[3].$children[0]['text'] = (parseInt(self.room.$children[4].$children[3].$children[0]['text']) + self.finRes(data.result,1)*self.rate).toString();
                                                                                        self.room.$children[5].$children[3].$children[0]['text'] = (parseInt(self.room.$children[5].$children[3].$children[0]['text']) + self.finRes(data.result,0)*self.rate).toString();
                                                                                        self.gold = self.room.$children[1].$children[3]['text'];
                                                                                        
                                                                                         //奖扣优点
                                                                                        if(self.showResult(data.result,2).res>0){
                                                                                            self.tool.ajax(
                                                                                                'http://testapi.yiuxiu.com/Game/RewardYouDian',
                                                                                            'UserId='+self.userId+'&num='+self.showResult(data.result,2).res*self.rate+'&GameName=拼图',
                                                                                                function success(e:egret.Event):void{
                                                                                                    var request = <egret.HttpRequest>e.currentTarget;
                                                                                                        const data  = JSON.parse(request.response);        
                                                                                                        if(data.code == "000000"){
                                                                                                            console.log('成功')
                                                                                                        }
                                                                                                },
                                                                                                function error():void{
                                                                                                    console.log('失败')
                                                                                                },)
                                                                                        }else if(self.showResult(data.result,2).res<0){
                                                                                            self.tool.ajax(
                                                                                                'http://testapi.yiuxiu.com/Game/SubtractYouDian',
                                                                                            'UserID='+self.userId+'&num='+Math.abs(self.showResult(data.result,2).res*self.rate)+'&GameName=拼图',
                                                                                                function success(e:egret.Event):void{
                                                                                                    var request = <egret.HttpRequest>e.currentTarget;
                                                                                                        const data  = JSON.parse(request.response);        
                                                                                                        if(data.code == "000000"){
                                                                                                            console.log('成功')
                                                                                                        }
                                                                                                },
                                                                                                function error():void{
                                                                                                    console.log('失败')
                                                                                                },)   
                                                                                        }
                                                                                        //加减分动画
                                                                                        let resAni = new eui.Label();
                                                                                        if(self.showResult(data.result,2).res>0){
                                                                                            resAni.text = '+'+self.showResult(data.result,2).res*self.rate;
                                                                                        }else if(self.showResult(data.result,2).res<0){
                                                                                            resAni.text = ''+self.showResult(data.result,2).res*self.rate;
                                                                                        }
                                                                                        
                                                                                        resAni.rotation = 90;
                                                                                        resAni.x = 160;
                                                                                        resAni.y = 150;
                                                                                        self.room.addChild(resAni);
                                                                                        var t2 = egret.Tween.get(resAni);
                                                                                        t2.to({x:260},6000).call(function(){
                                                                                            self.room.removeChild(resAni);
                                                                                            self.room.removeChild(pf1)
                                                                                            self.room.removeChild(pf2)
                                                                                            self.room.removeChild(pf3)
                                                                                            self.room.removeChild(res)
                                                                                            self.room.removeChild(self.nextReadyC)
                                                                                            self.room.removeChild(self.prevReadyC)
                                                                                            self.room.removeChild(self.readyCompare);
                                                                                            //比牌结束，发送可以清除桌面指令
                                                                                            
                                                                                            console.log('这是7')
                                                                                            /*后台修改房间座位玩家的优点,以免再次进入显示之前的优点*/
                                                                                            self.socket.emit('changeGold',{deskNo:self.deskNo,p1:self.room.$children[5].$children[3].$children[0]['text'],p2:self.room.$children[4].$children[3].$children[0]['text'],p3:self.room.$children[3].$children[3].$children[0]['text']})
                                                                                            self.socket.emit('clearDesk',{deskNo:self.deskNo,mySeatNo:self.seatNo})
                                                                                            self.isGaming = false;
                                                                                        })
                                                                                    })
                                                                                })
                                                                        })    
                                                                    })
                                                                })
                                                        })
                                                // }
                                            })
                                        })
                                })
                            // }
                            break;
                    }

                })
            
        })
        /*金币不够*/
        this.socket.on('shotOff',()=>{
            console.log('该你离开了')
            this.leave();
        })
        /*接收房间里的聊天信息*/
        this.socket.on('roomChats',(data)=>{
            var self = this;
            if(data.curNo == this.seatNo){
                var aa = this.tool.showChat(data.mes,0);
                this.addChild(aa) 
               setTimeout(function(){
                    self.removeChild(aa)
                },2000)  
                
            }else if(data.curNo == this.prevNo){
               var aa2 = this.tool.showChat(data.mes,2);
               
                this.addChild(aa2) 
                setTimeout(function(){
                    self.removeChild(aa2)
                },2000)  
            }else{
                var aa1 = this.tool.showChat(data.mes,1); 
                            
                this.addChild(aa1)
                setTimeout(function(){
                    self.removeChild(aa1)
                },2000)             
            }
        })
    };

    /*总分结果*/
    private finRes(data,n):any{
        let r:number = 0;
        for(var j=0;j<data[n].length;j++){
            for(var b=0;b<data[n][j].length;b++){
                r += data[n][j][b];
            }
        }
        return r;
    }
    /*每墩比牌积分结果*/
    private showResult(data,x):any{
        let n:number = 0;
        let m:string = '';
        let r:number = 0;
        switch(this.seatNo){
            case 'p1':
                for(var i=0;i<data[0][x].length;i++){
                    n += data[0][x][i];
                }
                for(var j=0;j<data[0].length;j++){
                    for(var b=0;b<data[0][j].length;b++){
                        r += data[0][j][b];
                    }
                }
                m = '第'+ (x+1) +'墩  '+n;
                break;
            case 'p2':
                for(var i=0;i<data[1][x].length;i++){
                    n += data[1][x][i];
                }
                for(var j=0;j<data[1].length;j++){
                    for(var b=0;b<data[1][j].length;b++){
                        r += data[1][j][b];
                    }
                }
                m = '第'+ (x+1) +'墩  '+n;
                break;
            case 'p3':
                for(var i=0;i<data[2][x].length;i++){
                    n += data[2][x][i];
                }
                for(var j=0;j<data[2].length;j++){
                    for(var b=0;b<data[2][j].length;b++){
                        r += data[2][j][b];
                    }
                }
                m = '第'+ (x+1) +'墩  '+ n;
                break;
        }
        return {text:m,res:r}
    }

    /*点击出牌方式*/
    private waysTap(e:egret.TouchEvent):void{
        for(let i=0;i<13;i++){
            if(this.firstCardList.$children.length){
                this.firstCardList.removeChild(this.firstCardList.$children[0])
            }
        }
        console.log(this.firstCardList.$children.length)
        if(this.hasFC){
            this.chooseCardScreen.removeChild(this.firstCardList)
            this.hasFC = false;
        }
        this.playBtn = new eui.Button();
        this.playBtn.width = 150;
        this.playBtn.height = 60;
        this.playBtn.x = 150;
        this.playBtn.y = 500;
        let playBtnBg  = new egret.Shape();
        playBtnBg.graphics.beginFill(0x72c753);
        playBtnBg.graphics.drawRoundRect(0,0,150,60,30,30);
        let playBtnlabel = new eui.Label();
        playBtnlabel.width = 150;
        playBtnlabel.height = 60;
        playBtnlabel.textAlign = 'center';
        playBtnlabel.verticalAlign = 'middle';
        playBtnlabel.text = '出牌';
        this.playBtn.rotation = 90;
        this.playBtn.addChild(playBtnBg);
        this.playBtn.addChild(playBtnlabel);
        this.playBtn.addEventListener(egret.TouchEvent.TOUCH_TAP,this.playTap,this);
        this.chooseCardScreen.addChild(this.playBtn);

        /*记录当前点击的哪种出牌方式*/
        this.wNum = e.$currentTarget.num;

        for(var i=0;i<3;i++){
            var str = '';
            for(let j=0;j<this.cardsInfo.length;j++){
                if(this.ways[e.$currentTarget.num][2].length==4){
                    if(this.cardsInfo[j].val == this.ways[e.$currentTarget.num][2][i+1]){
                        str = this.cardsInfo[j].url;
                    }
                }else{
                    if(this.cardsInfo[j].val == this.ways[e.$currentTarget.num][2][i]){
                        str = this.cardsInfo[j].url;
                    }
                }
            }
            console.log(str)
            var c = this.tool.createBitmapByName(str);
            c.x = 130+105*i;
            c.y = 2;
            c.width = 100;
            c.height = 126;
            this.cardArray.addChild(c)
        }
        for(var i=0;i<5;i++){
            var str = '';
            for(let j=0;j<this.cardsInfo.length;j++){
                if(this.ways[e.$currentTarget.num][1].length==6){
                    if(this.cardsInfo[j].val == this.ways[e.$currentTarget.num][1][i+1]){
                        str = this.cardsInfo[j].url;
                    }
                }else{
                    if(this.cardsInfo[j].val == this.ways[e.$currentTarget.num][1][i]){
                        str = this.cardsInfo[j].url;
                    }
                }
                
            }
            
            var c = this.tool.createBitmapByName(str); 
            c.x = 130+105*i;
            c.y = 132;
            c.width = 100;
            c.height = 126;
            this.cardArray.addChild(c)            
        }
        for(var i=0;i<5;i++){
            var str = '';
            for(let j=0;j<this.cardsInfo.length;j++){
                if(this.cardsInfo[j].val == this.ways[e.$currentTarget.num][0][i+1]){
                    str = this.cardsInfo[j].url;
                }
            }
            
            var c = this.tool.createBitmapByName(str); 
            c.x = 130+105*i;
            c.y = 262;
            c.width = 100;
            c.height = 126;
            this.cardArray.addChild(c)            
        }
    }
    /*播放声音函数*/
    private playSound(x:number):void{
        switch(x){
            case 0:
            this.tool.getSound('resource/assets/Sound/wulong.mp3',1,0);
            break;
            case 1:
            this.tool.getSound('resource/assets/Sound/duizi.mp3',1,0);
            break;
            case 2:
            this.tool.getSound('resource/assets/Sound/liangdui.mp3',1,0);
            break;
            case 3:
            this.tool.getSound('resource/assets/Sound/santiao.mp3',1,0);
            break;
            case 4:
            this.tool.getSound('resource/assets/Sound/shunzi.mp3',1,0);
            break;
            case 5:
            this.tool.getSound('resource/assets/Sound/tonghua.mp3',1,0);
            break;
            case 6:
            this.tool.getSound('resource/assets/Sound/hulu.mp3',1,0);
            break;
            case 7:
            this.tool.getSound('resource/assets/Sound/zhadan.mp3',1,0);
            break;
            case 8:
            this.tool.getSound('resource/assets/Sound/tonghuashun.mp3',1,0);
            break;
        }
    }
    /*点击出牌*/
    private playTap(e:egret.TouchEvent):void{
        this.timer.stop();  
        for(let i=0;i<13;i++){
            if(this.firstCardList.$children.length){
                this.firstCardList.removeChild(this.firstCardList.$children[0])
            }
        }
        console.log('一次')
        this.hasFC = true;
        this.socket.emit('wNum',{n:this.wNum,deskNo:this.deskNo,mySeatNo:this.seatNo})
        
        this.num = 20;
        
        this.removeChild(this.chooseCardScreen);
        this.readyCompare.width = 500;
        this.readyCompare.height = 226;
        
        /*三墩准备比的牌，分别用容器装起*/
        this.oneCompare.width = 500;
        this.oneCompare.height = 126;
        this.twoCompare.width = 500;
        this.twoCompare.height = 126;
        this.threeCompare.width = 500;
        this.threeCompare.height = 126;
        
        
        for(var i=0;i<3;i++){
            var str = '';
            for(let j=0;j<this.cardsInfo.length;j++){
                if(this.ways[this.wNum][2].length==4){
                    if(this.cardsInfo[j].val == this.ways[this.wNum][2][i+1]){
                        str = this.cardsInfo[j].url;
                    }
                }else{
                    if(this.cardsInfo[j].val == this.ways[this.wNum][2][i]){
                        str = this.cardsInfo[j].url;
                    }
                }
            }
            
            var c = this.tool.createBitmapByName(str);
            c.x = 180+50*i;
            c.y = 2;
            c.width = 60;
            c.height = 80;
            
            this.oneCompare.addChild(c)
        }
        for(var i=0;i<5;i++){
            var str = '';
            for(let j=0;j<this.cardsInfo.length;j++){
                if(this.ways[this.wNum][1].length==6){
                    if(this.cardsInfo[j].val == this.ways[this.wNum][1][i+1]){
                        str = this.cardsInfo[j].url;
                    }
                }else{
                    if(this.cardsInfo[j].val == this.ways[this.wNum][1][i]){
                        str = this.cardsInfo[j].url;
                    }
                }
                
            }
            
            var c = this.tool.createBitmapByName(str); 
            c.x = 130+50*i;
            c.y = 60;
            c.width = 60;
            c.height = 80;
            this.twoCompare.addChild(c)            
        }
        for(var i=0;i<5;i++){
            var str = '';
            for(let j=0;j<this.cardsInfo.length;j++){
                if(this.cardsInfo[j].val == this.ways[this.wNum][0][i+1]){
                    str = this.cardsInfo[j].url;
                }
            }
            
            var c = this.tool.createBitmapByName(str); 
            c.x = 130+50*i;
            c.y = 120;
            c.width = 60;
            c.height = 80;
            this.threeCompare.addChild(c)            
        }

        this.readyCompare.addChild(this.oneCompare);
        this.readyCompare.addChild(this.twoCompare);
        this.readyCompare.addChild(this.threeCompare);
        this.readyCompare.rotation = 90;
        this.readyCompare.x = 264;
        this.readyCompare.y = 100;
        this.room.addChild(this.readyCompare);
    }

    /*快速开始*/
    private start():void{
        if(parseInt(this.gold)<100){
            return
        }
        this.removeChild(this.roomChoose);
        this.addChild(this.room);
        console.log(this.gold)
        this.socket.emit('enterRoom',{userId:this.userId,sex:this.sex,username:this.username,useravatar:this.userAvatar,gold:this.gold,roomType:1});
        
    }

    /*进入房间*/
    private enterRoom(e:egret.TouchEvent):void{


        switch(e.currentTarget.role){
            case 1:
            if(parseInt(this.gold)<100){return;}
            this.socket.emit('enterRoom',{userId:this.userId,sex:this.sex,username:this.username,useravatar:this.userAvatar,gold:this.gold,roomType:1});
            break;
            case 2:
            if(parseInt(this.gold)<500){return;}
            this.socket.emit('enterRoom',{userId:this.userId,sex:this.sex,username:this.username,useravatar:this.userAvatar,gold:this.gold,roomType:2});
            break;
            case 3:
            if(parseInt(this.gold)<4000){return;}
            this.socket.emit('enterRoom',{userId:this.userId,sex:this.sex,username:this.username,useravatar:this.userAvatar,gold:this.gold,roomType:3});
            break;
            case 4:
            if(parseInt(this.gold)<20000){return;}
            this.socket.emit('enterRoom',{userId:this.userId,sex:this.sex,username:this.username,useravatar:this.userAvatar,gold:this.gold,roomType:4});
            break;
        }
        this.removeChild(this.roomChoose);
        this.addChild(this.room);
    }
    /*离开房间*/
    private leave():void{
        console.log('开',this.isGaming)
        if(this.isGaming){
            return;
        }else{
            console.log('离')
            this.socket.emit('leaveRoom',{deskNo:this.deskNo,mySeatNo:this.seatNo});
            this.room.removeChild(this.playerMine);
            this.removeChild(this.room);
            this.addChild(this.roomChoose);
            
        }
        
    }
    /*计时器*/
    private timerFunc():void{
        this.timerBg.label = (this.num-1).toString();
        this.num-=1;
    }
    // private timerComFunc():void{
    //     this.cardArray.removeChild(this.timerBg);
    //     this.num = 20;
    //     this.removeChild(this.chooseCardScreen);
        
    // }
    
    /*接收当前舞台高度*/
    public getCurHeight(e:sendHeight):void{
        this.stageHeight = e.height;
        this.myInfo.y = e.height -200;
    }



    /*触摸牌结束*/
    // private card_touchEnd(e:egret.TouchEvent):void{
        
    //     this.changeMove = false;                 
    // }
    /*触摸牌*/
    // private card_touchMove(e:egret.TouchEvent):void{
    //     var self = this;
    //     var cardMask = this.tool.createCardMask();
    //     console.log(e.currentTarget.isMoved);
    //     if(e.currentTarget.isMoved&&this.changeMove){
    //         return;
    //     }else{            
    //         if(e.currentTarget.isSelected){
    //             e.currentTarget.x -= Math.sin(e.currentTarget.rotation*Math.PI/180)*20;
    //             e.currentTarget.y += Math.cos(e.currentTarget.rotation*Math.PI/180)*20;
    //             e.currentTarget.isSelected = false;
                
    //             e.currentTarget.removeChild(e.currentTarget.$children[1])
    //         }else{
    //             e.currentTarget.x += Math.sin(e.currentTarget.rotation*Math.PI/180)*20;
    //             e.currentTarget.y -= Math.cos(e.currentTarget.rotation*Math.PI/180)*20;
    //             e.currentTarget.isSelected = true;
    //             e.currentTarget.isMoved = true;
                


    //             e.currentTarget.addChild(cardMask);
    //         } 
    //     }       
    // }

    /*点击牌*/
    // private card_tap(e:egret.TouchEvent):void{
    //     this.tool.getSound('resource/assets/Sound/s004.mp3',1,0);
    //     var cardMask = this.tool.createCardMask();
    //     if(e.currentTarget.isSelected){
    //         e.currentTarget.x -= Math.sin(e.currentTarget.rotation*Math.PI/180)*20;
    //         e.currentTarget.y += Math.cos(e.currentTarget.rotation*Math.PI/180)*20;
    //         e.currentTarget.isSelected = false;
    //         e.currentTarget.removeChild(e.currentTarget.$children[1])
    //         console.log(e.currentTarget.$children)
    //     }else{
    //         e.currentTarget.x += Math.sin(e.currentTarget.rotation*Math.PI/180)*20;
    //         e.currentTarget.y -= Math.cos(e.currentTarget.rotation*Math.PI/180)*20;
    //         e.currentTarget.isSelected = true;
    //         e.currentTarget.addChild(cardMask);
    //     }

    //     console.log(e.currentTarget.x,e.currentTarget.y);
        
    // }


    /*获取到信息*/
    public thirteen_Tap():void{
        var self = this;
        this.userId = location.hash.split('#')[1]; 
        this.tool.ajax(
            'http://testapi.yiuxiu.com/User/GetUserInfoByUID',
            'UserId='+this.userId,
            function success(event:egret.Event):void{
                let request = <egret.HttpRequest>event.currentTarget;
                const data = JSON.parse(request.response);
                console.log(data)
                self.sex = data.data.Sex;                
                self.userAvatar = data.data.FaceImg;
                self.username = data.data.NickName;
                self.gold = data.data.Integral;

                self.roomGoldNum.text = data.data.Integral.toString();
                
            },
            function error():void{}
        )
            //  this.sex = e.sex;
            //  this.userId = e.userId;
            //  this.userAvatar = e.userAvatar;
            //  this.username = e.username;
            //  this.gold = e.gold;
            //  this.roomGoldNum.text = e.gold.toString();
        /*我的信息*/
        /*头像*/
        this.myFrame.graphics.lineStyle(1,0x915b00);
        this.myFrame.graphics.drawRoundRect(5,5,80,80,20,20);
        this.myFrame.x = 100;
       
        const myavatarImg:egret.Bitmap =  this.tool.createBitmapByUrl(this.userAvatar);   
        myavatarImg.x = 110;
        myavatarImg.y = 10; 
        myavatarImg.width = 70;
        myavatarImg.height = 70;
        
        this.myInfo.x = 90;
        // this.myInfo.y = 880;
        this.myInfo.rotation = 90;
        this.myInfo.width = 200;
        this.myInfo.height = 90;
        this.myInfo.addChild(this.myFrame);
        this.myInfo.addChild(myavatarImg);
        this.head.addChild(this.myInfo)        

       /*获取到username sex*/ 
        this.myNameGroup.x = -100;
        this.myNameGroup.y = 0;
        this.myNameGroup.width = 200;
        this.myNameGroup.height = 30;
        

        if(this.sex==1){
            this.sexImg = this.tool.createBitmapByName('show_json.boy')
        }else{
            this.sexImg = this.tool.createBitmapByName('show_json.girl')  
        }
        this.sexImg.x = 160;
        this.sexImg.y = 0;
        this.sexImg.width = 30;
        this.sexImg.height = 30;


        this.myname.x = -50;
        this.myname.y = 10;
        this.myname.width = 200;
        this.myname.text = this.username;
        this.myname.textAlign = 'right';

        this.myNameGroup.addChild(this.myname);
        this.myNameGroup.addChild(this.sexImg);
        this.myInfo.addChild(this.myNameGroup);

        
        this.myGoldGroup.x = -100;
        this.myGoldGroup.y = 50;
        this.myGoldGroup.width = 200;
        this.myGoldGroup.height = 30;

        let goldImg:egret.Bitmap = this.tool.createBitmapByName('show_json.money')
        goldImg.x = 160;
        goldImg.y = 0;
        goldImg.width = 30;
        goldImg.height = 30; 

        let goldNum:egret.TextField = new egret.TextField();
        goldNum.x = -50;
        goldNum.y = 5;
        goldNum.text = this.gold;
        goldNum.textAlign = "right";
        goldNum.width = 200;

        this.myGoldGroup.addChild(goldNum);
        this.myGoldGroup.addChild(goldImg);
        this.myInfo.addChild(this.myGoldGroup);
             
        
        
    }


 

    /*返回按钮点击*/
    private returnMain():void{
        this.thirteen_Tap()

    }

    /*发送返回指令到首页*/
    private order(code:number,newName:string,newSex:number):void{
        var senderEvent:sendCloseInfo = new sendCloseInfo(sendCloseInfo.is_return);
        senderEvent.code = code;
        senderEvent.newSex = newSex;
        senderEvent.newName = newName;
        this.dispatchEvent(senderEvent);
    }
    /*发送事件给mine，入口*/
    private order1(n:number,userId:string,userAvatar:string,sex:number,username:string,gold:string):void{
        const senderEventMain:sendEvent = new sendEvent(sendEvent.is_ok);
        senderEventMain.code = n;
        senderEventMain.userId = userId;
        senderEventMain.userAvatar = userAvatar;
        senderEventMain.sex = sex;
        senderEventMain.username = username;
        senderEventMain.gold = gold;
        this.dispatchEvent(senderEventMain);
    }


}    