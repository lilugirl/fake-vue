class Compile{
    constructor(el,vm){
        this.el=this.isElementNode(el)?el:document.querySelector(el);
        this.vm=vm;

        if(this.el){
            // 如果这个元素能获取到 ，才开始编译
            // 1 先把真是的DOM移入内存中 fragment
            let fragment=this.node2fragment(this.el);


            // 2 编译 =>提取想要的元素节点v-model 和文本节点{{}}
            this.compile(fragment);

            // 3 把编译好的fragment再塞回到页面里去
        }
    }
    
    // 专门一写一些辅助的方法
    isElementNode(node){
       return node.NodeType===1;
    }

    // 核心的方法
    compile(fragment){
        // 需要递归
        let childNodes=fragment.childNodes;
        Array.from(childNodes).forEach((node)=>{
           if(this.isElementNode(node)){
               // 是元素节点,还需要继续深入的检查
               // 这里需要编译元素
               this.compileElement(node);
               this.compile(node);

             
           }else{
               // 文本节点
               this.compileText(node);
               
           }
        })

        

    }

    compileElement(fragment){
       console.log('compile Element')
    }

    compileText(fragment){
        console.log('compile text');

    }
    node2fragment(el){  // 需要将el中的内容全部放到内存中
        // 文档碎片 内存中的dom节点
        console.log('el',el);
      
        let fragment=document.createDocumentFragment();
        let firstChild;
        while(firstChild=el.firstChild){
           fragment.appendChild(firstChild);
          
        }
        return fragment; // 内存中的节点
    }
}