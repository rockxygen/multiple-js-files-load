(function(){
    const loadScript = function (url) {
        return new Promise(function (resolve, reject) {
            const script = document.createElement('script');
            script.src = url;

            script.addEventListener('load', function () {
                resolve(true);
            });

            document.head.appendChild(script);
        });
    };

    const waterfall = function (promises) {
        return promises.reduce(
            function (p, c) {
                return p.then(function () {
                    return c.then(function (result) {
                        return true;
                    });
                });
            },
            Promise.resolve([])
        );
    };

    const loadScripts = function (arrayOfJs) {
        const promises = arrayOfJs.map(function (url) {
            return loadScript(url);
        });
        return waterfall(promises);
    };

    loadScripts([
        'https://code.jquery.com/jquery-3.6.1.min.js',
        'https://unpkg.com/vue@3'])
    .then(function () {
        console.log('all scripts are loaded...');
    });
})();