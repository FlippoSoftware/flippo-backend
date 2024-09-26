import { IOAuthButtonProps } from "../types/IOAuthButtonProps";
import { Text } from "@atoms/Text";

const OAuthButton = (props: IOAuthButtonProps) => {
  const { provider } = props;
  return (
    <button>
      <Text fontWeight={200}>{""}</Text>
      {`Continue with ${provider}`}
    </button>
  );
};

export { OAuthButton };
