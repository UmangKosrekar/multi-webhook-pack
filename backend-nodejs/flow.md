# Without login flow

- Save IP and create a Auth Token according to it.
  ### Token structure
        userId - UUID
        IP
        createdAt
- Save webhook data according to the UUID stored in Auth token

## New

- create a queuing mechanism. Like will take and store response from the client server if the response is 404 or 500 it will send request again
