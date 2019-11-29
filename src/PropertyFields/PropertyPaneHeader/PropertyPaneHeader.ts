import * as React from 'react';
import * as ReactDom from 'react-dom';
import {
  IPropertyPaneField,
  PropertyPaneFieldType
} from '@microsoft/sp-property-pane';
import { IPropertyPaneHeaderProps } from './IPropertyPaneHeaderProps';
import { IPropertyPaneHeaderInternalProps } from './IPropertyPaneHeaderInternalProps';
import HeaderControl from './components/HeaderControl';
import { IHeaderControlProps } from './components/IHeaderControlProps';

export class PropertyPaneHeader implements IPropertyPaneField<IPropertyPaneHeaderProps> {
    public type: PropertyPaneFieldType = PropertyPaneFieldType.Custom;
    public targetProperty: string;
    public properties: IPropertyPaneHeaderInternalProps;
    private elem: HTMLElement;
    constructor(targetProperty: string, properties: IPropertyPaneHeaderProps) {
        this.targetProperty = targetProperty;
        this.properties = {
            key: properties.label,
            label: properties.label,
            backgroundColor: properties.backgroundColor,
            foreColor: properties.foreColor,
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
    
        const element: React.ReactElement<IHeaderControlProps> = React.createElement(HeaderControl, {
            label: this.properties.label,
            backgroundColor: this.properties.backgroundColor,
            foreColor: this.properties.foreColor
        });
        ReactDom.render(element, elem);
    }        
}