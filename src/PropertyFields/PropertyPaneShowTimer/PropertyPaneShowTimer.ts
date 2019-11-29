import * as React from 'react';
import * as ReactDom from 'react-dom';
import {
  IPropertyPaneField,
  PropertyPaneFieldType
} from '@microsoft/sp-property-pane';
import { IPropertyPaneShowTimerProps } from './IPropertyPaneShowTimerProps';
import { IPropertyPaneShowTimerInternalProps } from './IPropertyPaneShowTimerInternalProps';
import ShowTimerControl from './components/ShowTimerControl';
import { IShowTimerControlProps } from './components/IShowTimerControlProps';

export class PropertyPaneShowTimer implements IPropertyPaneField<IPropertyPaneShowTimerProps> {
    public type: PropertyPaneFieldType = PropertyPaneFieldType.Custom;
    public targetProperty: string;
    public properties: IPropertyPaneShowTimerInternalProps;
    private elem: HTMLElement;
    constructor(targetProperty: string, properties: IPropertyPaneShowTimerProps) {
        this.targetProperty = targetProperty;
        this.properties = {
            key: properties.label,
            label: properties.label,
            onPropertyChange: properties.onPropertyChange,
            selectedKey: properties.selectedKey,
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
    
        const element: React.ReactElement<IShowTimerControlProps> = React.createElement(ShowTimerControl, {
            label: this.properties.label,
            onChanged: this.onChanged.bind(this),
            selectedKey: this.properties.selectedKey,
            disabled: this.properties.disabled,
        });
        ReactDom.render(element, elem);
    }
    
    private onChanged(option: boolean): void {
        this.properties.onPropertyChange(this.targetProperty, option);
        this.properties[this.targetProperty]=option;
    }
}