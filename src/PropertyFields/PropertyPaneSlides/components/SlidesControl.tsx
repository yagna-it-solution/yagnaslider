import * as React from 'react';
import { ISlidesControlProps } from './ISlidesControlProps';
import styles from './SlidesControl.module.scss';
import { SlidesProps } from '../../../webparts/yagnaSlider/components/SlidesProps';
import * as jQuery from 'jquery';
import { sp, Web, FileAddResult, Item, Items } from "@pnp/sp";
import { IDropdownOption, IColor, textAreaProperties } from 'office-ui-fabric-react';
import { TextField  } from '../../../Controls/TextField/TextField';
import { TextAreaField  } from '../../../Controls/TextAreaField/TextAreaField';
import { LinkField  } from '../../../Controls/LinkField/LinkField';
import { TextAlignControl  } from '../../../Controls/TextAlignment/TextAlignControl';
import { TextPositionControl  } from '../../../Controls/TextPosition/TextPositionControl';
import { YagnaColorPicker, RGBA_REGEX  } from '../../../Controls/YagnaColorPicker/YagnaColorPicker';
import { FontControl  } from '../../../Controls/FontControl/FontControl';
import { BackgroundOverlaySwitch  } from '../../../Controls/BackgroundOverlaySwitch/BackgroundOverlaySwitch';
import { HorizAlignControl  } from '../../../Controls/HorizAlignControl/HorizAlignControl';
import { VertAlignControl  } from '../../../Controls/VertAlignControl/VertAlignControl';
import { TextAlignLastProperty, TextAlignProperty } from 'csstype';

export interface ISlidesControlState{
    selectedSlides: SlidesProps[];
    slides: any[];
    images: any[];
    imglist: IDropdownOption[];
}

export default class SlidesControl extends React.Component<ISlidesControlProps, ISlidesControlState> {
    private prevStyleDiv: HTMLDivElement;
    private slideColors:string[]=["Aqua","Beige","Brown","BurlyWood","Chocolate","CornflowerBlue","DarkBlue","DarkGreen","DarkKhaki","DarkOrchid","DarkRed","OrangeRed","Peru","RoyalBlue","Maroon"];
    constructor(props: ISlidesControlProps, state: ISlidesControlState) {
        super(props);
        
        this.state = {
            selectedSlides: props.selectedSlides,
            slides: [],
            images: [],
            imglist: []
        };
    }

    public render(): JSX.Element{
        return (
            <div style={{display:'block',width:'100%',margin:'0',padding:'0',marginTop:'10px',backgroundColor:'#ffffff'}}>
                <p style={{display:'block',fontSize:'11px',color:'#888888',margin:'0',padding:'0',marginBottom:'3px'}}>{this.props.label}</p>
                <div style={{display:'block',width:'100%',margin:'0',padding:'5px 0',backgroundColor:'#ffffff'}}>
                    { this.state.slides }
                </div>
                <button style={{display:'flex',margin:'5px 5px 10px auto',
                    padding:'2px 15px',border:'none',outline:'none',
                    fontSize:'9px',textTransform:'uppercase',backgroundColor:'#39b54a',
                    flexDirection:'row',flexWrap:'nowrap',cursor:'pointer',
                    boxShadow:'0 0 3px rgba(0,0,0,0.3)'}} type='button' onClick={this.onAddButtonClick.bind(this)}>
                    <i className='fa fa-plus' style={{margin:'0 5px 0 0',padding:'0',lineHeight:'22px',color:'#eeeeee',fontSize:'10px'}}></i>
                    <p style={{display:'block',fontSize:'9px',color:'#ffffff',fontWeight:'bold',margin:'0',padding:'0',lineHeight:'22px'}}>{this.props.addButtonText}</p>
                </button>
            </div>
        );
    }

    public componentDidMount(){
        if(!this.state.selectedSlides) this.setState({selectedSlides: this.props.selectedSlides});
        this.loadSliderSlides();
        this.getSharePointImages().then((items: IDropdownOption[]) => {
            var images:any[] = [];
            var sels=document.getElementsByClassName('sharePointImages' + this.props.sliderId);
            for(var kk=0; kk<sels.length; kk++){
                var sel=sels[kk] as HTMLSelectElement;
                for(var jj=0; jj<items.length; jj++){
                    var item=items[jj];
                    var opt = document.createElement('option');
                    opt.value=item.key.toString();
                    opt.text=item.text;
                    opt.style.fontSize='11px';
                    opt.style.color='#888888';
                    sel.options.add(opt);
                    images.push({"key": item.key, "text": item.text});
                }
                $(sels[kk]).val(this.state.selectedSlides[kk].backgroundImage);
            }
            this.setState({images: images});
        });
    }

    private onAddButtonClick(ev: React.MouseEvent<HTMLButtonElement, MouseEvent>){
        var slide:SlidesProps={
            id: "Slide" + (!this.state.selectedSlides ? 1 : this.state.selectedSlides.length + 1),
            sliderId: this.props.sliderId,
            slideIndex: (!this.state.selectedSlides ? 1 : this.state.selectedSlides.length + 1),
            backgroundColor: this.slideColors[Math.round(Math.random() * this.slideColors.length)],
            backgroundImage: "",
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
            slideTitle: "Slide " + (!this.state.selectedSlides ? 1 : this.state.selectedSlides.length + 1) + " Heading",
            titleFontFamily: "Tahoma",
            titleFontWeight: "bold",
            slideDescription: "Click edit button to change this text. Lorem ipsum dolor sit amet consectetur adipiscing elit dolor",
            descFontFamily: "Arial",
            buttonText: "Click Here",
            buttonUrl: "",
            buttonIcon: "",
            urlOpenNewWindow: false,
            urlAddNoFollow: false
        };

        var slides=this.state.selectedSlides;
        slides.push(slide);
        this.setState({selectedSlides: slides});
        if(this.props.onChanged){
            this.props.onChanged(slides);
        }
        this.loadSliderSlides();

        this.getSharePointImages().then((items: IDropdownOption[]) => {
            var images:any[] = [];
            var sels=document.getElementsByClassName('sharePointImages' + this.props.sliderId);
            for(var kk=0; kk<sels.length; kk++){
                var sel=sels[kk] as HTMLSelectElement;
                for(var jj=0; jj<items.length; jj++){
                    var item=items[jj];
                    var opt = document.createElement('option');
                    opt.value=item.key.toString();
                    opt.text=item.text;
                    opt.style.fontSize='9px';
                    opt.style.color='#888888';
                    sel.options.add(opt);
                    images.push({"key": item.key, "text": item.text});
                }
                $(sels[kk]).val(this.state.selectedSlides[kk].backgroundImage);
            }
            this.setState({images: images});
        });
    }

    private getSharePointImages(): Promise<IDropdownOption[]>{
        return new Promise<IDropdownOption[]>(
            (resolve: (options: IDropdownOption[]) => void, 
            reject: (error) => void) => {
                setTimeout((): void => {
                    let options = [];
                    var list=sp.web.lists.getByTitle('Images');
                    if(list){
                        list.items.select("Title", "FileRef", "FieldValuesAsText/MetaInfo").expand("FieldValuesAsText").getAll().then((items: any[]) => {
                            if(items.length){
                                for(var jj=0; jj<items.length; jj++){
                                    var key=items[jj]['FileRef'];
                                    var text=items[jj]['FileRef'].replace(/^.*(\\|\/|\:)/, '');
                                    options.push({key: key, text: text});
                                }
                                resolve(options);
                                this.setState({imglist: options});
                            }
                        });
                    }
                }, 500);
            }
        );
    }

    private loadSliderSlides(){
        let slides:any[]=[];
        if(! this.state.selectedSlides) 
            return;

        for(var sldIndex=0; sldIndex<this.state.selectedSlides.length; sldIndex++){
            let slide:SlidesProps=this.state.selectedSlides[sldIndex];
            slides.push(
                <div key={'slide' + (sldIndex + 1)} style={{display:'block',width:'100%',margin:'7px 0',padding:'0',border:'none',outline:'none',boxSizing:'border-box'}}>
                    <div id={'slideButton' + this.props.sliderId + sldIndex} className={'slideButton' + this.props.sliderId} 
                            style={{display:'flex',flexDirection:'row',flexWrap:'nowrap',
                            margin:'2px 0',padding:'0',border:'1px solid #555555',boxSizing:'border-box',
                            background:'linear-gradient(to bottom, rgba(40,52,59,1) 0%,rgba(243,243,243,1) 50%,rgba(40,52,59,1) 100%)',
                            outline:'none',width:'100%',cursor:'pointer'}}
                            data-slide_id={sldIndex} onClick={this.onSlideClicked.bind(this)}>
                        <p style={{flexGrow:1,fontSize:'11px',color:'#000000',padding:'5px 0 5px 5px',
                                margin:'0',borderRight:'1px solid #555555',whiteSpace:'nowrap',
                                textOverflow:'hidden',overflow:'hidden'}}>{slide.slideTitle}</p>
                        <button type='button' style={{display:'block',outline:'none',
                                border:'none',fontSize:'10px',backgroundColor:'transparent',
                                height:'100%',padding:'0 8px',lineHeight:'25px',cursor:'pointer',
                                }} onClick={(ev: React.MouseEvent<HTMLButtonElement, MouseEvent>) => { this._onSlideRemoveClicked(slide); }}>
                            <i className='fa fa-trash' style={{color:'#333333',cursor:'pointer',lineHeight:'25px',backgroundColor:'transparent'}}></i>
                        </button>
                    </div>
                    <div id={'slideStyleContent' + this.props.sliderId + sldIndex} className={'slideStyleContent' + this.props.sliderId}
                            style={{display:'none',borderLeft:'0.5px solid #888888',
                            borderRight:'0.5px solid #888888',borderBottom:'0.5px solid #888888',
                            padding:'5px'}}>
                        <div style={{display:'block',width:'100%',margin:'0',padding:'0'}}>
                            <div className='w3-bar w3-black' style={{display:'flex',flexDirection:'row',flexWrap:'nowrap'}}>
                                <button id={'Slide' + this.props.sliderId + sldIndex + '1'} className='w3-bar-item w3-button tablink w3-red' onClick={(ev: React.MouseEvent<HTMLButtonElement, MouseEvent>) => this.onSlidesTabClicked(ev, 'Background')} data-slide_index={sldIndex} style={{flexGrow:1,fontSize:'9px',textTransform:'uppercase',fontWeight:'bold'}}>{'Background'}</button>
                                <button id={'Slide' + this.props.sliderId + sldIndex + '2'} className='w3-bar-item w3-button tablink' onClick={(ev: React.MouseEvent<HTMLButtonElement, MouseEvent>) => this.onSlidesTabClicked(ev, 'Content')} data-slide_index={sldIndex} style={{flexGrow:1,fontSize:'9px',textTransform:'uppercase',fontWeight:'bold'}}>{'Content'}</button>
                                <button id={'Slide' + this.props.sliderId + sldIndex + '3'} className='w3-bar-item w3-button tablink' onClick={(ev: React.MouseEvent<HTMLButtonElement, MouseEvent>) => this.onSlidesTabClicked(ev, 'Style')} data-slide_index={sldIndex} style={{flexGrow:1,fontSize:'9px',textTransform:'uppercase',fontWeight:'bold'}}>{'Styles'}</button>
                            </div>
                            <div id={'Background' + this.props.sliderId + sldIndex} className='w3-container w3-border city' style={{padding:'0',paddingTop:'10px',boxSizing:'border-box'}}>
                                <div style={{position:'relative',display:'block',width:'100%',margin:'5px 0 0 0',padding:'0 7px 0 0',boxSizing:'border-box'}}>
                                    <div style={{display:'flex',flexDirection:'row',flexWrap:'nowrap',width:'100%',margin:'0',padding:'0'}}>
                                        <p style={{display:'block',flexGrow:1,fontSize:'11px',color:'#888888',margin:'0',padding:'0',lineHeight:'27px'}}>{'Select Color'}</p>
                                        <input id={'yagnaSlideBackColorBtn' + this.props.sliderId + sldIndex} type='checkbox' style={{display:'none',width:'1px',height:'1px'}} onChange={(ev: React.ChangeEvent<HTMLInputElement>) => { this._onDropDownCheckedChanged(ev, slide); }}/>
                                        <label htmlFor={'yagnaSlideBackColorBtn' + this.props.sliderId + sldIndex} style={{position:'relative',display:'block',
                                                backgroundImage:'url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAIAAAHnlligAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAHJJREFUeNpi+P///4EDBxiAGMgCCCAGFB5AADGCRBgYDh48CCRZIJS9vT2QBAggFBkmBiSAogxFBiCAoHogAKIKAlBUYTELAiAmEtABEECk20G6BOmuIl0CIMBQ/IEMkO0myiSSraaaBhZcbkUOs0HuBwDplz5uFJ3Z4gAAAABJRU5ErkJggg==")',
                                                width:'50px',height:'26px',border:'0.5px solid #888888',outline:'none',
                                                padding:'1px',boxShadow:'inset 0 0 0 3px #fff',borderRadius:'2px',cursor:'pointer'}}>
                                            <span id={'backColorDisplay' + this.props.sliderId + sldIndex} style={{position:'absolute',left:0,top:0,width:'calc(100% - 4px)',height:'calc(100% - 4px)',margin:'2px',backgroundColor:slide.backgroundColor,border:'none',outline:'none',borderRadius:'2px'}}></span>
                                        </label>
                                    </div>
                                    <div id={'yagnaSliderBackColorPicker' + this.props.sliderId + sldIndex} style={{position:'absolute',display:'none',width:'180px',minHeight:'180px',margin:'10px 0 0 auto',border:'none',outline:'none',boxShadow:'0 2px 15px rgba(0,0,0,0.3)',top:'26px',right:'0',backgroundColor:'rgba(0,0,0,0.7)'}}>
                                        <div style={{position:'relative',display:'block',width:'100%',height:'100%',margin:'0',padding:'0'}}>
                                            <div style={{position:'absolute',content: "",top: '-16px',right: '22px',border:'8px solid transparent',borderBottomColor:'rgba(0,0,0,0.7)'}}></div>
                                            <div id={'backColorPicker' + this.props.sliderId + sldIndex} style={{display:'block',width:'180px',margin:'0',padding:'8px 0'}}>
                                                <YagnaColorPicker color={slide.backgroundColor} onChange={(ev: React.SyntheticEvent<HTMLElement, Event>, color: IColor) => { this._onSlideBackgroundChanged(slide, color.str); }}/>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div style={{display:'block',width:'100%',margin:'0',padding:'0',marginTop:'10px'}}>
                                    <p style={{display:'block',margin:'0',padding:'0',fontSize:'11px',color:'#888888'}}>{'Image'}</p>
                                    <div style={{display:'flex',flexDirection:'row',flexWrap:'nowrap',width:'100%',margin:'5px 0'}}>
                                        <p style={{flexGrow:1,fontSize:'11px',color:'#888888',margin:'0',padding:'0',lineHeight:'16px'}}>{'Select Image'}</p>
                                        <select className={'sharePointImages' + this.props.sliderId} style={{display:'block',width:'88px',border:'0.5px solid #888888',
                                                outline:'none',fontSize:'11px',padding:'2px 0',color:'#888888',
                                                borderRadius:'2px',marginRight:'7px'}} value={ slide.backgroundImage }
                                                onChange={(ev: React.ChangeEvent<HTMLSelectElement>) => { this._onImageSelectChanged(ev, slide); }}>
                                        </select>
                                    </div>
                                    <div id={'slideImagePreview' + this.props.sliderId + sldIndex} className={styles.imageViewer} style={{position:'relative',backgroundImage:'url(' + this.state.selectedSlides[sldIndex].backgroundImage + ')',
                                            backgroundPosition:'center center',backgroundSize:'cover',
                                            backgroundRepeat:'no-repeat',marginBottom:'10px'}}
                                            onClick={(ev: React.MouseEvent<HTMLDivElement, MouseEvent>) => { this._onUploadImageClicked(slide); }}>
                                        <span className='fa fa-trash' aria-hidden={true} style={{position:'absolute',display:slide.backgroundImage ? 'block' : 'none',width:'20px',height:'20px',left:'calc(100% - 30px)',top:'15px',padding:'0',fontSize:'14px',color:'rgba(45,45,45,0.7)',backgroundColor:'rgba(255,255,255,0.5)',textAlign:'center',lineHeight:'20px'}}></span>
                                        <i className='fa fa-plus' aria-hidden={true}></i>
                                        <input id={'slidePreviewUpload' + this.props.sliderId + sldIndex} type={'file'} style={{visibility:'collapse'}} multiple={false} accept={'image/*'} onChange={(ev: React.ChangeEvent<HTMLInputElement>) => { this._onFileUploadChanged(slide, ev.target.files); }}/>
                                        <span>{'Upload Image'}</span>
                                    </div>
                                </div>
                                <div style={{display:slide.backgroundImage ? 'flex' : 'none', flexDirection:slide.backgroundImage ? 'row' : 'initial', flexWrap:'nowrap',width:'100%',marginTop:'10px',paddingRight:'5px',boxSizing:'border-box'}}>
                                    <p style={{flexGrow:1,fontSize:'11px',color:'#888888',margin:'0',padding:'0',lineHeight:'16px'}}>{'Image Size'}</p>
                                    <select value={slide.backgroundSize ? slide.backgroundSize : 'cover'} style={{display:'block',width:'88px',margin:'0',padding:'3px 0',
                                            border:'0.5px solid #888888',outline:'none',fontSize:'11px',color:'#888888',borderRadius:'2px'}}
                                            onChange={(ev: React.ChangeEvent<HTMLSelectElement>) => { this._onImageBackgroundSizeChanged(slide, ev.target.value); }}>
                                        <option key='cover' value='cover' style={{fontSize:'11px',color:'#888888'}}>{'Cover'}</option>
                                        <option key='contain' value='contain' style={{fontSize:'11px',color:'#888888'}}>{'Contain'}</option>
                                        <option key='auto' value='auto' style={{fontSize:'11px',color:'#888888'}}>{'Auto'}</option>
                                    </select> 
                                </div>
                                <div  style={{display:slide.backgroundImage ? 'block' : 'none',width:'100%',marginTop:'10px',marginBottom:'10px'}}>
                                    <BackgroundOverlaySwitch label='Background Overlay' selectedKey={slide.backgroundOverlay} onChanged={(value: boolean) => {this._onOverlaySwichChanged(slide, value);}}/>
                                </div>
                                <div id={'yagnaSlideOverlay' + this.props.sliderId + sldIndex} style={{position:'relative',display:'none',width:'100%',margin:'5px 0 0 0',padding:'0 7px 0 0',boxSizing:'border-box'}}>
                                    <div style={{display:'flex',flexDirection:'row',flexWrap:'nowrap',width:'100%',margin:'0',padding:'0'}}>
                                        <p style={{display:'block',flexGrow:1,fontSize:'11px',color:'#888888',margin:'0',padding:'0',lineHeight:'27px'}}>{'Select Color'}</p>
                                        <input id={'yagnaSlideOverlayColorBtn' + this.props.sliderId + sldIndex} type='checkbox' style={{display:'none',width:'1px',height:'1px'}} onChange={(ev: React.ChangeEvent<HTMLInputElement>) => { this._onOverlayCheckedChanged(ev, slide); }}/>
                                        <label htmlFor={'yagnaSlideOverlayColorBtn' + this.props.sliderId + sldIndex} style={{position:'relative',display:'block',
                                                backgroundImage:'url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAIAAAHnlligAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAHJJREFUeNpi+P///4EDBxiAGMgCCCAGFB5AADGCRBgYDh48CCRZIJS9vT2QBAggFBkmBiSAogxFBiCAoHogAKIKAlBUYTELAiAmEtABEECk20G6BOmuIl0CIMBQ/IEMkO0myiSSraaaBhZcbkUOs0HuBwDplz5uFJ3Z4gAAAABJRU5ErkJggg==")',
                                                width:'50px',height:'26px',border:'0.5px solid #888888',outline:'none',
                                                padding:'1px',boxShadow:'inset 0 0 0 3px #fff',borderRadius:'2px',cursor:'pointer'}}>
                                            <span id={'OverlayColorDisplay' + this.props.sliderId + sldIndex} style={{position:'absolute',left:0,top:0,width:'calc(100% - 4px)',height:'calc(100% - 4px)',margin:'2px',backgroundColor:slide.backgroundOverlayColor,border:'none',outline:'none',borderRadius:'2px'}}></span>
                                        </label>
                                    </div>
                                    <div id={'yagnaSliderOverlayColorPicker' + this.props.sliderId + sldIndex} style={{position:'absolute',display:'none',width:'180px',minHeight:'180px',margin:'10px 0 0 auto',border:'none',outline:'none',boxShadow:'0 2px 15px rgba(0,0,0,0.3)',top:'26px',right:'0',backgroundColor:'rgba(0,0,0,0.7)'}}>
                                        <div style={{position:'relative',display:'block',width:'100%',height:'100%',margin:'0',padding:'0'}}>
                                            <div style={{position:'absolute',content: "",top: '-16px',right: '22px',border:'8px solid transparent',borderBottomColor:'rgba(0,0,0,0.7)'}}></div>
                                            <div id={'OverlayColorPicker' + this.props.sliderId + sldIndex} style={{display:'block',width:'180px',margin:'0',padding:'8px 0'}}>
                                                <YagnaColorPicker color={slide.backgroundOverlayColor} onChange={(ev: React.SyntheticEvent<HTMLElement, Event>, color: IColor) => { this._onSlideOverlayColorChanged(slide, color.str); }}/>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div style={{display:'flex',flexDirection:'row',flexWrap:'nowrap',width:'100%',margin:'10px 0 10px 0',padding:'0 5px 0 0',boxSizing:'border-box'}}>
                                    <p style={{flexGrow:1,fontSize:'11px',color:'#888888',margin:'0',padding:'0',lineHeight:'22px'}}>{'Blend Mode'}</p>
                                    <select id={'yagnaSlideBlendMode' + this.props.sliderId + sldIndex} value={slide.backgroundBlendMode} style={{display:'block',
                                            width:'88px',border:'0.5px solid #888888',outline:'none',
                                            fontSize:'11px',color:'#888888',margin:'0',padding:'3px 0 3px 4px',
                                            borderRadius:'2px'}} onChange={(ev: React.ChangeEvent<HTMLSelectElement>) => { this._onSlideBlendModeChanged(slide, ev.target.value); }}>
                                        <option key='normal' value='normal' style={{fontSize:'11px',color:'#888888'}}>{'Normal'}</option>
                                        <option key='multiply' value='multiply' style={{fontSize:'11px',color:'#888888'}}>{'Multiply'}</option>
                                        <option key='screen' value='screen' style={{fontSize:'11px',color:'#888888'}}>{'Screen'}</option>
                                        <option key='overlay' value='overlay' style={{fontSize:'11px',color:'#888888'}}>{'Overlay'}</option>
                                        <option key='darken' value='darken' style={{fontSize:'11px',color:'#888888'}}>{'Darken'}</option>
                                        <option key='lighten' value='lighten' style={{fontSize:'11px',color:'#888888'}}>{'Lighten'}</option>
                                        <option key='color-dodge' value='color-dodge' style={{fontSize:'11px',color:'#888888'}}>{'Color Dodge'}</option>
                                        <option key='saturation' value='saturation' style={{fontSize:'11px',color:'#888888'}}>{'Saturation'}</option>
                                        <option key='color' value='color' style={{fontSize:'11px',color:'#888888'}}>{'Color'}</option>
                                        <option key='luminosity' value='luminosity' style={{fontSize:'11px',color:'#888888'}}>{'Luminosity'}</option>
                                    </select>
                                </div>
                            </div>
                            <div id={'Content' + this.props.sliderId + sldIndex} className="w3-container w3-border city" style={{padding:'0',paddingTop:'10px',boxSizing:'border-box'}}>
                                <div style={{display:'block',width:'100%',margin:'5px 0',padding:'0 10px 0 0',boxSizing:'border-box'}}>
                                    <p style={{flexGrow:1,fontSize:'11px',color:'#888888',margin:'0',padding:'0',lineHeight:'22px'}}>{'Slide Title'}</p>
                                    <TextField width='100%' selectedText={slide.slideTitle} placeHolder={'Title'} onChanged={(value: string) => { this._onSlideTitleChanged(value, slide); }}/>
                                </div>
                                <div style={{display:'block',width:'100%',margin:'15px 0',padding:'0 5px 0 0',boxSizing:'border-box'}}>
                                    <p style={{fontSize:'11px',color:'#888888',margin:'0',padding:'0',lineHeight:'16px'}}>{'Slide Description'}</p>
                                    <TextAreaField selectedText={slide.slideDescription} placeHolder={'Description'} onChanged={(value: string) => { this._onSlideDescriptionChanged(value, slide); }}/>
                                </div>
                                <div style={{display:'flex',flexDirection:'row',flexWrap:'nowrap',width:'100%',marginTop:'15px',padding:'0 5px 0 0',boxSizing:'border-box'}}>
                                    <p style={{flexGrow:1,fontSize:'11px',color:'#888888',margin:'0',padding:'0',lineHeight:'22px'}}>{'Button Text'}</p>
                                    <TextField selectedText={slide.buttonText} width='88px' placeHolder={'Button Text'} onChanged={(value: string) => { this._onButtonTextChanged(value, slide); }}/>
                                </div>
                                <div style={{display:'block',width:'100%',margin:'15px 0',padding:'0 5px 0 0',boxSizing:'border-box'}}>
                                    <p style={{flexGrow:1,fontSize:'11px',color:'#888888',margin:'0',padding:'0',lineHeight:'22px'}}>{'Button Link'}</p>
                                    <LinkField selectedLink={slide.buttonUrl} placeHolder='https://your-link.com' openNewWindow={slide.urlOpenNewWindow} addNoFollow={slide.urlAddNoFollow} onChanged={(link: string, openNewWindow: boolean, addNoFollow: boolean) => { this._onButtonLinkChanged(slide, link, openNewWindow, addNoFollow); }}/>
                                </div>
                            </div>
                            <div id={'Style' + this.props.sliderId + sldIndex} className='w3-container w3-border city' style={{padding:'0',paddingTop:'10px',boxSizing:'border-box'}}>
                                <HorizAlignControl sliderId={this.props.sliderId} sldIndex={sldIndex} label={'Horizontal Position'} selectedAlign={slide.contentHorizPosition} onChanged={(align: string) => { this._onSlideHorizAlignChanged(slide, align); }}/>
                                <VertAlignControl sliderId={this.props.sliderId} sldIndex={sldIndex} label={'Vertical Position'} selectedAlign={slide.contentVertPosition} onChanged={(align: string) => { this._onSlideVertAlignChanged(slide, align); }}/>
                                <TextAlignControl label='Text Alignment' leftAlignTitle='Left Align' rightAlignTitle='Right Align' centerAlignTitle='Center Align' justifyAlignTitle='Justify Align' selectedKey={slide.textAlign ? slide.textAlign : 'center'} 
                                        disabled={false} onChanged={(value) => { this._onSlideTextAlignChanged(slide, value); }}/>
                                <div id={'yagnaSlideContentColor' + this.props.sliderId + sldIndex} style={{position:'relative',display:'block',width:'100%',margin:'20px 0 0 0',padding:'0 7px 0 0',boxSizing:'border-box'}}>
                                    <div style={{display:'flex',flexDirection:'row',flexWrap:'nowrap',width:'100%',margin:'0',padding:'0'}}>
                                        <p style={{display:'block',flexGrow:1,fontSize:'11px',color:'#888888',margin:'0',padding:'0',lineHeight:'27px'}}>{'Content Color'}</p>
                                        <input id={'yagnaSlideContentColorBtn' + this.props.sliderId + sldIndex} type='checkbox' style={{display:'none',width:'1px',height:'1px'}} onChange={(ev: React.ChangeEvent<HTMLInputElement>) => { this._onContentColorCheckedChanged(ev, slide); }}/>
                                        <label htmlFor={'yagnaSlideContentColorBtn' + this.props.sliderId + sldIndex} style={{position:'relative',display:'block',
                                                backgroundImage:'url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAIAAAHnlligAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAHJJREFUeNpi+P///4EDBxiAGMgCCCAGFB5AADGCRBgYDh48CCRZIJS9vT2QBAggFBkmBiSAogxFBiCAoHogAKIKAlBUYTELAiAmEtABEECk20G6BOmuIl0CIMBQ/IEMkO0myiSSraaaBhZcbkUOs0HuBwDplz5uFJ3Z4gAAAABJRU5ErkJggg==")',
                                                width:'50px',height:'26px',border:'0.5px solid #888888',outline:'none',
                                                padding:'1px',boxShadow:'inset 0 0 0 3px #fff',borderRadius:'2px',cursor:'pointer'}}>
                                            <span id={'ContentColorDisplay' + this.props.sliderId + sldIndex} style={{position:'absolute',left:0,top:0,width:'calc(100% - 6px)',height:'calc(100% - 6px)',margin:'2px',backgroundColor:slide.textColor,border:'1px solid #a4afb7',outline:'none',borderRadius:'2px'}}></span>
                                        </label>
                                    </div>
                                    <div id={'yagnaSliderContentColorPicker' + this.props.sliderId + sldIndex} style={{position:'absolute',display:'none',width:'180px',minHeight:'180px',margin:'10px 0 0 auto',border:'none',outline:'none',boxShadow:'0 2px 15px rgba(0,0,0,0.3)',top:'26px',right:'0',backgroundColor:'rgba(0,0,0,0.7)'}}>
                                        <div style={{position:'relative',display:'block',width:'100%',height:'100%',margin:'0',padding:'0'}}>
                                            <div style={{position:'absolute',content: "",top: '-16px',right: '22px',border:'8px solid transparent',borderBottomColor:'rgba(0,0,0,0.7)'}}></div>
                                            <div id={'ContentColorPicker' + this.props.sliderId + sldIndex} style={{display:'block',width:'180px',margin:'0',padding:'8px 0'}}>
                                                <div style={{display:'flex',flexDirection:'row',flexWrap:'nowrap',width:'100%',margin:'7px 0',padding:'0 5px 0 0',boxSizing:'border-box'}}>
                                                    <p style={{flexGrow:1,fontSize:'11px',color:'#aaaaaa',margin:'0',padding:'0',lineHeight:'18px'}}>{'Color'}</p>
                                                    <input type='text' id={'ContentColorView' + this.props.sliderId + sldIndex} value={slide.textColor} style={{display:'block',width:'92px',
                                                            border:'1px solid #a4afb7',outline:'none',padding:'3px',
                                                            margin:'0',fontSize:'12px',color:'#888888',borderRadius:'2px'}}/> 
                                                </div>
                                                <YagnaColorPicker color={slide.textColor} onChange={(ev: React.SyntheticEvent<HTMLElement, Event>, color: IColor) => { this._onSlideContentColorChanged(slide, color.str); }}/>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div style={{display:'block',width:'100%',margin:'15px 0 0 0',padding:'0 5px 0 0',boxSizing:'border-box'}}>
                                    <FontControl label='Title Font' selectedFont={slide.titleFontFamily} onChanged={(fontName: string) => { this._onTitleFontChanged(slide, fontName); }} disabled={false}/>
                                </div>
                                <div style={{display:'block',width:'100%',margin:'15px 0',padding:'0 5px 0 0',boxSizing:'border-box'}}>
                                    <FontControl label='Description Font' selectedFont={slide.descFontFamily} onChanged={(fontName: string) => { this._onDescFontChanged(slide, fontName); }} disabled={false}/>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            );
        }

        this.setState({slides: slides});
    }

    private onSlideClicked(ev: Event){
        let elem1:HTMLDivElement=ev.target as HTMLDivElement;
        let parent:HTMLDivElement=elem1.parentNode as HTMLDivElement;
        if(parent){
            let elem2:HTMLDivElement=document.getElementById('slideStyleContent' + this.props.sliderId + parent.attributes.getNamedItem('data-slide_id').value) as HTMLDivElement;
            elem2.style.display=elem2.style.display==='block' ? 'none' : 'block';
            jQuery(elem2.getElementsByClassName('w3-button')[0]).click();
            if(this.prevStyleDiv && this.prevStyleDiv!==elem2){
                this.prevStyleDiv.style.display='none';
            }
            this.prevStyleDiv=elem2;
        }
    }

    private _onSlideRemoveClicked(slide: SlidesProps){
        var slides=this.state.selectedSlides;
        var idx = slides.indexOf(slide);
        slides.splice(idx, 1);
        this.setState({selectedSlides: slides});
        if(this.props.onChanged){
            this.props.onChanged(slides);
        }
        this.loadSliderSlides();
    }

    private onSlidesTabClicked(ev: React.MouseEvent<HTMLButtonElement, MouseEvent>, tabName: string){
        var i, x, tablinks;
        x = document.getElementsByClassName("city");
        for (i = 0; i < x.length; i++) {
          x[i].style.display = "none";
        }
        tablinks = document.getElementsByClassName("tablink");
        for (i = 0; i < x.length; i++) {
          tablinks[i].className = tablinks[i].className.replace(" w3-red", "");
        }
        i=jQuery(ev.target).data('slide_index');
        let id=tabName.trim()+this.props.sliderId.trim() + i.toString();
        document.getElementById(id).style.display = "block";
        jQuery(ev.target).addClass('w3-red');
    }

    private _onSlideBackgroundChanged(slide:SlidesProps, color: string){
        slide.backgroundColor=color;
        var slides=this.state.selectedSlides;
        var idx = slides.indexOf(slide);
        slides[idx]=slide;
        this.setState({selectedSlides: slides});

        $('#backColorDisplay' + this.props.sliderId + idx).css({
            'background-color': color
        });

        if(this.props.onChanged){
            this.props.onChanged(slides);
        }
    }

    private _onDropDownCheckedChanged(ev: React.ChangeEvent<HTMLInputElement>, slide: SlidesProps){
        var slides=this.state.selectedSlides;
        var idx = slides.indexOf(slide);
        var elem=jQuery('#yagnaSliderBackColorPicker' + this.props.sliderId + idx);
        if(ev.target.checked){
            jQuery(elem).css({'display': 'block','z-index': 3000});
        }
        else if(!ev.target.checked){
            jQuery(elem).css({'display': 'none','z-index': ''});
        }
    }

    private _onImageSelectChanged(ev: React.ChangeEvent<HTMLSelectElement>, slide: SlidesProps){
        var elem:HTMLSelectElement=ev.target as HTMLSelectElement;
        var opt:HTMLOptionElement=elem.options[elem.selectedIndex];
        var slides=this.state.selectedSlides;
        slide.backgroundImage=opt.value;
        var idx = slides.indexOf(slide);
        var dv: HTMLDivElement=document.getElementById('slideImagePreview' + this.props.sliderId + idx) as HTMLDivElement;
        dv.style.backgroundImage='url(' + opt.value + ')';
        slides[idx]=slide;
        this.setState({selectedSlides: slides});
        if(this.props.onChanged){
            this.props.onChanged(slides);
        }
        var sels=document.getElementsByClassName('sharePointImages' + this.props.sliderId);
        $(sels[idx]).val(opt.value);
    }

    private _onUploadImageClicked(slide: SlidesProps){
        var slides=this.state.selectedSlides;
        var idx = slides.indexOf(slide);
        var elem=jQuery('#slidePreviewUpload' + this.props.sliderId + idx);
        jQuery(elem).click();
    }

    private _onFileUploadChanged(slide: SlidesProps, files: FileList){
        if(!files) return;

        if (!files[0].name.match(/.(jpg|jpeg|png|gif)$/i)){
            alert('Not an image file');
            return;
        }

        var web:Web=sp.web;
        web.lists.getByTitle('Images').rootFolder.files.add(files[0].name, files[0], true).then((result: FileAddResult) => {
            result.file.listItemAllFields.get().then((listItemAllFields) => {
                web.lists.getByTitle('Images').items.getById(listItemAllFields.Id).update({
                    Title: files[0].name
                });
                web.lists.getByTitle('Images').items.getById(listItemAllFields.Id).select('File').expand('File').get().then((fileProps:any) => {
                    var slides=this.state.selectedSlides;
                    slide.backgroundImage=fileProps.File.ServerRelativeUrl;
                    var idx = slides.indexOf(slide);
                    var dv: HTMLDivElement=document.getElementById('slideImagePreview' + this.props.sliderId + idx) as HTMLDivElement;
                    dv.style.backgroundImage='url(' + fileProps.File.ServerRelativeUrl + ')';
                    slides[idx]=slide;
                    this.setState({selectedSlides: slides});
                    if(this.props.onChanged){
                        this.props.onChanged(slides);
                    }
                });
            });
        });
    }

    private _onImageBackgroundSizeChanged(slide:SlidesProps, value: string){
        slide.backgroundSize=value;
        var slides=this.state.selectedSlides;
        var idx = slides.indexOf(slide);
        slides[idx]=slide;
        this.setState({selectedSlides: slides});
        if(this.props.onChanged){
            this.props.onChanged(slides);
        }
    }

    private _onOverlaySwichChanged(slide: SlidesProps, value: boolean){
        slide.backgroundOverlay=value;
        var slides=this.state.selectedSlides;
        var idx = slides.indexOf(slide);
        slides[idx]=slide;
        this.setState({selectedSlides: slides});
        if(this.props.onChanged){
            this.props.onChanged(slides);
        }
        if(value) 
            $('#yagnaSlideOverlay' + this.props.sliderId + idx).css({'display': 'block'});
        else
            $('#yagnaSlideOverlay' + this.props.sliderId + idx).css({'display': 'none'});
    }

    private _onOverlayCheckedChanged(ev: React.ChangeEvent<HTMLInputElement>, slide: SlidesProps){
        var slides=this.state.selectedSlides;
        var idx = slides.indexOf(slide);
        var elem=jQuery('#yagnaSliderOverlayColorPicker' + this.props.sliderId + idx);
        if(ev.target.checked){
            jQuery(elem).css({'display': 'block','z-index': 3000});
        }
        else if(!ev.target.checked){
            jQuery(elem).css({'display': 'none','z-index': ''});
        }
    }

    private _onSlideOverlayColorChanged(slide:SlidesProps, color: string){
        slide.backgroundOverlayColor=color;
        var slides=this.state.selectedSlides;
        var idx = slides.indexOf(slide);
        slides[idx]=slide;
        this.setState({selectedSlides: slides});

        $('#OverlayColorDisplay' + this.props.sliderId + idx).css({
            'background-color': color
        });

        if(this.props.onChanged){
            this.props.onChanged(slides);
        }
    }

    private _onSlideBlendModeChanged(slide:SlidesProps, blendMode: string){
        slide.backgroundBlendMode=blendMode;
        var slides=this.state.selectedSlides;
        var idx = slides.indexOf(slide);
        slides[idx]=slide;
        this.setState({selectedSlides: slides});

        if(this.props.onChanged){
            this.props.onChanged(slides);
        }
    }

    private _onSlideTitleChanged(value: string, slide: SlidesProps){
        slide.slideTitle=value;
        var slides=this.state.selectedSlides;
        var idx = slides.indexOf(slide);
        slides[idx]=slide;
        this.setState({selectedSlides: slides});
        if(this.props.onChanged){
            this.props.onChanged(slides);
        }
    }

    private _onSlideDescriptionChanged(value: string, slide: SlidesProps){
        slide.slideDescription=value;
        var slides=this.state.selectedSlides;
        var idx = slides.indexOf(slide);
        slides[idx]=slide;
        this.setState({selectedSlides: slides});
        if(this.props.onChanged){
            this.props.onChanged(slides);
        }
    }

    private _onButtonTextChanged(value: string, slide: SlidesProps){
        slide.buttonText=value;
        var slides=this.state.selectedSlides;
        var idx = slides.indexOf(slide);
        slides[idx]=slide;
        this.setState({selectedSlides: slides});
        if(this.props.onChanged){
            this.props.onChanged(slides);
        }
    }

    private _onButtonLinkChanged(slide: SlidesProps, linkText: string, openNewWindow: boolean, addNoFollow: boolean){
        slide.buttonUrl=linkText;
        slide.urlOpenNewWindow=openNewWindow;
        slide.urlAddNoFollow=addNoFollow;
        var slides=this.state.selectedSlides;
        var idx = slides.indexOf(slide);
        slides[idx]=slide;
        this.setState({selectedSlides: slides});
        if(this.props.onChanged){
            this.props.onChanged(slides);
        }
    }

    private _onSlideHorizAlignChanged(slide: SlidesProps, align: string){
        slide.contentHorizPosition=align;
        var slides=this.state.selectedSlides;
        var idx = slides.indexOf(slide);
        slides[idx]=slide;
        this.setState({selectedSlides: slides});
        if(this.props.onChanged){
            this.props.onChanged(slides);
        }
    }

    private _onSlideVertAlignChanged(slide: SlidesProps, align: string){
        slide.contentVertPosition=align;
        var slides=this.state.selectedSlides;
        var idx = slides.indexOf(slide);
        slides[idx]=slide;
        this.setState({selectedSlides: slides});
        if(this.props.onChanged){
            this.props.onChanged(slides);
        }
    }

    private _onSlideTextAlignChanged(slide: SlidesProps, align: string){
        slide.textAlign=align as TextAlignProperty;
        var slides=this.state.selectedSlides;
        var idx = slides.indexOf(slide);
        slides[idx]=slide;
        this.setState({selectedSlides: slides});
        if(this.props.onChanged){
            this.props.onChanged(slides);
        }
    }

    private _onContentColorCheckedChanged(ev: React.ChangeEvent<HTMLInputElement>, slide: SlidesProps){
        var slides=this.state.selectedSlides;
        var idx = slides.indexOf(slide);
        var elem=jQuery('#yagnaSliderContentColorPicker' + this.props.sliderId + idx);
        if(ev.target.checked){
            jQuery(elem).css({'display': 'block','z-index': 3000});
        }
        else if(!ev.target.checked){
            jQuery(elem).css({'display': 'none','z-index': ''});
        }
    }

    private _onSlideContentColorChanged(slide:SlidesProps, color: string){
        slide.textColor=color;
        var slides=this.state.selectedSlides;
        var idx = slides.indexOf(slide);
        slides[idx]=slide;
        this.setState({selectedSlides: slides});

        $('#ContentColorDisplay' + this.props.sliderId + idx).css({
            'background-color': color
        });

        $('#ContentColorView' + this.props.sliderId + idx).val(color);

        if(this.props.onChanged){
            this.props.onChanged(slides);
        }
    }

    private _onTitleFontChanged(slide: SlidesProps, fontName: string){
        slide.titleFontFamily=fontName;
        var slides=this.state.selectedSlides;
        var idx = slides.indexOf(slide);
        slides[idx]=slide;
        this.setState({selectedSlides: slides});
        if(this.props.onChanged){
            this.props.onChanged(slides);
        }
    }

    private _onDescFontChanged(slide: SlidesProps, fontName: string){
        slide.descFontFamily=fontName;
        var slides=this.state.selectedSlides;
        var idx = slides.indexOf(slide);
        slides[idx]=slide;
        this.setState({selectedSlides: slides});
        if(this.props.onChanged){
            this.props.onChanged(slides);
        }
    }
}