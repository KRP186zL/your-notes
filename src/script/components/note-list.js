class NoteList extends HTMLElement {
  _shadowRoot = null;
  _style = null;

  constructor() {
    super();

    this._shadowRoot = this.attachShadow({ mode: "open" });
    this._style = document.createElement("style");

    this.render();
  }

  connectedCallback() {
    this._shadowRoot
      .querySelector(".add-button")
      .addEventListener("click", () => {
        document.querySelector(".block").removeAttribute("hidden");
        document.querySelector("#formTambahNotes").titleNotes.focus();
      });
  }

  _updateStyle() {
    this._style.textContent = `
        :host{
            display:block;
        }
        .notes-container {
            max-width: 900px;
            margin: auto;
            padding: 11px 20px 30px;
            background-color: rgba(255, 255, 255, 0.5);
            backdrop-filter: blur(6px);
          }
          
          .notes-wrapper {
            margin-top: 10px;
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
            gap: 2em;
          }
          .button-wrapper{
            display:flex;
            justify-content:space-between;
            align-items:center;
            padding-inline:25px;
            height:50px;
          }
          .button-wrapper button{
            outline:none;
            padding : .5rem;
            cursor: pointer; 
            border-radius: 5px;
            border: 1px solid #B6BBC4;
            transition : 300ms;
          }
          
          .button-wrapper button:hover{
            font-weight: bold;
            background-color: #c9c5c0;
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
        <div class="notes-container">
          <div class="button-wrapper">
            <h2>Your notes</h2>
            <button type="button" class="add-button"><slot name="icon-add"></slot> New</button>
          </div>
          <div class="notes-wrapper">
            <slot></slot>
          </div>
        </div>
    `;
  }
}

customElements.define("note-list", NoteList);
