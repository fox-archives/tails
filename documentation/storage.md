---
id: storage
title: storage
---

the storage microservice is responsible for interfacing with storage. this includes reading information about the filesystem, and writing files to the file system

## general

all routes are prefixed with `/api`. at port 3040 during development, and open

## endpoints

### get `/api/projects/read`

#### 200 ok

```json
{
  "projects": [
    "css-test",
    "battery-test"
  ]
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
const { data: projects } = axios.get('/api/projects/read`)
console.info(projects)
```
