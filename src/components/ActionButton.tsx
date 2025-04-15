import type { ButtonHTMLAttributes } from "react";
import { type VariantProps, tv } from "tailwind-variants";
import CancelIcon from "./svg/CancelIcon";
import DeleteIcon from "./svg/DeleteIcon";
import DoneIcon from "./svg/DoneIcon";
import EditIcon from "./svg/EditIcon";
import PlusIcon from "./svg/PlusIcon";
import SaveIcon from "./svg/SaveIcon";

const buttonStyles = tv({
  slots: {
    base: "h-4 flex flex-col items-center justify-center rounded-sm cursor-pointer disabled:cursor-not-allowed disabled:opacity-50",
    icon: "h-[24px] w-[24px]",
    text: "text-[10px]",
  },
  variants: {
    variant: {
      fillBrand: {
        base: "bg-brand hover:bg-brand-hover active:bg-brand-active",
        icon: "text-white",
        text: "text-white",
      },
      fillGray: {
        base: "bg-black-30 hover:bg-gray-hover active:bg-gray-active",
        icon: "text-white",
        text: "text-white",
      },
      outlineBrand: {
        base: "bg-white hover:bg-white-hover active:bg-white-active border-2 border-brand",
        icon: "text-brand",
        text: "text-brand",
      },
    },
    size: {
      sm: {
        base: "h-4 w-4",
      },
      lg: {
        base: "h-4 w-9",
      },
    },
  },
  defaultVariants: {
    variant: "fillBrand",
    size: "sm",
  },
});

export interface ActionButtonProps
  extends VariantProps<typeof buttonStyles>,
    ButtonHTMLAttributes<HTMLButtonElement> {
  action: "add" | "edit" | "delete" | "save" | "cancel" | "done";
  className?: string;
}

const ActionButton = ({
  variant,
  size,
  className,
  action,
  type = "button",
  ...props
}: ActionButtonProps) => {
  const {
    base: baseStyle,
    icon: iconStyle,
    text: textStyle,
  } = buttonStyles({
    variant,
    size,
    className,
  });
  const actionConfig = {
    add: {
      icon: <PlusIcon className={iconStyle()} />,
      text: "New Page",
    },
    edit: {
      icon: <EditIcon className={iconStyle()} />,
      text: "Edit",
    },
    delete: {
      icon: <DeleteIcon className={iconStyle()} />,
      text: "Delete",
    },
    save: {
      icon: <SaveIcon className={iconStyle()} />,
      text: "Save",
    },
    cancel: {
      icon: <CancelIcon className={iconStyle()} />,
      text: "Cancel",
    },
    done: {
      icon: <DoneIcon className={iconStyle()} />,
      text: "Done",
    },
  };

  const { icon, text } = actionConfig[action];

  return (
    <button className={baseStyle()} {...props}>
      {icon}
      <span className={textStyle()}>{text}</span>
    </button>
  );
};

export default ActionButton;
