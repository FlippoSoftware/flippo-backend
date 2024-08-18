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

DEFINE FIELD password ON user TYPE string 
  ASSERT string::len($value) >= 8
  PERMISSIONS FOR select NONE
;

DEFINE FIELD avatarURL ON user TYPE option<string>
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

DEFINE INDEX unique_name ON user FIELDS username UNIQUE;
DEFINE INDEX unique_email ON user FIELDS email UNIQUE;

DEFINE EVENT removal ON user WHEN $event = "DELETE" THEN {
  DELETE set WHERE author = $before;
  DELETE tag WHERE owner = $before;
  DELETE folder WHERE author = $before;
  DELETE available WHERE user = $before;
  DELETE liked WHERE in = $before;
  DELETE gestalt WHERE owner = $before;
  DELETE repetition WHERE owner = $before;
}