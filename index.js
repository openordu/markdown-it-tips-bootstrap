'use strict';

var container = require('markdown-it-container');

function getRandomInt() {
    var min = Math.ceil(1);
    var max = Math.floor(1000);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getIconClass(name) {
    const icons = {
        'tip': 'fas fa-lightbulb',
        'primary': 'fas fa-star',
        'secondary': 'fas fa-circle',
        'success': 'fas fa-check-circle',
        'danger': 'fas fa-exclamation-triangle',
        'warning': 'fas fa-exclamation-circle',
        'info': 'fas fa-circle-info',
        'light': 'fas fa-sun',
        'dark': 'fas fa-moon',
        'details': 'fas fa-memo-circle-info',
    };

    return icons[name] || 'fas fa-circle-info';
}

module.exports = function md_bootstrap_boxes_plugin(md, options) {
    var containerOpenCount = 0;
    var links = options ? options.links : true;
    init();
    return;

    function setupContainer(name) {
        md.use(container, name, {
            render: function (tokens, idx) {
                if (tokens[idx].nesting === 1) {
                    containerOpenCount += 1;

                    const iconClass = getIconClass(name)
                    const titleTextFromMarkdown = tokens[idx].info.trim().substring(name.length).trim();
                    const titleText = titleTextFromMarkdown === "" ? name.charAt(0).toUpperCase() + name.slice(1) : titleTextFromMarkdown;


                    if (name === 'left') {
                        return '<div class="float-start">\n';
                    } else if (name === 'right') {
                        return '<div class="float-end">\n';
                    } else if (name === 'pre') {
                        return '<div class="preformatted">\n';
                    } else if (name === 'center') {
                        return '<div class="text-center">\n';
                    } else if (name === 'details') {
                        return `<div class="alert alert-primary" id="md-tips-${name}"><p class="lead"><i class="icon fa-solid fa-${iconClass}"></i>${titleText}</p>\n`;
                    } else if (name === "collapseinfo") {
                        if (titleText == "collapseinfo") {
                            titleText = titleText === "" ? "Show more" : titleText;
                        }
                        var rand = getRandomInt();
                        var anchorText = `<i class="icon fa-solid fa-${iconClass}"></i>&nbsp;<span class="show-text">${titleText}</span>&nbsp;<i class="icon fa-solid fa-angle-down"></i>`;
                        return `<a class="btn btn-link d-flex justify-start col-12 alert-info" data-bs-toggle="collapse" href="#md-tips-${name}-${rand}" role="button" aria-expanded="false" aria-controls="md-tips-${name}-${rand}">${anchorText}</a>
                        <div class="collapse overflow-scroll alert alert-info md-collapseinfo" id="md-tips-${name}-${rand}" style="max-height: 200px;"><p class="lead">${titleText}</p>\n`;
                    } else {
                        return `<div class="alert alert-${name}" id="md-tips-${name}"><p class="lead"><i class="icon fa-solid fa-${iconClass}"></i>${titleText}</p>\n`;
                    }
                } else {
                    return '</div><div class="clearfix"></div>\n';
                }
            }
        });
    }

    function isContainerOpen() {
        return containerOpenCount > 0;
    }

    function selfRender(tokens, idx, options, env, self) {
        return self.renderToken(tokens, idx, options);
    }

    function setupLinks() {
        var defaultRender = md.renderer.rules.link_open || selfRender;

        md.renderer.rules.link_open = function (tokens, idx, options, env, self) {
            if (isContainerOpen()) {
                tokens[idx].attrPush(['class', 'md-align-link']);
            }

            return defaultRender(tokens, idx, options, env, self);
        };
    }

    function init() {
        setupContainer('tip');
        setupContainer('pre');
        setupContainer('details');
        setupContainer('primary');
        setupContainer('secondary');
        setupContainer('success');
        setupContainer('danger');
        setupContainer('warning');
        setupContainer('info');
        setupContainer('collapseinfo');
        setupContainer('light');
        setupContainer('dark');
        setupContainer('left');
        setupContainer('right');
        setupContainer('center');

        if (links) {
            setupLinks();
        }
    }
};
