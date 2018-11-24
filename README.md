# mysite-rest

Content API provides access control and acts as the API for the content.

## Generate token with Python 3

````
echo -e "import secrets\nprint(secrets.token_urlsafe(64))" | python3
````
