![units-test](https://github.com/cs-poc/gha-next-version/workflows/units-test/badge.svg)

# Next Version Action

Determine next release version for given major version, using existing tags.

## Usage

```yaml
uses: cs-poc/gha-next-version@v1
with:
  base: ${{ github.ref }}
  github-token: ${{ github.token }}
```

## Development

Install the dependencies  
```bash
$ npm install
```

Run the tests :heavy_check_mark:  
```bash
$ npm test

 PASS  ./index.test.js
  ✓ throws invalid number (3ms)
  ✓ nextVersion 500 ms (504ms)
  ✓ test runs (95ms)

...
```

See the [toolkit documentation](https://github.com/actions/toolkit/blob/master/README.md#packages) for the various packages.
