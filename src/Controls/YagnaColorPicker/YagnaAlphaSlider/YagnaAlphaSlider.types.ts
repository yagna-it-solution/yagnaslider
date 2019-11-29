import * as React from 'react';
import { 
    ITheme,
    IStyle,
    IRefObject,
    IStyleFunctionOrObject,
    IColor
} from 'office-ui-fabric-react';

/**
 * {@docCategory ColorPicker}
 */
export interface IYagnaAlphaSlider {}

/**
 * {@docCategory ColorPicker}
 */
export interface IYagnaAlphaSliderProps {
  /**
   * Gets the component ref.
   */
  componentRef?: IRefObject<IYagnaAlphaSlider>;

  /**
   * Minimum value of the slider.
   */
  minValue?: number;

  /**
   * Maximum value of the slider.
   */
  maxValue?: number;

  /**
   * Current value of the slider.
   */
  value?: number;

  /**
   * CSS-compatible string for the color of the thumb element.
   */
  thumbColor?: string;

  /**
   * Custom style for the overlay element.
   */
  overlayStyle?: any;

  /**
   * Callback issued when the value changes.
   */
  onChange?: (event: React.MouseEvent<HTMLElement>, newValue?: number) => void;

  /**
   * If true, the slider represents an alpha slider.
   * Otherwise, the slider represents a hue slider.
   */
  isAlpha?: boolean;

  /**
   * Additional CSS class(es) to apply to the ColorSlider.
   */
  className?: string;

  /**
   * Theme (provided through customization).
   */
  theme?: ITheme;

  /**
   * Call to provide customized styling that will layer on top of the variant rules.
   */
  styles?: IStyleFunctionOrObject<IYagnaAlphaSliderStyleProps, IYagnaAlphaSliderStyles>;
}

/**
 * {@docCategory ColorPicker}
 */
export interface IYagnaAlphaSliderStyleProps {
  /**
   * Theme (provided through customization).
   */
  theme: ITheme;

  /**
   * Additional CSS class(es) to apply to the ColorSlider.
   */
  className?: string;
}

/**
 * {@docCategory ColorPicker}
 */
export interface IYagnaAlphaSliderStyles {
  /**
   * Style set for the root element.
   */
  root?: IStyle;

  /**
   * Style set for the draggable thumb element.
   */
  sliderThumb?: IStyle;

  /**
   * Style set for the overlay element.
   */
  sliderOverlay?: IStyle;
}
