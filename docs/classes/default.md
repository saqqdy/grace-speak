[index.md - v1.1.0](../README.md) / [Exports](../modules.md) / default

# Class: default

## Table of contents

### Constructors

- [constructor](default.md#constructor)

### Properties

- [effects](default.md#effects)
- [options](default.md#options)
- [ready](default.md#ready)
- [speech](default.md#speech)
- [utter](default.md#utter)
- [voice](default.md#voice)

### Methods

- [cancel](default.md#cancel)
- [getCurrentUtter](default.md#getcurrentutter)
- [getVoice](default.md#getvoice)
- [init](default.md#init)
- [pause](default.md#pause)
- [remove](default.md#remove)
- [resume](default.md#resume)
- [speak](default.md#speak)
- [speaking](default.md#speaking)

## Constructors

### constructor

• **new default**(`options?`)

#### Parameters

| Name      | Type                                                          |
| :-------- | :------------------------------------------------------------ |
| `options` | `Partial`<[`SpeechOptions`](../interfaces/SpeechOptions.md)\> |

#### Defined in

[index.ts:59](https://github.com/saqqdy/grace-speak/blob/b318942/src/index.ts#L59)

## Properties

### effects

• **effects**: [`Effect`](../interfaces/Effect.md)[] = `[]`

#### Defined in

[index.ts:46](https://github.com/saqqdy/grace-speak/blob/b318942/src/index.ts#L46)

---

### options

• **options**: [`SpeechOptions`](../interfaces/SpeechOptions.md)

#### Defined in

[index.ts:50](https://github.com/saqqdy/grace-speak/blob/b318942/src/index.ts#L50)

---

### ready

• **ready**: `boolean`

#### Defined in

[index.ts:49](https://github.com/saqqdy/grace-speak/blob/b318942/src/index.ts#L49)

---

### speech

• **speech**: `SpeechSynthesis` = `window.speechSynthesis`

#### Defined in

[index.ts:45](https://github.com/saqqdy/grace-speak/blob/b318942/src/index.ts#L45)

---

### utter

• **utter**: `null` \| `SpeechSynthesisUtterance` = `null`

#### Defined in

[index.ts:47](https://github.com/saqqdy/grace-speak/blob/b318942/src/index.ts#L47)

---

### voice

• **voice**: `undefined` \| `SpeechSynthesisVoice` = `undefined`

#### Defined in

[index.ts:48](https://github.com/saqqdy/grace-speak/blob/b318942/src/index.ts#L48)

## Methods

### cancel

▸ **cancel**(): `void`

Forced cancellation of all broadcasts, and immediate cancellation of those being broadcast

#### Returns

`void`

#### Defined in

[index.ts:199](https://github.com/saqqdy/grace-speak/blob/b318942/src/index.ts#L199)

---

### getCurrentUtter

▸ **getCurrentUtter**(): `null` \| `SpeechSynthesisUtterance`

get current utter

#### Returns

`null` \| `SpeechSynthesisUtterance`

result - utter: SpeechSynthesisUtterance

#### Defined in

[index.ts:135](https://github.com/saqqdy/grace-speak/blob/b318942/src/index.ts#L135)

---

### getVoice

▸ **getVoice**(): `Promise`<`undefined` \| `SpeechSynthesisVoice`\>

get voice

#### Returns

`Promise`<`undefined` \| `SpeechSynthesisVoice`\>

result voice: SpeechSynthesisVoice

#### Defined in

[index.ts:104](https://github.com/saqqdy/grace-speak/blob/b318942/src/index.ts#L104)

---

### init

▸ `Private` **init**(): `Promise`<`unknown`\>

init

#### Returns

`Promise`<`unknown`\>

#### Defined in

[index.ts:79](https://github.com/saqqdy/grace-speak/blob/b318942/src/index.ts#L79)

---

### pause

▸ **pause**(): `void`

Suspension of all broadcasts and immediate cancellation of those being broadcast

#### Returns

`void`

#### Defined in

[index.ts:206](https://github.com/saqqdy/grace-speak/blob/b318942/src/index.ts#L206)

---

### remove

▸ **remove**(`effectKey`): `boolean`

Remove unconsumed speak

#### Parameters

| Name        | Type     | Description   |
| :---------- | :------- | :------------ |
| `effectKey` | `symbol` | key of effect |

#### Returns

`boolean`

result - cancellation result true=Cancellation success false=Broadcast content not found or broadcast consumed

#### Defined in

[index.ts:187](https://github.com/saqqdy/grace-speak/blob/b318942/src/index.ts#L187)

---

### resume

▸ **resume**(): `void`

Resume all broadcasts and immediately cancel those being broadcast

#### Returns

`void`

#### Defined in

[index.ts:213](https://github.com/saqqdy/grace-speak/blob/b318942/src/index.ts#L213)

---

### speak

▸ **speak**(`content`, `utterOptions?`): `symbol`

speak

#### Parameters

| Name           | Type                                                                                                                                                                                                                                | Description                 |
| :------------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :-------------------------- |
| `content`      | `string`                                                                                                                                                                                                                            | speak text                  |
| `utterOptions` | `Partial`<`Pick`<`SpeechSynthesisUtterance`, `"text"` \| `"lang"` \| `"onerror"` \| `"onpause"` \| `"onboundary"` \| `"onend"` \| `"onmark"` \| `"onresume"` \| `"onstart"` \| `"pitch"` \| `"rate"` \| `"voice"` \| `"volume"`\>\> | utter options: UtterOptions |

#### Returns

`symbol`

result - effectKey: symbol

#### Defined in

[index.ts:147](https://github.com/saqqdy/grace-speak/blob/b318942/src/index.ts#L147)

---

### speaking

▸ **speaking**(): `void`

do speaking

#### Returns

`void`

#### Defined in

[index.ts:163](https://github.com/saqqdy/grace-speak/blob/b318942/src/index.ts#L163)
