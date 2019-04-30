![Built With Stencil](https://img.shields.io/badge/-Built%20With%20Stencil-16161d.svg?logo=data%3Aimage%2Fsvg%2Bxml%3Bbase64%2CPD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDE5LjIuMSwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPgo8c3ZnIHZlcnNpb249IjEuMSIgaWQ9IkxheWVyXzEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iMHB4IgoJIHZpZXdCb3g9IjAgMCA1MTIgNTEyIiBzdHlsZT0iZW5hYmxlLWJhY2tncm91bmQ6bmV3IDAgMCA1MTIgNTEyOyIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSI%2BCjxzdHlsZSB0eXBlPSJ0ZXh0L2NzcyI%2BCgkuc3Qwe2ZpbGw6I0ZGRkZGRjt9Cjwvc3R5bGU%2BCjxwYXRoIGNsYXNzPSJzdDAiIGQ9Ik00MjQuNywzNzMuOWMwLDM3LjYtNTUuMSw2OC42LTkyLjcsNjguNkgxODAuNGMtMzcuOSwwLTkyLjctMzAuNy05Mi43LTY4LjZ2LTMuNmgzMzYuOVYzNzMuOXoiLz4KPHBhdGggY2xhc3M9InN0MCIgZD0iTTQyNC43LDI5Mi4xSDE4MC40Yy0zNy42LDAtOTIuNy0zMS05Mi43LTY4LjZ2LTMuNkgzMzJjMzcuNiwwLDkyLjcsMzEsOTIuNyw2OC42VjI5Mi4xeiIvPgo8cGF0aCBjbGFzcz0ic3QwIiBkPSJNNDI0LjcsMTQxLjdIODcuN3YtMy42YzAtMzcuNiw1NC44LTY4LjYsOTIuNy02OC42SDMzMmMzNy45LDAsOTIuNywzMC43LDkyLjcsNjguNlYxNDEuN3oiLz4KPC9zdmc%2BCg%3D%3D&colorA=16161d&style=flat-square)

# ckeditor5-webcomponent

This package wraps the [ckeditor5](https://ckeditor.com) in a webcomponent named `x-ckeditor`.

## Install

```
$ npm install --save ckeditor5-webcomponent
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
import EditorManager from 'ckeditor5-webcomponent/dist/collection/editor-manager.js';
import { defineCustomElements } from 'ckeditor5-webcomponent/dist/esm/es2017/x-ckeditor.define.js';

defineCustomElements(window);

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
import EditorManager from 'ckeditor5-webcomponent/dist/collection/editor-manager.js';
import { defineCustomElements } from 'ckeditor5-webcomponent/dist/esm/es2017/x-ckeditor.define.js';

defineCustomElements(window);

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

| Property    | Type     | Description                                                                                               |
| ----------- | -------- | --------------------------------------------------------------------------------------------------------- |
| `config`    | `string` | _(optional)_ CKEditor config                                                                              |
| `content`   | `string` | _(optional)_ HTML string of the editor content                                                            |
| `editor`    | `string` | The name of the registered build                                                                          |
| `target-id` | `string` | _(optional)_ The id of the element to bind to. If left empty the editor will render for this webcomponent |

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
