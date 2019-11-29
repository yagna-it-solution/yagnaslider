import { IDropdownOption } from 'office-ui-fabric-react/lib/components/Dropdown';
export interface IContentEffectControlProps{
    label: string;
    options: IDropdownOption[];
    selectedEffect: string;
    onChanged: (effect: string) => void;
    disabled: boolean;
}