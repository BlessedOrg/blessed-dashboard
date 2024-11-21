import { Card, Input, Label } from "@/components/ui";
import { FieldValues, UseFormReturn } from "react-hook-form";

export const CreateEventDashboardContent = ({
  selectedTab,
  form,
  createViewItems,
  appId,
  eventId
}: {
  selectedTab: string;
  form: UseFormReturn<FieldValues, any, undefined>,
  createViewItems: any;
  appId?: string;
  eventId?: string
}) => {
  const { register } = form;
  return (
    <div className="w-full flex flex-col gap-10 pb-10">
      {createViewItems.flatMap((category) =>
        category.tabs.map((tab) => {
          if (selectedTab !== tab.href) {
            return null;
          }

          return (
            <div key={tab.href}>
              {tab?.customFieldComponents?.map((Component, index) => (
                <Component
                  appId={appId}
                  eventId={eventId}
                  key={index}
                  form={form}
                  fields={tab.fields}
                />
              ))}
              {tab.fields.map((field) => (
                <Card key={field.id}>
                  <div>
                    <div className="mb-2 block">
                      <Label htmlFor={field.id} color="gray">
                        {field.name}
                      </Label>
                    </div>
                    <Input
                      id={field.id}
                      type={field.type}
                      placeholder={field.placeholder}
                      required={field.required}
                      {...register(field.id)}
                    />
                  </div>
                </Card>
              ))}
            </div>
          );
        })
      )}
    </div>
  );
};
