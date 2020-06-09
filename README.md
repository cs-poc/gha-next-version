
<p align="center">
  <a href="https://github.com/cs-poc/gha-automatic-release/actions"><img alt="javscript-action status" src="https://github.com/cs-poc/gha-automatic-release/workflows/units-test/badge.svg"></a>
</p>

# Automatic Release Action

TODO

## Usage

```yaml
uses: cs-poc/gha-automatic-release@v1
with:
  base-branch: ${{ github.ref }}
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
  ✓ wait 500 ms (504ms)
  ✓ test runs (95ms)

...
```

See the [toolkit documentation](https://github.com/actions/toolkit/blob/master/README.md#packages) for the various packages.
