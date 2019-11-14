let mix = require('laravel-mix')

mix.sass('src/sass/style.scss', 'src/css')
mix.options({
    processCssUrls: false
})
