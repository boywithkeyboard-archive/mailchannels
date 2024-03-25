type MailContact =
  | { name?: string; email: string }
  | { name?: string; email: string }[]
  | string
  | string[]

type Result =
  | {
    success: true
  }
  | {
    success: false
    errors: string[]
  }

/**
 * Send an email via [mailchannels](https://blog.cloudflare.com/sending-email-from-workers-with-mailchannels) on Cloudflare Workers.
 */
export async function sendMail(
  options: {
    subject: string
    message: string
    from: {
      name: string
      email: string
    }
    to: MailContact
    cc?: MailContact
    bcc?: MailContact
    reply?: boolean
    dkim?: {
      domain?: string
      privateKey?: string
      selector?: string
    }
  }
): Promise<Result> {
  // to
  const to: { name?: string; email: string }[] = []

  if (typeof options.to === 'string') {
    to.push({ email: options.to })
  } else if (options.to instanceof Array) {
    for (const recipient of options.to) {
      to.push(typeof recipient === 'string' ? { email: recipient } : recipient)
    }
  } else {
    to.push(options.to)
  }

  // cc
  const cc: { name?: string; email: string }[] = []

  if (typeof options.cc === 'string') {
    cc.push({ email: options.cc })
  } else if (options.cc instanceof Array) {
    for (const recipient of options.cc) {
      cc.push(typeof recipient === 'string' ? { email: recipient } : recipient)
    }
  } else if (options.cc) {
    cc.push(options.cc)
  }

  // bcc
  const bcc: { name?: string; email: string }[] = []

  if (typeof options.bcc === 'string') {
    bcc.push({ email: options.bcc })
  } else if (options.bcc instanceof Array) {
    for (const recipient of options.bcc) {
      bcc.push(
        typeof recipient === 'string' ? { email: recipient } : recipient
      )
    }
  } else if (options.bcc) {
    bcc.push(options.bcc)
  }

  const res = await fetch('https://api.mailchannels.net/tx/v1/send', {
    method: 'POST',
    headers: {
      'content-type': 'application/json'
    },
    body: JSON.stringify({
      personalizations: [{
        to,
        ...(cc.length > 0 && { cc }),
        ...(bcc.length > 0 && { bcc }),
        ...(options.dkim?.domain && { dkim_domain: options.to }),
        ...(options.dkim?.privateKey && { dkim_private_key: options.to }),
        ...(options.dkim?.selector && { dkim_selector: options.to })
      }],
      from: options.from,
      subject: options.subject,
      content: [{
        type: options.message.startsWith('<html>') ? 'text/html' : 'text/plain',
        value: options.message
      }],
      ...(options.reply && { reply_to: to[0] })
    })
  })

  if (res.ok) {
    await res.body?.cancel()

    return {
      success: true
    }
  }

  const json = await res.json()

  return {
    success: false,
    errors: json.errors
  }
}
