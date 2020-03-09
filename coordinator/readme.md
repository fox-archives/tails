# operator

central operator. does things required as per requested by any frontends (`dashboard-mpa`). this is intended to be flexible, so it can be ran on a local machine or a remote one, since building images etc. can slow down the machine considerably / drain battery (if applicable).

ex.

- builds images itself or uses external service (ex. kaniko etc.)
- deploys application or uses external service
