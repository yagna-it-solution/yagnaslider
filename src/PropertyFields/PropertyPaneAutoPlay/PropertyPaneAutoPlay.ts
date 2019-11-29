import * as React from 'react';
import * as ReactDom from 'react-dom';
import {
  IPropertyPaneField,
  PropertyPaneFieldType
} from '@microsoft/sp-property-pane';
import { IPropertyPaneAutoPlayProps } from './IPropertyPaneAutoPlayProps';
import { IPropertyPaneAutoPlayInternalProps } from './IPropertyPaneAutoPlayInternalProps';
import AutoPlayControl from './components/AutoPlayControl';
import { IAutoPlayControlProps } from './components/IAutoPlayControlProps';

export class PropertyPaneAutoPlay implements IPropertyPaneField<IPropertyPaneAutoPlayProps> {
    public type: PropertyPaneFieldType = PropertyPaneFieldType.Custom;
    public targetProperty: string;
    public properties: IPropertyPaneAutoPlayInternalProps;
    private elem: HTMLElement;
    constructor(targetProperty: string, properties: IPropertyPaneAutoPlayProps) {
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
    
        const element: React.ReactElement<IAutoPlayControlProps> = React.createElement(AutoPlayControl, {
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