# d3

## Project setup

```
pnpm install
```

### Compiles and hot-reloads for development

```
pnpm run serve
```

### Compiles and minifies for production

```
pnpm run build
```

### Run your unit tests

```
pnpm run test:unit
```

### Lints and fixes files

```
pnpm run lint
```

### Customize configuration

See [Configuration Reference](https://cli.vuejs.org/config/).

I have recreated the two-point graph from scratch without referring to the existing code as part of the POC. The following features have been implemented:

1. A graph with four quadrants has been created.
2. X and Y axes have been added.
3. Arrows have been added to the axis boundaries.
4. The 0th and boundary labels have been removed as per the design.
5. A graph boundary has been created.
6. An option to create points on click has been added.
7. Points cannot be created outside the graph boundary.
8. An option to drag points has been included.
9. Points cannot be dragged beyond the boundary.
10. A line will connect the points if more than two points are created.
