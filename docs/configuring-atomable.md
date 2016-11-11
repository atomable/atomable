# How to configure atomable ?

When you generate a new endpoint with the cli, a configuration file is automatically created for you. You can, and should, modify it to suit your needs. To know what the config supports, refer to the structure and examples below.

## What is the structure of an atomable yaml config file ?

```yaml
name: (String)          # Name of the microservice
handler: (String)       # Path to the js module to execute (can include name of export. Ex: module.myExport)
https:                  # The trigger for the microservice is an http call
  path: (String)        # The http path for the trigger. Ex: path/to/my/module
  method: (String)      # The http verb (get|post|put|delete|patch)
  parameters: (Array)   # An array of your module's parameters
  - in: (String)        # Where in the http request to find the parameter (query|body|headers)
    name: (String)      # The name of the parameter to extract. You can use '*' to get all parameters
    required: (Boolean) # Whether or not the parameter is required (default is true)
```

## What is this configuration for ?

The configuration file is to let our runtime know what you want from the original http request. Our runtime will extract what you want, check for its validity, then send it to your module only if everything is as you asked for.

It is important to know that the order in which you declare your parameters is the order in which the runtime will send the parameters to your module.

## Wildcard

When you want to receive everything associated with a certain parameter type (query, body, headers), you can use the wildcard `'*'`.

It is important to know that when using a wildcard, the value for `required` is ignored, and is always false. This means that you have no guarantee that something will be passed as an argument to your module.

# Examples
## Example for an endpoint to search for a cat:

```yaml
name: cats
handler: cats.search
https:
  path: cats
  method: get
  parameters:
  - in: headers
    name: authorization
    required: true
  - in: query
    name: '*' # Everything in the query string will be sent as a parameter to your microservice.
    required: true
```

The code that will be executed would look like:

```javascript
export const search = (authorization, query) => {
  // authorization will always contain the value of the authorization header and is guaranteed not to be undefined, since it is required.
  // query will contain all the query parameters that were passed in the request.
};
```

## Example for an endpoint to signup:

```yaml
name: signup
handler: signup
https:
  path: signup
  method: post
  parameters:
  - in: body
    name: username
    required: true
  - in: body
    name: password
    required: true
  - in: body
    name: email
    required: false # The email parameter of your microservice might be undefined.
```
