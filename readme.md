## mailchannels(.js)

> [!NOTE]  
> This SDK is meant for Cloudflare Workers' integration of mailchannels, which doesn't require authentication.

### Setup

#### Deno

```ts
import { sendMail } from 'https://esm.sh/mailchannels'
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
  subject: '...',
  message: '...',
  from: {
    name: '...',
    email: '...'
  },
  to: 'john.doe@example.com'
})
```
