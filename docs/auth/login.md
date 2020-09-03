# Login

login with user email

**URL** : `/api/auth`

**Method** : `POST`

## Success Response

**Code** : `200 OK`

**Data example** All fields must be sent.

```json
{
    "email": "user@mail.com"
}
```

**Content examples**

```json
{
    message: "Success"
}
```



## Error Response

**Condition** : If id is not found.

**Code** : `404 BAD REQUEST`

**Content examples**

```json
{
    "message": "User Not Found"
}
```



