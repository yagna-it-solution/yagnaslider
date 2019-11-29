export interface ISliderHeightProps{
    label: string;
    selectedHeight: number;
    onChanged: (speed: number) => void;
    disabled: boolean; 
}