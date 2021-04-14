class HelloBtn extends HTMLElement {
  constructor() {
    super();

    const shadow = this.attachShadow({mode: 'open'});

    const btn = document.createElement('button');
    console.log("this.getAttribute('text')", this.getAttribute('text'))
    btn.textContent = `${this.getAttribute('text')} world`;
    btn.className = 'btn';
    
    btn.addEventListener('click', () => {
      window.alert(btn.textContent)
    });
    const linkEle = document.createElement('link');
    linkEle.setAttribute('href', 'index.css');
    linkEle.setAttribute('rel', 'stylesheet');
    shadow.appendChild(linkEle);
    shadow.appendChild(btn);
  }
  // 当 custom element首次被插入文档DOM时
  connectedCallback() {
    console.log('connectedCallback')
  }
  // 当 custom element从文档DOM中删除时
  disconnectedCallback() {
    console.log('disconnectedCallback')
  }
  // 当 custom element被移动到新的文档时
  adoptedCallback() {
    console.log('adoptedCallback')
  }
  // 当 custom element增加、删除、修改自身属性时
  attributeChangedCallback() {
    console.log('attributeChangedCallback')
  }
}

customElements.define('hello-btn', HelloBtn);