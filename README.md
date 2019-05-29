<div align="center">
  <img src="https://res.cloudinary.com/adonisjs/image/upload/q_100/v1557762307/poppinss_iftxlt.jpg" width="600px">
</div>

# Logger
[![circleci-image]][circleci-url] [![npm-image]][npm-url] ![](https://img.shields.io/badge/Typescript-294E80.svg?style=for-the-badge&logo=typescript)

Extremely fast JSON logger built on top of [pino](http://getpino.io). The module does handful of modifications to the config of pino and also exposes a fake logger to be used during tests.

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
## Table of contents

- [Usage](#usage)
- [What's changed from Pino?](#whats-changed-from-pino)
  - [Making certain fields required](#making-certain-fields-required)
    - [enabled](#enabled)
    - [name](#name)
    - [messageKey](#messagekey)
    - [level](#level)
  - [Modifications](#modifications)
    - [`changeLevelName -> levelKey`](#changelevelname---levelkey)
    - [stream](#stream)
- [Fake logger](#fake-logger)
- [Change log](#change-log)
- [Contributing](#contributing)
- [Authors & License](#authors--license)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## Usage
Install the package from npm as follows:

```sh
npm i @poppinss/logger

# yarn
yarn add @poppinss/logger
```

and then use it as follows

```ts
import { Logger } from '@poppinss/logger'
const logger = new Logger({
  enabled: true,
  name: 'adonis-logger',
  messageKey: 'msg',
  level: 'debug',
})

logger.debug('received new request %s', request.url())
```

## What's changed from Pino?
We have changed handful of config options to make things more explicit. The modifications are based on our own opinions.

### Making certain fields required
All config variables are optional in pino, however, we want to make following config options required, so that the user of the logger always knows, where the values are coming from.

#### enabled
Making it clear, that logger can be disabled (if required).

#### name
Seeing logs without knowing their origin isn't really helpful. We force to define the name of the application.

#### messageKey
Many reporting tools like Datadog, Logstash doesn't understand the `msg` key. So we put this option upfront, so that you can change it (if required).

#### level
The level at which you want to report must be decided upfront

### Modifications

#### `changeLevelName -> levelKey`
Just like the `messageKey`, you can define the key for showing the level number inside the logs. For some reasons pino call this option `changeLevelName`, which sounds more like an action over a configuration. We have renamed the option to `levelKey`.

#### stream
Instead of passing the stream as the 2nd argument, you can define the custom stream within the config.

```ts
import { getLogger } from '@poppinss/logger'

getLogger({
  stream: process.stdout,
})
```

## Fake logger
Many times you would want to test whether your code is logging certain messages or not. One way is to hijack the `stdout` stream and read the rows text from it.

Instead, we ship with a proper `FakeLogger` that you can use during tests.

```ts
export class MyApp {
  constructor (logger) {
    this.logger = logger
  }

  perform () {
    this.logger.debug('created app')
  }
}
```

Inside your tests

```ts
import { FakeLogger } from '@poppinss/logger'
import { MyApp } from './MyApp'

const logger = new FakeLogger({
  // config
})

const app = new MyApp(logger)
app.perform()

assert.equal(logger.logs[0].msg, 'created app')
assert.equal(logger.logs[0].level, 20)

// Exists on fake logger only
logger.clear()
```

> The fake logger works seamless with the child logger as well. The root logger will collect all the logs from nested child loggers.

## Change log

The change log can be found in the [CHANGELOG.md](CHANGELOG.md) file.

## Contributing

Everyone is welcome to contribute. Please go through the following guides, before getting started.

1. [Contributing](https://adonisjs.com/contributing)
2. [Code of conduct](https://adonisjs.com/code-of-conduct)


## Authors & License
[Harminder virk](https://github.com/thetutlage) and [contributors](https://github.com/poppinss/logger/graphs/contributors).

MIT License, see the included [MIT](LICENSE.md) file.

[circleci-image]: https://img.shields.io/circleci/project/github/poppinss/logger/master.svg?style=for-the-badge&logo=circleci
[circleci-url]: https://circleci.com/gh/poppinss/logger "circleci"

[npm-image]: https://img.shields.io/npm/v/@poppinss/logger.svg?style=for-the-badge&logo=npm
[npm-url]: https://npmjs.org/package/@poppinss/logger "npm"
