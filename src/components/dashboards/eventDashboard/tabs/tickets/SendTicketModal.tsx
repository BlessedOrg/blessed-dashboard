"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CheckCircle2, Loader2, Mail, Send, Wallet2 } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { toast } from "react-toastify";
import { sendTicketToEmail, sendTicketToExternalWallet } from "@/app/api/tickets";

const sendTicketSchema = z
  .object({
    type: z.enum(["email", "wallet"]),
    email: z.string().email("Invalid email address").optional(),
    wallet: z.string().min(42, "Invalid wallet address").optional(),
    amount: z.number().min(1, "Amount must be at least 1")
  })
  .refine(
    (data) => {
      if (data.type === "email") return !!data.email;
      if (data.type === "wallet") return !!data.wallet;
      return false;
    },
    {
      message: "Please provide either an email or wallet address",
      path: ["type"]
    }
  );

type SendTicketFormData = z.infer<typeof sendTicketSchema>;

interface SendTicketModalProps {
  appId: string;
  eventId: string;
  ticketName: string;
  maxAmount: number;
  ticketId: string;
  mutate: any;
}

export function SendTicketModal({
  appId,
  eventId,
  ticketName,
  maxAmount,
  ticketId,
  mutate
}: SendTicketModalProps) {
  const [isOpen, setIsOpen] = useState(false);

  const [tab, setTab] = useState<"email" | "wallet">("email");
  const [isSending, setIsSending] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
    clearErrors,
    reset
  } = useForm<SendTicketFormData>({
    resolver: zodResolver(sendTicketSchema),
    defaultValues: {
      type: "email",
      amount: 1
    }
  });
  const onClose = () => {
    setIsSending(false);
    setIsSuccess(false);
    reset();
    setIsOpen(false);
  };
  const onSubmit = async (data: SendTicketFormData) => {
    setIsSending(true);
    try {
      if (data.type === "email" && data.email) {
        await onSendTicketToEmail(data.email, ticketId, data.amount);
      } else if (data.type === "wallet" && data.wallet) {
        await onSendTicketToExternalWalletAddress(data.wallet, ticketId, data.amount);
      }
      setIsSuccess(true);
      await mutate();
      setTimeout(() => {
        setIsSending(false);
        setIsSuccess(false);
        reset();
        onClose();
      }, 2000);
    } catch (error) {
      setIsSending(false);
      toast(error?.message || "Failed to send ticket. Please try again later.", { type: "error" });
    }
  };
  const onSendTicketToExternalWalletAddress = async (walletAddress: string, ticketId: string, amount: number) => {
    const payload = {
      appId,
      eventId,
      ticketId,
      walletAddress,
      amount
    };
    return sendTicketToExternalWallet(payload);
  };

  const onSendTicketToEmail = async (email: string, ticketId: string, amount: number) => {
    const payload = {
      appId,
      eventId,
      ticketId,
      email,
      amount
    };
    return sendTicketToEmail(payload);
  };

  const handleTabChange = (value: string) => {
    if (value === "email") {
      setValue("wallet", undefined);
      clearErrors("wallet");
    } else if (value === "wallet") {
      setValue("email", undefined);
      clearErrors("email");
    }
    setTab(value as "email" | "wallet");
    setValue("type", value as "email" | "wallet");
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => setIsOpen(open)}>
      <DialogTrigger asChild>
        <Button size="sm" onClick={() => setIsOpen(true)}>
          <Send className="mr-2 h-4 w-4" />
          Send Ticket
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Send {ticketName}</DialogTitle>
        </DialogHeader>

        <AnimatePresence mode="wait">
          {isSending ? (
            <motion.div
              key="sending"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="flex flex-col items-center justify-center py-8"
            >
              {isSuccess ? (
                <motion.div
                  className="flex flex-col items-center text-green-500"
                  initial={{ scale: 0.5, opacity: 0 }}
                  animate={{
                    scale: 1,
                    opacity: 1,
                    transition: { type: "spring", stiffness: 200, damping: 15 }
                  }}
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{
                      scale: 1,
                      transition: { delay: 0.2, type: "spring", stiffness: 200 }
                    }}
                  >
                    <CheckCircle2 className="w-16 h-16" />
                  </motion.div>
                  <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{
                      opacity: 1,
                      y: 0,
                      transition: { delay: 0.3 }
                    }}
                    className="mt-4 text-center font-medium"
                  >
                    Ticket sent successfully!
                  </motion.p>
                </motion.div>
              ) : (
                <motion.div
                  className="flex flex-col items-center"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  <motion.div
                    animate={{
                      scale: [1, 1.1, 1],
                      opacity: [1, 0.8, 1]
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  >
                    <Loader2 className="w-16 h-16 text-blue-500 animate-spin" />
                  </motion.div>
                  <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{
                      opacity: 1,
                      y: 0,
                      transition: { delay: 0.2 }
                    }}
                    className="mt-4 text-center font-medium"
                  >
                    Sending ticket...
                  </motion.p>
                </motion.div>
              )}
            </motion.div>
          ) : (
            <motion.form
              key="form"
              onSubmit={handleSubmit(onSubmit)}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              <Tabs value={tab} onValueChange={handleTabChange}>
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="email" className="flex items-center gap-2">
                    <Mail className="w-4 h-4" />
                    Email
                  </TabsTrigger>
                  <TabsTrigger value="wallet" className="flex items-center gap-2">
                    <Wallet2 className="w-4 h-4" />
                    Wallet
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="email" className="space-y-4">
                  <div className="space-y-2">
                    <Label>Email Address</Label>
                    <Input
                      type="email"
                      placeholder="Enter recipient's email"
                      {...register("email")}
                      className={errors.email ? "border-red-500" : ""}
                    />
                    {errors.email && (
                      <p className="text-sm text-red-500">{errors.email.message}</p>
                    )}
                  </div>
                </TabsContent>

                <TabsContent value="wallet" className="space-y-4">
                  <div className="space-y-2">
                    <Label>Wallet Address</Label>
                    <Input
                      placeholder="Enter ERC20 wallet address"
                      {...register("wallet")}
                      className={errors.wallet ? "border-red-500" : ""}
                    />
                    {errors.wallet && (
                      <p className="text-sm text-red-500">{errors.wallet.message}</p>
                    )}
                  </div>
                </TabsContent>
              </Tabs>

              <div className="space-y-2">
                <Label>Amount</Label>
                <Input
                  type="number"
                  min={1}
                  max={maxAmount}
                  {...register("amount", { valueAsNumber: true })}
                  className={errors.amount ? "border-red-500" : ""}
                />
                {errors.amount ? (
                  <p className="text-sm text-red-500">{errors.amount.message}</p>
                ) : (
                  <p className="text-sm text-gray-500">Maximum available: {maxAmount}</p>
                )}
              </div>

              <div className="flex justify-end">
                <Button
                  type="submit"
                  variant="green"
                >
                  <Send className="w-4 h-4 mr-2" />
                  Send Ticket
                </Button>
              </div>
            </motion.form>
          )}
        </AnimatePresence>
      </DialogContent>
    </Dialog>
  );
}