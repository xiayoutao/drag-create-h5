export default class Drag {
	constructor(options) {
		console.log('Drag', options);
		this.mousedown = options.mousedown;
		this.mousemove = options.mousemove;
		this.mouseup = options.mouseup;

		this._mousedown = this._mousedown.bind(this);
		this._mousemove = this._mousemove.bind(this);
		this._mouseup = this._mouseup.bind(this);
	}

	start(e) {
		this._mousedown(e);
	}

	_mousedown(e) {
		this.mousedown(e);
		this.toggleListener('add');
	}

	_mousemove(e) {
		this.mousemove(e);
	}

	_mouseup(e) {
		this.mouseup(e);
		this.toggleListener('remove');
	}

	toggleListener(action) {
		document[`${action}EventListener`]('mousemove', this._mousemove);
		document[`${action}EventListener`]('mouseup', this._mouseup);
	}
}
