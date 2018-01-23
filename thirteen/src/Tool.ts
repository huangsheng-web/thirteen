class Tool extends eui.UILayer {
    /**封装ajax */
     public ajax(url:string,data:string,success:any,error:any):void{
       var request = new egret.HttpRequest(); 
       var  dataType = 'json';
       var async = 'true';
       request.open(url,egret.HttpMethod.POST);
       request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
       request.send(data);
       request.addEventListener(egret.Event.COMPLETE,success,this);
       request.addEventListener(egret.IOErrorEvent.IO_ERROR,error,this);

    }
        /*获取用户ID*/
     public getRequest():any {
        var url = location.search; //获取url中"?"符后的字串
        var theRequest = new Object();
        if (url.indexOf("?") != -1) {
            var str = url.substr(1);
            var strs = str.split("&");
            for(var i = 0; i < strs.length; i ++) {
                theRequest[strs[i].split("=")[0]]=strs[i].split("=")[1];
            }
        }
        return theRequest
     } 
     /*获取声音*/
     private n:number;
     private s:number;
     private soundChannel:egret.SoundChannel;
     public getSound(url:string,times:number,stop:number):any{
         var sound = new egret.Sound();
         this.n = times;
         this.s = stop;
         sound.addEventListener(egret.Event.COMPLETE,this.onloadComplete,this);
         sound.load(url)
     }
     private onloadComplete(event:egret.Event):void{
          var channel:egret.Sound = <egret.Sound>event.target;         
          if(this.s ==0){
          this.soundChannel =  channel.play(0,this.n);
              
          }else{
              this.soundChannel.stop();
              this.soundChannel = null;
          }          
     }
     /*创建bitmap*/
    public createBitmapByName(name: string): egret.Bitmap {
        let result = new egret.Bitmap();
        let texture: egret.Texture = RES.getRes(name);
        result.texture = texture;
        return result;
    }
    /*非本地图片*/
    public createBitmapByUrl(url: string): egret.Bitmap {
        let result = new egret.Bitmap();
        RES.getResByUrl(url, function (texture:egret.Texture) {
            result.texture = texture;
        }, this, RES.ResourceItem.TYPE_IMAGE);

        return result;
    }    
    /*创建一个好友信息*/
    public createFirend(url:string,sex:number,username:string,gold:string):eui.Group {
        let userGroup:eui.Group = new eui.Group();
        let myFrame:egret.Shape = new egret.Shape();
        let myNameGroup:eui.Group = new eui.Group();//性别 姓名
        let myGoldGroup:eui.Group = new eui.Group();//金币   
        let sexImg:egret.Bitmap;//性别图片
        let myname:egret.TextField = new egret.TextField();//我的名字             
        myFrame.graphics.lineStyle(1,0x915b00);
        myFrame.graphics.drawRoundRect(0,0,50,50,20,20);
        myFrame.x = 50;
       
        const myavatarImg:egret.Bitmap =  this.createBitmapByUrl(url);   
        myavatarImg.x = 55;
        myavatarImg.y = 5; 
        myavatarImg.width = 40;
        myavatarImg.height = 40;
        
        userGroup.x = 40;
        userGroup.y = 370;
        userGroup.width = 600;
        userGroup.height = 50;
        userGroup.addChild(myFrame);
        userGroup.addChild(myavatarImg);       

       /*获取到username sex*/ 
        myNameGroup.x = 180;
        myNameGroup.y = 10;
        myNameGroup.width = 200;
        myNameGroup.height = 40;
        

        if(sex==1){
            sexImg = this.createBitmapByName('show_json.boy')
        }else{
            sexImg = this.createBitmapByName('show_json.girl')  
        }
        sexImg.x = 0;
        sexImg.y = 0;
        sexImg.width = 40;
        sexImg.height = 40;


        myname.x = 50;
        myname.y = 5;
        myname.text = username;
        myNameGroup.addChild(myname);
        myNameGroup.addChild(sexImg);
        userGroup.addChild(myNameGroup);

        
        myGoldGroup.x = 350;
        myGoldGroup.y = 10;
        myGoldGroup.width = 200;
        myGoldGroup.height = 40;

        let goldImg:egret.Bitmap = this.createBitmapByName('show_json.money')
        goldImg.x = 0;
        goldImg.y = 0;
        goldImg.width = 40;
        goldImg.height = 40; 

        let goldNum:egret.TextField = new egret.TextField();
        goldNum.x = 50;
        goldNum.y = 5;
        goldNum.text = gold;
        
        myGoldGroup.addChild(goldNum);
        myGoldGroup.addChild(goldImg);
        userGroup.addChild(myGoldGroup);       
        
        
        return userGroup;
    }
    /*创建上一个玩家信息*/
    public createPrevUser(url:string,sex:number,username:string,gold:string):eui.Group {
        let prevUser:eui.Group = new eui.Group();
        let myFrame:egret.Shape = new egret.Shape();
        let myNameGroup:eui.Group = new eui.Group();//性别 姓名
        let myGoldGroup:eui.Group = new eui.Group();//金币   
        let sexImg:egret.Bitmap;//性别图片
        let myname:egret.TextField = new egret.TextField();//我的名字             
           /*头像*/

        // myFrame.graphics.lineStyle(1,0x915b00);
        // myFrame.graphics.drawRoundRect(5,5,90,90,20,20);
       
        const myavatarImg:egret.Bitmap =  this.createBitmapByUrl(url);   
        myavatarImg.x = 10;
        myavatarImg.y = 10; 
        myavatarImg.width = 80;
        myavatarImg.height = 80;
        
        prevUser.x = 0;
        prevUser.y = 47;
        prevUser.width = 320;
        prevUser.height = 100;
        // prevUser.addChild(myFrame);
        prevUser.addChild(myavatarImg);       

       /*获取到username sex*/
        
        myNameGroup.x = 110;
        myNameGroup.y = 5;
        myNameGroup.width = 210;
        myNameGroup.height = 40;
        

        if(sex==1){
            sexImg = this.createBitmapByName('show_json.boy')
        }else{
            sexImg = this.createBitmapByName('show_json.girl')  
        }
        sexImg.x = 0;
        sexImg.y = 0;
        sexImg.width = 40;
        sexImg.height = 40;

        myname.x = 50;
        myname.y = 5;
        myname.width = 160;
        myname.text = username;

        myNameGroup.addChild(myname);
        myNameGroup.addChild(sexImg);
        prevUser.addChild(myNameGroup);

        
        myGoldGroup.x = 110;
        myGoldGroup.y = 50;
        myGoldGroup.width = 210;
        myGoldGroup.height = 40;

        let goldImg:egret.Bitmap = this.createBitmapByName('show_json.money')
        goldImg.x = 0;
        goldImg.y = 0;
        goldImg.width = 40;
        goldImg.height = 40; 

        let goldNum:egret.TextField = new egret.TextField();
        goldNum.x = 50;
        goldNum.y = 5;
        goldNum.width = 160;
        goldNum.text = gold;

        
        myGoldGroup.addChild(goldNum);
        myGoldGroup.addChild(goldImg);
        prevUser.addChild(myGoldGroup);
        
        return prevUser;
    }
    /*创建下一个玩家信息*/
    public createNextUser(url:string,sex:number,username:string,gold:string):eui.Group {
        let nextUser:eui.Group = new eui.Group();
        let myFrame:egret.Shape = new egret.Shape();
        let myNameGroup:eui.Group = new eui.Group();//性别 姓名
        let myGoldGroup:eui.Group = new eui.Group();//金币   
        let sexImg:egret.Bitmap;//性别图片
        let myname:egret.TextField = new egret.TextField();//我的名字             
           /*头像*/

        // myFrame.graphics.lineStyle(1,0x915b00);
        // myFrame.graphics.drawRoundRect(5,5,90,90,20,20);
       
        const myavatarImg:egret.Bitmap =  this.createBitmapByUrl(url);   
        myavatarImg.x = 230;
        myavatarImg.y = 10; 
        myavatarImg.width = 80;
        myavatarImg.height = 80;
        
        nextUser.x = 320;
        nextUser.y = 47;
        nextUser.width = 320;
        nextUser.height = 100;
        // nextUser.addChild(myFrame);
        nextUser.addChild(myavatarImg);       

       /*获取到username sex*/
        
        myNameGroup.x = 0;
        myNameGroup.y = 5;
        myNameGroup.width = 210;
        myNameGroup.height = 40;
        

        if(sex==1){
            sexImg = this.createBitmapByName('show_json.boy')
        }else{
            sexImg = this.createBitmapByName('show_json.girl')  
        }
        sexImg.x = 180;
        sexImg.y = 0;
        sexImg.width = 40;
        sexImg.height = 40;


        myname.x = 0;
        myname.y = 5;
        myname.text = username;
        myname.textAlign = 'right';
        myname.width = 160;
        myNameGroup.addChild(myname);
        myNameGroup.addChild(sexImg);
        nextUser.addChild(myNameGroup);

        
        myGoldGroup.x = 0;
        myGoldGroup.y = 50;
        myGoldGroup.width = 210;
        myGoldGroup.height = 40;

        let goldImg:egret.Bitmap = this.createBitmapByName('show_json.money')
        goldImg.x = 180;
        goldImg.y = 0;
        goldImg.width = 40;
        goldImg.height = 40; 

        let goldNum:egret.TextField = new egret.TextField();
        goldNum.x = 0;
        goldNum.y = 5;
        goldNum.text = gold;
        goldNum.textAlign = 'right';
        goldNum.width = 160;
        
        myGoldGroup.addChild(goldNum);
        myGoldGroup.addChild(goldImg);
        nextUser.addChild(myGoldGroup);
        
        return nextUser;
    }    
    /*创建一个玩家自己*/
    public createUserMine(url:string,sex:number,username:string,gold:string):eui.Group {
        let curMine:eui.Group = new eui.Group();
        let myFrame:egret.Shape = new egret.Shape();
        let myNameGroup:eui.Group = new eui.Group();//性别 姓名
        let myGoldGroup:eui.Group = new eui.Group();//金币   
        let sexImg:egret.Bitmap;//性别图片
        let myname:egret.TextField = new egret.TextField();//我的名字             
           /*头像*/

        myFrame.graphics.lineStyle(1,0x915b00);
        myFrame.graphics.drawRoundRect(5,5,90,90,20,20);
        myFrame.x = 50;
       
        const myavatarImg:egret.Bitmap =  this.createBitmapByUrl(url);   
        myavatarImg.x = 60;
        myavatarImg.y = 10; 
        myavatarImg.width = 80;
        myavatarImg.height = 80;
        
        curMine.x = 213;
        curMine.y = 750;
        curMine.width = 200;
        curMine.height = 200;
        curMine.addChild(myFrame);
        curMine.addChild(myavatarImg);       

       /*获取到username sex*/
        
        myNameGroup.x = 0;
        myNameGroup.y = 110;
        myNameGroup.width = 200;
        myNameGroup.height = 40;
        

        if(sex==1){
            sexImg = this.createBitmapByName('show_json.boy')
        }else{
            sexImg = this.createBitmapByName('show_json.girl')  
        }
        sexImg.x = 0;
        sexImg.y = 0;
        sexImg.width = 40;
        sexImg.height = 40;


        myname.x = 50;
        myname.y = 5;
        myname.text = username;
        myNameGroup.addChild(myname);
        myNameGroup.addChild(sexImg);
        curMine.addChild(myNameGroup);

        
        myGoldGroup.x = 0;
        myGoldGroup.y = 160;
        myGoldGroup.width = 200;
        myGoldGroup.height = 40;

        let goldImg:egret.Bitmap = this.createBitmapByName('show_json.money')
        goldImg.x = 0;
        goldImg.y = 0;
        goldImg.width = 40;
        goldImg.height = 40; 

        let goldNum:egret.TextField = new egret.TextField();
        goldNum.x = 50;
        goldNum.y = 5;
        goldNum.text = gold;
        
        myGoldGroup.addChild(goldNum);
        myGoldGroup.addChild(goldImg);
        curMine.addChild(myGoldGroup);
        
        return curMine;
    }   
    /*创建一个十三张玩家*/
    public createThirteenPlayer(url:string,username:string,gold:string,type:number):eui.Group {
        let curMine:eui.Group = new eui.Group();
        let myFrame:egret.Shape = new egret.Shape();
        let myNameGroup:eui.Group = new eui.Group();//性别 姓名
        let myGoldGroup:eui.Group = new eui.Group();//金币   
        let myname:egret.TextField = new egret.TextField();//我的名字             
           /*头像*/

        myFrame.graphics.lineStyle(1,0x915b00);
        myFrame.graphics.drawRoundRect(5,5,80,80,20,20);
        myFrame.x = 0;
       
        const myavatarImg:egret.Bitmap =  this.createBitmapByUrl(url);   
        myavatarImg.x = 10;
        myavatarImg.y = 10; 
        myavatarImg.width = 70;
        myavatarImg.height = 70;
        /*根据type值判断需要创建的角色，0自己，1上家，2下家*/
       
        switch(type){
            case 0:
            curMine.x = 230;
            curMine.y = 30;  
            break;    
            case 1:
            curMine.x = 640;
            curMine.y = 100;  
            break;   
            case 2:
            curMine.x = 400;
            curMine.y = 936;  
            break;       
        }

        curMine.width = 100;
        curMine.height = 100;
        curMine.addChild(myFrame);
        curMine.addChild(myavatarImg);       

       /*获取到username sex*/
        
        myNameGroup.x = 0;
        myNameGroup.y = 90;
        myNameGroup.width = 200;
        myNameGroup.height = 40;
        


        myname.x = 0;
        myname.y = 5;
        myname.text = username;
        myNameGroup.addChild(myname);
        curMine.addChild(myNameGroup);

        
        myGoldGroup.x = 0;
        myGoldGroup.y = 120;
        myGoldGroup.width = 200;
        myGoldGroup.height = 40;


        let goldNum:egret.TextField = new egret.TextField();
        goldNum.x = 0;
        goldNum.y = 5;
        // goldNum.text = this.createNum(gold.toString());
        goldNum.text = gold.toString();
        
        myGoldGroup.addChild(goldNum);
        curMine.addChild(myGoldGroup);
        curMine.rotation = 90;
        return curMine;
    }         
    /*创建一张牌*/ 
    public createCard(oneCard:any):eui.Group{
        let cardShape:eui.Group = new eui.Group();    
        let card = this.createBitmapByName(oneCard.url);
        card.width = 100;
        card.height = 126;
        cardShape.addChild(card);
        cardShape['type'] = oneCard.type;
        cardShape['val'] = oneCard.val;
        cardShape['isSelected'] = false;
        cardShape['isMoved'] = false;
        cardShape.width = 100;
        cardShape.height = 126;
        return cardShape;
    }
    /*创建一张盖着的牌*/
    public createMaskCard():egret.Bitmap{
          
        let card = this.createBitmapByName('cards_json.hide_card');
        card.width = 100;
        card.height = 126;
        return card;
    }    
    /*创建一个牌的遮罩*/
    public createCardMask():eui.Group{
        let cardShape:eui.Group = new eui.Group();    
        let card = this.createBitmapByName('cards_json.selected_mask');
        card.width = 100;
        card.height = 126;
        cardShape.addChild(card);
        cardShape.width = 100;
        cardShape.height = 126;
        return cardShape;
    }   
    /*创建一个计时器背景*/
    public createTimerBg():eui.Button{
        let timerBg:eui.Button = new eui.Button();
        let timerBgSkin = `<e:Skin class="skins.ButtonSkin" states="up" width="80" height="80" xmlns:e="http://ns.egret.com/eui">
                          <e:Image width="80" height="80" includeIn="up" source="show_json.clock" rotation="-90"/>
                          <e:Label id="labelDisplay" left="22" bottom="106" size="26"/>
                          </e:Skin>`
        timerBg.skinName = timerBgSkin;
        timerBg.label = "20";
        return timerBg;
    } 
    /*把金币超过一千的加,号*/
    public createNum(str:string):string{
        var newStr:string = "";
        var count = 0;
        
        if(str.indexOf(".")==-1){
        for(var i=str.length-1;i>=0;i--){
        if(count % 3 == 0 && count != 0){
        newStr = str.charAt(i) + "," + newStr;
        }else{
        newStr = str.charAt(i) + newStr;
        }
        count++;
        }
        str = newStr;
        
        }
        
        return str;
    }
    /*展示聊天信息*/
    public showChat(mes:string,n:number):eui.Button{
        var chatSkin = `<?xml version="1.0" encoding="utf-8" ?> 
        <e:Skin class="skins.ButtonSkin" xmlns:e="http://ns.egret.com/eui"> 
            <e:Image width="100%" height="100%"  source="show_json.chatBg" />
        </e:Skin>`
        var chat = new eui.Button();
        chat.skinName = chatSkin;
        chat.rotation = 90;

        var chatLabel = new eui.Label();
        chatLabel.text = mes;
        chatLabel.top = 10;
        chatLabel.bottom = 10;
        chatLabel.left = 20;
        chatLabel.right = 20;
        chatLabel.textColor = 0x000000;
        chat.addChild(chatLabel)

        switch(n){
            case 0:
                    chat.x = 320;
                    chat.y = 40;
            break;
            case 1:
                    chat.x = 480;
                    chat.y = 750;
            break;
            case 2:
                    chat.x = 480;
                    chat.y = 100;
            break;
        }
        return chat;
    }
}
