# Example Couchapp using JSON Schema

Push the design doc to a couchdb database, I assume you already know how to do this, if not checkout [couchapp](https://github.com/couchapp/couchapp) or [erica](https://github.com/benoitc/erica).

```
$ couchapp push
```

## Examples

### No schema
```
$ curl -H 'Content-Type: application/json' -X POST http://127.0.0.1:5984/couchapp-schema  -d '{"noschema": true}'
{"error":"forbidden","reason":"The document schema is missing."}
```

### Bogus schema
```
$ curl -H 'Content-Type: application/json' -X POST http://127.0.0.1:5984/couchapp-schema  -d '{"schema": "flubbins"}'
{"error":"forbidden","reason":"There is no schema for: flubbins"}
```

### Missing properties
```
$ curl -H 'Content-Type: application/json' -X POST http://127.0.0.1:5984/couchapp-schema  -d '{"schema": "quiz"}'
{"error":"forbidden","reason":"Property is required : category"}
```

### Bogus properties
```
$ curl -H 'Content-Type: application/json' -X POST http://127.0.0.1:5984/couchapp-schema  -d '{"schema": "quiz", "bugos": {}}'
{"error":"forbidden","reason":"Additional properties are not allowed"}
```

### Bad type for property
```
$ curl -H 'Content-Type: application/json' -X POST http://127.0.0.1:5984/couchapp-schema  -d '{"_id": [], "schema": "quiz"}'
{"error":"bad_request","reason":"Document id must be a string"}
```

### Good document
```
$ curl -H 'Content-Type: application/json' -X POST http://127.0.0.1:5984/couchapp-schema  -d '{"_id":"1","schema":"quiz","question":"Has anyone really been far even as decided to use even go want to do look more Like?","choices":{"a":"Yes","b":"No","c":"Wat?"},"answers":["a","c"],"category":"Wat","time":"30 seconds","created":"2014-07-30T21:39:46.152Z","author":"tpaul","difficulty":9}'
{"ok":true,"id":"1","rev":"1-e08c8228f888d132c31618573a169856"}
```

### Delete document
```
$ curl -X DELETE  http://127.0.0.1:5984/couchapp-schema/1/?rev=1-e08c8228f888d132c31618573a169856
{"ok":true,"id":"1","rev":"2-a5110b1da59f3373a48592301f6bf18d"}
```
