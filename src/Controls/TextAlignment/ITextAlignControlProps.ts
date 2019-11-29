export interface ITextAlignControlProps{
    label: string;
    leftAlignTitle: string;
    centerAlignTitle: string;
    rightAlignTitle: string;
    justifyAlignTitle: string;
    selectedKey: string;
    onChanged: (value: string) => void;
    disabled: boolean;
}