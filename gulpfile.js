const gulp = require('gulp');
const fs = require('fs');
const path = require('path');

//lint
const eslint = require('gulp-eslint');

//less
const less = require('gulp-less');
const postcss = require('gulp-postcss');
const postcssPlugin = require('./postcss.config');
const px2rem = require('postcss-px2rem');
//js
const rollup = require('rollup');
const babel = require('rollup-plugin-babel');
const nodeResolve = require('rollup-plugin-node-resolve');
const commonjs = require('rollup-plugin-commonjs');
const uglify = require('rollup-plugin-uglify');
const replace = require('rollup-plugin-replace');
const rename = require('gulp-rename');

//pub
const inquirer = require('inquirer');
const file = require('html-wiring');
const chalk = require('chalk');
const spawn = require('cross-spawn');
const pkg = JSON.parse(file.readFileAsString('package.json'));
const git = require('git-rev');
const Promise = require('promise');

//js
gulp.task('js_build', function () {
	return rollup.rollup({
		entry: "./src/index.js",
		external: [
			'react',
			'react-dom',
			'prop-types'
		],
		plugins: [
			nodeResolve({jsnext: true}),
			commonjs({ extensions: ['.js'], ignoreGlobal: false, sourceMap: false}),
			replace({ 'process.env.NODE_ENV': JSON.stringify('production') }),
			babel({
				babelrc: false,
				sourceMap: false,
				exclude: 'node_modules/**',
				presets: [
					[
						"es2015",
						{
							"modules": false
						}
					],
					'stage-0',
					"react"
				],
				plugins: [
					"external-helpers"
				]
			}),
			uglify()
		],
	}).then(function (bundle) {
		bundle.write({
			format: "umd",
			moduleName: "lebra",
			dest: "./lib/lebra.js",
			globals: {
				'react': 'React',
				'react-dom': 'ReactDOM',
				'prop-types': 'PropTypes'
			},
		});
	})
});

//less编译

gulp.task('less_build', function () {
    var processors = [px2rem({remUnit: 75})];
	gulp.src('./src/style/index.less')
		.pipe(less())
		.pipe(postcss(processors))
		.pipe(rename('lebra.css'))
		.pipe(gulp.dest('./lib'));

});

//代码检查
gulp.task('lint', function () {
	let eslintCfg = fs.readFileSync('./.eslintrc.js');
	console.log(eslint);
	gulp.src([
		path.join(process.cwd(), './src/**/*.js'),
	])
		.pipe(eslint(eslintCfg))
		.pipe(eslint.format('table'))
		.pipe(eslint.failAfterError());
});

/**
 * 校验版本
 * @param a
 * @param b
 * @returns {boolean}
 */
function versionCompare(a, b) {
	let aArr = a.split('.');
	let bArr = b.split('.');
	let larger = false;
	for (let i = 0; i < 3; i++) {
		if (parseInt(aArr[i]) === parseInt(bArr[i])) {

		}
		else {
			larger = parseInt(aArr[i]) > parseInt(bArr[i]);
			break;
		}
	}
	return larger;
}

/**
 * 发布询问
 * @returns {*|Promise}
 */
function getQuestions() {
	return new Promise(function(resolve, reject) {
		git.branch(function(branch) {
			let defaultBranch = branch;
			let questions = [
				{
					type: 'input',
					name: 'version',
					message: 'please enter the package version to publish (should be xx.xx.xx)',
					default: pkg.version,
					validate: function(input) {
						if (/\d+\.\d+\.\d+/.test(input)) {
							if (versionCompare(input, pkg.version)) {
								return true;
							}
							else {
								return "the version you entered should be larger than now"
							}
						}
						else {
							return "the version you entered is not valid"
						}
					}
				},
				{
					type: 'input',
					name: 'branch',
					message: 'which branch you want to push',
					default: defaultBranch
				},
				{
					type: 'input',
					name: 'npm',
					message: 'which npm you want to publish',
					default: 'npm',
					validate: function(input) {
						if (/npm/.test(input)) {
							return true;
						}
						else {
							return "it seems not a valid npm"
						}
					}
				}
			];
			resolve(questions);
		});
	})
}




gulp.task('build', ['less_build', 'js_build']);


//publish
gulp.task('pub', ['lint', 'build'], function() {
	getQuestions().then(function(questions) {
		inquirer.prompt(questions).then(function(answers) {

			pkg.version = answers.version;
			file.writeFileFromString(JSON.stringify(pkg, null, ' '), 'package.json');
			console.log(chalk.blue('#### Git Info ####'));
			spawn.sync('git', ['add', '.'], {stdio: 'inherit'});
			spawn.sync('git', ['commit', '-m', 'ver. ' + pkg.version], {stdio: 'inherit'});
			spawn.sync('git', ['push', 'origin', answers.branch], {stdio: 'inherit'});
			console.log(chalk.blue('#### Npm Info ####'));
			spawn.sync(answers.npm, ['publish'], {stdio: 'inherit'});
		});
	});
});
