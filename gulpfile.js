var gulp = require("gulp");
var jeditor = require("gulp-json-editor");


var languages = [
	{culture : 'de-DE', translation: ''}, 
	{culture : 'en-GR', translation: ''}, 
	{culture : 'fr-FR', translation: ''}, 
	{culture : 'nl-NL', translation: ''}
];
var keyword   = 'KEY_TO_ADD';

gulp.task('default',translate());

function translate() {
	languages.forEach(function (language) {
		var file = ["translations/translation-", language.culture,".json"].join("");
        
        var retVar = {}
        retVar[keyword] = language.translation;
          
		gulp.src(file)
		  .pipe(jeditor(retVar))
		  .pipe(gulp.dest("changed"));
	});
}