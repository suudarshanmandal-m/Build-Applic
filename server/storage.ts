import { db } from "./db";
import { admins, serviceRequests, notices, type InsertAdmin, type Admin, type InsertServiceRequest, type ServiceRequest, type InsertNotice, type Notice } from "@shared/schema";
import { eq, desc } from "drizzle-orm";

export interface IStorage {
  getAdminByUsername(username: string): Promise<Admin | undefined>;
  getAdminByEmail(email: string): Promise<Admin | undefined>;
  getAdminById(id: number): Promise<Admin | undefined>;
  createAdmin(admin: InsertAdmin): Promise<Admin>;

  getServiceRequests(): Promise<ServiceRequest[]>;
  getServiceRequest(id: number): Promise<ServiceRequest | undefined>;
  createServiceRequest(request: InsertServiceRequest): Promise<ServiceRequest>;
  updateServiceRequestStatus(id: number, status: string): Promise<ServiceRequest | undefined>;
  deleteServiceRequest(id: number): Promise<void>;

  getNotices(): Promise<Notice[]>;
  createNotice(notice: InsertNotice): Promise<Notice>;
  deleteNotice(id: number): Promise<void>;
}

export class DatabaseStorage implements IStorage {
  async getAdminByUsername(username: string): Promise<Admin | undefined> {
    const [admin] = await db.select().from(admins).where(eq(admins.username, username));
    return admin;
  }
  async getAdminByEmail(email: string): Promise<Admin | undefined> {
    const [admin] = await db.select().from(admins).where(eq(admins.email, email));
    return admin;
  }
  async getAdminById(id: number): Promise<Admin | undefined> {
    const [admin] = await db.select().from(admins).where(eq(admins.id, id));
    return admin;
  }
  async createAdmin(admin: InsertAdmin): Promise<Admin> {
    const [newAdmin] = await db.insert(admins).values(admin).returning();
    return newAdmin;
  }

  async getServiceRequests(): Promise<ServiceRequest[]> {
    return await db.select().from(serviceRequests).orderBy(desc(serviceRequests.createdAt));
  }
  async getServiceRequest(id: number): Promise<ServiceRequest | undefined> {
    const [req] = await db.select().from(serviceRequests).where(eq(serviceRequests.id, id));
    return req;
  }
  async createServiceRequest(request: InsertServiceRequest): Promise<ServiceRequest> {
    const [newReq] = await db.insert(serviceRequests).values(request).returning();
    return newReq;
  }
  async updateServiceRequestStatus(id: number, status: string): Promise<ServiceRequest | undefined> {
    const [req] = await db.update(serviceRequests).set({ status }).where(eq(serviceRequests.id, id)).returning();
    return req;
  }
  async deleteServiceRequest(id: number): Promise<void> {
    await db.delete(serviceRequests).where(eq(serviceRequests.id, id));
  }

  async getNotices(): Promise<Notice[]> {
    return await db.select().from(notices).orderBy(desc(notices.createdAt));
  }
  async createNotice(notice: InsertNotice): Promise<Notice> {
    const [newNotice] = await db.insert(notices).values(notice).returning();
    return newNotice;
  }
  async deleteNotice(id: number): Promise<void> {
    await db.delete(notices).where(eq(notices.id, id));
  }
}

export const storage = new DatabaseStorage();
