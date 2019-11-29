import * as React from 'react';
import styles from './YagnaSlider.module.scss';
import { IYagnaSliderProps } from './IYagnaSliderProps';
import { escape } from '@microsoft/sp-lodash-subset';
import * as $ from 'jquery';
import { SlidesProps } from './SlidesProps';
import { YSliderTimer } from './YSliderTimer';
import { sp } from '@pnp/sp';
import { ITransitionOption } from './ITransitionOption';

export interface IYagnaSliderState{
  currentIndex: number;
  blankImageLoaded: boolean;
  slides: any[];
  navButtons: any[];
  isAnimating: boolean;
}

export default class YagnaSlider extends React.Component<IYagnaSliderProps, IYagnaSliderState> {
  private SliderTimeout: YSliderTimer;
  constructor(props: IYagnaSliderProps, state: IYagnaSliderState){
    super(props);
    this.state={
      currentIndex: 0,
      blankImageLoaded: false,
      slides:this.getSlides(props.slidesProps),
      navButtons: this.getSlideNavButtons(props.slidesProps),
      isAnimating: false
    };
  }

  public render(): React.ReactElement<IYagnaSliderProps> {
    return (
      <div id={'yagnaContainer' + this.props.sliderId} className='yagnaContainer' style={{position:'relative',display:'block',width:'100%',margin:'0',padding:'0',overflow:'hidden'}}>
        <img id={'yagnaSliderBlankImg' + this.props.sliderId} src={require('../assets/blank.png')} style={{display:'none',width:'100%',height:'auto',margin:'0',padding:'0'}}/>
        <ul id={'yagnaSlider' + this.props.sliderId} className='yagnaslider' style={{position:'relative',display:'block',width:'100%',padding:'0',margin:'0',listStyle:'none',listStyleType:'none',maxHeight:this.props.sliderHeight+'px',maxWidth:'100%',overflow:'hidden'}}>
          { this.state.slides }
        </ul>
        <div id={'slideNavButton' + this.props.sliderId + '1'} style={{position:'absolute',display: this.props.navigationType=='Arrows' || this.props.navigationType=='ArrowsAndDots' ? 'block' : 'none',width:'32px',
            height:'32px',background:'url('+ require('../assets/' + this.props.slideNavImg + '.png') +') no-repeat left top',
            zIndex:5599,left:0,top:'calc(50% - 16px)',cursor:'pointer'}}/>
        <div id={'slideNavButton' + this.props.sliderId + '2'} style={{position:'absolute',display:this.props.navigationType=='Arrows' || this.props.navigationType=='ArrowsAndDots' ? 'block' : 'none',width:'32px',
            height:'32px',background:'url('+ require('../assets/' + this.props.slideNavImg + '.png') +') no-repeat right top',
        zIndex:5598,right:0,top:'calc(50% - 16px)',cursor:'pointer'}}/>
        <div id={'sliderNavBar' + this.props.sliderId} className='sliderNavBar' style={{position:'absolute',display:this.props.navigationType=='Dots' || this.props.navigationType=='ArrowsAndDots' ? 'block' : 'none',width:'100%',height:'auto',padding:'2px 0',margin:'0',bottom:'0',textAlign:'center'}}>
          { this.state.navButtons }
        </div>
        <div style={{position:"absolute",display:this.props.showTimer ? "block": "none",width:"3vw",height:"3vw",top:"5px",right:'5px',backgroundColor:"transparent"}}>
          <div id={"yagnaSliderTimer" + this.props.sliderId} data-percent="88" style={{position:"relative",width:"100%",height:"100%"}}></div>
        </div>
      </div>
    );
  }

  public componentDidMount(){
    this.setState({slides: this.getSlides(this.props.slidesProps)});
    this.setState({navButtons: this.getSlideNavButtons(this.props.slidesProps)});
    this.onWindowResize();
    window.addEventListener('resize', this.onWindowResize.bind(this));
    this.updateSlider();
    this.SliderTimeout=new YSliderTimer(this.props.slideDuration, () => {
      jQuery('#sliderTimer' + this.props.sliderId).width('0%');
      this.moveSlide().then((value: number) => {
        this.setState({currentIndex: value});
        this.updateSlider();
        this.SliderTimeout.start();
      });
    }, (percent: number) => {
      var pc = Math.floor(percent * 100);
      if(pc > 100) pc=100;
      if(this.props.autoPlay) this.updateTimer(pc);
    });
    if(this.props.autoPlay) this.SliderTimeout.start();
  }

  public componentWillUnmount(){
    window.removeEventListener('resize', this.onWindowResize);
  }

  public componentWillReceiveProps(nextProps: Readonly<IYagnaSliderProps>, context: any): void{
    this.setState({slides: this.getSlides(this.props.slidesProps)});
    this.setState({navButtons: this.getSlideNavButtons(this.props.slidesProps)});
    this.onWindowResize();
    this.render();
  }

  private getSlides(slides: SlidesProps[]): any[]{
    if(slides===undefined){
      return [];
    }
    else {
      var items = slides.map((item: SlidesProps, index) => {
        var textPosition='';
        var textTransform='';
        if(item.contentVertPosition==='top') { textPosition='0'; textTransform='translate(0%, 0%)'; }
        if(item.contentVertPosition==='middle') { textPosition='50%'; textTransform='translate(0%, -50%)'; }
        if(item.contentVertPosition==='bottom') { textPosition='100%'; textTransform='translate(0%, -100%)'; }
        return (
          <li key={'item' + index} id={'yagnaSlide' + this.props.sliderId + item.slideIndex} className={'yagnaSlide' + this.props.sliderId} style={{position:'absolute',display:'none',width:'100%',height:'100%',margin:'0',padding:'0',backgroundColor:'transparent',left:'0',top:'0',overflow:'hidden',boxSizing:'border-box'}} data-slide_index={index+1}>
            <div className={'slideChild' + this.props.sliderId} style={{position:'relative',display:'block',width:'100%',height:'100%',backgroundColor:item.backgroundColor,backgroundImage:'url(' + item.backgroundImage + ')',backgroundPosition:'center center', backgroundSize:'cover',margin:'0',padding:'0',boxSizing:'border-box'}}>
              <div className={'slideOverlay' + this.props.sliderId} style={{position:'absolute',display:'block',width:'100%',height:'100%',left:'0',top:'0',margin:'0',padding:'0',backgroundColor: item.backgroundOverlay ? (item.backgroundOverlayColor ? item.backgroundOverlayColor : 'rgba(0,0,0,0.5)') : 'transparent',boxSizing:'border-box'}}>
                <div style={{position:'relative',display:'block',width:'100%',height:'100%',backgroundColor:'transparent',margin:'0',padding:'0',boxSizing:'border-box'}}>
                  <div className={'yagnaSliderContent' + this.props.sliderId} style={{position:'absolute', display:'block',width:'100%',height:'100%',margin:'0',padding:'0',left:'0',top:'0'}}>
                    <div style={{position:'relative',display:'block',width:'100%',height:'100%',margin:'0',padding:'0'}}>
                      <div style={{position:'absolute',display:'inline-block',width:'100%',height:'auto',margin:'auto 0',padding:'2vw 4vw',boxSizing:'border-box',lineHeight:'100%',top:textPosition,transform:textTransform,textAlign:item.textAlign}}>
                        <div style={{fontFamily:item.titleFontFamily,fontWeight:item.titleFontWeight,color:item.textColor,fontSize:'1.9vw',textAlign:item.textAlign,lineHeight:'1',padding:'0',margin:'0'}}>{item.slideTitle}</div>
                        <p style={{fontFamily:item.descFontFamily,color:item.textColor,fontSize:'1.1vw',textAlign:item.textAlign,lineHeight:'1.2vw',padding:'1vw 0',margin:'0.5vw 0'}}>{item.slideDescription}</p>
                        <a href={item.buttonUrl} style={{backgroundColor:'transparent',padding:'0.5vw 1vw',color:item.textColor,fontFamily:'"Roboto",sans-serif',fontSize:'1vw',margin:'1vw 0 0 0',border:'2px solid #ffffff',textDecoration:'none',fontWeight:'normal',borderRadius:'4px'}}>{item.buttonText}</a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </li>
        );
      });
      return items;
    }
  }

  private getSlideNavButtons(slides: SlidesProps[]): any[]{
    if(!slides)
      return [];

    var items=slides.map((item:SlidesProps, index: number) => {
      return (
        <div id={'slideBulletButton' + this.props.sliderId + index} style={{display:'inline-block',width:'12px',
            height:'12px',backgroundImage:'url('+ require('../assets/' + this.props.slideBulletImg + '.png') +')',
            backgroundPosition:'0px 0px',backgroundOrigin:'border-box',
            backgroundRepeat:'no-repat',backgroundSize:'auto',
            zIndex:(5597 - index),cursor:'pointer',margin:'0 5px'}}
            data-slide_index={index} className={'slideBulletButton' + this.props.sliderId}
            onClick={(ev: React.MouseEvent<HTMLDivElement,MouseEvent>) => { this.onSlideBulletClicked(ev, index); }}/>
      );
    });
    return items;
  }

  private moveSlide(): Promise<number> {
    var curIndex: number=this.state.currentIndex + 1;
    if(curIndex >= this.state.slides.length) curIndex=0;
    var prvIndex: number=this.state.currentIndex;
    var effect: ITransitionOption=this.props.transitions.filter((value: ITransitionOption, index: number) => { return value.key.toString().toLowerCase()===this.props.slideTransition.toLowerCase(); })[0];

    return this.SliderTransition(prvIndex, curIndex, effect)
    .then((): Promise<number> => {
      this.textTransition(curIndex).then(() => {
        setTimeout(() => {
          //  
        }, 200);
      });
      return Promise.resolve(curIndex);
    });
  }

  private updateSlider(){
    const gThis=this;
    jQuery('#sliderTimer' + this.props.sliderId).css({'width': '0%'});
    jQuery('#sliderNavBar' + this.props.sliderId).children('div').each((index: number, elem: HTMLElement) => {
      jQuery(elem).css({'background-position': '0px 0px'});
    });
    jQuery('#yagnaSlider' + this.props.sliderId).children('li').each((idx:number, elem: HTMLLIElement) => {
      let slide_index:number=parseInt(jQuery(elem).attr('data-slide_index')) - 1;
      jQuery(jQuery('#sliderNavBar' + this.props.sliderId).children('div').get(this.state.currentIndex)).css({
        'background-position': '0px 12px',
      });
      if(gThis.state.currentIndex!==slide_index){
        jQuery(elem).css({'display': 'none'});
      } else{
        jQuery(elem).css({'display': 'block'});
      }
    });

    jQuery('#slideNavButton' + this.props.sliderId + '1').hover((ev) => {
      jQuery('#slideNavButton' + this.props.sliderId + '1').css({'background-position': 'left bottom'});
    }, (ev) => {
      jQuery('#slideNavButton' + this.props.sliderId + '1').css({'background-position': 'left top'});
    });

    jQuery('#slideNavButton' + this.props.sliderId + '2').hover((ev) => {
      jQuery('#slideNavButton' + this.props.sliderId + '2').css({'background-position': 'right bottom'});
    }, (ev) => {
      jQuery('#slideNavButton' + this.props.sliderId + '2').css({'background-position': 'right top'});
    });

    jQuery('#yagnaSlider' + this.props.sliderId).hover(() => {
      if(! this.state.isAnimating ){
        if(this.props.pauseOnHover)  this.SliderTimeout.pause();
      }
    }, () => {
      if(! this.state.isAnimating ){
        if(this.props.pauseOnHover)  this.SliderTimeout.resume(false);
      }
    });

    $('#slideNavButton' + this.props.sliderId + '1').hover(() => {
      if(! this.state.isAnimating ){
        if(this.props.pauseOnHover)  this.SliderTimeout.pause();
      }
    }, () => {
      if(! this.state.isAnimating ){
        if(this.props.pauseOnHover)  this.SliderTimeout.resume(false);
      }
    });

    $('#slideNavButton' + this.props.sliderId + '2').hover(() => {
      if(! this.state.isAnimating ){
        if(this.props.pauseOnHover)  this.SliderTimeout.pause();
      }
    }, () => {
      if(! this.state.isAnimating ){
        if(this.props.pauseOnHover)  this.SliderTimeout.resume(false);
      }
    });

    $('#slideNavButton' + this.props.sliderId + '1').click((e) => {
      if(this.state.isAnimating) return;
      this.SliderTimeout.stop();
      var curIndex=this.state.currentIndex;
      curIndex--;
      if(curIndex < 0) curIndex=this.state.slides.length-1;
      var prvIndex=curIndex-1;
      if(prvIndex < 0) prvIndex=this.state.slides.length-1;
      this.gotoSlide(curIndex).then((value: number) => {
        this.setState({currentIndex: value});
        var $next=$('#yagnaSlider' + this.props.sliderId).children('li')[curIndex];
        var $prev=$('#yagnaSlider' + this.props.sliderId).children('li')[prvIndex];
        $($prev).css({'display': 'none'});
        $($next).css({'display': 'block'});
        this.updateSlider();
        if(this.props.autoPlay) this.SliderTimeout.start();
      });
    });

    $('#slideNavButton' + this.props.sliderId + '2').click((e) => {
      if(this.state.isAnimating) return;
      this.SliderTimeout.stop();
      var curIndex: number=this.state.currentIndex + 1;
      if(curIndex >= this.state.slides.length) curIndex=0;
      var prvIndex: number=this.state.currentIndex;
        this.gotoSlide(curIndex).then((value: number) => {
        this.setState({currentIndex: value});
        var $next=$('#yagnaSlider' + this.props.sliderId).children('li')[curIndex];
        var $prev=$('#yagnaSlider' + this.props.sliderId).children('li')[prvIndex];
        $($prev).css({'display': 'none'});
        $($next).css({'display': 'block'});
        this.updateSlider();
        if(this.props.autoPlay) this.SliderTimeout.start();
      });
    });
  }

  private gotoSlide(sldIndex: number){
    var curIndex: number=sldIndex;
    var prvIndex: number=this.state.currentIndex;
    var effect: ITransitionOption=this.props.transitions.filter((value: ITransitionOption, index: number) => { return value.key.toString().toLowerCase()===this.props.slideTransition.toLowerCase(); })[0];

    return this.SliderTransition(prvIndex, curIndex, effect)
    .then((): Promise<number> => {
      this.textTransition(curIndex).then(() => {
        setTimeout(() => {
          //  
        }, 200);
      });
      return Promise.resolve(curIndex);
    });
  }

  private onSlideBulletClicked(ev: React.MouseEvent<HTMLDivElement,MouseEvent>, sldIndex: number){
    if(this.state.isAnimating) return;
    this.SliderTimeout.stop();
    var div: HTMLDivElement=ev.target as HTMLDivElement;
    var curIndex:number=sldIndex;
    if(curIndex < 0) curIndex=this.state.slides.length-1;
    var prvIndex=curIndex-1;
    if(prvIndex < 0) prvIndex=this.state.slides.length-1;
    this.gotoSlide(curIndex).then((value: number) => {
      this.setState({currentIndex: value});
      var $next=$('#yagnaSlider' + this.props.sliderId).children('li')[curIndex];
      var $prev=$('#yagnaSlider' + this.props.sliderId).children('li')[prvIndex];
      $($prev).css({'display': 'none'});
      $($next).css({'display': 'block'});
      this.updateSlider();
      if(this.props.autoPlay) this.SliderTimeout.start();
    });
}

  private onWindowResize(){
    var img=$('#yagnaSliderBlankImg' + this.props.sliderId);
    if(!this.state.blankImageLoaded){
      img.on('load', (ev) => {
        $('#yagnaContainer' + this.props.sliderId).css({
          'height': img.height() + 'px'
        });
        $('#yagnaSlider' + this.props.sliderId).css({
          'height': img.height() + 'px'
        });
        img.css({'display': 'none'});
        this.setState({blankImageLoaded: true});
      });
    } else {
      img.css({'display': 'block'});
      $('#yagnaContainer' + this.props.sliderId).css({
        'height': img.height() + 'px'
      });
      $('#yagnaSlider' + this.props.sliderId).css({
        'height': img.height() + 'px'
      });
      img.css({'display': 'none'});
    }
  }

  private updateTimer(pc: number){
    var elem=document.getElementById("yagnaSliderTimer" + this.props.sliderId);
    var canvas = document.createElement('canvas');
    var span = document.createElement('span');

    var size: number = $(elem).width();
    var lWidth: number = 2;
    var rotate: number = 0;

    if( elem && !$(elem).children('canvas').length ){
      elem.appendChild(canvas);
    }
    else{
      canvas=$(elem).children('canvas')[0] as HTMLCanvasElement;
    }
    if( !$(elem).children('span').length ){
      elem.appendChild(span);
    }
    else{
      span=$(elem).children('span')[0] as HTMLSpanElement;
    }

    span.textContent = pc + '%';
    span.style.fontSize='0.9vw';
    span.style.position='absolute';
    span.style.left="50%";
    span.style.top="50%";
    span.style.transform="translate(-50%,-50%)";
    span.style.color="#ffffff";

    var ctx = canvas.getContext('2d');
    canvas.width = canvas.height = size;
    ctx.translate(size / 2, size / 2); // change center
    ctx.rotate((-1 / 2 + rotate / 180) * Math.PI); // rotate -90 deg
    var radius = (size - lWidth) / 2;
    var drawCircle = (color: string, lineWidth: number, percent: number) => {
      percent = Math.min(Math.max(0, percent || 1), 1);
      ctx.beginPath();
      ctx.arc(0, 0, radius, 0, Math.PI * 2 * percent, false);
      ctx.strokeStyle = color;
          ctx.lineCap = 'round'; // butt, round or square
      ctx.lineWidth = lineWidth;
      ctx.stroke();
    };
    drawCircle('#555555', lWidth, 100 / 100);
    drawCircle('#efefef', lWidth, pc / 100);
  }

  private SliderTransition(prevIndex:number, curIndex: number, transition: ITransitionOption): Promise<void>{
    var $next=jQuery('#yagnaSlider' + this.props.sliderId).children('li')[curIndex];
    var $prev=jQuery('#yagnaSlider' + this.props.sliderId).children('li')[prevIndex];
    var effect=transition.key;
    var isAnimating:boolean=true;
    this.setState({isAnimating: true});

    jQuery('.yagnaSliderContent' + this.props.sliderId, $next).css({'display': 'none', 'top': '100%'});

    return new Promise<void>(
      (resolve: () => void,
      reject: (error:any) => void) => {
        if (effect === "fade") {
          if($prev){
            jQuery($prev).fadeOut(transition.duration, transition.easing, () => {
              setTimeout(() => {
                isAnimating=false;
                this.setState({isAnimating: false});
                resolve();
              }, 100);
            });
          }
        }
        else if(effect==="fadein"){
          jQuery($next).fadeIn(transition.duration, transition.easing, () => {
            setTimeout(() => {
              isAnimating=false;
              this.setState({isAnimating: false});
              resolve();
            }, 100);
          });
        }
        else if(effect==='slideleft'){
          var overlay=jQuery('.slideOverlay' + this.props.sliderId, $next);
          var overlayColor=overlay.css('background-color');
          jQuery('.slideOverlay' + this.props.sliderId, $next).css({'background-color': 'transparent'});
          jQuery($next).css({'display':'block', 'z-index': 4800});
          jQuery($next).css({left: "100%"});
          jQuery($next).animate({
            left: "0%"
          }, transition.duration, transition.easing, () => {
            setTimeout(() => {
              isAnimating=false;
              overlay.css({'background-color': overlayColor});
              jQuery($next).css({'display':'none', 'z-index': ''});
              this.setState({isAnimating: false});
              resolve();                
            }, 100);
          });
        }
        else if(effect==='slideup'){
          overlay=jQuery('.slideOverlay' + this.props.sliderId, $next);
          overlayColor=overlay.css('background-color');
          jQuery('.slideOverlay' + this.props.sliderId, $next).css({'background-color': 'transparent'});
          jQuery($next).css({'display':'block', 'z-index': 4800});
          jQuery($next).css({top: "100%"});
          jQuery($next).animate({
            top: "0%"
          }, transition.duration, transition.easing, () => {
            setTimeout(() => {
              overlay.css({'background-color': overlayColor});
              isAnimating=false;
              jQuery($next).css({'display':'none', 'z-index': ''});
              this.setState({isAnimating: false});
              resolve();                
            }, 100);
          });
        }
      }
    );
  }
  
  private textTransition(curIndex: number): Promise<void> {
    return new Promise<void>(
      (resolve: () => void,
      reject: (error:any) => void) => {
        var $next=jQuery('#yagnaSlider' + this.props.sliderId).children('li')[curIndex];
        var $nextText=jQuery('.yagnaSliderContent' + this.props.sliderId, $next);

        if(this.props.contentTransition.toLowerCase()==='up'){
          $nextText.css({ 'top': '100%', 'display': 'block' });
          $nextText.animate({
            top: '0%'            
          }, 1000, 'swing', () => {
            resolve();
          });
        }
        else if(this.props.contentTransition.toLowerCase()==='down'){
          $nextText.css({ 'top': '-100%', 'display': 'block' });
          $nextText.animate({
            top: '0%'            
          }, 1000, 'swing', () => {
            resolve();
          });
        }
      }
    );
  }

  private random(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }
}
