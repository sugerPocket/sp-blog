'use strict';

const gulp = require('gulp');
const eslint = require('gulp-eslint');

/**
 *
 * 命令：gulp lint
 * 作用：检查gulpfile配置文件，前端，服务端es6代码风格
 *
 */
gulp.task('lint', ['lint:gulp', 'lint:fe']);

/**
 *
 * 命令：gulp lint:gulp
 * 功能：检查gulpfile配置文件代码风格
 *
 */
gulp.task('lint:gulp', function () {

  let source = ['./gulpfile.js', './gulp-config/**/*.js'];
  let options = getEslintOptions('se');

  return getEslintPipeStream(source, options);

});

/**
 *
 * 命令：gulp lint:fe
 * 作用：检查前端es6代码风格
 *
 */
gulp.task('lint:fe', function () {

  let options = getEslintOptions('fe');
  let source = ['./sugerpocket-fe/**/*.js'];

  return getEslintPipeStream(source, options);

});

/**
 * Gets the eslint pipe stream.
 *
 * @param      {Object}  source   The source
 * @param      {Object}  options  The options
 * @return     {fileStream}  The eslint pipe stream.
 */
const getEslintPipeStream = function (source, options) {

  return gulp.src(source)
    .pipe(eslint(options))
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());

};

/**
 * Gets the eslint options according to the env(fe or se)
 *
 * @param      {String}  env     The environment
 * @return     {Object}  The eslint options
 */
const getEslintOptions = function (env) {

  let rules = getEslintOptionsRules(env);
  let globals = getEslintOptionsGlobals(env);
  let envs = getEslintOptionsEnvs(env);

  let options = { rules, globals, envs };

  return options;

};

/**
 * Gets the eslint options rules according to the env(fe or se)
 *
 * @param      {String}  env     The environment
 * @return     {Object}  The eslint options rules.
 */
const getEslintOptionsRules = function (env) {

  let rules = {
    strict: 2,
    'no-var': 2,
    'no-new-object': 2,
    'object-shorthand': 2,
    'quote-props': ['error', 'as-needed'],
    'no-array-constructor': 2,
    'array-callback-return': 2,
    quotes: ['error', 'single', { avoidEscape: true, allowTemplateLiterals: true }],
    'no-cond-assign': 2,
    'comma-dangle': ['error', 'never'],
    'comma-spacing': ['error', { before: false, after: true }],
    'no-extra-semi': 2,
    'semi-spacing': ['error', { before: false, after: true }],
    semi: ['error', 'always'],
    'wrap-iife': ['error', 'inside'],
    'no-loop-func': 'warn',
    indent: ['warn', 2, { SwitchCase: 1 }],
    'space-before-blocks': 'error',
    'keyword-spacing': ['error', { before: true }],
    'space-infix-ops': 'error',
    'eol-last': 'error',
    'space-in-parens': ['error', 'never'],
    'array-bracket-spacing': ['error', 'never'],
    'object-curly-spacing': ['error', 'always'],
    // 'max-len': ['warn', 100],
    'comma-style': ['error', 'last'],
    radix: 'error',
    // 'new-cap': ['warn', { newIsCap: true }],
    'no-underscore-dangle': 'error',
    'no-console': 'warn'
  };
  return rules;

};

/**
 * Gets the eslint options globals according to the env(fe or se)
 *
 * @param      {String}  env     The environment
 * @return     {Array}   The eslint options globals.
 */
const getEslintOptionsGlobals = function (env) {

  let globals = [];

  if (env === 'fe') globals = ['$', 'jQuery', 'angular'];
  else if (env === 'se') globals = [];

  return globals;

};

/**
 * Gets the eslint options envs according to the env(fe or se)
 *
 * @param      {String}  env     The environment
 * @return     {Array}   Array  The eslint options envs.
 */
const getEslintOptionsEnvs = function (env) {

  let envs = [];
  if (env === 'fe') envs = ['browser', 'node', 'es6'];
  else if (env === 'se') envs = ['node', 'es6'];
  return envs;

};
