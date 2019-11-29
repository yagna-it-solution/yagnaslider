import * as React from 'react';
import * as ReactDom from 'react-dom';
import {
  IPropertyPaneField,
  PropertyPaneFieldType
} from '@microsoft/sp-property-pane';
import { IPropertyPaneSlidesProps } from './IPropertyPaneSlidesProps';
import { IPropertyPaneSlidesInternalProps } from './IPropertyPaneSlidesInternalProps';
import SlidesControl from './components/SlidesControl';
import { ISlidesControlProps } from './components/ISlidesControlProps';

export class PropertyPaneSlides implements IPropertyPaneField<IPropertyPaneSlidesProps> {
    public type: PropertyPaneFieldType = PropertyPaneFieldType.Custom;
    public targetProperty: string;
    public properties: IPropertyPaneSlidesInternalProps;
    private elem: HTMLElement;
    constructor(targetProperty: string, properties: IPropertyPaneSlidesProps) {
        this.targetProperty = targetProperty;
        this.properties = {
            key: properties.label,
            addButtonText: properties.addButtonText,
            ctx: properties.ctx,
            label: properties.label,
            sliderId: properties.sliderId,
            onPropertyChange: properties.onPropertyChange,
            selectedSlides: properties.selectedSlides,
            disabled: properties.disabled,
            onRender: this.onRender.bind(this),
            onDispose: this.onDispose.bind(this)
        };
    }
    
    public render(): void {
        if (!this.elem) {
            return;
        }
    
        this.onRender(this.elem);
    }
      
    private onDispose(element: HTMLElement): void {
        ReactDom.unmountComponentAtNode(element);
    }
    
    private onRender(elem: HTMLElement): void {
        if (!this.elem) {
            this.elem = elem;
        }
    
        const element: React.ReactElement<ISlidesControlProps> = React.createElement(SlidesControl, {
            label: this.properties.label,
            addButtonText: this.properties.addButtonText,
            ctx: this.properties.ctx,
            sliderId: this.properties.sliderId,
            onChanged: this.onChanged.bind(this),
            selectedSlides: this.properties.selectedSlides,
            disabled: this.properties.disabled
        });
        ReactDom.render(element, elem);
    }
    
    private onChanged(slides: any[]): void {
        this.properties.onPropertyChange(this.targetProperty, slides);
        this.properties[this.targetProperty]=slides;
    }    
}