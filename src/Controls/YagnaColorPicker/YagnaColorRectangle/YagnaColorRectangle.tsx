import * as React from 'react';
import { 
    classNamesFunction,
    EventGroup,
    initializeComponentRef,
    IColor,
    MAX_COLOR_SATURATION,
    MAX_COLOR_VALUE,
    getFullColorString,
    updateSV,
    clamp
} from 'office-ui-fabric-react';
import { 
    IYagnaColorRectangleProps,
    IYagnaColorRectangleStyleProps,
    IYagnaColorRectangleStyles,
    IYagnaColorRectangle 
} from './YagnaColorRectangle.types';

const getClassNames = classNamesFunction<IYagnaColorRectangleStyleProps, IYagnaColorRectangleStyles>();

export interface IYagnaColorRectangleState {
  color: IColor;
}

export class YagnaColorRectangle extends React.Component<IYagnaColorRectangleProps, IYagnaColorRectangleState> implements IYagnaColorRectangle {
    public static defaultProps = {
        minSize: 220
    };
    
    private _events: EventGroup;
    private _root = React.createRef<HTMLDivElement>();
    
    constructor(props: IYagnaColorRectangleProps) {
        super(props);
    
        initializeComponentRef(this);
        this._events = new EventGroup(this);
    
        const { color } = this.props;
    
        this.state = {
            color: color
        };
    }
    
    public get color(): IColor {
        return this.state.color;
    }

    // tslint:disable-next-line function-name
    public UNSAFE_componentWillReceiveProps(newProps: IYagnaColorRectangleProps): void {
        const { color } = newProps;

        this.setState({
            color: color
        });
    }

    public componentWillUnmount() {
        this._events.dispose();
    }
    
    public render(): JSX.Element {
        const { minSize, theme, className, styles } = this.props;
        const { color } = this.state;
    
        const classNames = getClassNames(styles!, {
            theme: theme!,
            className,
            minSize
        });
        
        return (
            <div ref={this._root} 
                    className={classNames.root}
                    style={{position:'relative',
                    marginBottom:'10px',
                    minWidth:'180px',
                    minHeight:'180px',
                    maxWidth:'180px',
                    maxHeight:'180px',
                    backgroundColor: getFullColorString(this.state.color) }}
                    onMouseDown={this._onMouseDown}>
                <div className={classNames.light} 
                    style={{position:'absolute',left: 0,top:0,right:0,bottom:0,
                    background: 'linear-gradient(to right, white 0%, transparent 100%)'}}/>
                <div className={classNames.dark} 
                    style={{position:'absolute',left:0,top:0,right:0,bottom:0,
                    background: 'linear-gradient(to bottom, transparent 0, #000 100%)'}}/>
                <div className={classNames.thumb}
                    style={{position: 'absolute',
                    width:'12px',
                    height:'12px',
                    border:'1px solid #ffffff',
                    borderRadius:'100%',
                    boxShadow:'0 0 0 1px rgba(0, 0, 0, 0.1), 1px 1px 3px 1px rgba(0, 0, 0, 0.15)',
                    transform: 'translate(-50%, -50%)',
                    left:color!.s + '%', top:MAX_COLOR_VALUE - this.state.color!.v + '%',background:'white', backgroundColor:this.state.color!.str }}/>
            </div>
        );
    }

    private _onMouseDown = (ev: React.MouseEvent<HTMLElement>): void => {
        this._events.on(window, 'mousemove', this._onMouseMove, true);
        this._events.on(window, 'mouseup', this._disableEvents, true);
    
        this._onMouseMove(ev);
    }
    
    private _onMouseMove = (ev: React.MouseEvent<HTMLElement>): void => {
        const { color, onChange } = this.props;
    
        if (!this._root.current) {
            return;
        }
    
        // If the primary button (1) isn't pressed, the user is no longer dragging, so turn off the
        // event handlers and exit. (this may only be relevant while debugging)
        // tslint:disable-next-line:no-bitwise
        if (!(ev.buttons & 1)) {
            this._disableEvents();
            return;
        }
    
        const newColor = _getNewColor(ev, this.state.color, this._root.current);
        if (newColor) {
            this.setState({
                color: newColor
            });
    
            if (onChange) {
                onChange(ev, newColor);
            }
        }
    
        ev.preventDefault();
        ev.stopPropagation();
    }
    
    private _disableEvents = (): void => {
        this._events.off();
    }    
}

export function _getNewColor(ev: React.MouseEvent<HTMLElement>, prevColor: IColor, root: HTMLElement): IColor | undefined {
    const rectSize = root.getBoundingClientRect();
  
    const sPercentage = (ev.clientX - rectSize.left) / rectSize.width;
    const vPercentage = (ev.clientY - rectSize.top) / rectSize.height;
  
    return updateSV(
        prevColor,
        clamp(sPercentage * MAX_COLOR_SATURATION, MAX_COLOR_SATURATION),
        clamp(MAX_COLOR_VALUE - vPercentage * MAX_COLOR_VALUE, MAX_COLOR_VALUE)
    );
}
