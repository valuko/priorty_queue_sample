class PriorityQueue {
    constructor() {
        this.store = {};
        this.count = 0;
    }

    add(value, priority) {
        if (isNaN(parseInt(priority))) {
            throw new Error('Priority is not a number');
        }

        priority = parseInt(priority);
        if (typeof this.store[priority] === "undefined") {
            this.store[priority] = [];
        }

        this.store[priority].push(value);
        this.count++;
    }

    pop() {
        const maxKey = Math.max(Object.keys(this.store));
        this.count--;
        return this.store[maxKey].shift();
    }

    length() {
        return this.count;
    }

    get allPriorities() {
        return Object.keys(this.store);
    }

    forEach(callback) {
        const keys = this.allPriorities.sort();

        for (let key of keys) {
            for (let b = 0; b < this.store[key].length; b++) {
                callback(this.store[key][b]);
            }
        }
    }

    changePriority(value, newPriority) {
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
}
