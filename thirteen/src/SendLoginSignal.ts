class sendEvent extends egret.Event {

    public static is_ok:string = 'confirm';
    public code:number;
    public userId:string;
    public userAvatar:string;
    public sex:number;
    public username:string;
    public gold:string;


    public constructor(type:string,bubbles:boolean=false,cancelable:boolean=false){
        super(type,bubbles,cancelable);
    }
}