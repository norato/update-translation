var gulp = require("gulp");
var jeditor = require("gulp-json-editor");

var languages = ['de-DE', 'en-GR', 'fr-FR', 'nl-NL'];

gulp.task('default',function () {
	languages.forEach(function (language) {
		var file = ["translations/translation-", language,".json"].join("");
		gulp.src(file)
		  .pipe(jeditor({
		    'version': '1.2.3'
		  }))
		  .pipe(gulp.dest("changed"));
	});
})