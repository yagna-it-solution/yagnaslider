import { IDropdownOption } from 'office-ui-fabric-react/lib/components/Dropdown';
export interface INavigationControlProps{
    label: string;
    options: IDropdownOption[];
    selectedNavigation: string;
    onChanged: (navigation: string) => void;
    disabled: boolean;
}