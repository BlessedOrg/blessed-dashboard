import z from "zod";

export function generateEventSchema(categories) {
  const fieldSchemas = {};
  let externalSchemas = [];

  categories.forEach(category => {
    category.tabs.forEach(tab => {
      if (tab.externalSchema) {
        externalSchemas = [...externalSchemas, ...tab.externalSchema];
      }

      tab.fields?.forEach(field => {
        let fieldSchema;
        switch (field.type) {
          case "text":
            fieldSchema = z.string();
            break;
          case "date":
            fieldSchema = z.coerce.date();
            break;
          case "select":
            fieldSchema = z.string();
            break;
          case "number":
            fieldSchema = z.number();
            break;
          default:
            fieldSchema = z.any();
        }

        if (!!field?.required) {
          switch (field.type) {
            case "date":
              fieldSchema = fieldSchema.min(new Date(), `${field.name} is required`);
              break;
            case "number":
              fieldSchema = fieldSchema.min(1, `${field.name} is required`);
              break;
            default:
              fieldSchema = fieldSchema.min(1, `${field.name} is required`);
          }
        } else {
          fieldSchema = fieldSchema.optional();
        }
        fieldSchemas[field.id] = fieldSchema;
      });

      tab.schemaFields?.forEach(field => {
        let fieldSchema;
        switch (field.type) {
          case "text":
            fieldSchema = z.string();
            break;
          case "date":
            fieldSchema = z.coerce.date();
            break;
          case "select":
            fieldSchema = z.string();
            break;
          case "number":
            fieldSchema = z.number();
            break;
          case "object":
            fieldSchema = z.object({});
            break;
          default:
            fieldSchema = z.any();
        }

        if (!!field?.required) {
          switch (field.type) {
            case "date":
              fieldSchema = fieldSchema.min(new Date(), `${field.id} is required`);
              break;
            case "number":
              fieldSchema = fieldSchema.min(1, `${field.id} is required`);
              break;
            default:
              fieldSchema = fieldSchema.min(1, `${field.id} is required`);
          }
        } else {
          fieldSchema = fieldSchema.optional();
        }
        fieldSchemas[field.id] = fieldSchema;
      });
    });
  });

  let finalSchema = z.object(fieldSchemas);

  externalSchemas.forEach(schema => {
    finalSchema = finalSchema.merge(schema(true));
  });

  return finalSchema;
}