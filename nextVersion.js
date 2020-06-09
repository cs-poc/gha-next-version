function nextVersion(base, tags) {
    // Normalize version base string
    const baseVersion = base.replace(/^.+\//, "").replace(/\.+$/, "");
    console.log("base version", baseVersion);

    // Sort tags using natural-sort (so 10 is after 9, not before 2)
    const collator = new Intl.Collator(undefined, {numeric: true, sensitivity: 'base'});

    // Find tags for this release train
    const relevantTags = tags.filter(t => t.startsWith(baseVersion + ".")).sort(collator.compare);
    console.log("relevant tags", relevantTags);

    // Get latest version
    const last = relevantTags.pop();
    console.log("last version", last);

    // Calculate next version
    const next = last ? baseVersion + "." + (parseInt(last.substring(baseVersion.length + 1), 10) + 1) : baseVersion + ".0";
    console.log("next version", next);

    // Return
    return {
        base: baseVersion,
        last,
        next
    }
}

module.exports = nextVersion;
