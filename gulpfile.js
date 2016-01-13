var gulp = require("gulp");
var jeditor = require("gulp-json-editor");
var prompt = require("gulp-prompt");

var languages = [
    {culture : 'de-DE', translation: ''},
    {culture : 'en-GR', translation: ''},
    {culture : 'fr-FR', translation: ''},
    {culture : 'nl-NL', translation: ''}
];
var keyword   = '';

gulp.task('default',function(){getValues()});

function getValues() {
    gulp.src(["translations/"])
        .pipe(prompt.prompt([{
            type: 'input',
            name: 'first',
            message: 'First question?'
        },
        ], function(res){
            keyword = res.first;
            translate();
        })
        .once('end', function () {
            report();
            process.exit();
        })
    );
}

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

function report () {
    console.log("Add key: ", keyword);
}