export interface IShowTimerControlProps{
    label: string;
    selectedKey: boolean;
    onChanged: (value: boolean) => void;
    disabled: boolean;
}