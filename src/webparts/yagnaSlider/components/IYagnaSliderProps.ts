import { SlidesProps } from './SlidesProps';
import { ITransitionOption } from './ITransitionOption';
import { AppUpdater } from './ApiUpdater';

export interface IYagnaSliderProps {
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
