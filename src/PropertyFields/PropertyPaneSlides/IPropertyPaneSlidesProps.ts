import { PageContext } from "@microsoft/sp-page-context";
import { IDropdownOption } from "office-ui-fabric-react";
import { SlidesProps } from '../../webparts/yagnaSlider/components/SlidesProps';

export interface IPropertyPaneSlidesProps{
    label: string;
    addButtonText: string;
    sliderId: string;
    selectedSlides: SlidesProps[];
    onPropertyChange: (propertyPath: string, newValue: any[]) => void;
    disabled: boolean;
    ctx: PageContext;
}