// import * as logoSVG from './assets/logo.svg';
import './styles/index.scss'

const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const faviconTag = document.createElement(`link`);
faviconTag.rel = 'icon';
faviconTag.type = 'image/x-icon';
faviconTag.href = logoSVG;

document.head.appendChild(faviconTag);
