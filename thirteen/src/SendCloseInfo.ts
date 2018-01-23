class sendCloseInfo extends egret.Event{
    public static is_return:string = "return";
    public code:number;//0代表返回，1代表移除该页面；
    public newName:string;//新名字
    public newSex:number;//新性别
    
    public constructor(type:string,bubbles:boolean=false,cancelable:boolean=false){
        super(type,bubbles,cancelable);
    }
}