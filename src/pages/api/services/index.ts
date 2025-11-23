import type { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "../../../lib/dbConnect";
import Service from "../../../models/Service";
import { getUserFromRequest } from "../../../lib/auth";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await dbConnect();

  if (req.method === "GET") {
    const services = await Service.find({ isActive: true }).sort({ name: 1 });
    return res.status(200).json({ services });
  }

  if (req.method === "POST") {
    const user = getUserFromRequest(req);
    if (!user || user.role !== "admin") {
      return res.status(403).json({ message: "Forbidden" });
    }

    const { name, category, price, duration, description, isActive } = req.body;
    if (!name || !category || typeof price !== "number" || !duration) {
      return res.status(400).json({ message: "Missing fields" });
    }

    const svc = await Service.create({
      name,
      category,
      price,
      duration,
      description,
      isActive: isActive ?? true,
    });

    return res.status(201).json({ service: svc });
  }

  return res.status(405).end();
}
