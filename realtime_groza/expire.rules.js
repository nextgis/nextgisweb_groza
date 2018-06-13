const _ = require('lodash');

const expireRules = require('./config').expireRules;

const rulesCount = expireRules.length;

const _expireRules = {
    rulesCount: rulesCount,
    rules: {}
};

for (let i = 0; i < rulesCount; i++) {
    const rule = expireRules[i];
    const ruleKey = rule[0];
    _expireRules.rules[ruleKey] = {
        range: rule,
        index: i,
        getKey: function () {
            return this.range[0] + '';
        },
        getNextRule: function () {
            const nextRuleKey = this._getNextRule();
            if (!_expireRules.rules.hasOwnProperty(nextRuleKey)) return null;
            return _expireRules.rules[nextRuleKey];
        },
        _getNextRule: function () {
            return (this.range[1] + 1) + '';
        }
    }
}

class ExpireRules {
    static getRangeExpire(tsEvent, tsNow) {
        const diff = tsNow - tsEvent;
        const rule = expireRules.find((rule) => {
            return diff >= rule[0] && diff <= rule[1];
        });

        if (!rule) {
            return [null, null];
        }

        const expireTimeSec = rule[1] - diff;
        return [expireTimeSec, rule[0]];
    }

    static getNextRange(currentRuleKey) {
        if (!_expireRules.rules.hasOwnProperty(currentRuleKey)) {
            console.error(`Wrong rule key - ${currentRuleKey}`);
            return null;
        }

        const currentRule = _expireRules.rules[currentRuleKey];
        return currentRule.getNextRule();
    }
}

module.exports = ExpireRules;
