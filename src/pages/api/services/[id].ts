import type { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "../../../lib/dbConnect";
import Service from "../../../models/Service";
import { getUserFromRequest } from "../../../lib/auth";
import mongoose from "mongoose";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await dbConnect();
  const { id } = req.query;

  if (!id || Array.isArray(id)) return res.status(400).json({ message: "Invalid id" });

  if (req.method === "GET") {
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).end();
    const svc = await Service.findById(id);
    if (!svc) return res.status(404).json({ message: "Not found" });
    return res.json({ service: svc });
  }

  const user = getUserFromRequest(req);
  if (!user || user.role !== "admin") return res.status(403).json({ message: "Forbidden" });

  if (req.method === "PATCH") {
    const allowed = ["name","category","price","duration","description","isActive"];
    const body = req.body;
    const update: any = {};
    allowed.forEach(k => { if (body[k] !== undefined) update[k] = body[k]; });

    const svc = await Service.findByIdAndUpdate(id, update, { new: true });
    if (!svc) return res.status(404).json({ message: "Not found" });
    return res.json({ service: svc });
  }

  if (req.method === "DELETE") {
    await Service.findByIdAndDelete(id);
    return res.status(204).end();
  }

  return res.status(405).end();
}
