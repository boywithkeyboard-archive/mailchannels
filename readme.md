## mailchannels(.js)

> [!NOTE]  
> This SDK is meant for Cloudflare Workers' integration of mailchannels, which doesn't require authentication.

### Setup

```bash
npm i mailchannels
```

```ts
import { sendMail } from 'mailchannels'
```

### Usage

Add the below TXT records for SPF and Domain Lock to work correctly. Replace `WORKER_ID` with your unique subdomain for workers, e.g. `example.workers.dev`, and/or the sub(domain) you're using for the worker, e.g. `example.com`.

| Name | Content |
| --- | --- |
| @ | v=spf1 a mx include:relay.mailchannels.net ~all |
| _mailchannels | v=mc1 cfid=`WORKER_ID` |

```ts
const { success } = await sendMail({
  subject: 'An example',
  message: 'This is an example email sent from Cloudflare Workers.',
  from: {
    name: 'You',
    email: 'you@your.domain'
  },
  to: 'somebody@some.domain'
})
```
