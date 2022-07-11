//offer schema for Offer Object
export class Offer{
    constructor(
        public offerId:number,
        public name:string,
        public details:string,
        public category:string,
        public openedDate:Date,
        public engagedDate:Date,
        public closedDate:Date,
        public likes:number
    ){}
}