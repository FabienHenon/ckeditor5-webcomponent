// Define the editors manager
class EditorsManager {
  register(name, editor) {
    if (typeof window === 'undefined') {
      return;
    }

    this.getOrCreate();

    window['ckeditors'][name] = editor;
  }

  editor(name) {
    if (typeof window === 'undefined') {
      return;
    }

    this.getOrCreate();

    return window['ckeditors'][name];
  }

  registeredEditors() {
    if (typeof window === 'undefined') {
      return;
    }

    this.getOrCreate();

    return Object.keys(window['ckeditors']);
  }

  getOrCreate() {
    if (!window['ckeditors']) {
      window['ckeditors'] = {};
    }
  }
}

export default new EditorsManager();