'use strict';
let qs = selector => document.querySelector(selector);
let qsAll = selector => document.querySelectorAll(selector);
let $ = {};
$.navBar = qs('.navbar');
$.career = qs('.careers');
$.search = qs('.actions');
$.searchInputField = qs('.search'); //the whole box
$.cross = qsAll('.fa-xmark');

$.searchBoxInput = qs('input[name]'); //the only input field

$.links = qs('.links');
$.navigation = qs('.navigation');

$.social = qs('.social');

$.date = qsAll('.date');
let childs = [...$.career.children]; //all the children of the career
let children = [...childs[0].children]; //first children of childs
let maxLength = childs.length; //the length of childs

//for career drop-down
let popup = () => {
  children.forEach(child => child.classList.toggle('hidden'));
  childs[maxLength - 1].classList.toggle('hidden');
};
$.career.addEventListener('click', popup);

[...$.search.children][0].addEventListener('click', function (e) {
  $.searchInputField.classList.remove('hidden', 'visible');
  $.searchInputField.classList.add('searchAnimation');
  $.searchBoxInput.focus();
  $.navBar.classList.add('hidden');
});

$.cross[1].addEventListener('click', function (e) {
  console.log('inside');
  $.searchInputField.classList.add('visible');
  $.searchInputField.classList.remove('searchAnimation');
  setTimeout(() => {
    $.searchInputField.classList.add('hidden');
    $.navBar.classList.remove('hidden');
  }, 1000);
});

// for mobile screen nav bar
const mediaQuery = window.matchMedia('(max-width:990px)');

const handleMobileView = mediaQuery => {
  if (mediaQuery.matches) {
    //do this
    [...$.navBar.children][0].classList.remove('hidden'); //the hamburger sign
    $.links.classList.add('hidden');
    $.navigation.classList.add('flex');
    $.social.classList.remove('hidden');
    $.career.removeEventListener('click', popup);
  } else {
    //do this
    [...$.navBar.children][0].classList.add('hidden'); //the hamburger sign
    $.links.classList.remove('hidden');
    $.navigation.classList.remove('flex');
    $.links.classList.remove('smallScreen');
    $.social.classList.add('hidden');
    $.career.addEventListener('click', popup);
  }
};

mediaQuery.addListener(handleMobileView);
//initial Check
handleMobileView(mediaQuery);
$.slider = qs('.slider');
[...$.navBar.children][0].addEventListener('click', function () {
  $.links.classList.remove('hidden');

  $.links.classList.add('smallScreen');

  [...$.navBar.children][0].classList.toggle('hidden');
  [...$.navBar.children][1].classList.toggle('hidden');
});
[...$.navBar.children][1].addEventListener('click', function () {
  $.links.classList.add('hidden');
  [...$.navBar.children][0].classList.toggle('hidden');
  [...$.navBar.children][1].classList.toggle('hidden');
});
let options = {
  day: 'numeric',
  month: 'short',
  year: 'numeric',
};
let month = new Date().getMonth() + 1;
$.date.forEach(
  day =>
    (day.textContent = `${new Intl.DateTimeFormat(
      navigator.language,
      options
    ).format(new Date().setMonth(month, 5))}`)
);
