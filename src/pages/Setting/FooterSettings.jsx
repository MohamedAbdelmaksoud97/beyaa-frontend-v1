"use client";

import { useEffect, useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Loader2, Trash2 } from "lucide-react";

import { getStore } from "@/services/store";
import {
  useCreateFooter,
  useUpdateFooter,
  useDeleteFooterElement,
} from "@/contexts/useFooter";

import ConfirmDeleteDialog from "@/components/ConfirmDeleteDialog";

//
// ------------------------- SCHEMA --------------------------
const formSchema = z.object({
  socialLinks: z.object({
    facebook: z.string().optional(),
    instagram: z.string().optional(),
    tiktok: z.string().optional(),
  }),

  quickLinks: z.array(
    z.object({
      label: z.string().min(2, "Label is required"),
      url: z.string().url("Enter a valid full URL (https://...)"),
    }),
  ),
});

//
// ------------------------- COMPONENT --------------------------
export default function FooterSettings() {
  const { slug } = useParams();
  const [deleteData, setDeleteData] = useState(null); // { section, key, index? }

  //
  // LOAD STORE
  //
  const {
    data: store,
    isLoading: isStoreLoading,
    isError,
  } = useQuery({
    queryKey: ["store", slug],
    queryFn: () => getStore(slug),
  });

  const storeId = store?._id;
  const existingFooter = store?.footer;

  //
  // MUTATIONS
  //
  const createFooterMutation = useCreateFooter(storeId);
  const updateFooterMutation = useUpdateFooter(storeId);
  const deleteMutation = useDeleteFooterElement(storeId);

  //
  // FORM
  //
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      socialLinks: {
        facebook: "",
        instagram: "",
        tiktok: "",
      },
      quickLinks: [],
    },
  });

  const {
    control,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = form;

  const isMutating =
    createFooterMutation.isPending ||
    updateFooterMutation.isPending ||
    deleteMutation.isPending;

  //
  // HYDRATE
  //
  useEffect(() => {
    if (!store) return;

    const footer = store.footer || {};
    const social = footer.socialLinks || {};
    const quick = footer.quickLinks || {};

    const quickArray = Object.entries(quick).map(([label, url]) => ({
      label,
      url,
    }));

    reset({
      socialLinks: {
        facebook: social.facebook || "",
        instagram: social.instagram || "",
        //tiktok: social.tiktok || "",
      },
      quickLinks: quickArray,
    });
  }, [store, reset]);

  //
  // SUBMIT
  //
  const onSubmit = (values) => {
    const quickLinksObject = {};
    values.quickLinks.forEach((item) => {
      quickLinksObject[item.label] = item.url;
    });

    const payload = {
      socialLinks: values.socialLinks,
      quickLinks: quickLinksObject,
    };

    if (!existingFooter) createFooterMutation.mutate(payload);
    else updateFooterMutation.mutate(payload);
  };

  //
  // CONFIRMATION HANDLER
  //
  const confirmDelete = () => {
    if (!deleteData) return;

    deleteMutation.mutate(
      { section: deleteData.section, key: deleteData.key },
      {
        onSuccess: () => {
          // Remove from UI if it's quickLinks with index
          if (deleteData.section === "quickLinks") {
            const updated = [...form.getValues("quickLinks")];
            updated.splice(deleteData.index, 1);
            form.setValue("quickLinks", updated);
          }

          // For social links → simply clear the field
          if (deleteData.section === "socialLinks") {
            form.setValue(`socialLinks.${deleteData.key}`, "");
          }

          setDeleteData(null);
        },
      },
    );
  };

  //
  // LOADING
  //
  if (isStoreLoading) {
    return (
      <div className="flex justify-center py-10">
        <Loader2 className="text-primary h-6 w-6 animate-spin" />
      </div>
    );
  }

  //
  // UI
  //
  return (
    <>
      {/* CONFIRM DELETE DIALOG */}
      <ConfirmDeleteDialog
        open={!!deleteData}
        onClose={() => setDeleteData(null)}
        onConfirm={confirmDelete}
        title="Confirm Deletion"
        message="Are you sure you want to delete this item?"
      />

      <div className="mx-auto w-full max-w-md px-5 pb-10">
        <header className="pt-8 pb-4">
          <h1 className="text-center text-2xl font-semibold tracking-tight text-slate-900">
            Footer Settings
          </h1>
          <p className="mt-1 text-center text-sm text-slate-500">
            Manage the links that appear at the bottom of your store.
          </p>
        </header>

        <Form {...form}>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* SOCIAL LINKS */}
            <section className="rounded-md border bg-white p-4 shadow-sm">
              <h2 className="text-sm font-semibold text-slate-600 uppercase">
                Social Links
              </h2>

              {Object.entries(form.watch("socialLinks")).map(
                ([field, value]) => (
                  <div key={field} className="mt-3 flex items-center gap-3">
                    <FormField
                      control={control}
                      name={`socialLinks.${field}`}
                      render={({ field: f }) => (
                        <FormItem className="flex-1">
                          <FormLabel className="text-sm capitalize">
                            {field}
                          </FormLabel>
                          <FormControl>
                            <Input
                              placeholder={`https://${field}.com/...`}
                              {...f}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* SHOW GRAY TRASH ONLY IF VALUE EXISTS */}
                    {value && value.trim() !== "" && (
                      <button
                        type="button"
                        onClick={() =>
                          setDeleteData({
                            section: "socialLinks",
                            key: field,
                          })
                        }
                        className="text-slate-400 hover:text-slate-600"
                      >
                        <Trash2 size={18} />
                      </button>
                    )}
                  </div>
                ),
              )}
            </section>

            {/* QUICK LINKS */}
            <section className="rounded-md border bg-white p-4 shadow-sm">
              <h2 className="text-sm font-semibold text-slate-600 uppercase">
                Quick Links
              </h2>

              <div className="mt-3 space-y-4">
                {form.watch("quickLinks").map((_, index) => {
                  const label = form.watch(`quickLinks.${index}.label`);

                  return (
                    <div
                      key={index}
                      className="rounded-md border bg-slate-50 p-3"
                    >
                      <div className="mb-2 flex justify-between">
                        <span className="text-xs text-slate-500">
                          Quick Link #{index + 1}
                        </span>

                        {label && (
                          <button
                            type="button"
                            className="text-slate-400 hover:text-slate-600"
                            onClick={() =>
                              setDeleteData({
                                section: "quickLinks",
                                key: label,
                                index,
                              })
                            }
                          >
                            <Trash2 size={18} />
                          </button>
                        )}
                      </div>

                      {/* Label */}
                      <FormField
                        control={control}
                        name={`quickLinks.${index}.label`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-sm">Label</FormLabel>
                            <FormControl>
                              <Input placeholder="About Us" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      {/* URL */}
                      <FormField
                        control={control}
                        name={`quickLinks.${index}.url`}
                        render={({ field }) => (
                          <FormItem className="mt-2">
                            <FormLabel className="text-sm">Full URL</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="https://yourstore.com/about"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  );
                })}
              </div>

              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  const updated = [
                    ...form.getValues("quickLinks"),
                    { label: "", url: "" },
                  ];
                  form.setValue("quickLinks", updated);
                }}
                className="mt-3 h-9 w-full text-sm"
              >
                + Add Quick Link
              </Button>
            </section>

            {/* SUBMIT */}
            <Button
              type="submit"
              disabled={isSubmitting || isMutating}
              className="h-11 w-full"
            >
              {isMutating ? (
                <span className="flex items-center justify-center gap-2">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Saving...
                </span>
              ) : (
                "Save Footer"
              )}
            </Button>
          </form>
        </Form>
      </div>
    </>
  );
}
