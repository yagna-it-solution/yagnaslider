import * as React from 'react';
import { IAutoPlayControlProps } from './IAutoPlayControlProps';
import styles from './AutoPlayControl.module.scss';

export interface IAutoPlayControlState{
    selectedKey: boolean;
}

export default class AutoPlayControl extends React.Component<IAutoPlayControlProps, IAutoPlayControlState> {
    constructor(props: IAutoPlayControlProps, state: IAutoPlayControlState) {
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