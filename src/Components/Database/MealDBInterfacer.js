class MealDB {
    constructor() {
        this.queries = {
            search: `https://www.themealdb.com/api/json/v1/1/search.php?s=`,
            details: `https://www.themealdb.com/api/json/v1/1/lookup.php?i=`,
            altSearch: `https://www.themealdb.com/api/json/v1/1/search.php?f=`,
            random: `https://www.themealdb.com/api/json/v1/1/random.php`
        }
    }
}

export default MealDB;