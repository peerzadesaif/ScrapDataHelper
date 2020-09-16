const useragent = require("useragent");
const low = require('lowdb')

module.exports.parseUserAgent = (device) => {
    try {
        // Old
        // req.headers["user-agent"],
        // const agent = useragent.parse(device);
        // New
        const agent = device.parser.useragent
        console.log('agent :>> ', agent);
        const parts = agent.toString().split("/");
        const browser = parts[0].trim();
        const platform = parts[1].trim();
        const _device = agent.device.family.toString();
        return `${browser}(Device-${device.type} | Platform-${platform})`;
    } catch (error) {
        console.error("Error Catch User Agent Parse: ", error);
        return "unidentified";
    }
};

const removeLineCustomRegex = (text) => {

    return text.replace('//\n/g', '').trim();
}

const makeMovieJosnObj = ($ch, i, element) => {
    return new Promise(async (resolve, reject) => {
        let moviejson = {}
        moviejson.id = removeLineCustomRegex($ch(element).find('.ribbonize').attr('data-tconst'))
        moviejson.title = removeLineCustomRegex($ch(element).find('.lister-item-header a').text())
        moviejson.certificate = removeLineCustomRegex($ch(element).find('.lister-item-content .text-muted .certificate').text());
        moviejson.genre = removeLineCustomRegex($ch(element).find('.lister-item-content .text-muted .genre').text());
        moviejson.imdbRating = removeLineCustomRegex($ch(element).find('.lister-item-content .ratings-bar .ratings-imdb-rating').text())
        moviejson.description = removeLineCustomRegex($ch(element).find('.lister-item-content p.text-muted').last().text());

        await $ch(element).find('.lister-item-content p').each((e, el) => {
            let f = $ch(el).find('span').attr('class')
            if (f === 'ghost' && $ch(el).not('.certificate')) {
                let array = $ch(el).text().split('|').map((x) => x.split(':'));
                array.map((x) => {
                    x.map((y) => {
                        if (y.includes('Stars')) {
                            moviejson.actors = x[1] ? removeLineCustomRegex(x[1]) : '';
                        } else if (y.includes('Director')) {
                            moviejson.directors = x[1] ? removeLineCustomRegex(x[1]) : '';
                        }
                    })
                })
            }
        })
        resolve(moviejson)
    })

}



module.exports.getCheerioMovies = ($ch, db) => {
    let array = []
    return new Promise(async (resolve, reject) => {
        await $ch('.lister-item').each(async function (i, element) {
            let moviejson = await makeMovieJosnObj($ch, i, element)
            let id = removeLineCustomRegex($ch(element).find('.ribbonize').attr('data-tconst'))
            array.push(moviejson);
        })
        resolve({ list: array })
    })
}

// Below are not in use
module.exports.getCheerioMovieTitle = ($ch) => {
    return new Promise((resolve, reject) => {
        $ch('.lister-item-header a').filter(function () {
            console.log('$ch(this).text()', $ch(this).text())
            resolve($ch(this).text())
        });
    })
}

module.exports.getCheerioMovieYear = ($ch) => {
    return new Promise((resolve, reject) => {
        $ch('.lister-item-header .lister-item-year').filter(function () {
            console.log('Year', $ch(this).text())

            resolve($ch(this).text())
        });
    })
}

module.exports.getCheerioMovieCertificate = ($ch) => {
    return new Promise((resolve, reject) => {
        $ch('.lister-item .lister-item-content .text-muted .certificate').filter(function () {
            resolve($ch(this).text())
        });
    })
}

module.exports.getCheerioMovieGenre = ($ch) => {
    return new Promise((resolve, reject) => {
        $ch('.lister-item .lister-item-content .text-muted .genre').filter(function () {
            resolve($ch(this).text())
        })
    })
}

module.exports.getCheerioMovieIMDBRating = ($ch) => {
    return new Promise((resolve, reject) => {
        $ch('.lister-item .lister-item-content .ratings-bar .ratings-imdb-rating').filter(function () {
            resolve($ch(this).attr('data-value'))
        })
    })
}

module.exports.getCheerioMovieDescription = ($ch) => {
    return new Promise((resolve, reject) => {
        $ch('.lister-item .lister-item-content p').filter(function () {
            let data = $ch(this);
            if (data.attr('class') === 'text-muted' && data.not('.certificate')) {
                resolve($ch(this).text())
            }
        });
    })
}

module.exports.getCheerioMovieDirectorActor = ($ch) => {
    return new Promise((resolve, reject) => {
        $ch('.lister-item .lister-item-content p').filter(function () {
            let data = $ch(this);
            let f = data.find('span').attr('class')
            if (f === 'ghost' && data.not('.certificate')) {
                let directors = [];
                let actors = [];
                let array = data.text().split('|').map((x) => x.split(':'));
                array.map((x) => {
                    x.map((y) => {
                        if (y.includes('Stars')) {
                            actors = x[1] ? x[1].replace('/\n', '') : '';
                        } else if (y.includes('Director')) {
                            directors = x[1] ? x[1].replace('/\n', '') : '';
                        }
                    })
                })
                resolve({ actors, directors })
            }
        })
    })
}