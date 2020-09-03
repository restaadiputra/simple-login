# Show User List By Id

Get the details of the currently registered user by id

**URL** : `/api/user/:id`

**Method** : `GET`

## Success Response

**Code** : `200 OK`

**Content examples**

For a User with ID 1234 on the local database where that fill all form.

```json
{
    "id": 1234,
    "first_name": "Tim",
    "last_name": "Alex",
    "date_of_birth": "2020-09-02T11:02:44.669Z",
    "email": "tim@mail.com",
    "gender": "male",
    "phone_number": "0812345678",
    "updatedAt": "2020-09-03T02:36:47.685Z",
    "createdAt": "2020-09-03T02:36:47.685Z"
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



