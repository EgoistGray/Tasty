class MealDB {
    constructor() {
        this.queries = {
            search: `https://www.themealdb.com/api/json/v1/1/search.php?s=`,
            details: `https://www.themealdb.com/api/json/v1/1/lookup.php?i=`,
            altSearch: `https://www.themealdb.com/api/json/v1/1/search.php?f=`,
            random: `https://www.themealdb.com/api/json/v1/1/random.php`
        }

        this.createRandomPromise = this.createRandomPromise.bind(this);

        this.seenDatasetsIds = [];
    }

    createRandomPromise() {
        return new Promise((resolve, reject) => {
            fetch(this.queries.random)
                .then(text => text.json())
                .then(json => resolve(json))
                .catch(err => reject(err));
        });
    }

    getRandoms(quantity) {
        let promises = [];

        for (let i = 0; i < quantity; i++) promises.push(this.createRandomPromise());

        return Promise.all(promises).then(stuff => {
            return new Promise(resolve => {
                let results = stuff.map(stuff => stuff.meals).flat();
                resolve(results);
            });
        });
    }
    static sanitizeDatasets(datasets) {
        let sanitized = [];
        let seenDatasetsIds = [];

        let ids = datasets.map((dataset) => dataset.idMeal);
        ids.map((id, index) => {
            if (ids.indexOf(id) === index && seenDatasetsIds.indexOf(id) === -1) {

                seenDatasetsIds.push(id);
                sanitized.push(datasets[index]);
            }

            return id;
        });

        console.table(sanitized);

        return sanitized;
    }

    search(s) {
        return new Promise((resolve, reject) => {
            fetch(this.queries.search + s)
                .then(text => text.json())
                .then(json => resolve(json))
                .catch(err => reject(err));
        });
    }
}

export default MealDB;