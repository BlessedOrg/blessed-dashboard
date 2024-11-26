import z from "zod";

export function generateEventSchema(categories) {
  const fieldSchemas = {};

  function generateFieldSchema(field) {
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
        const nestedSchemas = {};
        field.fields?.forEach(nestedField => {
          nestedSchemas[nestedField.id] = generateFieldSchema(nestedField);
        });
        fieldSchema = z.object(nestedSchemas);
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
        case "text":
          fieldSchema = fieldSchema.min(1, `${field.id} is required`);
          break;
        case "object":
          const nestedSchemas = {};
          field.fields?.forEach(nestedField => {
            nestedSchemas[nestedField.id] = generateFieldSchema(nestedField);
          });
          fieldSchema = z.object(nestedSchemas);
          break;
        default:
          if (field.type !== "object") {
            fieldSchema = fieldSchema.min(1, `${field.id} is required`);
          }
      }
    } else {
      fieldSchema = fieldSchema.optional();
    }

    return fieldSchema;
  }

  categories.forEach(category => {
    category.tabs.forEach(tab => {
      tab.fields?.forEach(field => {
        fieldSchemas[field.id] = generateFieldSchema(field);
      });

      tab.schemaFields?.forEach(field => {
        fieldSchemas[field.id] = generateFieldSchema(field);
      });
    });
  });

  return z.object(fieldSchemas);
}