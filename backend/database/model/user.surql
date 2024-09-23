DEFINE TABLE user SCHEMAFULL
  PERMISSIONS
    FOR select, update, delete WHERE id = $auth.id
;


DEFINE FIELD name ON TABLE user TYPE string
  ASSERT string::len($value) >= 2
;

DEFINE FIELD surname ON TABLE user TYPE string
  ASSERT string::len($value) >= 2
;

DEFINE FIELD patronymic ON TABLE user TYPE option<string>
  ASSERT string::len($value) >= 2
;

DEFINE FIELD username ON user TYPE option<string>
  ASSERT string::len($value) >= 2
;

DEFINE FIELD email ON user TYPE string
  ASSERT string::is::email($value)
;

DEFINE FIELD providersID ON TABLE user TYPE array<string>
  ASSERT array::len($value) > 0;
;

DEFINE FIELD image ON user TYPE option<string>
;

DEFINE FIELD role ON user TYPE option<string> 
  ASSERT $value INSIDE [ 'admin', 'user', 'premium']
  DEFAULT 'user'
;

DEFINE FIELD created ON user
  VALUE $before OR time::now()
  DEFAULT time::now();
DEFINE FIELD updated ON user
  VALUE time::now()
  DEFAULT time::now();

DEFINE INDEX uniqueUsername ON user FIELDS username UNIQUE;
DEFINE INDEX uniqueProviderId ON user FIELDS providerId UNIQUE;
DEFINE INDEX uniqueEmail ON user FIELDS email UNIQUE;

DEFINE EVENT removal ON user WHEN $event = "DELETE" THEN {
  DELETE tag WHERE owner = $before.id;
  DELETE set WHERE author = $before.id;
  DELETE folder WHERE author = $before.id;
  DELETE gestalt WHERE in = $before.id;
  DELETE repetition WHERE in = $before.id;
  DELETE relationship WHERE in = $before.id;
}