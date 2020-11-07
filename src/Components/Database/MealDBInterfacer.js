class MealDB {
    constructor() {
        this.queries = {
            search: `https://www.themealdb.com/api/json/v1/1/search.php?s=`,
            details: `https://www.themealdb.com/api/json/v1/1/lookup.php?i=`,
            altSearch: `https://www.themealdb.com/api/json/v1/1/search.php?f=`,
            random: `https://www.themealdb.com/api/json/v1/1/random.php`
        }

        this.createRandomPromise = this.createRandomPromise.bind(this);
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
        let results = [];
        for (let i = 0; i < quantity; i++) promises.push(this.createRandomPromise());

        Promise.all(promises).then(stuff => {
            new Promise(resolve => {
                results = stuff.map(stuff => stuff.meals);
                resolve(stuff.map(stuff => stuff.meals));
            });
        }).then(() => {
            console.log(results);
        });
    }
}

export default MealDB;