export default class ContentParser {
    constructor() {
        this.ingredientsStr = "strIngredient"
        this.measuresStr = "strMeasure"
    }

    parseContent(mealDbObject) {
        let ingredients = ["Ingredients:"];

        for (let i = 1; i <= 20; i++) {

            if (mealDbObject[this.ingredientsStr + i] === "" || mealDbObject[this.ingredientsStr + i] === null) continue;

            ingredients.push(`- ${mealDbObject[this.ingredientsStr + i]}   ${mealDbObject[this.measuresStr + i]}`);
        }

        ingredients.push("\nInstructions: ");
        ingredients.push(mealDbObject.strInstructions.trim());
        ingredients.push("\n\n\n");
        ingredients = ingredients.join('\n');

        return ingredients;

    }
}