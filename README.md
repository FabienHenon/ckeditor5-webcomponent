# ckeditor-webcomponent

This package wraps the [ckeditor5](https://ckeditor.com) in a webcomponent named `x-ckeditor`.

## Install

```
$ npm install --save ckeditor-webcomponent
```

In order to be able to use this component you will have to install [polyfills for webcomponents (v1 spec)](https://github.com/WebComponents/webcomponentsjs), and [ckeditor](https://ckeditor.com/docs/ckeditor5/latest/framework/guides/quick-start.html)

## Usage

Because CKEditor 5 is very modular it was hard to design a webcomponent that was able to be that modular, allowing anyone to create and add new plugins to their editor without having to create new webcomponents.

That's why I decided to add another layer to this webcomponent: an _Editor Manager_.

The goal of this editor manager is to register ckeditor builds you want to use in your application. This way, when you use the `x-ckeditor` you only need to specify which ckeditor build you want to use.

Here is an example:

Let's say you want to use the `ClassicEditor` build. All you need is to [install it](https://ckeditor.com/docs/ckeditor5/latest/builds/guides/integration/installation.html) and register it to the _Editor Manager_:

```
npm install --save @ckeditor/ckeditor5-build-classic
```

_index.js_
```js
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import EditorManager from 'ckeditor-webcomponent';

// We register the ClassicEditor under the name 'classic'
EditorManager.register('classic', ClassicEditor);
```

Once you did that, you can use the webcomponent with this particular editor:

_index.html_
```html
<html>
    <body>
        <x-ckeditor editor="classic"></x-ckeditor>
    </body>
</html>
```

### Using 2 or more ckeditor builds

Following the previous example, you can register more ckeditor builds.

Let's say you just followed the [custom build tutorial](https://ckeditor.com/docs/ckeditor5/latest/builds/guides/development/custom-builds.html#customizing-a-build) and created a new build:

_my-build.js_
```js
'use strict';

// The editor creator to use.
import ClassicEditorBase from '@ckeditor/ckeditor5-editor-classic/src/classiceditor';

import EssentialsPlugin from '@ckeditor/ckeditor5-essentials/src/essentials';
import AutoformatPlugin from '@ckeditor/ckeditor5-autoformat/src/autoformat';
import BoldPlugin from '@ckeditor/ckeditor5-basic-styles/src/bold';
import ItalicPlugin from '@ckeditor/ckeditor5-basic-styles/src/italic';
import HeadingPlugin from '@ckeditor/ckeditor5-heading/src/heading';
import LinkPlugin from '@ckeditor/ckeditor5-link/src/link';
import ListPlugin from '@ckeditor/ckeditor5-list/src/list';
import ParagraphPlugin from '@ckeditor/ckeditor5-paragraph/src/paragraph';

import CustomPlugin from 'ckeditor5-custom-package/src/customplugin';
import OtherCustomPlugin from '../relative/path/to/some/othercustomplugin';

export default class ClassicEditor extends ClassicEditorBase {}

// Plugins to include in the build.
ClassicEditor.builtinPlugins = [
    EssentialsPlugin,
    AutoformatPlugin,
    BoldPlugin,
    ItalicPlugin,
    HeadingPlugin,
    LinkPlugin,
    ListPlugin,
    ParagraphPlugin,

    CustomPlugin,
    OtherCustomPlugin
];

ClassicEditor.defaultConfig = {
    toolbar: [ 'heading', '|', 'bold', 'italic', 'custombutton' ],

    // This value must be kept in sync with the language defined in webpack.config.js.
    language: 'en'
};
```
**If you follow this example you will have to install all dependencies for all plugins used**

Now you can register your new build:

_index.js_
```js
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import NewClassicEditor from './my-build';
import EditorManager from 'ckeditor-webcomponent';

// We register the ClassicEditor under the name 'classic'
EditorManager.register('classic', ClassicEditor);
// We register the NewClassicEditor under the name 'new-classic'
EditorManager.register('new-classic', NewClassicEditor);
```

And you can use it with the webcomponent:

_index.html_
```html
<html>
    <body>
        <x-ckeditor editor="classic"></x-ckeditor>
        <x-ckeditor editor="new-classic"></x-ckeditor>
    </body>
</html>
```

## Options

| Property  | Type     | Description                       |
| --------- | -------- | --------------------------------- |
| `config`  | `string` | CKEditor config                   |
| `content` | `string` | HTML string of the editor content |
| `editor`  | `string` | The name of the registered build  |

### `config`

`config` must be a stringified json object.
For instance, if you want to support more languages you could [follow this tutorial](https://ckeditor.com/docs/ckeditor5/latest/features/ui-language.html#building-the-editor-using-a-specific-language) and then set the configuration to:

```html
<x-ckeditor editor="classic" config="{\"language\": \"fr\"}"></x-ckeditor>
```

## Events

| Event            | Type               | Description                                                                          |
| ---------------- | ------------------ | ------------------------------------------------------------------------------------ |
| `ckeditorchange` | `{detail: string}` | Fired when the CKEditor content changes, `event.detail` contains the new HTML string |
