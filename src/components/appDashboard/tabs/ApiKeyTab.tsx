import { Card } from "../../ui/card";
import { useState } from "react";
import { useUserContext } from "@/store/UserContext";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Square } from "lucide-react";
import { Button } from "@/components/ui/button";
import { createApiToken } from "@/api/createApiToken";
import { CopyButton } from "@/components/ui/copy-button";
import { toast } from "react-toastify";

export const ApiKeyTab = ({ appId, apiTokens }) => {
  const [generatedApiToken, setGeneratedApiToken] = useState("");
  const { mutate } = useUserContext();
  const existingTokens = (apiTokens || [])
    .sort((a, b) => (new Date(a.createdAt).getTime() > new Date(b.createdAt).getTime() ? -1 : 1));
  const [isGeneratingApiKey, setIsGeneratingApiKey] = useState(false);

  const onGenerateNewApiKey = async () => {
    setIsGeneratingApiKey(true);
    try {
      const res = await createApiToken(appId);
      if (!!res?.apiKey) {
        setGeneratedApiToken(res.apiKey);
        mutate();
        toast("Successfully created new API key!", { type: "success" });
      }
    } catch (e) {
      toast(`Something went wrong: ${e?.message}`, { type: "error" });
    }
    setIsGeneratingApiKey(false);
  };

  return (
    <div className="w-full flex-col flex gap-4">
      <Card className="flex flex-col gap-4 w-full h-fit">
        <div className="flex flex-col gap-4">
          <h3 className="font-semibold text-xl">Generate a new API key</h3>
          <Card className="!bg-yellow-500">
            <span className="font-semibold">Remember</span> You will only see the token once, so be sure to copy and store it securely when
            it's displayed. Each new token will mark the previous one as <span className="text-red-500">revoked</span>.
          </Card>
        </div>
        <div className="flex gap-4 items-center">
          <Button onClick={onGenerateNewApiKey} variant="outline" isLoading={isGeneratingApiKey} className="w-fit rounded-full" size="lg">
            Create new token
          </Button>
          {!!generatedApiToken && (
            <div className="flex gap-2 items-center">
              <div className="border border-black rounded-lg p-2">
                {generatedApiToken.slice(0, 9) + "..." + generatedApiToken.slice(-6)}
              </div>
              <CopyButton text={generatedApiToken} />
            </div>
          )}
        </div>
        {!!generatedApiToken && <div className="flex flex-col gap-4">
         <p> You can play around with the token in the <a href={"https://docs.blessed.fan/"} target="_blank" className="font-semibold underline">API Docs</a>.</p>
        </div>}
      </Card>

      <Card className="flex gap-4 flex-col">
        <div className="flex flex-col gap-4">
          <h3 className="font-semibold text-xl">Existing API tokens</h3>
          <Card className="!bg-yellow-500">
            Here, you'll find a list of your existing API tokens. For security reasons, the actual tokens are not displayed. Revoking a
            token is immediate and cannot be undone. If you revoke a token by mistake, you will need to generate a new one.
          </Card>
        </div>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Token ID</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Created At</TableHead>
              <TableHead></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {existingTokens.map((token) => {
              return (
                <TableRow key={token.id}>
                  <TableCell className="font-medium">{token.id.slice(0, 3) + "..." + token.id.slice(-3)}</TableCell>
                  <TableCell>
                    <span className={`${token?.revoked ? "text-red-500" : "text-black-500 font-semibold"}`}>
                      {token?.revoked ? "Revoked" : "Active"}
                    </span>
                  </TableCell>
                  <TableCell>{new Date(token?.createdAt).toLocaleString()}</TableCell>
                  <TableCell>
                    <button className="flex gap-1 ml-auto">
                      <Square size={8} strokeWidth={"5px"} />
                      <Square size={8} strokeWidth={"5px"} />
                      <Square size={8} strokeWidth={"5px"} />
                    </button>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
};
