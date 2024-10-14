import { CloseButton, CloseButtonProps } from "./CloseButton";

type Props = CloseButtonProps & {
  deleteId: string;
};

export function DeleteButton({ deleteId, ...props }: Props) {
  return <CloseButton id={`Delete ${deleteId} Button`} {...props} />;
}
