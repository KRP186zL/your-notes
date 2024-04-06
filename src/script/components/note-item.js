class NoteItems extends HTMLElement {
  static observedAttributes = ["data-title", "data-body"];

  _shadowRoot = null;
  _style = null;

  constructor() {
    super();

    this._shadowRoot = this.attachShadow({ mode: "open" });
    this._style = document.createElement("style");
  }

  set title(value) {
    if (value !== this.title) {
      this.setAttribute("data-title", value);
    }
  }

  get title() {
    const value = this.getAttribute("data-title");
    return value;
  }
  set body(value) {
    if (value !== this.body) {
      this.setAttribute("data-body", value);
    }
  }

  get body() {
    const value = this.getAttribute("data-body");
    return value;
  }

  connectedCallback() {
    this.render();
  }

  attributeChangedCallback(name, oldValue, newValue) {
    // this.render();
  }

  _updateStyle() {
    this._style.textContent = `
    :host{
        display:block;
    }
    .card {
      outline:none;
        display: flex;
        flex-direction:column;
        padding: 10px 20px;
        box-shadow: 0 0 4px 3px rgb(209, 208, 208);
        height:200px;
        transition: 200ms ;
      }
      .card:focus {
      transform: rotate(10deg);
    }
      .card:hover {
      transform: rotate(10deg);
    }
    div {
      word-wrap: break-word;
    }
    `;
  }
  _emptyContent() {
    this._shadowRoot.innerHTML = "";
  }
  render() {
    this._emptyContent();
    this._updateStyle();

    this._shadowRoot.appendChild(this._style);
    this._shadowRoot.innerHTML += `
    <div class="card" tabindex="0">
        <div class="card__title">
            <h3>${this.title}</h3>
        </div>
        <div class="card__body">
            <p>
                ${this.body}
            </p>
        </div>
     </div>
    `;
  }
}

customElements.define("note-items", NoteItems);
