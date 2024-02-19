## mailchannels(.js)

### Setup

#### Deno

```ts
import { sendMail } from 'https://den.ooo/npm/mailchannels'
```

#### Node.js

```bash
npm i mailchannels
```

```ts
import { sendMail } from 'mailchannels'
```

### Usage

> [!IMPORTANT]
> You need to [configure your domain](https://gist.github.com/boywithkeyboard/d4e3cbc0f319d90dcde5d94b2d83d57b) first to use this module.

```ts
const response = await sendMail({
  sender: 'You',
  message: '123456 is your verification code.',
  to: 4566118311 // +45 66118311
})
```
