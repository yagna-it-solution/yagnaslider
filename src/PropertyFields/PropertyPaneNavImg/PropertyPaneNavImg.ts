import * as React from 'react';
import * as ReactDom from 'react-dom';
import {
  IPropertyPaneField,
  PropertyPaneFieldType
} from '@microsoft/sp-property-pane';
import { IDropdownOption } from 'office-ui-fabric-react';
import { IPropertyPaneNavImgProps } from './IPropertyPaneNavImgProps';
import { IPropertyPaneNavImgInternalProps } from './IPropertyPaneNavImgInternalProps';
import NavImgControl from './components/NavImgControl';
import { INavImgControlProps } from './components/INavImgControlProps';

export class PropertyPaneNavImg implements IPropertyPaneField<IPropertyPaneNavImgProps> {
    public type: PropertyPaneFieldType = PropertyPaneFieldType.Custom;
    public targetProperty: string;
    public properties: IPropertyPaneNavImgInternalProps;
    private elem: HTMLElement;
    constructor(targetProperty: string, properties: IPropertyPaneNavImgProps) {
        this.targetProperty = targetProperty;
        this.properties = {
            key: properties.label,
            label: properties.label,
            onPropertyChange: properties.onPropertyChange,
            selectedKey: properties.selectedKey,
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
    
        const element: React.ReactElement<INavImgControlProps> = React.createElement(NavImgControl, {
            label: this.properties.label,
            onChanged: this.onChanged.bind(this),
            selectedKey: this.properties.selectedKey,
        });
        ReactDom.render(element, elem);
    }
    
    private onChanged(navImg: string): void {
        this.properties.onPropertyChange(this.targetProperty, navImg);
        this.properties[this.targetProperty]=navImg;
    }    
}