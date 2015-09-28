# generator-strong-d3 [![Build Status](https://secure.travis-ci.org/aendrew/generator-strong-d3.png?branch=master)](https://travis-ci.org/aendrew/generator-strong-d3)

> [Yeoman](http://yeoman.io) generator

This is a generator heavily based upon [generator-gulp-angular](https://github.com/Swiip/generator-gulp-angular) that scaffolds a D3 project with a whole bunch of goodies geared towards using strong typing.

Currently, options available at runtime are:

+ Transpiler
  + Babel using babel-plugin-typecheck
    + Write fancy-pants ES2015 and use Flow annotations for type checking
  + TypeScript
    + Generally better if you still want to write ES5 code but add annotations
+ Abstraction
  + plain-jane, vanilla D3
  + C3 — [masayuki0812/c3](https://github.com/masayuki0812/)
  + Vega - [vega/vega](https://github.com/vega/vega)
  + NVD3 - [novus/nvd3](https://github.com/novus/nvd3)
  + D4 - [heavysixer/d4](https://github.com/heavysixer/d4)

## Getting Started

### To install Yeoman (if new to Yeoman generator)

```bash
npm install -g yo
```

### To install generator-strong-d3

To install generator-strong-d3 from npm, run:

```bash
npm install -g generator-strong-d3
```

Finally, initiate the generator:

```bash
yo strong-d3
```

## License

MIT
