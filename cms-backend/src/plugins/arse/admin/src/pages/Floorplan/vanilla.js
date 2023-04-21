var editor = 'https://embed.diagrams.net/?embed=1&ui=atlas&spin=1&proto=json';
var initial = null;
var name = null;

function edit(image)
{
	var iframe = document.createElement('iframe');
	iframe.setAttribute('frameborder', '0');

	var close = function()
	{
		window.removeEventListener('message', receive);
		document.body.removeChild(iframe);
	};

	var draft = localStorage.getItem('.draft-' + name);

	if (draft != null)
	{
		draft = JSON.parse(draft);

		if (!confirm("A version of this page from " + new Date(draft.lastModified) + " is available. Would you like to continue editing?"))
		{
			draft = null;
		}
	}

	var receive = function(evt)
	{
		if (evt.data.length > 0)
		{
			var msg = JSON.parse(evt.data);

			if (msg.event == 'init')
			{
				if (draft != null)
				{
					iframe.contentWindow.postMessage(JSON.stringify({action: 'load',
						autosave: 1, xml: draft.xml}), '*');
					iframe.contentWindow.postMessage(JSON.stringify({action: 'status',
						modified: true}), '*');
				}
				else
				{
					iframe.contentWindow.postMessage(JSON.stringify({action: 'load',
						autosave: 1, xmlpng: image.getAttribute('src')}), '*');
				}
			}
			else if (msg.event == 'export')
			{
				image.setAttribute('src', msg.data);
				localStorage.setItem(name, JSON.stringify({lastModified: new Date(), data: msg.data}));
				localStorage.removeItem('.draft-' + name);
				draft = null;
				close();
			}
			else if (msg.event == 'autosave')
			{
				localStorage.setItem('.draft-' + name, JSON.stringify({lastModified: new Date(), xml: msg.xml}));
			}
			else if (msg.event == 'save')
			{
				iframe.contentWindow.postMessage(JSON.stringify({action: 'export',
					format: 'xmlpng', xml: msg.xml, spin: 'Updating page'}), '*');
				localStorage.setItem('.draft-' + name, JSON.stringify({lastModified: new Date(), xml: msg.xml}));
			}
			else if (msg.event == 'exit')
			{
				localStorage.removeItem('.draft-' + name);
				draft = null;
				close();
			}
		}
	};

	window.addEventListener('message', receive);
	iframe.setAttribute('src', editor);
	document.body.appendChild(iframe);
};

function load()
{
	initial = document.getElementById('image').getAttribute('src');
	start();
};

function start()
{
	name = (window.location.hash.length > 1) ? window.location.hash.substring(1) : 'default';
	var current = localStorage.getItem(name);

	if (current != null)
	{
		var entry = JSON.parse(current);
		document.getElementById('image').setAttribute('src', entry.data);
	}
	else
	{
		document.getElementById('image').setAttribute('src', initial);
	}
};

window.addEventListener('hashchange', start);
