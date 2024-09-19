DEFINE TABLE refreshToken SCHEMAFULL
;

DEFINE FIELD user ON TABLE refreshToken TYPE record<user>
;

DEFINE FIELD  isRevoked ON TABLE refreshToken TYPE bool
  DEFAULT false
;

DEFINE FIELD connectionData ON TABLE refreshToken FLEXIBLE TYPE object
;