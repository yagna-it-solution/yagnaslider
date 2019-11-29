import { IDropdownOption } from "office-ui-fabric-react";

export interface ITransitionOption extends IDropdownOption{
    duration: number;
    easing: string;
    slicecount?: number;
    rowcount?: number;
    columncount?: number;
    depth?: number;
    scale?: number;
    scaleduration?: number;
    bgcolor?: string;
    perspective?: number;
    fallback?: string;
    scatter?: number;
    perspectiveorigin?: string;
    direction?: number;
}