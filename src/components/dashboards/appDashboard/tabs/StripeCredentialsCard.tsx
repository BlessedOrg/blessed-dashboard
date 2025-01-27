"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { fetcherWithToken } from '@/requests/requests';
import { apiUrl } from '@/variables/variables';
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { CheckCircle2, CreditCard, Eye, EyeOff, Loader2, PencilLine } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from 'react-toastify';
import useSWR from 'swr';
import * as z from "zod";

const stripeSchema = z.object({
  stripeSecretKey: z.string().min(1, "Secret key is required"),
  stripeWebhookSecret: z.string().min(1, "Webhook secret is required"),
});

type StripeFormData = z.infer<typeof stripeSchema>;

interface StripeCredentialsCardProps {
  appData: any;
}

export function StripeCredentialsCard({ appData }: StripeCredentialsCardProps) {
  const { data: savedCredentials, isLoading, mutate } = useSWR(`${apiUrl}/private/apps/${appData.id}/stripe-keys`, fetcherWithToken)
  const [isEditing, setIsEditing] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSecrets, setShowSecrets] = useState(false);

  const form = useForm<StripeFormData>({
    resolver: zodResolver(stripeSchema),
    defaultValues: {
      stripeSecretKey: "",
      stripeWebhookSecret: "",
    },
  });

  useEffect(() => {
    if (savedCredentials) {
      form.reset({
        stripeSecretKey: savedCredentials.stripeSecretKey || "",
        stripeWebhookSecret: savedCredentials.stripeWebhookSecret || ""
      });
      setIsEditing(!savedCredentials.stripeSecretKey);
    } else {
      setIsEditing(true);
    }
  }, [savedCredentials, form]);

  const handleSubmit = async (data: StripeFormData) => {
    setIsSubmitting(true);
    try {
      const res = await fetcherWithToken(`${apiUrl}/private/apps/${appData.id}/stripe-keys`, {
        method: savedCredentials?.stripeSecretKey ? "PUT" : "POST",
        body: JSON.stringify(data)
      });
      await new Promise(resolve => setTimeout(resolve, 1000));
      await mutate();
      toast(res?.message || savedCredentials?.stripeSecretKey ? "Credentials updated" : "Credentials saved", { type: "success" })
      setIsEditing(false);
    } catch (error) {
      console.error("Error saving Stripe credentials:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const maskSecret = (secret: string) => {
    if (!secret) return "";
    return `*****************`;
  };

  if (isLoading) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-purple-100 rounded-lg">
              <Loader2 className="w-6 h-6 text-purple-600 animate-spin" />
            </div>
            <div>
              <h3 className="text-lg font-semibold">Loading...</h3>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-purple-100 rounded-lg">
              <CreditCard className="w-6 h-6 text-purple-600" />
            </div>
            <div>
              <h3 className="text-lg font-semibold">Stripe Integration</h3>
              <p className="text-sm text-gray-500">
                Configure your Stripe payment credentials
              </p>
            </div>
          </div>
          {!!savedCredentials?.stripeSecretKey && !isEditing && (
            <div className="flex items-center gap-2">
              <Badge variant="secondary" className="gap-1">
                <CheckCircle2 className="w-3 h-3" />
                Configured
              </Badge>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsEditing(true)}
                className="gap-2"
              >
                <PencilLine className="w-4 h-4" />
                Edit
              </Button>
            </div>
          )}
        </div>

        <motion.form
          onSubmit={form.handleSubmit(handleSubmit)}
          initial={false}
          animate={isEditing ? "editing" : "viewing"}
          className="space-y-4"
        >
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Secret Key</Label>
              {isEditing ? (
                <div className="relative">
                  <Input
                    type={showSecrets ? "text" : "password"}
                    placeholder="sk_live_..."
                    {...form.register("stripeSecretKey")}
                    className={form.formState.errors.stripeSecretKey ? "border-red-500" : ""}
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-2 top-1/2 -translate-y-1/2"
                    onClick={() => setShowSecrets(!showSecrets)}
                  >
                    {showSecrets ? (
                      <EyeOff className="w-4 h-4" />
                    ) : (
                      <Eye className="w-4 h-4" />
                    )}
                  </Button>
                </div>
              ) : (
                <p className="font-mono text-sm bg-gray-50 p-2 rounded">
                  {showSecrets ? savedCredentials?.stripeSecretKey : maskSecret(savedCredentials?.stripeSecretKey || "")}
                </p>
              )}
              {form.formState.errors.stripeSecretKey && (
                <p className="text-sm text-red-500">
                  {form.formState.errors.stripeSecretKey.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label>Webhook Secret</Label>
              {isEditing ? (
                <div className="relative">
                  <Input
                    type={showSecrets ? "text" : "password"}
                    placeholder="whsec_..."
                    {...form.register("stripeWebhookSecret")}
                    className={form.formState.errors.stripeWebhookSecret ? "border-red-500" : ""}
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-2 top-1/2 -translate-y-1/2"
                    onClick={() => setShowSecrets(!showSecrets)}
                  >
                    {showSecrets ? (
                      <EyeOff className="w-4 h-4" />
                    ) : (
                      <Eye className="w-4 h-4" />
                    )}
                  </Button>
                </div>
              ) : (
                <p className="font-mono text-sm bg-gray-50 p-2 rounded">
                  {showSecrets ? savedCredentials?.stripeWebhookSecret : maskSecret(savedCredentials?.stripeWebhookSecret || "")}
                </p>
              )}
              {form.formState.errors.stripeWebhookSecret && (
                <p className="text-sm text-red-500">
                  {form.formState.errors.stripeWebhookSecret.message}
                </p>
              )}
            </div>
          </div>

          {isEditing && (
            <div className="flex justify-end gap-2">
              {savedCredentials?.stripeSecretKey && (
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsEditing(false)}
                  disabled={isSubmitting}
                >
                  Cancel
                </Button>
              )}
              <Button
                type="submit"
                disabled={isSubmitting}
                className="bg-purple-600 hover:bg-purple-700 text-white"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Saving...
                  </>
                ) : (
                  <>
                    <CheckCircle2 className="w-4 h-4 mr-2" />
                    Save Credentials
                  </>
                )}
              </Button>
            </div>
          )}

          {!isEditing && (
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => setShowSecrets(!showSecrets)}
                className="text-gray-500 hover:text-gray-700"
              >
                {showSecrets ? (
                  <>
                    <EyeOff className="w-4 h-4 mr-2" />
                    Hide secrets
                  </>
                ) : (
                  <>
                    <Eye className="w-4 h-4 mr-2" />
                    Show secrets
                  </>
                )}
              </Button>
            </div>
          )}
        </motion.form>
      </CardContent>
    </Card>
  );
}