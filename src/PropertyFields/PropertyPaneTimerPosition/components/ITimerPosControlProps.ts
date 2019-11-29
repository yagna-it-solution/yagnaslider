export interface ITimerPosControlProps{
    label: string;
    onChanged: (timerPos: string) => void;
    selectedKey: string;
}