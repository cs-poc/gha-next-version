const escapeRegExp = require('lodash.escaperegexp');

function calculateNext(prefix, last) {
    if (last) {
        const lastPart = parseInt(last.substring(prefix.length), 10) || 0;
        return prefix + (lastPart + 1);
    } else {
        return prefix + "0";
    }
}

function nextVersion(base, tags, options = {separator: "."}) {
    // Normalize version base string
    const separator = options.separator;
    const baseVersion = base.replace(/^.+\//, "").replace(/\.+$/, "");
    const baseString = baseVersion + separator;
    console.log("base version", baseVersion);

    // Sort tags using natural-sort (so 10 is after 9, not before 2)
    const collator = new Intl.Collator(undefined, {numeric: true, sensitivity: 'base'});

    // Find tags for this release train
    const matchRegexp = new RegExp("^" + escapeRegExp(baseString));
    const relevantTags = tags.filter(t => matchRegexp.test(t)).sort(collator.compare);
    console.log("relevant tags", relevantTags);

    // Get latest version
    const last = relevantTags.pop();
    console.log("last version", last);

    // Calculate next version
    const next = calculateNext(baseString, last);
    console.log("next version", next);

    // Return
    return {
        base: baseVersion,
        last,
        next
    };
}

module.exports = nextVersion;
