class sendLandEvent extends egret.Event {

    public static enterLand:string = 'confirm';
    public code:number;//1为加入斗地主页面,0为个人中心//2为十三张
    public userId:string;
    public userAvatar:string;
    public sex:number;
    public username:string;
    public gold:string;


    public constructor(type:string,bubbles:boolean=false,cancelable:boolean=false){
        super(type,bubbles,cancelable);
    }
}