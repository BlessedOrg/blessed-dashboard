import { Card, Input, Label } from "@/components/ui";

export const GenerateContent = ({
  selectedTab,
  form,
  createViewItems,
  appId,
  eventId,
  toggleProcessingState,
  isProcessing,
}: {
  selectedTab: string;
  form: any;
  createViewItems: any;
  appId?: string;
  eventId?: string;
  toggleProcessingState: (v: boolean) => void;
  isProcessing?: boolean;
}) => {
  const { register, formState: { errors } } = form;
  return (
    <div className="w-full flex flex-col gap-10 pb-10">
      {createViewItems.flatMap((category) =>
        category.tabs.map((tab) => {
          return (
            <div key={tab.href} className={`${selectedTab !== tab.href ? "hidden" : ""}`}>
              {tab?.customFieldComponents?.map((Component, index) => (
                <Component
                  appId={appId}
                  eventId={eventId}
                  key={index}
                  form={form}
                  fields={tab.fields}
                  toggleProcessingState={toggleProcessingState}
                  isProcessing={isProcessing}
                />
              ))}
              {tab?.fields?.map((field) => (
								<Card key={field.id} className='p-6'>
									{field.title && <h3 className="text-lg font-medium mb-4">{field.title}</h3>}
                <div
                  className={`${selectedTab !== tab.href ? "hidden" : ""} ${field.row ? "grid grid-cols-2 gap-4" : ""}`}
                >
                  {field.row ? (
                    field.fields.map((subField) => {
                      return (
                        <div>
                          <div className="mb-2 block">
                            <Label htmlFor={subField.id} color="gray">
                              {subField.name}
                            </Label>
                          </div>
                          <Input
                            id={subField.id}
                            type={subField.type}
                            placeholder={subField.placeholder}
                            required={subField.required}
                            {...register(subField.id, {
															valueAsNumber: subField.type === "number"
														})}
                          />
													{errors[subField.id] && <p className="text-red-500">{errors[subField.id].message}</p>}
                        </div>
                      );
                    })
                  ) : (
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
                        {...register(field.id, {
															valueAsNumber: field.type === "number"
														})}
                      />
											{errors[field.id] && <p className="text-red-500">{errors[field.id].message}</p>}
                    </div>
                  )}
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
