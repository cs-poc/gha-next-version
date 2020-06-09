const nextVersion = require('./nextVersion');
const process = require('process');
const cp = require('child_process');
const path = require('path');

test('first version', () => {
    expect(nextVersion("v1", [])).toEqual({base: "v1", last: undefined, next: "v1.0"});
});
test('first high version', () => {
    expect(nextVersion("v10", [])).toEqual({base: "v10", last: undefined, next: "v10.0"});
});
test('second version', () => {
    expect(nextVersion("v2", ["v2.0"])).toEqual({base: "v2", last: "v2.0", next: "v2.1"});
});
test('older branch', () => {
    expect(nextVersion("v2", ["v2.1", "v2.1.1", "v2.0", "v3.0", "v1.1.2"])).toEqual({
        base: "v2",
        last: "v2.1.1",
        next: "v2.2"
    });
});
test('new major version', () => {
    expect(nextVersion("refs/heads/v4", ["v2.1", "v2.1.1", "v2.0", "v3.0", "v1.1.2"])).toEqual({
        base: "v4",
        last: undefined,
        next: "v4.0"
    });
});
test('base with branch path', () => {
    expect(nextVersion("refs/heads/releases/v1.1", ["v2.1", "v2.0", "v1.1.2", "v1.1.10", "v1.2.3", "v1.0.1"])).toEqual({
        base: "v1.1",
        last: "v1.1.10",
        next: "v1.1.11"
    });
});
test('without "v" prefix', () => {
    expect(nextVersion("2", ["2.0"])).toEqual({base: "2", last: "2.0", next: "2.1"});
});
test('without minor version', () => {
    // NOTE This ignores existing tag and creates 1.0, instead of 1.1 as one would expect - it is intentional, as it makes code a lot easier
    expect(nextVersion("v1", ["v1"])).toEqual({base: "v1", last: undefined, next: "v1.0"});
});
test('major version only with empty separator', () => {
    expect(nextVersion("v", ["v2.1", "v2.1.1", "v2.0", "v3.0", "v1.1.2"], {separator: ""})).toEqual({
        base: "v",
        last: "v3.0",
        next: "v4"
    });
    expect(nextVersion("v", ["v1", "v5"], {separator: ""})).toEqual({base: "v", last: "v5", next: "v6"});
});
test('first major version with empty separator', () => {
    // NOTE one would expect v1 here, but that would require complex logic,
    // since when ve start on first version with base v1, it would be wierd to have first release v1.1,
    // so we simply append 0 to base
    expect(nextVersion("v", [], {separator: ""})).toEqual({base: "v", last: undefined, next: "v0"});
});
