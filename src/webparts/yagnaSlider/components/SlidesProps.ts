import { TextAlignProperty, FontWeightProperty } from "csstype";

export interface SlidesProps{
    id: string;
    sliderId: string;
    slideIndex: number;
    backgroundColor: string;
    backgroundImage: string;
    backgroundSize: string;
    backgroundOverlay: boolean;
    backgroundOverlayColor: string;
    backgroundBlendMode: string;
    slideAnimation: string;
    contentAnimation: string;    
    contentHorizPosition: string;
    contentVertPosition: string;
    textAlign: TextAlignProperty;
    textColor: string;
    slideTitle: string;
    titleFontFamily: string;
    titleFontWeight: FontWeightProperty;
    slideDescription: string;
    descFontFamily: string;
    buttonText: string;
    buttonUrl: string;
    buttonIcon: string;
    urlOpenNewWindow: boolean;
    urlAddNoFollow: boolean;

}