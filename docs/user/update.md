# Update User By Id

Delete registered user by id

**URL** : `/api/user/:id`

**Method** : `PUT`

## Success Response

**Code** : `200 OK`

**Content examples**

Content will be the updated user data



## Error Response

**Condition** : If id is not found.

**Code** : `404 BAD REQUEST`

**Content examples**

```json
{
    "message": "User Not Found"
}
```



