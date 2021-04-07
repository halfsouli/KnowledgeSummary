import { isValidArray } from '@eft-security-library/shared';
import { ProtectWatermarkPlugin } from '@eft-security-library/protectwatermark';

const DEFAULT_CONTAINER = 'body';
const DEFAULT_CLASSNAME = 'eft-security-library-watermark';
const DEFAULT_WATERMARK_TEXT = 'hello watermark';
const DEFAULT_OPTIONS = {
  width: 200,
  height: 100,
  text: DEFAULT_WATERMARK_TEXT,
  container: DEFAULT_CONTAINER || document.getElementById(DEFAULT_CONTAINER),
  x: 0,
  y: 0,
  font: "Arial",
  color: '#ddd',
  fontSize: 16,
  alpha: 1,
  angle: 0,
  zIndex: 1,
  center: true,
  textAlign: 'center',
  textBaseline: 'middle',
  pointerEvents:'none'
}
type TextInterface = {
  textAlign?: "center" | "end" | "left" | "right" | "start";
  textBaseline?: "alphabetic" | "bottom" | "hanging" | "ideographic" | "middle" | "top";
}
type WatermarkOptions = Omit<Partial<typeof DEFAULT_OPTIONS>, 'textAlign' & 'textBaseline'> | TextInterface;

class WatermarkPlugin {
  canvas: HTMLCanvasElement;
  options: WatermarkOptions;
  selects: string[] = [];
  ProtectObserverMap: any;
  constructor(options = {}) {
    this.initOptions();
    this.options = Object.assign(this.options, options);
    this.ProtectObserverMap = new Map()
  }

  private initOptions() {
    this.options = DEFAULT_OPTIONS;
  }

  private createContainer(options) {
    const { width, height } = options || this.options;
    let canvas;
    canvas = <HTMLCanvasElement>document.createElement('canvas');
    canvas.setAttribute('width', width + 'px');
    canvas.setAttribute('height', height + 'px');
    return canvas;
  }

  private drawCanvas(options) {
    const canvas = this.createContainer(options);
    const watermarkUrl = this.getWatermarkDataURL(options, canvas);
    const { zIndex, container,pointerEvents } = options;
    const watermarkContainer = <HTMLElement>(typeof container == 'string' ? document.querySelector(container) : container);
    if (!watermarkContainer) return console.error('未指定水印容器，请配置 container 属性。')
    watermarkContainer.className = DEFAULT_CLASSNAME;
    watermarkContainer.setAttribute('style', `
          position:absolute;
          top:0;
          left:0;
          width:100%;
          height:100%;
          z-index:${zIndex};
          background-repeat:repeat;
          background-image:url('${watermarkUrl}');
          pointer-events:${pointerEvents};
        `);
    this.saveSelects(container);
  }

  private getWatermarkDataURL(options, canvas) {
    const {
      x, y, width, height, font, color, fontSize, alpha, angle,
      text, textAlign, textBaseline, center
    } = options || this.options;
    const ctx = canvas.getContext('2d');
    const rotateAngle = Math.PI / 180 * angle;

    ctx.clearRect(0, 0, width, height);
    ctx.textBaseline = textBaseline;
    ctx.textAlign = textAlign;
    ctx.fillStyle = color;
    ctx.globalAlpha = alpha;
    ctx.font = `${fontSize}px ${font}`;

    let translateObj = { x, y }

    if (center) {
      translateObj.x = width / 2;
      translateObj.y = height / 2;
    }

    ctx.translate(translateObj.x, translateObj.y);
    ctx.rotate(rotateAngle);
    ctx.translate(-translateObj.x, -translateObj.y - fontSize);
    ctx.fillText(text, translateObj.x, translateObj.y + fontSize);
    return canvas.toDataURL();
  }

  private saveSelects(sel) {
    if (sel && !this.selects.includes(sel)) {
      this.selects.push(sel);
    }
  }

  /**
   * 添加水印
   * @params {WatermarkOptions} options 水印配置项
   */
  public mount(options) {
    this.drawCanvas(Object.assign({}, this.options, options));
    this.protect(options);
  }

  /**
   * 移除水印（单个或所有）
   * @params {String|undefined} sel 没有传的话，删除所有，传 sel 字符串的话，删除单个
   */
  public unmount(sel) {
    let removeSelectsList = this.selects;
    if (isValidArray(sel)) {
      removeSelectsList = sel;
    } else if (typeof sel === 'string') {
      removeSelectsList = [sel];
    }
    removeSelectsList.map(item => {
      document.querySelector(item) &&
        document.querySelector(item).remove();
        this.ProtectObserverMap.get(item).destroy([item])
    })

  }

  public protect(options) {
    console.log(options);
    const { container } = options
    if (!container) { return };
    const option = {
      selList: [container]
    }
    const protectWatermarkPlugin = new ProtectWatermarkPlugin(option);
    protectWatermarkPlugin.protect();
    this.ProtectObserverMap.set(container, protectWatermarkPlugin);
  }
}

export const Watermark = {
  name: 'Watermark',
  useClass: WatermarkPlugin
}
