DEFINE TABLE OVERWRITE refreshToken SCHEMAFULL
;

DEFINE FIELD user ON TABLE refreshToken TYPE record<user>
;

DEFINE FIELD  isRevoked ON TABLE refreshToken TYPE bool
  DEFAULT false
;

DEFINE FIELD connectionData ON TABLE refreshToken TYPE object FLEXIBLE
; 

DEFINE FIELD connectionData.system ON TABLE refreshToken TYPE string
  DEFAULT ""
;

DEFINE FIELD connectionData.browser ON TABLE refreshToken TYPE string
  DEFAULT ""
;

DEFINE FIELD connectionData.ip ON TABLE refreshToken TYPE string
  DEFAULT ""
;

DEFINE FIELD connectionData.date ON TABLE refreshToken TYPE option<datetime>
 VALUE $before OR time::now()
  DEFAULT time::now()
;