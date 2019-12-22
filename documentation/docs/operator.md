---
id: operator
title: operator
---

operator is a central server that enables various frontends to work with tails. operator manages all the low level details such as hitting up the database, interacting with the storage (through the storage microservice)

## endpoints

### `/api/project/list`

#### method

get

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
  "error": "bruh request unauthorized"
}
```

http 500 internal server error

```json
{
  "error": "database not hit"
}
```


### `/api/project/view`

#### method

get

#### success

```json

```

### `/api/project/create`

#### method

post

#### body

```json

```

#### success

```json

```

### `/api/project/edit`

#### method

post

#### body

```json

```

#### success

```json

```

### `/api/project/delete`

#### method

post

#### body

```json

```

#### success

```json

```

### `/api/project/open`

opens project in vscode

#### method

post

#### body

```json

```

#### success

```json

```
