var gulp = require("gulp");
var jeditor = require("gulp-json-editor");
var prompt = require("gulp-prompt");

var languages = [
    {culture : 'de-DE', translation: ''},
    {culture : 'en-GR', translation: ''},
    {culture : 'fr-FR', translation: ''},
    {culture : 'nl-NL', translation: ''}
];
var keyword = '';

gulp.task('default',function(){getValues()});

function getValues() {
    gulp.src(["translations/"])
        .pipe(prompt.prompt(
        questions
        , function(res){
            setValues(res);
            translate();
        })
        .on('end', function () {
            report();
        })
    );
}
var questions = [
    {
        type: 'input',
        name: 'keyword',
        message: 'Type keyword to translate:'
    },
    {
        type: 'input',
        name: 'de',
        message: 'Type de-DE translation:'
    },
    {
        type: 'input',
        name: 'en',
        message: 'Type en-GR translation:'
    },
    {
        type: 'input',
        name: 'fr',
        message: 'Type fr-FR translation:'
    },
    {
        type: 'input',
        name: 'nl',
        message: 'Type nl-NL translation:'
    }
];

function setValues (res) {
    keyword = res.keyword;

    languages[0].translation = res.de;
    languages[1].translation = res.en;
    languages[2].translation = res.fr;
    languages[3].translation = res.nl;
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
    console.log("Press crtl+c to exit!");
}