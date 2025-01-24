"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { CheckCircle2, CreditCard, Eye, EyeOff, Loader2, PencilLine } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

const stripeSchema = z.object({
  secretKey: z.string().min(1, "Secret key is required"),
  webhookSecret: z.string().min(1, "Webhook secret is required"),
});

type StripeFormData = z.infer<typeof stripeSchema>;

interface StripeCredentialsCardProps {
  savedCredentials?: {
    secretKey: string;
    webhookSecret: string;
  };
  onSave: (data: StripeFormData) => Promise<void>;
}

export function StripeCredentialsCard({ savedCredentials, onSave }: StripeCredentialsCardProps) {
  const [isEditing, setIsEditing] = useState(!savedCredentials);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSecrets, setShowSecrets] = useState(false);

  const form = useForm<StripeFormData>({
    resolver: zodResolver(stripeSchema),
    defaultValues: {
      secretKey: savedCredentials?.secretKey || "",
      webhookSecret: savedCredentials?.webhookSecret || "",
    },
  });

  const handleSubmit = async (data: StripeFormData) => {
    setIsSubmitting(true);
    try {
      await onSave(data);
      setIsEditing(false);
    } catch (error) {
      console.error("Error saving Stripe credentials:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const maskSecret = (secret: string) => {
    if (!secret) return "";
    return `${secret.slice(0, 8)}...${secret.slice(-4)}`;
  };

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
          {savedCredentials && !isEditing && (
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
                    {...form.register("secretKey")}
                    className={form.formState.errors.secretKey ? "border-red-500" : ""}
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
                  {showSecrets ? savedCredentials?.secretKey : maskSecret(savedCredentials?.secretKey || "")}
                </p>
              )}
              {form.formState.errors.secretKey && (
                <p className="text-sm text-red-500">
                  {form.formState.errors.secretKey.message}
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
                    {...form.register("webhookSecret")}
                    className={form.formState.errors.webhookSecret ? "border-red-500" : ""}
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
                  {showSecrets ? savedCredentials?.webhookSecret : maskSecret(savedCredentials?.webhookSecret || "")}
                </p>
              )}
              {form.formState.errors.webhookSecret && (
                <p className="text-sm text-red-500">
                  {form.formState.errors.webhookSecret.message}
                </p>
              )}
            </div>
          </div>

          {isEditing && (
            <div className="flex justify-end gap-2">
              {savedCredentials && (
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