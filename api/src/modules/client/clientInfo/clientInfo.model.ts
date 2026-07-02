import { prisma } from "../../../../prisma/lib/prisma";

export const getClientInfo = async (clientId: number) => {
  return await prisma.clientInfo.findUnique({
    where: { client_id: clientId },
  });
};

export const updateClientInfo = async (
  clientId: number,
  data: {
    block: string;
    block_week: string;
    previous_block?: string;
    notes?: string;
    sheet_link: string;
  },
) => {
  const info = await prisma.clientInfo.findUnique({ where: { client_id: clientId } });
  if (!info) throw new Error("ClientInfo not found");

  return await prisma.clientInfo.update({
    where: { client_id: clientId },
    data,
  });
};
