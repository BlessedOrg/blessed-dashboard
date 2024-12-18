"use client";

import { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2, Mail, RefreshCw } from "lucide-react";
import { motion } from "framer-motion";

interface VerifyEmailModalProps {
  isOpen: boolean;
  onClose: () => void;
  email: string;
  onVerify: (code: string) => Promise<void>;
}

export function VerifyEmailModal({ isOpen, onClose, email, onVerify }: VerifyEmailModalProps) {
  const [code, setCode] = useState("");
  const [isVerifying, setIsVerifying] = useState(false);
  const [countdown, setCountdown] = useState(60);
  const [canResend, setCanResend] = useState(false);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isOpen && countdown > 0) {
      timer = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            setCanResend(true);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isOpen, countdown]);

  const handleVerify = async () => {
    if (!code) return;
    setIsVerifying(true);
    try {
      await onVerify(code);
    } finally {
      setIsVerifying(false);
    }
  };

  const handleResendCode = () => {
    setCountdown(60);
    setCanResend(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Mail className="w-5 h-5" />
            Verify Email Address
          </DialogTitle>
        </DialogHeader>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-4"
        >
          <p className="text-sm text-gray-500">
            We've sent a verification code to <span className="font-medium">{email}</span>.
            Please enter the code below to verify your email address.
          </p>

          <div className="space-y-2">
            <Label htmlFor="code">Verification Code</Label>
            <Input
              id="code"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              placeholder="Enter 6-digit code"
              maxLength={6}
            />
          </div>

          <div className="flex items-center justify-between">
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={handleResendCode}
              disabled={!canResend}
              className="text-sm"
            >
              <RefreshCw className="w-3 h-3 mr-2" />
              {canResend ? (
                "Resend Code"
              ) : (
                `Resend in ${countdown}s`
              )}
            </Button>

            <div className="flex gap-3">
              <Button
                variant="outline"
                onClick={onClose}
                disabled={isVerifying}
              >
                Cancel
              </Button>
              <Button
                onClick={handleVerify}
                disabled={!code || isVerifying}
              >
                {isVerifying ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Verifying...
                  </>
                ) : (
                  "Verify Email"
                )}
              </Button>
            </div>
          </div>
        </motion.div>
      </DialogContent>
    </Dialog>
  );
}