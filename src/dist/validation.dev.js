"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.numberCheck = exports.validateEmail = exports.name = exports.required = void 0;

var required = function required(value) {
  return {
    isTrue: value.trim() !== "" && value.trim() !== null
  };
};

exports.required = required;

var name = function name(value) {
  var regex = /^[A-Za-z]+$/;
  return {
    isTrue: regex.test(value)
  };
};

exports.name = name;

var validateEmail = function validateEmail(value) {
  var regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return {
    isTrue: regex.test(value)
  };
};

exports.validateEmail = validateEmail;

var numberCheck = function numberCheck(value) {
  var regex = /(^[0]\d{10}$)|(^[\+]?[234]\d{12}$)/;
  return {
    isTrue: regex.test(value)
  };
};

exports.numberCheck = numberCheck;