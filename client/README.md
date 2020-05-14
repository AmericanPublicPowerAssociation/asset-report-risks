# Asset Report Risks Client

## Installation

    git clone git@github.com:AmericanPublicPowerAssociation/asset-report-risks
    cd asset-report-risks/client
    yarn build
    yarn install

## Configuration from Scratch

Follow these steps to recreate the package configuration from scratch.

```
yarn init -y
yarn add --dev \
    @babel/core \
    @babel/preset-env \
    @babel/preset-react \
    babel-loader \
    eslint \
    eslint-plugin-react \
    webpack
yarn add --peer \
    @material-ui/core \
    @material-ui/icons \
    downshift \
    material-table \
    react \
    react-dom \
    react-redux \
    react-router-dom \
    redux-saga \
    reselect
eslint --init
```
