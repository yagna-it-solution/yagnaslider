import * as React from 'react';
import { 
    classNamesFunction,
    initializeComponentRef,
    MAX_COLOR_ALPHA,
    MAX_COLOR_HUE,
    MAX_COLOR_RGB,
    IColor, 
    IRGB,
    getColorFromString,
    getColorFromRGBA,
    updateA,
    updateH,
    correctRGB
} from 'office-ui-fabric-react';
import { correctHex } from './correctHex';
import { 
    IYagnaColorPickerProps,
    IYagnaColorPickerStyleProps,
    IYagnaColorPickerStyles,
    IYagnaColorPicker 
} from './YagnaColorPicker.types';
import { YagnaColorRectangle } from './YagnaColorRectangle/YagnaColorRectangle';
import { YagnaColorSlider } from './YagnaColorSlider/YagnaColorSlider';
import { YagnaAlphaSlider } from './YagnaAlphaSlider/YagnaAlphaSlider';
export const MAX_HEX_LENGTH = 6;
export const MAX_RGBA_LENGTH = 3;
export const MIN_HEX_LENGTH = 3;
export const MIN_RGBA_LENGTH = 1;
export const HEX_REGEX = /^[\da-f]{0,6}$/i;
export const RGBA_REGEX = /^\d{0,3}$/;

type IRGBHex = Pick<IColor, 'r' | 'g' | 'b' | 'a' | 'hex'>;

export interface IYagnaColorPickerState {
  color: IColor;
  editingColor?: {
    component: keyof IRGBHex;
    value: string;
  };
}

const getClassNames = classNamesFunction<IYagnaColorPickerStyleProps, IYagnaColorPickerStyles>();

const colorComponents: Array<keyof IRGBHex> = ['hex', 'r', 'g', 'b', 'a'];

export class YagnaColorPicker extends React.Component<IYagnaColorPickerProps, IYagnaColorPickerState> implements IYagnaColorPicker {
    public static defaultProps = {
        hexLabel: 'Hex',
        redLabel: 'Red',
        greenLabel: 'Green',
        blueLabel: 'Blue',
        alphaLabel: 'Alpha',
        previewLabel: 'Preview'
    };
    
    private _textChangeHandlers: {
        [K in keyof IRGBHex]: (event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, newValue?: string) => void
    };
    
    private _textLabels: { [K in keyof IRGBHex]?: string };
    
    constructor(props: IYagnaColorPickerProps) {
        super(props);
    
        initializeComponentRef(this);
    
        this.state = {
            color: _getColorFromProps(props) || getColorFromString('#ffffff')!
        };
    
        this._textChangeHandlers = {} as any;
        for (const component of colorComponents) {
            this._textChangeHandlers[component] = this._onTextChange.bind(this, component);
        }
        this._textLabels = {
            r: props.redLabel,
            g: props.greenLabel,
            b: props.blueLabel,
            a: props.alphaLabel,
            hex: props.hexLabel
        };
    }
    
    public get color(): IColor {
        return this.state.color;
    }
    
    // tslint:disable-next-line function-name
    public UNSAFE_componentWillReceiveProps(newProps: IYagnaColorPickerProps): void {
        const color = _getColorFromProps(newProps);
        if (color) {
            this._updateColor(undefined, color);
        }
    }

    public render(): JSX.Element {
        const props = this.props;
        const { theme, className, styles } = props;
        const { color } = this.state;
    
        const classNames = getClassNames(styles!, {
            theme: theme!,
            className
        });
        
        return (
            <div className={classNames.root} style={{width:'180px',maxWidth:'180px'}}>
                <div className={classNames.panel}>
                    <YagnaColorRectangle color={this.state.color} onChange={this._onSVChanged} className={classNames.colorRectangle}/>
                    <div className={classNames.flexContainer}>
                        <div className={classNames.flexSlider}>
                            <YagnaColorSlider className="is-hue" minValue={0} maxValue={MAX_COLOR_HUE} value={this.state.color.h} onChange={this._onHChanged} />
                            <YagnaAlphaSlider className="is-alpha" isAlpha 
                            overlayStyle={{ background: `linear-gradient(to right, transparent 0, #${color.hex} 100%)` }}
                            minValue={0} maxValue={MAX_COLOR_ALPHA} value={this.state.color.a} 
                            onChange={this._onAChanged}/>
                        </div>
                    </div>
                    <div style={{display:'flex',flexDirection:'row',flexWrap:'nowrap',width:'100%'}}>
                        <div style={{display:'block',flexGrow:0,margin:'0 1px 0 0'}}>
                            <p style={{display:'block',margin:'0',padding:'0',fontSize:'8px',color:'#888888'}}>{props.hexLabel}</p>
                            <input type='text' 
                                    aria-label='Hex' spellCheck={false}
                                    aria-invalid='false'
                                    style={{display:'block',border:'1px solid #999999',
                                    margin:'0',padding:'0',width:'25px',
                                    outline:'none',fontSize:'8px',borderRadius:'2px'}}
                                    value={this._getDisplayValue('hex')}
                                    onBlur={this._onBlur.bind(this)}
                                    onChange={this._textChangeHandlers['hex']}/> 
                        </div>
                        <div style={{display:'block',flexGrow:1,margin:'0 1px'}}>
                            <p style={{display:'block',margin:'0',padding:'0',fontSize:'8px'}}>{props.redLabel}</p>
                            <input type='number' aria-label='r' spellCheck={false} 
                                    aria-invalid='false' max={255} min={0}
                                    style={{display:'block',border:'1px solid #999999',
                                    margin:'0',padding:'0 0 0 3px',width:'30px',
                                    outline:'none',fontSize:'8px',borderRadius:'2px'}}
                                    value={this._getDisplayValue("r")}
                                    onBlur={this._onBlur.bind(this)}
                                    onChange={this._textChangeHandlers["r"]}/>
                        </div>
                        <div style={{display:'block',flexGrow:1,margin:'0 1px'}}>
                            <p style={{display:'block',margin:'0',padding:'0',fontSize:'8px'}}>{props.greenLabel}</p>
                            <input type='number' aria-label='g' spellCheck={false} 
                                    aria-invalid='false' max={255} min={0}
                                    style={{display:'block',border:'1px solid #999999',
                                    margin:'0',padding:'0 0 0 3px',width:'30px',
                                    outline:'none',fontSize:'8px',borderRadius:'2px'}}
                                    value={this._getDisplayValue("g")}
                                    onBlur={this._onBlur.bind(this)}
                                    onChange={this._textChangeHandlers["g"]}/>
                        </div>
                        <div style={{display:'block',flexGrow:1,margin:'0 1px'}}>
                            <p style={{display:'block',margin:'0',padding:'0',fontSize:'8px'}}>{props.blueLabel}</p>
                            <input type='number' aria-label='b' spellCheck={false} 
                                    aria-invalid='false' max={255} min={0}
                                    style={{display:'block',border:'1px solid #999999',
                                    margin:'0',padding:'0 0 0 3px',width:'30px',
                                    outline:'none',fontSize:'8px',borderRadius:'2px'}}
                                    value={this._getDisplayValue("b")}
                                    onBlur={this._onBlur.bind(this)}
                                    onChange={this._textChangeHandlers["b"]}/>
                        </div>
                        <div style={{display:'block',flexGrow:1,margin:'0 1px'}}>
                            <p style={{display:'block',margin:'0',padding:'0',fontSize:'8px'}}>{props.alphaLabel}</p>
                            <input type='number' aria-label='a' spellCheck={false} 
                                    aria-invalid='false' max={255} min={0}
                                    style={{display:'block',border:'1px solid #999999',
                                    margin:'0',padding:'0 0 0 3px',width:'30px',
                                    outline:'none',fontSize:'8px',borderRadius:'2px'}}
                                    value={this._getDisplayValue("a")}
                                    onBlur={this._onBlur.bind(this)}
                                    onChange={this._textChangeHandlers["a"]}/>
                        </div>
                    </div>
                    <div style={{display:'flex',flexDirection:'row',flexWrap:'nowrap',marginTop:'5px'}}>
                        <p style={{display:'block',flexGrow:1,margin:'0',padding:'0',
                                fontSize:'8px',lineHeight:'20px'}}>{props.previewLabel ? props.previewLabel : YagnaColorPicker.defaultProps.previewLabel}</p>
                        <div style={{display:'block',flexGrow:0,width:'40px',
                                height:'18px',border:'1px solid #dddddd',
                                padding:'0',boxSizing:'border-box',
                                backgroundColor:'transparent',marginRight:'2px'}}>
                            <div style={{display:'block',flexGrow:0,width:'34px',
                                height:'12px',border:'none',padding:'0',margin:'2px',
                                backgroundColor:color!.str,marginRight:'6px'}}>
                            </div>
                        </div>
                    </div>
                    
                </div>
            </div>
        );
    }

    private _getDisplayValue(component: keyof IColor): string {
        const { color, editingColor } = this.state;
        if (editingColor && editingColor.component === component) {
            return editingColor.value;
        }
        if (component === 'hex') {
            return this.state.color[component] || '';
        } else if (typeof this.state.color[component] === 'number' && !isNaN(this.state.color[component] as number)) {
            return String(this.state.color[component]);
        }
        return '';
    }
    
    private _onSVChanged = (ev: React.MouseEvent<HTMLElement>, color: IColor): void => {
        this._updateColor(ev, color);
    }
    
    private _onHChanged = (ev: React.MouseEvent<HTMLElement>, h: number): void => {
        this._updateColor(ev, updateH(this.state.color, h));
    }
    
    private _onAChanged = (ev: React.MouseEvent<HTMLElement>, a: number): void => {
        this._updateColor(ev, updateA(this.state.color, Math.round(a)));
    }
    
    private _onTextChange(component: keyof IRGBHex, event: React.FormEvent<HTMLInputElement>, newValue?: string): void {
        const color = this.state.color;
        const isHex = component === 'hex';
        const isAlpha = component === 'a';
        if(!newValue){
            newValue=(event.target as HTMLInputElement).value;
        }
        newValue = (newValue || '').substr(0, isHex ? MAX_HEX_LENGTH : MAX_RGBA_LENGTH);
    
        // Ignore what the user typed if it contains invalid characters
        const validCharsRegex = isHex ? HEX_REGEX : RGBA_REGEX;
        if (!validCharsRegex.test(newValue)) {
            return;
        }
    
        // Determine if the entry is valid (different methods for hex, alpha, and RGB)
        let isValid: boolean;
        if (newValue === '') {
            // Empty string is obviously not valid
            isValid = false;
        } else if (isHex) {
            // Technically hex values of length 3 are also valid, but committing the value here would
            // cause it to be automatically converted to a value of length 6, which may not be what the
            // user wanted if they're not finished typing. (Values of length 3 will be committed on blur.)
            isValid = newValue.length === MAX_HEX_LENGTH;
        } else if (isAlpha) {
            isValid = Number(newValue) <= MAX_COLOR_ALPHA;
        } else {
            isValid = Number(newValue) <= MAX_COLOR_RGB;
        }
    
        if (!isValid) {
            // If the new value is an empty string or other invalid value, save that to display.
            // (if the user still hasn't entered anything on blur, the last value is restored)
            this.setState({ editingColor: { component, value: newValue } });
        } else if (String(color[component]) === newValue) {
            // If the new value is the same as the current value, mostly ignore it.
            // Exception is that if the user was previously editing the value (but hadn't yet entered
            // a new valid value), we should clear the intermediate value.
            if (this.state.editingColor) {
                this.setState({ editingColor: undefined });
            }
        } else {
            // Should be a valid color. Update the value.
            const newColor = isHex
                ? getColorFromString('#' + newValue)
                : getColorFromRGBA({
                    ...color,
                    // Overwrite whichever key is being updated with the new value
                    [component]: Number(newValue)
                } as IRGB);
            this._updateColor(event, newColor);
        }
    }
    
    private _onBlur = (event: React.FocusEvent<HTMLInputElement>) => {
        const { color, editingColor } = this.state;
        if (!editingColor) {
            return;
        }
    
        // If there was an intermediate incorrect value (such as too large or empty), correct it.
        const { value, component } = editingColor;
        const isHex = component === 'hex';
        const minLength = isHex ? MIN_HEX_LENGTH : MIN_RGBA_LENGTH;
        if (value.length >= minLength && (isHex || !isNaN(Number(value)))) {
            // Real value. Clamp to appropriate length (hex) or range (rgba).
            let newColor: IColor | undefined;
            if (isHex) {
                newColor = getColorFromString('#' + correctHex(value));
            } else {
                newColor = getColorFromRGBA(
                    correctRGB({
                        ...color,
                        [component]: Number(value)
                    } as IRGB)
                );
            }
    
            // Update state and call onChange
            this._updateColor(event, newColor);
        } else {
            // Intermediate value was an empty string, too short (hex only), or just . (alpha only).
            // Just clear the intermediate state and revert to the previous value.
            this.setState({ editingColor: undefined });
        }
    }
    
    /**
    * Update the displayed color and call change handlers if appropriate.
    * @param ev - Event if call was triggered by an event (undefined if triggered by props change)
    * @param newColor - Updated color
    */
    private _updateColor(ev: React.SyntheticEvent<HTMLElement> | undefined, newColor: IColor | undefined): void {
        if (!newColor) {
            return;
        }
    
        const { color, editingColor } = this.state;
        const isDifferentColor = newColor.h !== color.h || newColor.str !== color.str;
    
        if (isDifferentColor || editingColor) {
            this.setState({ color: newColor, editingColor: undefined }, () => {
                if (ev && this.props.onChange) {
                    this.props.onChange(ev, newColor);
                }
            });
        }
    }    
}

function _getColorFromProps(props: IYagnaColorPickerProps): IColor | undefined {
    const { color } = props;
    return typeof color === 'string' ? getColorFromString(color) : color;
}
