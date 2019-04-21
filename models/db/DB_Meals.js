const db =  require("../../dbConnection");



const Meals = {

    getAll__from_mensa_date(mensaId, date, callback){
        return db.query("SELECT meals.mealId, meals.name, meals.output, meals.price_student, meals.price_employees, meals.price, meals.notes FROM `meals` WHERE date = ? AND meals.mensa = ? ORDER BY `meals`.`output` ASC",[date,mensaId], callback);
    }

}

module.exports = Meals;