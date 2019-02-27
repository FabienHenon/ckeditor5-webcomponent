// Define the editors manager
class EditorsManager {
  constructor() {
    this._editors = {};
  }

  register(name, editor) {
    this._editors[name] = editor;
  }

  editor(name) {
    return this._editors[name];
  }

  registeredEditors() {
    return Object.keys(this._editors);
  }
}

var manager = new EditorsManager();

// Define the webcomponent
window.customElements.define('x-ckeditor', class extends HTMLElement {
  static get observedAttributes() {
    return ['content', 'config', 'editor', 'target-id'];
  }

  get config() {
    return this._config;
  }

  set config(config) {
    this.setAttribute('config', config);
  }

  get content() {
    return this._content;
  }

  set content(content) {
    this.setAttribute('content', content);
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name == 'content') {
      if (newValue !== this._content) {
        this._content = newValue;
        if (this._editor !== null) {
          this._editor.setData(this._content);
        }
      }
    } else if (name == 'config') {
      this._config = JSON.parse(newValue);
      if (this._editor !== null) {
        this.disconnectedCallback();
        this.connectedCallback();
      }
    } else if (name == 'editor') {
      this._editorBuild = manager.editor(newValue);
      if (this._editor !== null) {
        this.disconnectedCallback();
        this.connectedCallback();
      }
    } else if (name == 'target-id') {
      this._targetId = newValue;
      if (this._editor !== null) {
        this.disconnectedCallback();
        this.connectedCallback();
      }
    }
  }

  constructor() {
    super();

    this._config = {};
    this._content = '';
    this._editor = null;
    this._editorBuild = null;
    this._targetId = null;
  }

  connectedCallback() {
    if (!this._editorBuild) {
      console.error(`Editor named ${name} not found. Registered editors are: ${manager.registeredEditors().join(", ")}`);
      return;
    }

    var target = this;
    if (this._targetId) {
      target = document.getElementById(this._targetId);
    }

    var base = this;
    this._editorBuild
      .create(target, this._config)
      .then(editor => {
        base._editor = editor;
        base._editor.model.document.on('change:data', function (e) {
          var content = base._editor.getData();
          base._content = content;
          var event = new CustomEvent(
            'ckeditorchange',
            { detail: content });
          base.dispatchEvent(event);
        });
      })
      .catch(error => {
        console.error(error.stack);
      });
  }

  disconnectedCallback() {
    var base = this;
    base._editor.destroy()
      .then(function () {
        base._editor = null;
      });
  }
});

export default manager;