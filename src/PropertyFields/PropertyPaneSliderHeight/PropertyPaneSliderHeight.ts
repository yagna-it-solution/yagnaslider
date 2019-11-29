import * as React from 'react';
import * as ReactDom from 'react-dom';
import {
  IPropertyPaneField,
  PropertyPaneFieldType
} from '@microsoft/sp-property-pane';
import { IPropertyPaneSliderHeightProps } from './IPropertyPaneSliderHeightProps';
import { IPropertyPaneSliderHeightInternalProps } from './IPropertyPaneSliderHeightInternalProps';
import SliderHeight from './components/SliderHeight';
import { ISliderHeightProps } from './components/ISliderHeightProps';

export class PropertyPaneSliderHeight implements IPropertyPaneField<IPropertyPaneSliderHeightProps> {
    public type: PropertyPaneFieldType = PropertyPaneFieldType.Custom;
    public targetProperty: string;
    public properties: IPropertyPaneSliderHeightInternalProps;
    private elem: HTMLElement;
    constructor(targetProperty: string, properties: IPropertyPaneSliderHeightProps) {
        this.targetProperty = targetProperty;
        this.properties = {
            key: properties.label,
            label: properties.label,
            onPropertyChange: properties.onPropertyChange,
            selectedHeight: properties.selectedHeight,
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
    
        const element: React.ReactElement<ISliderHeightProps> = React.createElement(SliderHeight, {
            label: this.properties.label,
            onChanged: this.onChanged.bind(this),
            selectedHeight: this.properties.selectedHeight,
            disabled: this.properties.disabled,
        });
        ReactDom.render(element, elem);
    }
    
    private onChanged(speed: number): void {
        this.properties.onPropertyChange(this.targetProperty, speed);
        this.properties[this.targetProperty]=speed;
    }
}
