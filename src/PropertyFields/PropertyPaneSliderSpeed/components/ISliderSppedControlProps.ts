export interface ISliderSpeedControlProps{
    label: string;
    selectedSpeed: number;
    onChanged: (speed: number) => void;
    disabled: boolean;
}