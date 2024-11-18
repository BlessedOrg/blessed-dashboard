import { createDashboardSidebarCategoriesAndFields } from "../createDashboardSidebarFields/createDashboardSidebarCategoriesAndFields";
import { Card, Input, Label } from "@/components/ui";
import { FieldValues, UseFormReturn } from "react-hook-form";

export const CreateDashboardContent = ({ selectedTab, form }: { selectedTab: string; form: UseFormReturn<FieldValues, any, undefined> }) => {
  const { register } = form;
  return (
    <div className="w-full flex flex-col gap-10 pb-10">
      {createDashboardSidebarCategoriesAndFields.flatMap((category) =>
        category.tabs.flatMap((tab) =>
          tab?.customFieldComponents?.map((Components, index) => {
            return <Components key={index} form={form} fields={tab.fields} className={`${selectedTab === tab.href ? "" : "!hidden"}`} />;
          })
        )
      )}
      {createDashboardSidebarCategoriesAndFields.flatMap((category) =>
        category.tabs.flatMap((tab) =>
          tab.fields.map((field) => (
            <Card key={field.id} className={`${selectedTab === tab.href ? "" : "!hidden"}`}>
              <div>
                <div className="mb-2 block">
                  <Label htmlFor={field.id} color="gray">
                    {field.name}
                  </Label>
                </div>
                <Input id={field.id} type={field.type} placeholder={field.placeholder} required={field.required} {...register(field.id)} />
              </div>
            </Card>
          ))
        )
      )}
    </div>
  );
};
