# Pizza App
This is a Blogging API for completion of ALTSchool exams

---

## Requirements
1. Users should have a first_name, last_name, email, password 
2. A user should be able to sign up and sign in into the blog app
3. Use JWT as authentication strategy and expire the token after 1 hour
4. A blog can be in two states; draft and published
5. Logged in and not logged in users should be able to get a list of published blogs created
6. Logged in and not logged in users should be able to to get a published blog
7. Logged in users should be able to create a blog
8. When a blog is created, it is in draft state
9. The owner of the blog should be able to update the state of the blog to published
10. The owner of a blog should be able to edit the blog in draft or published state
11. The owner of the blog should be able to delete the blog in draft or published state
12. The owner of the blog should be able to get a list of their blogs
13. Blogs created should have title, description, tags, author, timestamp, state, read_count, reading_time and body
14. The list of blogs endpoint that can be accessed by both logged in and not logged in users should be paginated
15. When a single blog is requested, the api should return the user information(the author) with the blog. The read_count of the blog too should be updated by 1
16. Come up with any algorithm for calculating the reading_time of the blog
17. Write tests for all endpoints
18. The owner of the blog should be logged in to perform actions
19. Use the MVC pattern

---
## Setup
- Install NodeJS, mongodb
- pull this repo

---

## Models
---

### User
| field      | data_type | constraints                                      |
| ---------- | --------- | ------------------------------------------------ |
| id         | string    | required                                         |
| first_name | string    | required                                         |
| last_name  | string    | required                                         |
| email      | string    | required                                         |
| password   | string    | required                                         |
| user_type  | string    | required, default: user, enum: ['user', 'admin'] |


### Blog
| field        | data_type | constraints |
| ------------ | --------- | ----------- |
| id           | string    | required    |
| title        | string    | required    |
| description  | string    | optional    |
| author       | string    | optional    |
| state        | string    | optional    |
| read_count   | string    | optional    |
| reading_time | number    | optional    |
| tags         | string    | optional    |
| body         | string    | required    |
| timestamp    | date      | optional    |



## APIs
---

### Signup User

- Route: localhost:7000/api/auth/register
- Method: POST
- Body: 
```
{
    "first_name": "obianuju",
    "last_name": "iyasele",
    "email": "obianuju@gmail.com",
    "password": "obianuju",
    "_id": "63634c42a1dd2de4da867ae1",
    "__v": 0
}
```

- Responses

Success
```
{
    "msg": "User successfully created",
    "user": {
        "first_name": "obianuju",
        "last_name": "iyasele",
        "email": "obianuju@gmail.com",
        "password": "obianuju",
        "_id": "63634c42a1dd2de4da867ae1",
        "__v": 0
    }
}
```
---
### Login User

- Route: /login
- Method: POST
- Body: 
```
{ 
"email": "obianuju@gmail.com",
"password": "obianuju"
}
```

- Responses

Success
```
{
    "msg": "User created",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im9iaWFudWp1QGdtYWlsLmNvbSIsImlhdCI6MTY2NzQ1MjE0NSwiZXhwIjoxNjY3NDU1NzQ1fQ.H39NIUx_eTU3kvNUj02KrgvW7uhomgVVsfgjjGGfumM"
}
```

---
### Create Order

- Route: /orders
- Method: POST
- Header
    - Authorization: Bearer {token}
- Body: 
```
{
    items: [{ name: 'chicken pizza', price: 900, size: 'm', quantity: 1}]
}
```

- Responses

Success
```
{
    state: 1,
    total_price: 900,
    created_at: Mon Oct 31 2022 08:35:00 GMT+0100,
    items: [{ name: 'chicken pizza', price: 900, size: 'm', quantity: 1}]
}
```
---
### Get Order

- Route: /orders/:id
- Method: GET
- Header
    - Authorization: Bearer {token}
- Responses

Success
```
{
    state: 1,
    total_price: 900,
    created_at: Mon Oct 31 2022 08:35:00 GMT+0100,
    items: [{ name: 'chicken pizza', price: 900, size: 'm', quantity: 1}]
}
```
---

### Get Orders

- Route: /orders
- Method: GET
- Header:
    - Authorization: Bearer {token}
- Query params: 
    - page (default: 1)
    - per_page (default: 10)
    - order_by (default: created_at)
    - order (options: asc | desc, default: desc)
    - state
    - created_at
- Responses

Success
```
{
    state: 1,
    total_price: 900,
    created_at: Mon Oct 31 2022 08:35:00 GMT+0100,
    items: [{ name: 'chicken pizza', price: 900, size: 'm', quantity: 1}]
}
```
---

...

## Contributor
- Julian Ifesiokwu