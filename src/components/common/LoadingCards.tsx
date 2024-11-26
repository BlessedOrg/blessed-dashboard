import { Card } from "@/components/ui";
import { CardContent } from "@/components/ui/card";

export const LoadingCards = ({ items = 3 }: { items?: number }) => {
  return (
    <>
      {Array(items)
        .fill(null)
        .map((_, index) => (
          <Card key={index} className="animate-pulse">
            <CardContent>
              <div className="flex flex-col md:flex-row gap-6">
                {/* Image Skeleton */}
                <div className="w-full md:w-48 h-48 bg-gray-200 rounded-xl shrink-0" />

                {/* Content Skeleton */}
                <div className="flex-1 space-y-4">
                  <div className="space-y-2">
                    <div className="h-6 bg-gray-200 rounded w-1/3" />
                    <div className="h-4 bg-gray-200 rounded w-1/4" />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {[1, 2, 3].map((item) => (
                      <div key={item} className="space-y-2">
                        <div className="h-4 bg-gray-200 rounded w-2/3" />
                        <div className="h-6 bg-gray-200 rounded w-1/2" />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
    </>
  );
};