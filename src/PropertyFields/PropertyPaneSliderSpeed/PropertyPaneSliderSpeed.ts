import * as React from 'react';
import * as ReactDom from 'react-dom';
import {
  IPropertyPaneField,
  PropertyPaneFieldType
} from '@microsoft/sp-property-pane';
import { IPropertyPaneSliderSpeedProps } from './IPropertyPaneSliderSpeedProps';
import { IPropertyPaneSliderSpeedInternalProps } from './IPropertyPaneSliderSpeedInternalProps';
import SliderSpeedControl from './components/SliderSpeedControl';
import { ISliderSpeedControlProps } from './components/ISliderSppedControlProps';

export class PropertyPaneSliderSpeed implements IPropertyPaneField<IPropertyPaneSliderSpeedProps> {
    public type: PropertyPaneFieldType = PropertyPaneFieldType.Custom;
    public targetProperty: string;
    public properties: IPropertyPaneSliderSpeedInternalProps;
    private elem: HTMLElement;
    constructor(targetProperty: string, properties: IPropertyPaneSliderSpeedProps) {
        this.targetProperty = targetProperty;
        this.properties = {
            key: properties.label,
            label: properties.label,
            onPropertyChange: properties.onPropertyChange,
            selectedSpeed: properties.selectedSpeed,
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
    
        const element: React.ReactElement<ISliderSpeedControlProps> = React.createElement(SliderSpeedControl, {
            label: this.properties.label,
            onChanged: this.onChanged.bind(this),
            selectedSpeed: this.properties.selectedSpeed,
            disabled: this.properties.disabled,
        });
        ReactDom.render(element, elem);
    }
    
    private onChanged(speed: number): void {
        this.properties.onPropertyChange(this.targetProperty, speed);
        this.properties[this.targetProperty]=speed;
    }
}
