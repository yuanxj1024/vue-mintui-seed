import Emitter from 'plugins/tiny-emitter/dist/tinyemitter.js';

function addClass(element, className) {
  element.classList.add(className);
}

function removeClass(element, className) {
  element.classList.remove(className);
}

function containClass(element, className) {
  return element.classList.contains(className);
}

/**
 * A pulldown to refresh plugin for iscroll.
 * @constructor
 * @param {object} cfg
 * @param {number} cfg.height
 * @param {string} cfg.content default html for pulldown
 * @param {string} cfg.downContent html for pulldown when scrollTop is smaller than cfg.height
 * @param {string} cfg.upContent html for pulldown when scrollTop is larger than cfg.height
 * @param {string} cfg.loadingContent html for pulldown when released
 * @param {string} cfg.clsPrefix  class prefix which default value is 'vue-iscroll-pulldown-'
 */
class Pulldown {
  constructor(cfg) {
    if (this.__isRender) return this;
    this.__isRender = true;
    this.cfg = cfg;
    this.render(cfg);
    this.emitter = new Emitter();
    return this;
  }
  render(cfg) {
    const containerCls = `${cfg.clsPrefix}container`;
    const height = cfg.height || 60;
    const pulldown = this.pulldown = this.element = document.createElement('div');
    pulldown.className = containerCls;
    pulldown.style.width = '100%';
    pulldown.style.height = `${height}px`;
    pulldown.style.lineHeight = `${height}px`;
    pulldown.style.textAlign = 'center';
    // pulldown.style.display = 'none';
    addClass(pulldown, `${cfg.clsPrefix}up`);
    this.status = 'up';
    cfg.container.insertBefore(pulldown, cfg.container.firstChild);
    pulldown.innerHTML = cfg.content;
  }
  _changeStatus(status) {
    const prevVal = this.status;
    this.status = status;
    removeClass(this.pulldown, this.cfg.clsPrefix + prevVal);
    addClass(this.pulldown, this.cfg.clsPrefix + status);

    // 状态变更，更改HTML
    this.pulldown.innerHTML = this.cfg[`${this.status}Content`] || this.cfg.content;
  }
  pull() {
    const status = 'up';
    this._changeStatus(status);
  }
  release() {
    const status = 'down';
    this._changeStatus(status);
  }
  loading() {
    const status = 'loading';
    this.pulldown.style.marginTop = '';
    this.pulldown.style.transitionDuration = '';
    this._changeStatus(status);
    // emit the loading event
    this.emitter.emit('loading');
  }
  reset(callback) {
    this.pull();
    if (callback) callback();
  }
  on(event, callback) {
    this.emitter.on(event, callback);
  }
}

class Pullup {
  constructor(cfg) {
    if (this.__isRender) return this;
    this.__isRender = true;
    this.cfg = cfg;
    this.render(cfg);

    this.emitter = new Emitter();
    return this;
  }
  render(cfg) {
    const containerCls = `${cfg.clsPrefix}container`;
    const height = cfg.height || 60;
    const pullup = this.pullup = this.element = document.createElement('div');
    pullup.className = containerCls;
    // pullup.style.position = 'absolute';
    pullup.style.width = '100%';
    pullup.style.height = `${height}px`;
    pullup.style.lineHeight = `${height}px`;
    pullup.style.textAlign = 'center';
    cfg.container.appendChild(pullup);
    this.status = 'down';
    addClass(pullup, cfg.clsPrefix + this.status);
    cfg.container.appendChild(pullup);
    pullup.innerHTML = cfg.content;
  }
  _changeStatus(status) {
    const prevVal = this.status;
    this.status = status;
    removeClass(this.pullup, this.cfg.clsPrefix + prevVal);
    addClass(this.pullup, this.cfg.clsPrefix + status);

    // 状态变更，更改HTML
    this.pullup.innerHTML = this.cfg[`${this.status}Content`] || this.cfg.content;
  }
  reset(callback) {
    this.push();
    if (callback) callback();
  }
  push() {
    const status = 'down';
    this._changeStatus(status);
  }
  release() {
    const status = 'up';
    this._changeStatus(status);
  }
  loading() {
    const status = 'loading';
    this.pullup.style.transitionDuration = '';
    this._changeStatus(status);
    // emit the loading event
    this.emitter.emit('loading');
  }
  complete() {
    // 数据加载完毕，清除下拉加载
    // const statue = 'complete';
    this.pullup.remove();
    this.emitter.emit('complete');
  }
  on(event, callback) {
    this.emitter.on(event, callback);
  }
}
module.exports = {
  Pulldown,
  Pullup,
  addClass,
  removeClass,
  containClass,
};
