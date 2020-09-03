# Create User

Create an Account for User

**URL** : `/api/user`

**Method** : `POST`

**Data constraints**

Provide user to be created.

```json
{
    "first_name": "string" | REQUIRED,
    "last_name": "string" | REQUIRED,
    "phone_number": "string" | REQUIRED | UNIQUE,
    "gender": "string",
    "date_of_birth": "date",
    "email": "string" | REQUIRED | UNIQUE,
}
```

**Data example** All fields must be sent.

```json
{
    "first_name": "Resta",
    "last_name": "Adiputra",
    "phone_number": "0812345678",
    "date_of_birth": "2020-09-02T11:02:44.669Z",
    "gender": "male",
    "email": "user@mail.com",
    "createdAt": "2020-09-03T02:36:47.685Z",
    "updatedAt": "2020-09-03T04:52:32.065Z"
}
```

## Success Response

**Condition** : If everything is OK and an Account didn't exist for this User.

**Code** : `201 CREATED`

**Content example**

```json
{
    "id": 1,
    "first_name": "Resta",
    "last_name": "Adiputra",
    "phone_number": "0812345678",
    "date_of_birth": "2020-09-02T11:02:44.669Z",
    "gender": "male",
    "email": "user@mail.com",
    "createdAt": "2020-09-03T02:36:47.685Z",
    "updatedAt": "2020-09-03T04:52:32.065Z"
}
```

## Error Responses

**Condition** : Required field missing.

**Code** : `400 Bad request`

**Headers** : `Location: http://testserver/api/accounts/123/`

**Content example**

```json
{
    "errors": [
        {
            "first_name": "First name is required"
        },
        {
            "last_name": "Last name is required"
        },
        {
            "phone_number": "Mobile number is required"
        },
        {
            "email": "E-mail is required"
        }
    ]
}
```

### Or

**Condition** : Phone number is not Indonesian.

**Code** : `400 BAD REQUEST`

**Data example** All fields must be sent.

```json
{
    ....
    "phone_number": "999999",
    ....
}
```

**Content example**

```json
{
    "errors": [
        {
            "phone_number": "Mobile number must use Indonesian number"
        }
    ]
}
```

### Or

**Condition** : Phone number already used.

**Code** : `400 BAD REQUEST`

**Content example** All fields must be sent.

```json
{
    "errors": [
        {
            "phone_number": "Mobile number already in use"
        }
    ]
}
```

### Or

**Condition** : Email patter is invalid.

**Code** : `400 BAD REQUEST`

**Data example** All fields must be sent.

```json
{
    ....
    "email": "user",
    ....
}
```



**Content example**

```json
{
    "errors": [
        {
            "email": "E-mail is invalid"
        }
    ]
}
```

### Or

**Condition** : Phone number already used.

**Code** : `400 BAD REQUEST`

**Content example**

```json
{
    "errors": [
        {
            "phone_number": "Email already in use"
        }
    ]
}
```

### 