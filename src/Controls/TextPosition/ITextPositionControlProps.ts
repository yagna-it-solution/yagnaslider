export interface ITextPositionControlProps{
    label: string;
    topAlignTitle: string;
    centerAlignTitle: string;
    bottomAlignTitle: string;
    selectedAlign: string;
    onChanged: (align: string) => void;
}

export interface ITextPositionControlState{
    leftAlignBackground:string;
    centerAlignBackground:string;
    rightAlignBackground:string;
    leftAlignBorder:string;
    centerAlignBorder:string;
    rightAlignBorder:string;
    leftAlignColor:string;
    centerAlignColor:string;
    rightAlignColor:string;
    selectedAlign: string;
}