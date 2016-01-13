var gulp = require("gulp");
var jeditor = require("gulp-json-editor");

var languages = ['de-DE', 'en-GR', 'fr-FR', 'nl-NL'];
var keyword   = 'KEY_TO_ADD';

gulp.task('default',function () {
	languages.forEach(function (language) {
		var file = ["translations/translation-", language,".json"].join("");
        
        var retVar = {}
        retVar[keyword] = language;
          
		gulp.src(file)
		  .pipe(jeditor(retVar))
		  .pipe(gulp.dest("changed"));
	});
})