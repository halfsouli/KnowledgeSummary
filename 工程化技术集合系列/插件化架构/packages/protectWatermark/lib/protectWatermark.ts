declare const window: Window & { MutationObserver: any, WebKitMutationObserver: any };
interface Option {
  selList: string[]
  mutationCallback?: () => void,
  renderWatermark?: () => void
}
const MutationObserver = window.MutationObserver || window.WebKitMutationObserver;

export class ProtectWatermarkPlugin {
  public option: Option;
  private MutationObserverMap: Map<any,any>;
  private MutationSole:MutationObserver;
  constructor(option: Option) {
    this.option = option;
    this.MutationObserverMap = new Map()
  }

  private setMutationObserver(sel?: string) {
    let element: HTMLElement = document.querySelector(sel);
    if (!sel) return;
    const parentNode = element.parentNode || document.body;
		this.MutationSole  = this.createMutationObserver(parentNode,element,sel);
    this.MutationObserverMap.set(sel,this.MutationSole);
    this.MutationSole && this.MutationSole.observe(parentNode, {
      attributes: true,
      childList: true,
      subtree: true, // 监听后代节点变化
    })
    this.MutationSole = null
	}
  private createMutationObserver(parentNode,element,sel){
    const newClonedNode = element.cloneNode(true);
    const {mutationCallback = ()=>{}} = this.option;
    if(this.MutationSole){ return  this.MutationSole }else{
     return new MutationObserver(mutations => {
        mutations.forEach(mutationRecord => {
          const removedNode = mutationRecord?.removedNodes[0];
          const currentTarget = mutationRecord.target;
          if (removedNode === element && !document.querySelector(sel)) {
            parentNode.insertBefore(element, parentNode.children[0]);
          }
          if (currentTarget === element) {
            const replaceNode = newClonedNode.cloneNode(true);
            parentNode.replaceChild(replaceNode, element);
            element = <HTMLElement>replaceNode;
          }
          mutationCallback()
        })
      })
    }
  }
  public protect() {
    const { selList } = this.option
    console.log("保护水印成功！", MutationObserver, this.option)
    selList.forEach(item => {
      this.setMutationObserver(item);
    })
  }
  public destroy(selects?: string[]) {
    selects?.forEach(el => {
      this.MutationObserverMap.get(el).disconnect()
    });
  }
}

export const ProtectWatermark = {
  name: 'ProtectWatermark',
  useClass: ProtectWatermarkPlugin
}
