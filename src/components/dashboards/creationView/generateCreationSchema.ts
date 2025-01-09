import z from "zod";

export function generateCreationSchema(generatedCategories) {
  const categories = generatedCategories.filter((category) => category !== null);
  const fieldSchemas = {};

  function generateFieldSchema(field) {
    let fieldSchema
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
        fieldSchema = z.coerce.number().refine(val => val > 0, { message: "Field must be greater than 0" })
        break;
      case "array":
        fieldSchema = innerSchema(field.fields)
        break;
      case "boolean":
        fieldSchema = z.boolean();
        break;
      case "object":
        const nestedSchemas = {};
        field.fields?.forEach((nestedField) => {
          nestedSchemas[nestedField.id] = generateFieldSchema(nestedField);
        });
        fieldSchema = z.object(nestedSchemas);
        break;
      default:
        fieldSchema = z.any();
    }
		if(field.type === "number") {
			console.log(fieldSchema)

		}
    if (!!field?.required) {
      switch (field.type) {
        case "date":
          fieldSchema = fieldSchema.min(new Date(), `Field ${field.id} is required`);
          break;
        case "number":
          break;
        case "text":
          fieldSchema = fieldSchema.min(1, `Field ${field.id} is required`);
          break;
        case "boolean":
          fieldSchema = z.boolean();
          break;
        case "object":
          const nestedSchemas = {};
          field.fields?.forEach((nestedField) => {
            nestedSchemas[nestedField.id] = generateFieldSchema(nestedField);
          });
          fieldSchema = z.object(nestedSchemas);
          break;
        default:
          if (field.type !== "object" && field.type !== "boolean") {
            fieldSchema = fieldSchema.min(1, `Field ${field.id} is required`);
          }
      }
    } else {
      fieldSchema = fieldSchema.optional();
    }

		if(field.type === "number") {
			console.log("number", field.id)
			console.log(fieldSchema)
		}

    return fieldSchema;
  }

  categories.forEach((category) => {
    category.tabs.forEach((tab) => {
      tab.fields?.forEach((field) => {
        if (field.row) {
          // Handle fields inside row layout
          field.fields?.forEach((subField) => {
            fieldSchemas[subField.id] = generateFieldSchema(subField);
          });
        } else {
          fieldSchemas[field.id] = generateFieldSchema(field);
        }
      });

      tab.schemaFields?.forEach((field) => {
        fieldSchemas[field.id] = generateFieldSchema(field);
      });
    });
  });

  return z.object(fieldSchemas);
}

const innerSchema = (fields) => {
  if (Array.isArray(fields) && fields.every(field => typeof field === "string")) {
    return z.array(z.enum(fields as [string, ...string[]]));
  }
  return z.array(z.object(
    fields.reduce((acc: any, field: any) => {
      acc[field.id] = field.type === "number" 
        ? z.coerce.number().transform(val => Number(val))
        : z.string();
      return acc;
    }, {})
  ));
}
