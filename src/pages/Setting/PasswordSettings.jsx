import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/shadcn-io/spinner";
import { updatePassword } from "@/services/user";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { Loader, Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";

const formSchema = z
  .object({
    oldPassword: z.string().min(7, "Enter your current password."),
    newPassword: z.string().min(7, "Password must be at least 6 characters."),
    newPasswordConfirm: z.string().min(7, "Please confirm your new password."),
  })
  .refine((d) => d.newPassword === d.newPasswordConfirm, {
    message: "Passwords do not match.",
    path: ["newPasswordConfirm"],
  });

export default function PasswordSettings() {
  const mutation = useMutation({
    mutationFn: updatePassword, // expects { oldPassword, newPassword }
    onSuccess: (data) => {
      console.log("Password updated:", data);

      toast.success("Password updated successfully!");
    },
    onError: (error) => {
      toast.error(error.message || "Something went wrong!");
    },
  });

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      oldPassword: "",
      newPassword: "",
      newPasswordConfirm: "",
    },
    mode: "onSubmit",
  });

  const onSubmit = (values) => {
    // Send only what the API needs
    const payload = {
      passwordCurrent: values.oldPassword,
      password: values.newPassword,
      passwordConfirm: values.newPasswordConfirm,
    };
    mutation.mutate(payload);
  };

  const isSubmitting = mutation.isPending || form.formState.isSubmitting;

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
        {/* Current password */}
        <FormField
          control={form.control}
          name="oldPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-md font-normal">
                Current Password
              </FormLabel>
              <FormControl>
                <Input
                  type="password"
                  {...field}
                  className="h-11 rounded-sm border-slate-300 text-base"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* New password */}
        <FormField
          control={form.control}
          name="newPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-md font-normal">
                New Password
              </FormLabel>
              <FormControl>
                <Input
                  type="password"
                  {...field}
                  className="h-11 rounded-sm border-slate-300 text-base"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Confirm new password */}
        <FormField
          control={form.control}
          name="newPasswordConfirm"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-md font-normal">
                Confirm New Password
              </FormLabel>
              <FormControl>
                <Input
                  type="password"
                  {...field}
                  className="h-11 rounded-sm border-slate-300 text-base"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          type="submit"
          disabled={isSubmitting}
          variant="default"
          className="mt-2 h-11 w-full text-base font-medium"
        >
          {mutation.isPending ? (
            <span className="flex items-center justify-center gap-2">
              <Loader2 className="h-4 w-4 animate-spin" />
              Updatting...
            </span>
          ) : (
            "Update Password"
          )}
        </Button>
      </form>
    </Form>
  );
}
