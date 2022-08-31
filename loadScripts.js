(function(){
    const loadScript = (url) => {
        return new Promise((resolve, reject) => {
            const script = document.createElement('script');
            script.src = url;

            script.addEventListener('load', function () {
                resolve(true);
            });

            document.head.appendChild(script);
        });
    };

    const waterfall = (promises) => {
        return promises.reduce(
            (p, c) => {
                return p.then(() => {
                    return c.then((result) => {
                        return true;
                    });
                });
            },
            Promise.resolve([])
        );
    };

    const loadScripts = (arrayOfJs) => {
        const promises = arrayOfJs.map((url) => {
            return loadScript(url);
        });
        return waterfall(promises);
    };

    loadScripts([
        'https://code.jquery.com/jquery-3.6.1.min.js',
        'https://unpkg.com/vue@3'])
    .then(() => {
        console.log('all scripts are loaded...');
    });
})();