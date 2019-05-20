import getQ from "./openTDB";

// Class intended for bank of questions, implements functionality to prevent repeated questions throught game, as well as running out of questions
class QuestionBank {
    constructor(category, difficulty, bank = []) {
        this.category = category;
        this.difficulty = difficulty;
        this.bank = bank;
    }
    get randomQ() {
        if (this.bank.length <= 1) {
            this.populateBank();
        }
        return this.randomQs(1)[0];
    }
    // Returns a 2d array where each element represents a pair of a randomly selected index and that index's contents.
    randomIs(n) {
        const num = n > this.bank.length ? this.bank.length : n;
        const rnd = () => Math.floor(Math.random() * this.bank.length);
        let usedIndexes = [];

        return Array.from({ length: num }, () => {
            let randI;
            // Prevent duplicated indexes
            while (usedIndexes.includes((randI = rnd())));

            usedIndexes.push(randI);
            return [randI, this.bank[randI]];
        });
    }
    // Removes questions from bank. Expects an array of indexes to remove.
    remove(indexes) {
        this.bank = this.bank.filter((v, i) => !indexes.includes(i));
    }
    // Returns num random indexexes from bank and removes them from the bank.
    randomQs(num) {
        const qs = this.randomIs(num);
        this.remove(qs.map((v) => v[0]));
        return qs.map((v) => v[1]).flat();
    }
    // Populates the bank with questions from using the opentdb API
    async populateBank() {
        return getQ(this).then((results) => (this.bank = [...results]));
    }
}

let easyBank = (async function() {
    let questions = new QuestionBank(9, "easy");
    await questions.populateBank();
    return questions;
})();

export { easyBank, QuestionBank };
