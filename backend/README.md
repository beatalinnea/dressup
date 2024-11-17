# dressup-server

The backend API and caretaker for the images and user details of dressup

## Base URL

This API is reached from the URL: `https://cscloud7-134.lnu.se/dressup/api/v1`

Please prepend the base URL to the endpoint paths mentioned below when making requests to the API.

## Endpoints

- Register a new user account: `POST /register`
- Log in and obtain an access token (sets cookie): `POST /login`
- Check if a valid access token is present: `POST /update-login`
- Clear the authentication cookie: `DELETE /log-out`

- Retrieve user information: `GET /user/:id`
- Delete a user account: `DELETE /user`

- Retrieve all clothes: `GET /clothes`
- Retrieve all tops: `GET /clothes/tops`
- Retrieve all pants: `GET /clothes/pants`
- Retrieve all shoes: `GET /clothes/shoes`
- Create a new clothing item: `POST /clothes`
- Delete a specific clothing item: `DELETE /clothes/:id`
- Delete all clothes by user: `DELETE /clothes/user`

- Retrieve all outfits: `GET /outfits`
- Retrieve certain outfit: `GET /outfits/:id`
- Create a new outfit: `POST /outfits`
- Delete a specific outfit: `DELETE /outfits/:id`
- Delete all outfits by user: `DELETE /outfits/user`

## Authentication

The dressup API uses token-based authentication. To access authenticated endpoints, you need to include the access token in the `Authorization` header of your requests. The access token is obtained by logging in. When you log in a server rendered cookie containing the access token will be set, and when log out the cookie will be cleared.

For authenticated endpoints, the API expects the following header:
Authorization: Bearer <access_token>

If request must include data or id in paths, more details on what is needed in request bodys further down.

## Endpoints that don't take Authorization header:
### Registration

**POST /register**

To be able to log in the user will first need to be registered.

#### Request

```json
{
    "username": "username",
    "password": "password",
    "firstName": "firstName",
    "lastName": "lastName",
    "email": "email"
}
```

#### Response

```json
{
  "id": "user_id"
}
```

### Check if valid access token

**POST /update-login**

Checks if the access token is valid.

#### Request

No request body is required. The credentials will be included in the request.

#### Response

```json
{
  "acccess_token": "TOKEN_VALUE",
  "user": "USER_DETAILS"
}
```

### Log out
**DELETE /log-out**

Clears the cookie.

#### Request
No request body is required. The credentials will be included in the request.

#### Response
Cookie will be cleared, and response status set to 200.

## Endpoints that need Authorization header and expected data in POST:
### Log in

**POST /login**

To be able to log in you will provide this data.

#### Request

```json
{
    "username": "username",
    "password": "password"
}
```

#### Response

```json
{
  "acccess_token": "TOKEN_VALUE",
  "username": "user.username"
}
```

### Clothes

**POST /clothes**

To be able to POST clothes you will provide this data.

#### Request

```json
{
    "src": "image.src",
    "category": "image.category",
    "owner": "user.username"
}
```

#### Response

```json
{
    "clothes": "clothes"
}
```

### Outfits

**POST /outfits**

To be able to POST outfits you will provide this data.

#### Request

```json
{
    "top": "top.id",
    "pants": "pants.id",
    "shoes": "shoes.id",
    "owner": "user.username"
}
```

#### Response

```json
{
    "outfit": "outfit"
}
```

## Endpoints that need Authorization header and /:id as part of the path in GET requests:

### Outfits

**GET /outfits/:id**

Expects outfit.id property value

### Clothes

**GET /clothes/:id**

Expects clothes.id property value

### User

**GET /user/:id**

Expects user.id property value

## Endpoints that need Authorization header and /:id as part of the path in DELETE requests:

### Outfits

**DELETE /outfits/:id**

Expects outfit.id property value

### Clothes

**DELETE /clothes/:id**

Expects clothes.id property value

## Endpoints that need Authorization header and user in body in DELETE requests:

### Outfits

**DELETE /outfits/user**

To be able to delete all outfits by certain user

#### Request

```json
{
    "owner": "user.username"
}
```

### Clothes

**DELETE /clothes/user**

To be able to delete all clothes by certain user

#### Request

```json
{
    "owner": "user.username"
}
```

### User

**DELETE /user**

Expects username.

#### Request

```json
{
    "username": "user.username"
}
```