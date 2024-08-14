DEFINE FUNCTION fn::IsAllowed($users: array<record<access>>, $mode: string) {
  FOR $available IN $users {
        IF $available.permission = $mode {
          RETURN true;
        };
  };

  RETURN false;
};
