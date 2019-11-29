export interface IBackgroundOverlaySwitchProps{
    label: string;
    selectedKey: boolean;
    onChanged: (value: boolean) => void;
}