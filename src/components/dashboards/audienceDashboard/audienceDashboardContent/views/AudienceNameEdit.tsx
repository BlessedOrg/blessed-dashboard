import { Card, CardContent } from "@/components/ui/card";
import { TextEdit } from "@/components/ui/text-edit";
import React from "react";

export const AudienceNameEdit = ({ onAudienceNameChange, currentName }) => {
  return <Card>
    <CardContent>
      <TextEdit defaultValue={currentName} handleSubmit={onAudienceNameChange} />
    </CardContent>
  </Card>;
};