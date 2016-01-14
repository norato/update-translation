import gulp from "gulp"
import jeditor from "gulp-json-editor"
import prompt from "gulp-prompt"

let languages = [
    {culture : 'de-DE', translation: ''},
    {culture : 'en-GR', translation: ''},
    {culture : 'fr-FR', translation: ''},
    {culture : 'nl-NL', translation: ''}
]
let keyword = ''

gulp.task('default', ['getValues']);

gulp.task('getValues', () => {
    gulp.src(["translations/"])
        .pipe(prompt.prompt(
        questions
        , function(res){
            setValues(res)
            translate()
        })
        .on('end', () =>{
            report()
        })
    );
})

let questions = [
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
]

var setValues = (res) => {
    keyword = res.keyword

    languages[0].translation = res.de
    languages[1].translation = res.en
    languages[2].translation = res.fr
    languages[3].translation = res.nl
}


var translate = () => {
    languages.forEach( language => {
        var file = ["translations/translation-", language.culture,".json"].join("")

        var retVar = {}
        retVar[keyword] = language.translation

        gulp.src(file)
          .pipe(jeditor(retVar))
          .pipe(gulp.dest("changed"))
    })
}

var report = () => {
    console.log("Add key: ", keyword)
    console.log("Press crtl+c to exit!")
}