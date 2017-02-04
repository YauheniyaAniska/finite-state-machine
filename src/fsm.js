class FSM {
    /**
     * Creates new FSM instance.
     * @param config
     */
    constructor(config) {
        if (config == null) throw Error();
        this.config = config;
        this.activeState = this.config.initial;
        this.prev = [];
        this.next = [];
    }

    /**
     * Returns active state.
     * @returns {String}
     */
    getState() {
        return this.activeState;
    }

    /**
     * Goes to specified state.
     * @param state
     */
    changeState(state) {
        if (state in this.config.states){
           this.prev.push(this.activeState);
            this.activeState = state;
            this.next =  [];
        }
        else
            throw Error()
    }

    /**
     * Changes state according to event transition rules.
     * @param event
     */
    trigger(event) {
        if (event in this.config.states[this.activeState].transitions) {
            this.prev.push(this.activeState);
            this.activeState = this.config.states[this.activeState].transitions[event];
            this.next = [];
        }
        else
            throw Error();
    }

    /**
     * Resets FSM state to initial.
     */
    reset() {
        this.prev.push(this.activeState);
        this.activeState = this.config.initial;
        this.next = [];
    }

    /**
     * Returns an array of states for which there are specified event transition rules.
     * Returns all states if argument is undefined.
     * @param event
     * @returns {Array}
     */
    getStates(event) {
        var result = [];
        if (typeof(event) === 'undefined') {
            result = [];
            for (var i in this.config.states)
                result.push(i);
            return result;
        }
        result = [];
        for (var j in this.config.states) {
            if (event in this.config.states[j].transitions)
                result.push(j);
        }
        return result;
    }

    /**
     * Goes back to previous state.
     * Returns false if undo is not available.
     * @returns {Boolean}
     */
    undo() {
        if (this.prev.length != 0) {
            this.next.push(this.activeState);
            this.activeState = this.prev.pop();
            return true;
        }
        else
            return false;
    }

    /**
     * Goes redo to state.
     * Returns false if redo is not available.
     * @returns {Boolean}
     */
    redo() {
        if (this.next.length != 0) {
            this.prev.push(this.activeState);
            this.activeState = this.next.pop();
            return true;
        }
        else
            return false;
    }

    /**
     * Clears transition history
     */
    clearHistory() {
        this.next = [];
        this.prev = [];
    }
}

module.exports = FSM;

/** @Created by Uladzimir Halushka **/
