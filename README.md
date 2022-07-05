# markdown-it-tips-bulma
Markdown-it plugin to create tips. You can use any type of tip you want, proposed is to use the same type for everything; `warning`,`error`,`success`,`info`,`danger` or keep the type blank for the default styling of a message.
 
```md
::: warning
Hello world! [Link](#).
:::
```

Gets converted to:

```html
<div class="notification is-warning" role="md-tip">
<p>Hello world! <a href="#" class="md-tip-link">Link</a>.</p>
</div>
```

## Install

```bash
$ npm install markdown-it-tips --save
```

## Usage

### Enable plugin

```js
var md = require('markdown-it');
var tips = require('markdown-it-tips');

md().use(tips);
```


### Options

Enable/disable adding class `md-tip-link` to links inside tips.

```js
var md = require('markdown-it');
var tips = require('markdown-it-tips');

md().use(tips, {links: false});
```


### Example

With option `links` enabled (by default):

```md
This is a test. [Link](#).

::: success
Hello world! [Link](#).
:::

This is a test. [Link](#).
```

Gets converted to:

```html
<p>This is a test. <a href="#">Link</a>.</p>
<p class="md-tip md-tip-success" role="md-tip">
<p>Hello world! <a href="#" class="md-tip-link">Link</a>.</p>
</p>
<p>This is a test. <a href="#">Link</a>.</p>
```


[markdown-it]: https://github.com/markdown-it/markdown-it
[bootstrap-tips]: http://getbootstrap.com/components/#tips
