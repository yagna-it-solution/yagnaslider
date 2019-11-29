import * as React from 'react';
import * as ReactDom from 'react-dom';
import {
  IPropertyPaneField,
  PropertyPaneFieldType
} from '@microsoft/sp-property-pane';
import { IDropdownOption } from 'office-ui-fabric-react/lib/components/Dropdown';
import { IPropertyPaneSliderEffectProps } from './IPropertyPaneSliderEffectProps';
import { IPropertyPaneSliderEffectInternalProps } from './IPropertyPaneSliderEffectInternalProps';
import EffectControl from './components/EffectControl';
import { IEffectControlProps } from './components/IEffectControlProps';

export class PropertyPaneSliderEffect implements IPropertyPaneField<IPropertyPaneSliderEffectProps> {
    public type: PropertyPaneFieldType = PropertyPaneFieldType.Custom;
    public targetProperty: string;
    public properties: IPropertyPaneSliderEffectInternalProps;
    private elem: HTMLElement;
    constructor(targetProperty: string, properties: IPropertyPaneSliderEffectProps) {
        this.targetProperty = targetProperty;
        this.properties = {
            key: properties.label,
            label: properties.label,
            options: properties.options,
            onPropertyChange: properties.onPropertyChange,
            selectedEffect: properties.selectedEffect,
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

        const element: React.ReactElement<IEffectControlProps> = React.createElement(EffectControl, {
            label: this.properties.label,
            options: this.properties.options,
            onChanged: this.onChanged.bind(this),
            selectedEffect: this.properties.selectedEffect,
            disabled: this.properties.disabled,
        });
        ReactDom.render(element, elem);
    }

    private onChanged(navigation: string): void {
        this.properties.onPropertyChange(this.targetProperty, navigation);
        this.properties[this.targetProperty]=navigation;
    }
}