"use client";

import { useForm, type Resolver } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSettings } from "../hooks/useSettings";
import { useUpdateSettings } from "../hooks/useUpdateSettings";
import { settingSchema, type SettingFormValues } from "../schemas/settingSchema";
import { useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import Loader from "@/components/shared/Loader";

export default function SchoolProfileForm() {
  const { data: settings, isLoading } = useSettings();
  const updateSettings = useUpdateSettings();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<SettingFormValues>({
    resolver: zodResolver(settingSchema) as unknown as Resolver<SettingFormValues>,
  });

  useEffect(() => {
    if (settings) {
      reset({
        schoolName: settings.schoolName,
        schoolAddress: settings.schoolAddress,
        schoolEmail: settings.schoolEmail,
        schoolLogo: settings.schoolLogo,
        sessionYear: settings.sessionYear,
        currency: settings.currency,
        emailNotifications: settings.emailNotifications,
        smsNotifications: settings.smsNotifications,
        pushNotifications: settings.pushNotifications,
        language: settings.language,
        timezone: settings.timezone,
        dateFormat: settings.dateFormat,
        theme: settings.theme,
      });
    }
  }, [settings, reset]);

  const onSubmit = async (data: SettingFormValues) => {
    try {
      await updateSettings.mutateAsync(data);
      toast.success("School profile updated successfully");
    } catch {
      toast.error("Failed to update school profile");
    }
  };

  if (isLoading) return <Loader />;

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="rounded-3xl border bg-card p-6 shadow-sm space-y-6"
    >
      <div>
        <h2 className="text-xl font-bold">School Profile</h2>
        <p className="text-sm text-muted-foreground">Manage public school credentials and contact profile</p>
      </div>

      <div className="space-y-4 max-w-xl">
        <div>
          <Label htmlFor="schoolName">School Name</Label>
          <Input
            id="schoolName"
            {...register("schoolName")}
            className="mt-1"
          />
          {errors.schoolName && (
            <p className="mt-1 text-sm text-red-500">{errors.schoolName.message}</p>
          )}
        </div>

        <div>
          <Label htmlFor="schoolAddress">Address</Label>
          <Input
            id="schoolAddress"
            {...register("schoolAddress")}
            className="mt-1"
          />
          {errors.schoolAddress && (
            <p className="mt-1 text-sm text-red-500">{errors.schoolAddress.message}</p>
          )}
        </div>

        <div>
          <Label htmlFor="schoolEmail">School Contact Email</Label>
          <Input
            id="schoolEmail"
            type="email"
            {...register("schoolEmail")}
            className="mt-1"
          />
          {errors.schoolEmail && (
            <p className="mt-1 text-sm text-red-500">{errors.schoolEmail.message}</p>
          )}
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <Label htmlFor="sessionYear">Session Year</Label>
            <Input
              id="sessionYear"
              placeholder="e.g. 2026-2027"
              {...register("sessionYear")}
              className="mt-1"
            />
            {errors.sessionYear && (
              <p className="mt-1 text-sm text-red-500">{errors.sessionYear.message}</p>
            )}
          </div>

          <div>
            <Label htmlFor="currency">Currency</Label>
            <Input
              id="currency"
              placeholder="e.g. USD, INR"
              {...register("currency")}
              className="mt-1"
            />
            {errors.currency && (
              <p className="mt-1 text-sm text-red-500">{errors.currency.message}</p>
            )}
          </div>
        </div>

        <div>
          <Label htmlFor="schoolLogo">School Logo URL</Label>
          <Input
            id="schoolLogo"
            placeholder="/images/logo.png"
            {...register("schoolLogo")}
            className="mt-1"
          />
          {errors.schoolLogo && (
            <p className="mt-1 text-sm text-red-500">{errors.schoolLogo.message}</p>
          )}
        </div>

        <Button type="submit" disabled={updateSettings.isPending}>
          {updateSettings.isPending ? "Saving..." : "Save Changes"}
        </Button>
      </div>
    </form>
  );
}
