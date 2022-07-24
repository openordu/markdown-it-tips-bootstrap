'use strict';

var container = require('markdown-it-container');

function getRandomInt() {
    var min = Math.ceil(1);
    var max = Math.floor(1000);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
module.exports = function md_align_plugin(md, options) {
	var containerOpenCount = 0;
	var links = options ? options.links : true;
	init();
	return;
	
	function setupContainer(name) { 
        md.use(container, name, {
            render: function (tokens, idx) {
                if (tokens[idx].nesting === 1) {
                    containerOpenCount += 1;
                    if (name == 'right') {
                        return '<div class="float-end">\n';
                    } else if (name == 'left') {
                        return '<div class="float-start">\n';
                    } else if (name == 'center') {
                        return '<div class="">\n';
                    } else if (name == 'collapseinfo') {
                        var rand = getRandomInt();
                        return '<p><a class="btn btn-link" data-bs-toggle="collapse" href="#md-tips-' + name + '-' + rand + '" role="button" aria-expanded="false" aria-controls="md-tips-' + name + '-' + rand + '">Show Details</a></p><div class="collapse overflow-scroll alert alert-info" id="md-tips-' + name + '-' + rand+ '">\n';
                    } else {
                        return '<div class="alert alert-' + name + '" id="md-tips-' + name + '">Show details</a>\n';
                    }
                } else {
                    return '</div>\n';
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
        setupContainer('primary');
        setupContainer('secondary');
        setupContainer('success');
        setupContainer('danger');
        setupContainer('warning');
        setupContainer('info');
        setupContainer('collapseinfo');
        setupContainer('light');
        setupContainer('dark');
        setupContainer('right');
        setupContainer('left');
        setupContainer('center');
		
		if (links) {
			setupLinks();
		}
	}
};
