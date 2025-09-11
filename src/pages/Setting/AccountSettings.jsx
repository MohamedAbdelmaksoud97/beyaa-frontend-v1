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
import { useUser } from "@/contexts/AuthContext";
import { updateUser } from "@/services/user";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";

import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";
const formSchema = z
  .object({
    name: z.string().min(2, "Please enter your name."),

    phone: z.string().min(6, "Enter a valid phone."),
  })
  .refine((d) => d.password === d.passwordConfirm, {
    message: "Passwords do not match.",
    path: ["passwordConfirm"],
  });
function AccountSettings() {
  const { data: user } = useUser();
  const mutation = useMutation({
    mutationFn: updateUser,
    onSuccess: (data) => {
      console.log("Store created:", data);

      toast.success("Account updated successfully!");
      // You could also trigger a refetch or update UI here
    },
    onError: (error) => {
      toast.error(error.message || "Something went wrong!");
    },
  });

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: user.name,

      phone: user.phone,
    },
    mode: "onSubmit",
  });
  const onSubmit = (values) => {
    console.log("Form submitted with values:", values);
    // values already contain: name, email, password, passwordConfirm, phone
    // add role only if your API allows clients to set it (often this is server-side only)
    // const payload = { ...values, role: "admin" };
    mutation.mutate(values);
  };
  //const isSubmitting = mutation.isPending || form.formState.isSubmitting;
  return (
    <Form {...form}>
      {" "}
      {/* ✅ provides RHF context for shadcn components */}
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-md font-normal">Your Name</FormLabel>
              <FormControl>
                <Input
                  placeholder=""
                  {...field}
                  className="h-11 rounded-sm border-slate-300 text-base"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-md font-normal">Phone</FormLabel>
              <FormControl>
                <Input
                  type="tel"
                  inputMode="tel"
                  placeholder=""
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
          disabled={form.formState.isSubmitting}
          variant="default"
          className="mt-2 w-full text-base font-medium"
        >
          {mutation.isPending ? (
            <span className="flex items-center justify-center gap-2">
              <Loader2 className="h-4 w-4 animate-spin" />
              Updatting...
            </span>
          ) : (
            "Update my Account"
          )}
        </Button>
      </form>
    </Form>
  );
}

export default AccountSettings;
