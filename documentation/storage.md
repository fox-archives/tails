---
id: storage
title: storage
---

the storage microservice is responsible for interfacing with storage. this includes reading information about the filesystem, and writing files to the file system

## endpoints

### `/api/projects/read`

#### method

get

#### url params

none

#### success

http 200 ok

```json
{
  "data": {
    "projects": [
      ...
    ]
  }
}
```

#### error

http 401 unauthorized

```json
{
  "error": "not authorized"
}
```

#### example

```js
const { data: { data: projects } } = axios.get('/api/projects/read`)
console.info(projects)

const { data: projects2 } = fetch('/api/projects/read`, {
  method: 'GET'
})
console.info(projects2)
```
