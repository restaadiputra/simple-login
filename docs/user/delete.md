# Delete User By Id

Delete registered user by id

**URL** : `/api/user/:id`

**Method** : `DELETE`

## Success Response

**Code** : `200 OK`

**Content examples**

No content



## Error Response

**Condition** : If id is not found.

**Code** : `404 BAD REQUEST`

**Content examples**

```json
{
    "message": "User Not Found"
}
```



