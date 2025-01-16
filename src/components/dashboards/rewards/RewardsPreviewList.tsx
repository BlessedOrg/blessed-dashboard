import { CreateRewardModal } from '@/components/rewards/CreateRewardModal';
import { Card } from "@/components/ui";
import Image from "next/image";
import { useState } from 'react';

export const RewardsPreviewList = ({ rewards, appId, onlyPreview = false }: { rewards: any[], appId: string, onlyPreview?: boolean }) => {
	const [open, setOpen] = useState(false);
  return (
    <Card className='p-4'>
      <div className='flex flex-col gap-4'>
				{!onlyPreview && <div className="flex justify-between items-center">
					<p className="font-semibold text-center">Add rewards</p>
					<button onClick={() => setOpen(true)} className="text-sm text-gray-500 underline">
						Create new reward
					</button>
				</div>}
        {rewards?.map((reward) => (
          <Card key={reward.id} className={`p-4 flex gap-4 items-center rounded-2xl  border-2 shadow-none`}>
            <div className="bg-gray-200 rounded-lg h-[4.25rem] min-w-[4.25rem] flex items-center justify-center">
              <Image src={reward.logoUrl} alt={reward.name} width={40} height={40} />
            </div>

            <div className="w-full">
              <div className="flex justify-between gap-2">
                <div>
                  <p className="text-sm text-gray-500 uppercase font-medium">{reward.isVoucher ? "Voucher" : "Discount"}</p>
                  <h3 className="text-lg font-semibold">{reward.name}</h3>
                </div>
              </div>
              <p className="text-lg text-gray-500">{reward.description}</p>
            </div>
          </Card>
        ))}
      </div>
			<CreateRewardModal appSlug={appId} open={open} setOpen={setOpen} />
    </Card>
  );
};


import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CardContent } from "@/components/ui/card";
import { format } from "date-fns";
import { AnimatePresence, motion } from "framer-motion";
import { Calendar, ChevronDown, ChevronUp, Download, Link2, Map, MapPin } from "lucide-react";

export function DiscountCodesView({rewards}: {rewards: any[]}) {
  const [expandedDiscounts, setExpandedDiscounts] = useState<Set<string>>(new Set());

  const toggleDiscount = (id: string) => {
    const newExpanded = new Set(expandedDiscounts);
    if (newExpanded.has(id)) {
      newExpanded.delete(id);
    } else {
      newExpanded.add(id);
    }
    setExpandedDiscounts(newExpanded);
  };

  const downloadCsv = (discount: typeof rewards[0]) => {
    const headers = ["Code", "Used", "Reusable", "Created At"];
    const rows = discount.DiscountCodes.map(code => [
      code.value,
      code.used ? "Yes" : "No",
      code.reusable ? "Yes" : "No",
      format(new Date(code.createdAt), "yyyy-MM-dd HH:mm:ss")
    ]);

    const csvContent = [
      headers.join(","),
      ...rows.map(row => row.join(","))
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${discount.name.toLowerCase().replace(/\s+/g, "-")}-codes.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="w-full flex flex-col gap-4">
			<p className="text-lg font-semibold">Rewards</p>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >

        <div className="space-y-4">
          {rewards.map((discount) => (
            <Card key={discount.id} className="overflow-hidden">
              <CardContent className="p-0">
                <div
                  className="p-6 cursor-pointer hover:bg-gray-50 transition-colors"
                  onClick={() => toggleDiscount(discount.id)}
                >
                  <div className="flex items-start justify-between">
									<div className='flex items-center gap-2'>
									<div className="bg-gray-200 rounded-lg h-[4.25rem] min-w-[4.25rem] flex items-center justify-center">
										<Image src={discount.logoUrl} alt={discount.name} width={40} height={40} />
									</div>
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <h3 className="text-lg font-semibold">{discount.name}</h3>
                        <Badge variant="secondary" className={`${discount.isVoucher ? "bg-yellow-500 text-black" : "bg-blue-500 text-white"}`}>{discount.isVoucher ? "Voucher" : "Discount"} {discount.isVoucher ? "" : `${discount.percentage}% OFF`}</Badge>
                      </div>
                      <p className="text-sm text-gray-500">{discount.description}</p>
                    </div>
									</div>
                    <Button variant="ghost" size="icon">
                      {expandedDiscounts.has(discount.id) ? (
                        <ChevronUp className="h-4 w-4" />
                      ) : (
                        <ChevronDown className="h-4 w-4" />
                      )}
                    </Button>
                  </div>

                  <div className="flex flex-wrap gap-4 mt-4 text-sm text-gray-500">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      Valid: {format(new Date(discount.validFrom), "MMM d")} - {format(new Date(discount.validTo), "MMM d, yyyy")}
                    </span>
                    {discount.locationUrl && (
                      <span className="flex items-center gap-1">
                        <Link2 className="w-4 h-4" />
                        <a href={discount.locationUrl} target="_blank" rel="noopener noreferrer" className="hover:text-blue-500">
                          Redemption URL
                        </a>
                      </span>
                    )}
										{discount?.eventId && (
                      <span className="flex items-center gap-1">
                        <Map className="w-4 h-4" />
                        <p>
                          Claimable on event
                        </p>
                      </span>
                    )}
                    {(discount.locationLatitude && discount.locationLongitude) && (
                      <span className="flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        Location Available
                      </span>
                    )}
                  </div>
                </div>

                <AnimatePresence>
                  {expandedDiscounts.has(discount.id) && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden"
                    >
                      <div className="border-t px-6 py-4">
                        <div className="flex justify-between items-center mb-4">
                          <h4 className="font-medium">
                            Available Codes ({discount.DiscountCodes.length})
                          </h4>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => downloadCsv(discount)}
                            className="gap-2"
                          >
                            <Download className="w-4 h-4" />
                            Export CSV
                          </Button>
                        </div>

                        <div className="space-y-2">
                          {discount.DiscountCodes.map((code) => (
                            <div
                              key={code.id}
                              className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                            >
                              <code className="font-mono text-sm">{code.value}</code>
                              <div className="flex items-center gap-2">
                                {code.reusable ? (
                                  <Badge variant="outline">Reusable</Badge>
                                ) : (
                                  <Badge variant="outline">Single-use</Badge>
                                )}
                                {code.used ? (
                                  <Badge variant="secondary">Used</Badge>
                                ) : (
                                  <Badge className="bg-green-100 text-green-700">Available</Badge>
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </CardContent>
            </Card>
          ))}
        </div>
      </motion.div>
    </div>
  );
}


