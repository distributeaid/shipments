# Shipments

![Build and Release](https://github.com/distributeaid/shipments/workflows/Build%20and%20Release/badge.svg?branch=saga)
[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)
[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)

Public shipment tracker for Distribute Aid shipments.

## Development

Export these environment variables (use [direnv](https://direnv.net/) to
simplify the process):

    export SHIPMENTS_URL=https://docs.google.com/spreadsheets/d/1f5H0sOY4tfkQF_QkQemt1GHTYd_wgsvBgmzE4miI9g4/export?format=tsv

Start the development server

    npm ci
    npm start

## Architecture decision records (ADRs)

see [./adr](./adr).

## Acknowledgements

- [Package icon](./web/favicon.svg) based on
  [Feather icons](https://github.com/feathericons/feather), licensed under the
  MIT license
