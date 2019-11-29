import { PageContext } from "@microsoft/sp-page-context";
import { IDropdownOption } from "office-ui-fabric-react";

export interface ISlidesControlProps{
    label: string;
    addButtonText: string;
    sliderId: string;
    selectedSlides: any[];
    onChanged: (slides: any[]) => void;
    disabled: boolean;
    ctx: PageContext;
}