---
id: nats
title: nats
---

if you want to create a (new) service with easy interop with existing services, use this schema i use for service communication, message deliveries by nats message broker

note that this stuff is based on the request reply pattern, and if you want to replace an existing microservice you probably have to prevent the original one from starting, since the data that is replied the soonest will be dealt with by the requester (so if your service is slightly slower than the default, it may not do anyhing)
just a heads up, not too sure though

here is an example

```js
nats.request('project', { action: 'create' }, res => {
  console.log('DONEFOR', res)
})
```

and one for response

```js
nats.subscribe('project', (req, replyTo) => {
  console.info(`wow, you want to ${req.action}`)
  nats.publish(replyTo, 'some res')
})
```

## subjects

so nats subjects are similar to kafka topics. there is one (1)  right now

### project

```json
{
  "action": "create|edit|delete",
  "id": "6dc94f38-7ae8-4dc7-8d01-497574742c1d",
  "name": "battery status api"
}
```

so on create, you would also have to include some other necessary crap, without id

```json
{
  "action": "create",
  "name": "battery status api",
  "type": "web",
  "desc": "description of project",
  "slug": "battery-status-api",
}
```

unsure if we want schemas to preference more towards the event-carried state transfer pattern or  event sourcing. however, we want our events to be 'commands', rather than just basic 'events - so we have an action field

### all existing schemas for `project`

```yaml
- action: list

// response
- projects:
  - ...
  - ...
```

```yaml
- action: edit
  id: ''
  name: '' // optional (must choose at least one, or not and can just be ignored ig)
  type: '' // optional
  desc: '' // optional
  slug: '' // optional
