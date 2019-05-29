[@poppinss/logger](../README.md) > [@poppinss/logger](../modules/_poppinss_logger.md)

# External module: @poppinss/logger

## Index

### Classes

* [FakeLogger](../classes/_poppinss_logger.fakelogger.md)
* [Logger](../classes/_poppinss_logger.logger.md)

### Interfaces

* [LoggerContract](../interfaces/_poppinss_logger.loggercontract.md)

### Type aliases

* [LoggerConfigContract](_poppinss_logger.md#loggerconfigcontract)

### Functions

* [getPino](_poppinss_logger.md#getpino)

---

## Type aliases

<a id="loggerconfigcontract"></a>

###  LoggerConfigContract

**Ƭ LoggerConfigContract**: *`object`*

Config shape

#### Type declaration

___

## Functions

<a id="getpino"></a>

###  getPino

▸ **getPino**(options: *`DeepReadonly`<[LoggerConfigContract](_poppinss_logger.md#loggerconfigcontract)>*): `Pino.Logger`

Returns an instance of pino logger by adjusting the config options

**Parameters:**

| Name | Type |
| ------ | ------ |
| options | `DeepReadonly`<[LoggerConfigContract](_poppinss_logger.md#loggerconfigcontract)> |

**Returns:** `Pino.Logger`

___

