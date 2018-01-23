class sendHeight extends egret.Event{
    public static curHeight:string = '当前舞台高度';
    public height:number;
    public constructor(type:string,bubbles:boolean = false,cancelable:boolean = false) {
        super(type,bubbles,cancelable)
    }
}