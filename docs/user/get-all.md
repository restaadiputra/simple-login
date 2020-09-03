# Show User List

Get the details of the currently registered user

**URL** : `/api/user/`

**Method** : `GET`

## Success Response

**Code** : `200 OK`

**Content examples**

For a User with ID 1234 on the local database where that fill all form.

```json
[{
    "id": 1234,
    "first_name": "Tim",
    "last_name": "Alex",
    "date_of_birth": "2020-09-02T11:02:44.669Z",
    "email": "tim@mail.com",
    "gender": "male",
    "phone_number": "0812345678",
    "updatedAt": "2020-09-03T02:36:47.685Z",
    "createdAt": "2020-09-03T02:36:47.685Z"
}]
```

For a user with ID 4321 on the local database but but only fill the required field.

```json
[{
    "id": 4321,
    "first_name": "Alison",
    "last_name": "Rebeca",
    "date_of_birth": null,
    "email": "alison@mail.com",
    "gender": null,
    "phone_number": "0812345678",
    "updatedAt": "2020-09-03T02:36:47.685Z",
    "createdAt": "2020-09-03T02:36:47.685Z"
}]
```

