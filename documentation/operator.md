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
  "id": 21903841039847,
  "name": "battery status api",
  "type": "web | node",
  "desc": "description of project",
  "slug": "battery-status-api"
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

### get `/api/project/view?project=${project.name}`

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
  // project (with edited details. note project id cannot be edited of course)
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
  id: 2345345
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
  id: 31245214
}
```

#### 202 accepted (or 200 ok?)

```json
{
  // project
}
```
