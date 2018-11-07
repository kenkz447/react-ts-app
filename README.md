# react-ts-app

#### Install dependencies:

```shell
npm install
```

#### Run development server:

```shell
npm start
```

#### Build production:

Using `getBuildConfig` to generates webpack config for each environment:

Options:

***definitions***(*Optional*): Object passed to `DefinePlugin`.

***sourceMap***(*Optional*): Enable source map.

***compression***(*Optional*): Enable gzip compression.

***analyzer***(*Optional*): Enable `BundleAnalyzerPlugin`.

Default build command:

```shell
npm run build
```

Default config file:

```shell
./webpack/webpack.config.staging.js
```

Output dir: `./dist`, includes server script and `Dockerfile`.

#### Analyzing dependencies:

```shell
npm run analyzer
```