import { prisma } from "../../../prisma/lib/prisma";

export const getLeads = async () => {
  return await prisma.lead.findMany();
};

export const getLeadById = async (id: number) => {
  return await prisma.lead.findUnique({
    where: { id },
  });
};

export const updateLead = async (
  id: number,
  name: string,
  email: string,
  telephone_number: string,
  history: string,
  selected_plan: string,
) => {
  return await prisma.lead.update({
    where: { id },
    data: { name, email, telephone_number, history, selected_plan, status: 'EM_ANDAMENTO' },
  });
};

export const createLead = async (
  name: string,
  email: string,
  telephone_number: string,
  history: string,
  selected_plan: string,
) => {
  return await prisma.lead.create({
    data: { name, email, telephone_number, history, selected_plan },
  });
};
