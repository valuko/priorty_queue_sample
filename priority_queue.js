/**
 * Converted to a class to meet the JS convention of standard classes over Prototype classes
 */
class PriorityQueue {
    /** Removed the size parameter since it was not being used anywhere in the constructor */
    constructor() {
        this.store = {};
        this.count = 0;
    }

    add(value, priority) {
        /**
         * Added validation of the priority type to be an integer
         * Throw an error if its not an integer
         */
        if (isNaN(parseInt(priority))) {
            throw new Error('Priority is not an integer');
        }

        /** Used the integer value of priority for consistency */
        priority = parseInt(priority);
        /** Changed the check here to use typeof and === which is safer than == check */
        if (typeof this.store[priority] === "undefined") {
            this.store[priority] = [];
        }

        this.store[priority].push(value);
        this.count++;
    }

    pop() {
        /** Return null if no elements currently in the store */
        if (this.count < 1) {
            return null;
        }

        /** Added const before maxKey. Bad practice not to have const/var/let before a variable declaration */
        const maxKey = Math.max(Object.keys(this.store));
        this.count--;
        return this.store[maxKey].shift();
    }

    length() {
        return this.count;
    }

    /** Declared as a getter since it only returns a value. Camel cased method declaration also */
    get allPriorities() {
        return Object.keys(this.store);
    }

    forEach(callback) {
        const keys = Object.keys(this.store).sort();

        /** Used for-of because the priority keys may not be ordered as previously used */
        for (let key of keys) {
            for (let b = 0; b < this.store[key].length; b++) {
                callback(this.store[key][b]);
            }
        }
    }

    changePriority(value, newPriority) {
        /** 
         * This method assumes a value can only have one priority 
         * However, the add method could add multiple priorities to a value
         * A more suitable name for this function would be 'changeFirstPriority' 
         *  or preventing add() from adding a value to multiple priorities
         */
        /** Changed from a forEach to a for since it is easier to break out of a for loop than a forEach*/
        for (let priority in this.store) {
            for (let i = 0; i < this.store[priority].length; i++) {
                if (this.store[priority][i] === value) {
                    this.store[priority].splice(i, 1);  // remove the item
                    this.add(value, newPriority);
                    return;
                }
            }
        }
    }
    
    /** It would be helpful to have peek() and findPriority() methods */
}
