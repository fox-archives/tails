---
id: operator
title: operator
---

operator is a central server that enables various frontends to work with tails. operator manages all the low level details such as hitting up the database, interacting with the storage (through the storage microservice)

## general

all routes are prefixed with `/api`. at port 3020 during development, and open

## errors

### general

if the request cannot be completed, you will see the following errors

#### 401 unauthorized

```json
{
  "error": "you are not authorized to see this resource"
}
```

#### 500 internal server error

```json
{
  "error": "blah"
}
```

## data groups

data groups are denoted by comments (ex. // project) in schemas

### project

we will be returning the project data group a lot. it (hopefully) looks like this

```json
{
  "id": "6dc94f38-7ae8-4dc7-8d01-497574742c1d",
  "name": "battery status api",
  "type": "web",
  "desc": "description of project",
  "slug": "battery-status-api",
  "firstCreated": 1577072153588,
  "lastUpdated": 1577072153588
}
```

## endpoints

### get `/api/project/list`

#### 200 ok

```json
{
  "projects": [
    {
      // project
    },
    {
      // project
    }
  ]
}
```

### get `/api/project/view?project=${project.id}`

#### 200 ok

```json
{
  "project": {
    // project
  }
}
```

### post `/api/project/create`

#### request body

```json
{
  "name": "css test", // required
  "type": "web", // required
  "desc": "some description", // optional
  "slug": "css-test" // optional
}
```

#### 201 created

```json
{
  // project
}
```

### post `/api/project/edit`

#### request body

```json
{
  // project (with edited details) (do not edit firstCreated or id, lastEdited should be automatic)
}
```

#### 200 ok

```json
{
  // project
}
```

### post `/api/project/delete`

#### request body

```json
{
  id: "3b43ac38-859e-459b-b1bc-4b109345f4a7"
}
```

#### 200 ok

```json
{
  // project
}
```

### post `/api/project/open`

opens project in vscode

#### request body

```json
{
  id: "3b43ac38-859e-459b-b1bc-4b109345f4a7"
}
```

#### 202 accepted (or 200 ok?)

```json
{
  // project
}
```
