import * as React from 'react';
import * as ReactDom from 'react-dom';
import {
  IPropertyPaneField,
  PropertyPaneFieldType
} from '@microsoft/sp-property-pane';
import { IDropdownOption } from 'office-ui-fabric-react/lib/components/Dropdown';
import { IPropertyPaneNavigationProps } from './IPropertyPaneNavigationProps';
import { IPropertyPaneNavigationInternalProps } from './IPropertyPaneNavigationInternalProps';
import NavigationControl from './components/NavigationControl';
import { INavigationControlProps } from './components/INavigationControlProps';

export class PropertyPaneNavigation implements IPropertyPaneField<IPropertyPaneNavigationProps> {
    public type: PropertyPaneFieldType = PropertyPaneFieldType.Custom;
    public targetProperty: string;
    public properties: IPropertyPaneNavigationInternalProps;
    private elem: HTMLElement;
    constructor(targetProperty: string, properties: IPropertyPaneNavigationProps) {
        this.targetProperty = targetProperty;
        this.properties = {
            key: properties.label,
            label: properties.label,
            options: properties.options,
            onPropertyChange: properties.onPropertyChange,
            selectedNavigation: properties.selectedNavigation,
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

        const element: React.ReactElement<INavigationControlProps> = React.createElement(NavigationControl, {
            label: this.properties.label,
            options: this.properties.options,
            onChanged: this.onChanged.bind(this),
            selectedNavigation: this.properties.selectedNavigation,
            disabled: this.properties.disabled,
        });
        ReactDom.render(element, elem);
    }

    private onChanged(navigation: string): void {
        this.properties.onPropertyChange(this.targetProperty, navigation);
        this.properties[this.targetProperty]=navigation;
    }
}