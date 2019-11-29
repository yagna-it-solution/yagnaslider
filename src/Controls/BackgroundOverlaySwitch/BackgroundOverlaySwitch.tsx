import * as React from 'react';
import { IBackgroundOverlaySwitchProps } from './IBackgroundOverlaySwitchProps';
import styles from './OverlaySwitch.module.scss';

export interface IBackgroundOverlaySwitchState{
    selectedKey: boolean;
}

export class BackgroundOverlaySwitch extends React.Component<IBackgroundOverlaySwitchProps, IBackgroundOverlaySwitchState> {
    constructor(props: IBackgroundOverlaySwitchProps, state: IBackgroundOverlaySwitchState) {
        super(props);
        this.state = {
            selectedKey: props.selectedKey
        };

    }
    
    public render(): JSX.Element {
        return (
            <div style={{display:'flex',flexDirection:'row',flexWrap:'nowrap',width:'100%',marginTop:'10px'}}>
                <p style={{display:'block',flexGrow:1,padding:'0',margin:'0',lineHeight:'22px',fontSize:'11px',color:'#888888'}}>{this.props.label}</p>
                <label className={styles.autoSwitch}>
                    <input className={styles.autoSwitchInput} type="checkbox" checked={this.state.selectedKey} onChange={this.onSwichChanged.bind(this)}/>
                    <span className={styles.autoSwitchLabel} data-on={"On"} data-off="Off"></span>
                    <span className={styles.autoSwitchHandle}></span>
		        </label>
            </div>
        );
    }

    private onSwichChanged(ev: Event){
        let elem:HTMLInputElement=ev.target as HTMLInputElement;
        this.setState({selectedKey: elem.checked});
        if(this.props.onChanged){
            this.props.onChanged(elem.checked);
        }
    }
}