"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.handleBlur = exports.inputChangeHandler = void 0;

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var inputChangeHandler = function inputChangeHandler(event, elementID, formType, updateFunction, setFormValid) {
  var isValid = true;
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = formType[elementID].validations[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var validation = _step.value;
      isValid = validation(event.target.value).isTrue && isValid;
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator["return"] != null) {
        _iterator["return"]();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }

  var updatedFormElement = _objectSpread({}, formType[elementID], {
    value: event.target.value,
    isValid: isValid
  });

  var updatedForm = _objectSpread({}, formType, _defineProperty({}, elementID, updatedFormElement));

  setFormValid();
  return updateFunction(updatedForm);
};

exports.inputChangeHandler = inputChangeHandler;

var handleBlur = function handleBlur(elementID, formType, updateFunction) {
  var updatedFormElement = _objectSpread({}, formType[elementID], {
    blur: true
  });

  var updatedForm = _objectSpread({}, formType, _defineProperty({}, elementID, updatedFormElement));

  return updateFunction(updatedForm);
};

exports.handleBlur = handleBlur;