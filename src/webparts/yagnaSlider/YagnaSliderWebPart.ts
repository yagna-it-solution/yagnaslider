import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-webpart-base';
import { SPComponentLoader } from '@microsoft/sp-loader';
import { update, get } from '@microsoft/sp-lodash-subset';

import * as strings from 'YagnaSliderWebPartStrings';
import YagnaSlider from './components/YagnaSlider';
import { IYagnaSliderProps } from './components/IYagnaSliderProps';
import { SlidesProps } from './components/SlidesProps';
import { ITransitionOption } from './components/ITransitionOption';
import { sp } from "@pnp/sp";
import * as $ from 'jquery';

import { PropertyPaneHeader } from '../../PropertyFields/PropertyPaneHeader/PropertyPaneHeader';
import { PropertyPaneNavigation } from '../../PropertyFields/PropertyPaneNavigation/PropertyPaneNavigation';
import { PropertyPanePauseHover } from '../../PropertyFields/PropertyPanePauseHover/PropertyPanePauseHover';
import { PropertyPaneAutoPlay } from '../../PropertyFields/PropertyPaneAutoPlay/PropertyPaneAutoPlay';
import { PropertyPaneSliderSpeed } from '../../PropertyFields/PropertyPaneSliderSpeed/PropertyPaneSliderSpeed';
import { PropertyPaneInfinityLoop } from '../../PropertyFields/PropertyPaneInfinityLoop/PropertyPaneInfinityLoop';
import { PropertyPaneSliderEffect } from '../../PropertyFields/PropertyPaneSliderEffect/PropertyPaneSliderEffect';
import { PropertyPaneContentEffect } from '../../PropertyFields/PropertyPaneContentEffect/PropertyPaneContentEffect';
import { PropertyPaneSliderHeight } from '../../PropertyFields/PropertyPaneSliderHeight/PropertyPaneSliderHeight';
import { PropertyPaneNavImg } from '../../PropertyFields/PropertyPaneNavImg/PropertyPaneNavImg';
import { PropertyPaneBulletImg } from '../../PropertyFields/PropertyPaneBulletImg/PropertyPaneBulletImg';
import { PropertyPaneSlides } from '../../PropertyFields/PropertyPaneSlides/PropertyPaneSlides';

import { AppUpdater } from './components/ApiUpdater';

export interface IYagnaSliderWebPartProps {
  description: string;
  sliderId: string;
  sliderHeight: number;
  navigationType: string;
  autoPlay: boolean;
  pauseOnHover: boolean;
  inifinityLoop: boolean;
  slideDuration: number;
  showTimer: boolean;
  timerPosition: string;
  slideNavImg: string;
  slideBulletImg: string;
  slidesCount: number;
  slideTransition: string;
  contentTransition: string;
  isPropertyPaneOpen: boolean;
  slidesProps: SlidesProps[];
  transitions: ITransitionOption[];
  registrationType: string;
  registrationCode: string;
  registrationDate: Date;
  apiUpdater: AppUpdater;
}

export default class YagnaSliderWebPart extends BaseClientSideWebPart<IYagnaSliderWebPartProps> {
  public render(): void {
    if( this.properties.apiUpdater == undefined || !this.properties.apiUpdater || !this.properties.apiUpdater.getAppKey ) {
      this.properties.apiUpdater=new AppUpdater();
      this.properties.registrationCode = this.properties.apiUpdater.getAppKey();
      this.properties.registrationDate = this.properties.apiUpdater.getAppDate();
      this.properties.registrationType = this.properties.apiUpdater.getAppType();
    }

    const element: React.ReactElement<IYagnaSliderProps > = React.createElement(
      YagnaSlider,
      {
        description: this.properties.description,
        sliderId: this.properties.sliderId,
        sliderHeight: this.properties.sliderHeight,
        navigationType: this.properties.navigationType,
        autoPlay: this.properties.autoPlay,
        pauseOnHover: this.properties.pauseOnHover,
        inifinityLoop: this.properties.inifinityLoop,
        slideDuration: this.properties.slideDuration,
        showTimer: this.properties.showTimer,
        timerPosition: this.properties.timerPosition,
        slideNavImg: this.properties.slideNavImg,
        slideBulletImg: this.properties.slideBulletImg,
        slidesCount: this.properties.slidesCount,
        slideTransition: this.properties.slideTransition,
        contentTransition: this.properties.contentTransition,
        isPropertyPaneOpen: this.properties.isPropertyPaneOpen,
        slidesProps: this.properties.slidesProps,
        transitions: this.getTransitionOptions(),
        registrationType: this.properties.registrationType,
        registrationCode: this.properties.registrationCode,
        registrationDate: this.properties.registrationDate,
        apiUpdater: this.properties.apiUpdater
      }
    );

    ReactDom.render(element, this.domElement);
  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                new PropertyPaneHeader('Header',{
                  label: strings.SliderOptionsFieldLabel,
                  backgroundColor: '#d30c5c',
                  foreColor: '#ffffff'
                }),              
                new PropertyPaneNavigation('navigationType', {
                  label: strings.NavigationFieldLabel,
                  selectedNavigation: this.properties.navigationType,
                  options: [
                    { key: "ArrowsAndDots", text: "Arrows and Dots" },
                    { key: "Arrows", text: "Arrows" },
                    { key: "Dots", text: "Dots" },
                    { key: "none", text: "None" }
                  ],
                  onPropertyChange: this.onPropertyChanged.bind(this),
                  disabled: false
                }),
                new PropertyPanePauseHover('pauseOnHover', {
                  label: strings.PauseOnHoverFieldLabel,
                  selectedKey: this.properties.pauseOnHover,
                  onPropertyChange: this.onPropertyChanged.bind(this),
                  disabled: false
                }),
                new PropertyPaneAutoPlay('autoPlay', {
                  label: strings.AutoPlayFieldLabel,
                  selectedKey: this.properties.autoPlay,
                  onPropertyChange: this.onPropertyChanged.bind(this),
                  disabled: false
                }),
                new PropertyPaneSliderSpeed('slideDuration',{
                  label: strings.SliderSpeedFieldLabel,
                  selectedSpeed: this.properties.slideDuration,
                  onPropertyChange: this.onPropertyChanged.bind(this),
                  disabled: false
                }),
                new PropertyPaneInfinityLoop('inifinityLoop',{
                  label: strings.InfinityLoopFieldLabel,
                  selectedKey: this.properties.inifinityLoop,
                  onPropertyChange: this.onPropertyChanged.bind(this),
                  disabled: false
                }),
                new PropertyPaneSliderEffect('slideTransition',{
                  label: strings.SliderEffectFieldLabel,
                  selectedEffect: this.properties.slideTransition,
                  options: this.getTransitionOptions(),
                  onPropertyChange: this.onPropertyChanged.bind(this),
                  disabled: false
                }),
                new PropertyPaneContentEffect('contentTransition', {
                  label: strings.ContentEffectFieldLabel,
                  selectedEffect: this.properties.contentTransition,
                  options: [
                    {key: 'up', text: 'Up'},
                    {key: 'down', text: 'Down'},
                  ],
                  onPropertyChange: this.onPropertyChanged.bind(this),
                  disabled: false
                }),
                new PropertyPaneSliderHeight('sliderHeight',{
                  label: strings.SliderHeightFieldLabel,
                  selectedHeight: this.properties.sliderHeight,
                  onPropertyChange: this.onPropertyChanged.bind(this),
                  disabled: false,
                }),
                new PropertyPaneNavImg('slideNavImg',{
                  label: strings.SliderNavImgFieldLabel,
                  selectedKey: this.properties.slideNavImg,
                  onPropertyChange: this.onPropertyChanged.bind(this)
                }),
                new PropertyPaneBulletImg('slideBulletImg',{
                  label: strings.SliderBulletImgFieldLabel,
                  selectedKey: this.properties.slideBulletImg,
                  onPropertyChange: this.onPropertyChanged.bind(this)
                }),
              ]
            },
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                new PropertyPaneHeader('Header',{
                  label: strings.SlidesGroupFieldLabel,
                  backgroundColor: '#d30c5c',
                  foreColor: '#ffffff'
                }),
                new PropertyPaneSlides('slides',{
                  label: strings.SlidesFieldLabel,
                  addButtonText: strings.SlidesAddButtonFieldLabel,
                  ctx: this.context.pageContext,
                  sliderId: this.properties.sliderId,
                  selectedSlides: this.properties.slidesProps,
                  onPropertyChange: (propertyPath: string, slides: SlidesProps[]) => { this.properties.slidesProps=slides; this.render(); },
                  disabled: false
                })
              ]
            }
          ]
        }
      ]
    };
  }

  public onPropertyPaneRendered(){
    this.properties.isPropertyPaneOpen=true;
    this.render();
  }

  public onInit(): Promise<void> {
    sp.setup({
      spfxContext: this.context
    });

    if( this.properties.apiUpdater === undefined || this.properties.apiUpdater == null ){
      this.properties.apiUpdater = new AppUpdater();
      this.properties.registrationType = this.properties.apiUpdater.getAppType();
      this.properties.registrationDate = this.properties.apiUpdater.getAppDate();
      this.properties.registrationCode = this.properties.apiUpdater.getAppKey();
    }

    if(this.properties.sliderId===undefined){
      var id:number = document.getElementsByClassName('yagnaContainer').length || 1;
      if(!id) { id=1; } else { id +=1; }
      this.properties.sliderId=id.toString();
    }
    else if(this.properties.pauseOnHover===undefined){
      this.properties.pauseOnHover=true;
    }
    else if(this.properties.navigationType===undefined){
      this.properties.navigationType='ArrowsAndDots';
    }
    else if(this.properties.autoPlay===undefined){
      this.properties.autoPlay=true;
    }
    else if(this.properties.slideDuration===undefined){
      this.properties.slideDuration=5000;
    }
    else if(this.properties.inifinityLoop===undefined){
      this.properties.inifinityLoop=true;
    }
    else if(this.properties.sliderHeight===undefined){
      this.properties.sliderHeight=400;
    }
    else if(this.properties.slideNavImg===undefined){
      this.properties.slideNavImg='arrows-48-48-1';
    }
    else if(this.properties.slideBulletImg===undefined){
      this.properties.slideBulletImg='bullet_24';
    }
    else if(this.properties.showTimer===undefined){
      this.properties.showTimer=true;
    }
    else if(this.properties.timerPosition===undefined){
      this.properties.timerPosition='topright';
    }
    else if(this.properties.slidesCount===undefined){
      this.properties.slidesCount=3;
    }
    else if(this.properties.slideTransition===undefined){
      this.properties.slideTransition="fadein";
    }
    else if(this.properties.contentTransition===undefined){
      this.properties.contentTransition="up";
    }
    else if(this.properties.slidesProps===undefined){
      this.properties.slidesProps=[
        {
          id: "slide1",
          sliderId: this.properties.sliderId === undefined ? "1" : this.properties.sliderId,
          slideIndex: 1,
          backgroundColor: "purple",
          backgroundImage: '',
          backgroundSize: "cover",
          backgroundOverlay: false,
          backgroundOverlayColor: "rgba(0,0,0,0.5)",
          backgroundBlendMode: "normal",
          slideAnimation: "fadein",
          contentAnimation: "up",
          contentHorizPosition: "center",
          contentVertPosition: "middle",
          textAlign: "center",
          textColor: "#ffffff",
          slideTitle: "Slide 1 Heading",
          titleFontFamily: "Tahoma",
          titleFontWeight: "bold",
          slideDescription: "Click edit button to change this text. Lorem ipsum dolor sit amet consectetur adipiscing elit dolor",
          descFontFamily: "Arial",
          buttonText: "Click Here",
          buttonUrl: "",
          buttonIcon: "",
          urlOpenNewWindow: false,
          urlAddNoFollow: false
        },
        {
          id: "slide2",
          sliderId: this.properties.sliderId === undefined ? "1" : this.properties.sliderId,
          slideIndex: 2,
          backgroundColor: "BlueViolet",
          backgroundImage: '',
          backgroundSize: "cover",
          backgroundOverlay: false,
          backgroundOverlayColor: "rgba(0,0,0,0.5)",
          backgroundBlendMode: "normal",
          slideAnimation: "fadein",
          contentAnimation: "up",
          contentHorizPosition: "center",
          contentVertPosition: "middle",
          textAlign: "center",
          textColor: "#ffffff",
          slideTitle: "Slide 2 Heading",
          titleFontFamily: "Tahoma",
          titleFontWeight: "bold",
          slideDescription: "Click edit button to change this text. Lorem ipsum dolor sit amet consectetur adipiscing elit dolor",
          descFontFamily: "Arial",
          buttonText: "Click Here",
          buttonUrl: "",
          buttonIcon: "",
          urlOpenNewWindow: false,
          urlAddNoFollow: false
        },
        {
          id: "slide3",
          sliderId: this.properties.sliderId === undefined ? "1" : this.properties.sliderId,
          slideIndex: 3,
          backgroundColor: "BlueViolet",
          backgroundImage: '',
          backgroundSize: "cover",
          backgroundOverlay: false,
          backgroundOverlayColor: "rgba(0,0,0,0.5)",
          backgroundBlendMode: "normal",
          slideAnimation: "fadein",
          contentAnimation: "up",
          contentHorizPosition: "center",
          contentVertPosition: "middle",
          textAlign: "center",
          textColor: "#ffffff",
          slideTitle: "Slide 3 Heading",
          titleFontFamily: "Tahoma",
          titleFontWeight: "bold",
          slideDescription: "Click edit button to change this text. Lorem ipsum dolor sit amet consectetur adipiscing elit dolor",
          descFontFamily: "Arial",
          buttonText: "Click Here",
          buttonUrl: "",
          buttonIcon: "",
          urlOpenNewWindow: false,
          urlAddNoFollow: false
        }
      ];
    }
    else if(!this.properties.transitions){
      this.properties.transitions=this.getTransitionOptions();
    }
    else if(!this.properties.registrationType){
      this.properties.registrationType='evaluation';
    }
    else if(!this.properties.registrationDate){
      this.properties.registrationDate=new Date();
    }
    else if(!this.properties.registrationCode){
      this.properties.registrationCode=this.getEvaluationRegistrationCode();
    }

    var fontAwCss='https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css';
    $('link[rel=stylesheet][href~="' + fontAwCss + '"]').remove();
    SPComponentLoader.loadCss(fontAwCss);

    var w3Css='https://yagnaitsolution.com/sharepoint/w3.css';
    $('link[rel=stylesheet][href~="' + w3Css + '"]').remove();
    SPComponentLoader.loadCss(w3Css);

    var uiScript='https://code.jquery.com/ui/1.12.1/jquery-ui.min.js';
    jQuery('script[src~="' + uiScript + '"]').remove();
    SPComponentLoader.loadScript(uiScript);

    return super.onInit();
  }

  private onPropertyChanged(propertyPath: string, newValue: any): void {
    const oldValue: any = get(this.properties, propertyPath);
    update(this.properties, propertyPath, (): any => { return newValue; });
    this.render();
  }

  private getEvaluationRegistrationCode(): string{
    return '';
  }

  private getTransitionOptions(): ITransitionOption[]{
    var effects: ITransitionOption[]=[];
    effects=[
      {
        key: "fade",
        text: "Fade",
        duration: 1E3,
        easing: "easeOutCubic"
      },
      {
        key: "fadein",
        text: "Fade In",
        duration: 1E3,
        easing: "easeOutCubic"
      },
      {
        key: "slideleft",
        text: "Slide Left",
        duration: 1E3,
        easing: "easeOutCubic"
      },
      {
        key: "slideup",
        text: "Slide Up",
        duration: 1E3,
        easing: "easeOutCubic"
      },
      {
        key: "slidebottom",
        text: "Slide Bottom",
        duration: 1E3,
        easing: "easeOutCubic"
      },
    ];
    return effects;
  }
}

jQuery.extend(jQuery.easing, {
  def: "easeOutQuad",
  easeInQuad: (x, t, b, c, d) => {
    return c * (t /= d) * t + b;
  },
  easeOutQuad: (x, t, b, c, d) => {
    return -c * (t /= d) * (t - 2) + b;
  },
  easeInOutQuad: (x, t, b, c, d) => {
    if ((t /= d / 2) < 1) return c / 2 * t * t + b;
    return -c / 2 * (--t * (t - 2) - 1) + b;
  },
  easeInCubic: (x, t, b, c, d) => {
    return c * (t /= d) * t * t + b;
  },
  easeOutCubic: (x, t, b, c, d) => {
    return c * ((t = t / d - 1) * t * t + 1) + b;
  },
  easeInOutCubic: (x, t, b, c, d) => {
    if ((t /= d / 2) < 1) return c / 2 * t * t * t + b;
    return c / 2 * ((t -= 2) * t * t + 2) + b;
  },
  easeInQuart: (x, t, b, c, d) => {
    return c * (t /= d) * t * t * t + b;
  },
  easeOutQuart: (x, t, b, c, d) => {
    return -c * ((t = t / d - 1) * t * t * t - 1) + b;
  },
  easeInOutQuart: (x, t, b, c, d) => {
    if ((t /= d / 2) < 1) return c / 2 * t * t * t * t + b;
    return -c / 2 * ((t -= 2) * t * t * t - 2) + b;
  },
  easeInQuint: (x, t, b, c, d) => {
    return c * (t /= d) * t * t * t * t + b;
  },
  easeOutQuint: (x, t, b, c, d) => {
    return c * ((t = t / d - 1) * t * t * t * t + 1) + b;
  },
  easeInOutQuint: (x, t, b, c, d) => {
    if ((t /= d / 2) < 1) return c / 2 * t * t * t * t * t + b;
    return c / 2 * ((t -= 2) * t * t * t * t + 2) + b;
  },
  easeInSine: (x, t, b, c, d) => {
    return -c * Math.cos(t / d * (Math.PI / 2)) + c + b;
  },
  easeOutSine: (x, t, b, c, d) => {
    return c * Math.sin(t / d * (Math.PI / 2)) + b;
  },
  easeInOutSine: (x, t, b, c, d) => {
    return -c / 2 * (Math.cos(Math.PI * t / d) - 1) + b;
  },
  easeInExpo: (x, t, b, c, d) => {
    return t == 0 ? b : c * Math.pow(2, 10 * (t / d - 1)) + b;
  },
  easeOutExpo: (x, t, b, c, d) => {
    return t == d ? b + c : c * (-Math.pow(2, -10 * t / d) + 1) + b;
  },
  easeInOutExpo: (x, t, b, c, d) => {
    if (t == 0) return b;
    if (t == d) return b + c;
    if ((t /= d / 2) < 1) return c / 2 * Math.pow(2, 10 * (t - 1)) + b;
    return c / 2 * (-Math.pow(2, -10 * --t) + 2) + b;
  },
  easeInCirc: (x, t, b, c, d) => {
    return -c * (Math.sqrt(1 - (t /= d) * t) - 1) + b;
  },
  easeOutCirc: (x, t, b, c, d) => {
    return c * Math.sqrt(1 - (t = t / d - 1) * t) + b;
  },
  easeInOutCirc: (x, t, b, c, d) => {
    if ((t /= d / 2) < 1) return -c / 2 * (Math.sqrt(1 - t * t) - 1) + b;
    return c / 2 * (Math.sqrt(1 - (t -= 2) * t) + 1) + b;
  },
  easeInElastic: (x, t, b, c, d) => {
    var s = 1.70158;
    var p = 0;
    var a = c;
    if (t == 0) return b;
    if ((t /= d) == 1) return b + c;
    if (!p) p = d * 0.3;
    if (a < Math.abs(c)) {
        a = c;
        s = p / 4;
    } else s = p / (2 * Math.PI) * Math.asin(c / a);
    return -(a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * d - s) * 2 * Math.PI / p)) + b;
  },
  easeOutElastic: (x, t, b, c, d) => {
    var s = 1.70158;
    var p = 0;
    var a = c;
    if (t == 0) return b;
    if ((t /= d) == 1) return b + c;
    if (!p) p = d * 0.3;
    if (a < Math.abs(c)) {
        a = c;
        s = p / 4;
    } else s = p / (2 * Math.PI) * Math.asin(c / a);
    return a * Math.pow(2, -10 * t) * Math.sin((t * d - s) * 2 * Math.PI / p) + c + b;
  },
  easeInOutElastic: (x, t, b, c, d) => {
    var s = 1.70158;
    var p = 0;
    var a = c;
    if (t == 0) return b;
    if ((t /= d / 2) == 2) return b + c;
    if (!p) p = d * 0.3 * 1.5;
    if (a < Math.abs(c)) {
        a = c;
        s = p / 4;
    } else s = p / (2 * Math.PI) * Math.asin(c / a);
    if (t < 1) return -0.5 * a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * d - s) * 2 * Math.PI / p) + b;
    return a * Math.pow(2, -10 * (t -= 1)) * Math.sin((t * d - s) * 2 * Math.PI /
        p) * 0.5 + c + b;
  },
  easeInBack: (x, t, b, c, d, s) => {
    if (s == undefined) s = 1.70158;
    return c * (t /= d) * t * ((s + 1) * t - s) + b;
  },
  easeOutBack: (x, t, b, c, d, s) => {
    if (s == undefined) s = 1.70158;
    return c * ((t = t / d - 1) * t * ((s + 1) * t + s) + 1) + b;
  },
  easeInOutBack: (x, t, b, c, d, s) => {
    if (s == undefined) s = 1.70158;
    if ((t /= d / 2) < 1) return c / 2 * t * t * (((s *= 1.525) + 1) * t - s) + b;
    return c / 2 * ((t -= 2) * t * (((s *= 1.525) + 1) * t + s) + 2) + b;
  },
  easeInBounce: (x, t, b, c, d) => {
    return c - this.easeOutBounce(x, d - t, 0, c, d) + b;
  },
  easeOutBounce: (x, t, b, c, d) => {
    if ((t /= d) < 1 / 2.75) return c *
        7.5625 * t * t + b;
    else if (t < 2 / 2.75) return c * (7.5625 * (t -= 1.5 / 2.75) * t + 0.75) + b;
    else if (t < 2.5 / 2.75) return c * (7.5625 * (t -= 2.25 / 2.75) * t + 0.9375) + b;
    else return c * (7.5625 * (t -= 2.625 / 2.75) * t + 0.984375) + b;
  },
  easeInOutBounce: (x, t, b, c, d) => {
    if (t < d / 2) return this.easeInBounce(x, t * 2, 0, c, d) * 0.5 + b;
    return this.easeOutBounce(x, t * 2 - d, 0, c, d) * 0.5 + c * 0.5 + b;
  }
});